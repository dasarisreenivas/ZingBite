from __future__ import annotations

import json
import math
import os
from urllib.error import URLError
from urllib.request import Request, urlopen

from flask import Flask, jsonify, request

from ml_platform.config import MlConfig
from ml_platform.models import MODEL_NAMES, MlPredictor, MlTrainer
from ml_platform.registry import ModelRegistry


DEFAULT_OSRM_BASE_URL = 'https://router.project-osrm.org'
MAX_ROUTE_POINTS = 350


def _finite_float(value: object, default: float) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return default
    return number if math.isfinite(number) else default


def _is_valid_coordinate(latitude: float, longitude: float) -> bool:
    return -90 <= latitude <= 90 and -180 <= longitude <= 180


def _haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    earth_radius_km = 6371.0
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    r_lat1 = math.radians(lat1)
    r_lat2 = math.radians(lat2)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.sin(d_lon / 2) ** 2 * math.cos(r_lat1) * math.cos(r_lat2)
    )
    return earth_radius_km * 2 * math.asin(math.sqrt(a))


def _path_distance_km(nodes: list[dict[str, object]]) -> float:
    total = 0.0
    for index in range(1, len(nodes)):
        previous = nodes[index - 1]
        current = nodes[index]
        total += _haversine(
            float(previous['latitude']),
            float(previous['longitude']),
            float(current['latitude']),
            float(current['longitude']),
        )
    return total


def _sample_coordinates(coordinates: list[list[float]]) -> list[list[float]]:
    if len(coordinates) <= MAX_ROUTE_POINTS:
        return coordinates
    sampled: list[list[float]] = []
    last_index = -1
    for index in range(MAX_ROUTE_POINTS):
        source_index = round(index * (len(coordinates) - 1) / (MAX_ROUTE_POINTS - 1))
        if source_index != last_index:
            sampled.append(coordinates[source_index])
            last_index = source_index
    return sampled


def _route_nodes(coordinates: list[list[float]], start_id: int, label_prefix: str) -> list[dict[str, object]]:
    nodes = []
    for index, coordinate in enumerate(_sample_coordinates(coordinates)):
        if len(coordinate) < 2:
            continue
        lon = _finite_float(coordinate[0], float('nan'))
        lat = _finite_float(coordinate[1], float('nan'))
        if not _is_valid_coordinate(lat, lon):
            continue
        nodes.append({
            'id': start_id + len(nodes),
            'label': f'{label_prefix} Road Point {len(nodes) + 1}',
            'latitude': lat,
            'longitude': lon,
            'earliestTime': 0.0,
            'latestTime': 1.7976931348623157e308,
        })
    return nodes


def _fetch_osrm_leg(start_lat: float, start_lon: float, end_lat: float, end_lon: float,
                    start_id: int, label_prefix: str) -> tuple[list[dict[str, object]], float]:
    if not _is_valid_coordinate(start_lat, start_lon) or not _is_valid_coordinate(end_lat, end_lon):
        raise ValueError('Invalid route coordinates')

    base_url = os.getenv('ZINGBITE_OSRM_BASE_URL', DEFAULT_OSRM_BASE_URL).rstrip('/')
    route_url = (
        f'{base_url}/route/v1/driving/'
        f'{start_lon:.6f},{start_lat:.6f};{end_lon:.6f},{end_lat:.6f}'
        '?overview=full&geometries=geojson&alternatives=false&steps=false'
    )
    route_request = Request(route_url, headers={'Accept': 'application/json', 'User-Agent': 'ZingBite/1.0'})
    with urlopen(route_request, timeout=4) as response:
        payload = json.loads(response.read().decode('utf-8'))

    if payload.get('code') != 'Ok' or not payload.get('routes'):
        raise ValueError('OSRM did not return a route')

    route = payload['routes'][0]
    coordinates = route.get('geometry', {}).get('coordinates') or []
    nodes = _route_nodes(coordinates, start_id, label_prefix)
    if len(nodes) < 2:
        raise ValueError('OSRM route did not include usable geometry')
    distance_km = float(route.get('distance') or 0.0) / 1000.0
    if distance_km <= 0:
        distance_km = _path_distance_km(nodes)
    return nodes, distance_km


def _traffic_level_for_distance(distance_km: float) -> str:
    if distance_km >= 8:
        return 'Heavy'
    if distance_km >= 3:
        return 'Moderate'
    return 'Light'


def _fallback_eta(distance_km: float, weather: str, prep_time: float, is_high_rise: bool) -> int:
    base_travel = (distance_km / 25.0) * 60.0
    weather_delay = 5.0 if weather.lower() in {'rainy', 'rain'} else 12.0 if weather.lower() in {'stormy', 'storm'} else 0.0
    prep_wait = max(0.0, prep_time - base_travel * 0.4)
    nav_offset = 4.5 if is_high_rise else 1.0
    return int(max(5, round(base_travel + weather_delay + prep_wait + nav_offset)))


def create_app(config: MlConfig | None = None) -> Flask:
    ml_config = config or MlConfig.from_env()
    app = Flask(__name__)
    trainer = MlTrainer(ml_config)
    predictor = MlPredictor(ml_config)
    registry = ModelRegistry(ml_config.models_dir)

    @app.get('/health')
    def health():
        manifest = registry.load_manifest()
        return jsonify({
            'status': 'ok',
            'service': 'zingbite-ml-service',
            'trainingEnabled': ml_config.training_enabled,
            'models': sorted(manifest.get('models', {}).keys()),
        })

    @app.get('/models')
    def models():
        return jsonify(registry.load_manifest())

    @app.post('/train/all')
    def train_all():
        if not ml_config.training_enabled:
            return jsonify({'error': 'Training is disabled'}), 403
        return jsonify({'models': trainer.train_all()})

    @app.post('/train/<model_name>')
    def train_model(model_name: str):
        if not ml_config.training_enabled:
            return jsonify({'error': 'Training is disabled'}), 403
        if model_name not in MODEL_NAMES:
            return jsonify({'error': f'Unknown model: {model_name}'}), 404
        return jsonify(trainer.train(model_name))

    @app.post('/predict/<model_name>')
    def predict_model(model_name: str):
        if model_name == 'route':
            return predict_route()
        if model_name not in MODEL_NAMES:
            return jsonify({'error': f'Unknown model: {model_name}'}), 404
        payload = request.get_json(silent=True) or {}
        try:
            return jsonify(predictor.predict(model_name, payload))
        except FileNotFoundError as exc:
            return jsonify({'error': str(exc), 'source': 'unavailable'}), 503
        except ValueError as exc:
            return jsonify({'error': str(exc)}), 400

    @app.post('/predict/route')
    @app.post('/predict-route')
    def predict_route():
        payload = request.get_json(silent=True) or {}

        rider_lat = _finite_float(payload.get('riderLat'), 12.9580)
        rider_lon = _finite_float(payload.get('riderLon'), 77.5890)
        rest_lat = _finite_float(payload.get('restLat', payload.get('restaurantLat')), 12.9716)
        rest_lon = _finite_float(payload.get('restLon', payload.get('restaurantLon')), 77.5946)
        cust_lat = _finite_float(payload.get('custLat', payload.get('custALat', payload.get('customerLat'))), 12.9821)
        cust_lon = _finite_float(payload.get('custLon', payload.get('custALon', payload.get('customerLon'))), 77.6085)
        weather = str(payload.get('weather', 'Sunny'))
        prep_time = _finite_float(payload.get('prepTimeA', payload.get('prepTime')), 10.0)
        is_high_rise = bool(payload.get('isHighRise', payload.get('is_high_rise', False)))

        try:
            path_fm, distance_fm = _fetch_osrm_leg(
                rider_lat, rider_lon,
                rest_lat, rest_lon,
                0, 'First Mile'
            )
            path_lm1, distance_lm1 = _fetch_osrm_leg(
                rest_lat, rest_lon,
                cust_lat, cust_lon,
                100, 'Last Mile'
            )
        except (OSError, URLError, ValueError, TimeoutError) as exc:
            return jsonify({'error': str(exc), 'source': 'unavailable'}), 503

        total_distance = distance_fm + distance_lm1
        traffic_level = _traffic_level_for_distance(total_distance)
        try:
            eta = predictor.predict('eta', {
                'distance': total_distance,
                'trafficLevel': traffic_level,
                'weather': weather,
                'prepTime': prep_time,
                'isHighRise': is_high_rise,
            })
            eta_minutes = int(eta.get('etaMinutes') or 0)
        except Exception:
            eta_minutes = _fallback_eta(total_distance, weather, prep_time, is_high_rise)

        if eta_minutes <= 0:
            eta_minutes = _fallback_eta(total_distance, weather, prep_time, is_high_rise)

        return jsonify({
            'source': 'ml',
            'routeSource': 'ml_osrm',
            'pathFM': path_fm,
            'pathLM1': path_lm1,
            'routeDistanceKm': round(total_distance, 3),
            'estimatedEtaMinutes': eta_minutes,
            'trafficLevel': traffic_level,
        })

    return app
