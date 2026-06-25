from __future__ import annotations

from flask import Flask, jsonify, request

from ml_platform.config import MlConfig
from ml_platform.models import MODEL_NAMES, MlPredictor, MlTrainer
from ml_platform.registry import ModelRegistry


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
        if model_name not in MODEL_NAMES:
            return jsonify({'error': f'Unknown model: {model_name}'}), 404
        payload = request.get_json(silent=True) or {}
        try:
            return jsonify(predictor.predict(model_name, payload))
        except FileNotFoundError as exc:
            return jsonify({'error': str(exc), 'source': 'unavailable'}), 503
        except ValueError as exc:
            return jsonify({'error': str(exc)}), 400

    return app
