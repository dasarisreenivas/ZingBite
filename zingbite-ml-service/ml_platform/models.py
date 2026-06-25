from __future__ import annotations

import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from difflib import SequenceMatcher
from typing import Any

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import HistGradientBoostingRegressor, IsolationForest, RandomForestRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import mean_absolute_error
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

from ml_platform.config import MlConfig
from ml_platform.data import DataRepository
from ml_platform.registry import ModelRegistry


MODEL_NAMES = [
    'recommender',
    'search_rank',
    'cart_optimizer',
    'demand_forecast',
    'eta',
    'fraud',
    'nlp',
]


class MlTrainer:
    def __init__(self, config: MlConfig | None = None):
        self.config = config or MlConfig.from_env()
        self.repository = DataRepository(self.config)
        self.registry = ModelRegistry(self.config.models_dir)

    def train_all(self) -> dict[str, Any]:
        frames = self.repository.load_all()
        results = {}
        version = datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        for model_name in MODEL_NAMES:
            results[model_name] = self.train(model_name, frames=frames, version=version)
        return results

    def train(self, model_name: str, frames: dict[str, Any] | None = None, version: str | None = None) -> dict[str, Any]:
        if model_name not in MODEL_NAMES:
            raise ValueError(f'Unknown model: {model_name}')

        frames = frames or self.repository.load_all()
        version = version or datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')
        artifact, metrics, schema = getattr(self, f'_train_{model_name}')(frames)
        artifact['modelName'] = model_name
        artifact['version'] = version
        artifact['trainedAt'] = datetime.now(timezone.utc).isoformat()
        return self.registry.save_artifact(model_name, version, artifact, metrics, schema)

    def _train_recommender(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        menu = _menu_frame(frames)
        order_items = _frame(frames, 'orderitem')
        menu_records = _records(menu)
        text = _menu_text(menu)
        vectorizer = TfidfVectorizer(stop_words='english', min_df=1)
        content_matrix = vectorizer.fit_transform(text)

        popularity = _popularity(order_items, menu)
        cooccurrence = _cooccurrence(order_items)
        metrics = {
            'coverage': round(len(popularity) / max(len(menu_records), 1), 4),
            'menu_items': len(menu_records),
            'cooccurrence_pairs': sum(len(v) for v in cooccurrence.values()),
        }
        return {
            'menuRecords': menu_records,
            'popularity': popularity,
            'cooccurrence': cooccurrence,
            'vectorizer': vectorizer,
            'contentMatrix': content_matrix,
        }, metrics, {'required': ['restaurantId'], 'optional': ['cartItems', 'candidateItems', 'limit']}

    def _train_search_rank(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        menu = _menu_frame(frames)
        analytics = _frame(frames, 'analytics_events')
        text = _menu_text(menu)
        vectorizer = TfidfVectorizer(stop_words='english', min_df=1, ngram_range=(1, 2))
        content_matrix = vectorizer.fit_transform(text)
        click_terms = Counter()
        if not analytics.empty and 'search_query' in analytics.columns:
            for query in analytics['search_query'].dropna().astype(str):
                click_terms.update(_tokens(query))

        return {
            'menuRecords': _records(menu),
            'vectorizer': vectorizer,
            'contentMatrix': content_matrix,
            'queryTerms': dict(click_terms),
            'popularity': _popularity(_frame(frames, 'orderitem'), menu),
        }, {
            'indexed_items': int(len(menu)),
            'query_terms': len(click_terms),
        }, {'required': ['query'], 'optional': ['candidateItems', 'userId', 'limit']}

    def _train_cart_optimizer(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        menu = _menu_frame(frames)
        order_items = _frame(frames, 'orderitem')
        cooccurrence = _cooccurrence(order_items)
        menu_lookup = {str(int(row['menu_id'])): row for row in _records(menu)}
        return {
            'cooccurrence': cooccurrence,
            'menuLookup': menu_lookup,
            'popularity': _popularity(order_items, menu),
        }, {
            'association_edges': sum(len(v) for v in cooccurrence.values()),
            'menu_items': int(len(menu)),
        }, {'required': ['cartItems'], 'optional': ['restaurantId']}

    def _train_demand_forecast(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        demand = _demand_training_frame(frames)
        feature_cols = ['restaurant_id', 'menu_id', 'day_of_week', 'hour', 'is_weekend', 'surge_multiplier']
        model = HistGradientBoostingRegressor(random_state=self.config.seed, max_iter=80)
        model.fit(demand[feature_cols], demand['quantity'])
        predictions = model.predict(demand[feature_cols])
        mae = float(mean_absolute_error(demand['quantity'], predictions))
        menu = _menu_frame(frames)
        return {
            'model': model,
            'featureColumns': feature_cols,
            'menuRecords': _records(menu),
            'historicalAverage': demand.groupby('menu_id')['quantity'].mean().to_dict(),
        }, {
            'mae': round(mae, 4),
            'training_rows': int(len(demand)),
        }, {'features': feature_cols}

    def _train_eta(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        routes = _route_frame(frames.get('route_samples'))
        feature_cols = ['distance', 'traffic_level', 'weather', 'prep_time', 'is_high_rise']
        preprocessor = ColumnTransformer([
            ('categorical', OneHotEncoder(handle_unknown='ignore'), ['traffic_level', 'weather']),
            ('numeric', 'passthrough', ['distance', 'prep_time', 'is_high_rise']),
        ])
        model = Pipeline([
            ('features', preprocessor),
            ('model', RandomForestRegressor(n_estimators=80, random_state=self.config.seed, min_samples_leaf=2)),
        ])
        model.fit(routes[feature_cols], routes['eta'])
        predictions = model.predict(routes[feature_cols])
        mae = float(mean_absolute_error(routes['eta'], predictions))
        return {
            'model': model,
            'featureColumns': feature_cols,
        }, {
            'mae_minutes': round(mae, 4),
            'training_rows': int(len(routes)),
        }, {'features': feature_cols}

    def _train_fraud(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        features = _fraud_features(frames)
        feature_cols = [
            'account_age_days',
            'order_count',
            'review_count',
            'shared_address_count',
            'shared_coordinate_count',
            'ip_user_count',
            'user_agent_count',
            'refund_events',
            'coupon_events',
        ]
        contamination = min(0.2, max(0.05, 1 / max(len(features), 20)))
        model = IsolationForest(random_state=self.config.seed, contamination=contamination)
        model.fit(features[feature_cols])
        scores = -model.decision_function(features[feature_cols])
        features = features.assign(risk_score=scores)
        return {
            'model': model,
            'featureColumns': feature_cols,
            'baselineFeatures': _records(features),
        }, {
            'training_users': int(len(features)),
            'risk_threshold': round(float(np.percentile(scores, 90)), 4),
        }, {'features': feature_cols}

    def _train_nlp(self, frames: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any], dict[str, Any]]:
        intent_rows = _nlp_training_rows(frames)
        texts = [row['text'] for row in intent_rows]
        intent_labels = [row['intent'] for row in intent_rows]
        category_labels = [row['category'] for row in intent_rows]
        sentiment_labels = [row['sentiment'] for row in intent_rows]

        def pipeline() -> Pipeline:
            return Pipeline([
                ('tfidf', TfidfVectorizer(ngram_range=(1, 2), min_df=1)),
                ('classifier', LogisticRegression(max_iter=1000, random_state=self.config.seed)),
            ])

        intent_model = pipeline().fit(texts, intent_labels)
        category_model = pipeline().fit(texts, category_labels)
        sentiment_model = pipeline().fit(texts, sentiment_labels)
        return {
            'intentModel': intent_model,
            'categoryModel': category_model,
            'sentimentModel': sentiment_model,
        }, {
            'training_messages': len(texts),
            'intent_labels': len(set(intent_labels)),
            'category_labels': len(set(category_labels)),
        }, {'required': ['text'], 'optional': ['contextType']}


class MlPredictor:
    def __init__(self, config: MlConfig | None = None):
        self.config = config or MlConfig.from_env()
        self.registry = ModelRegistry(self.config.models_dir)
        self._trainer = MlTrainer(self.config)

    def predict(self, model_name: str, payload: dict[str, Any]) -> dict[str, Any]:
        if model_name not in MODEL_NAMES:
            raise ValueError(f'Unknown model: {model_name}')
        loaded = self.registry.load_active(model_name)
        if loaded is None:
            if not self.config.training_enabled:
                raise FileNotFoundError(f'No active artifact for {model_name}')
            self._trainer.train(model_name)
            loaded = self.registry.load_active(model_name)
        if loaded is None:
            raise FileNotFoundError(f'No active artifact for {model_name}')

        artifact, manifest_entry = loaded
        result = getattr(self, f'_predict_{model_name}')(artifact, payload)
        result['modelName'] = model_name
        result['modelVersion'] = manifest_entry['version']
        result.setdefault('source', 'ml')
        return result

    def _predict_recommender(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        candidates = _candidate_records(payload, artifact['menuRecords'])
        restaurant_id = _optional_int(payload.get('restaurantId'))
        if restaurant_id is not None:
            candidates = [item for item in candidates if _optional_int(item.get('restaurantId')) == restaurant_id]
        candidates = candidates or artifact['menuRecords']

        cart_ids = {
            str(_optional_int(item.get('menuId') or item.get('id')))
            for item in payload.get('cartItems', [])
            if _optional_int(item.get('menuId') or item.get('id')) is not None
        }
        popularity = artifact.get('popularity', {})
        cooccurrence = artifact.get('cooccurrence', {})
        max_pop = max(popularity.values(), default=1)
        scored = []
        for item in candidates:
            item_id = str(_optional_int(item.get('menuId') or item.get('menu_id')) or '')
            score = 0.25 + (popularity.get(item_id, 0) / max_pop) * 0.45
            reasons = []
            for cart_id in cart_ids:
                pair_score = dict(cooccurrence.get(cart_id, [])).get(item_id, 0)
                if pair_score:
                    score += min(pair_score / 10, 0.3)
                    reasons.append('frequently paired with your cart')
            if not reasons:
                reasons.append('matched by local popularity and menu content')
            enriched = _normalize_menu_record(item)
            enriched['score'] = round(float(score), 4)
            enriched['tag'] = 'ML Pick'
            enriched['reason'] = reasons[0]
            scored.append(enriched)
        scored.sort(key=lambda item: item['score'], reverse=True)
        return {'items': scored[:_limit(payload, 6)]}

    def _predict_search_rank(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        query = str(payload.get('query', '')).strip()
        candidates = _candidate_records(payload, artifact['menuRecords'])
        if not candidates:
            candidates = artifact['menuRecords']

        vectorizer = artifact['vectorizer']
        matrix = artifact['contentMatrix']
        candidate_ids = {str(_optional_int(item.get('menuId') or item.get('menu_id'))) for item in candidates}
        indexed = [
            idx for idx, item in enumerate(artifact['menuRecords'])
            if str(_optional_int(item.get('menuId') or item.get('menu_id'))) in candidate_ids
        ]
        if query and indexed:
            similarities = cosine_similarity(vectorizer.transform([query]), matrix[indexed]).ravel()
        else:
            similarities = np.zeros(len(indexed))

        popularity = artifact.get('popularity', {})
        max_pop = max(popularity.values(), default=1)
        results = []
        for local_idx, score in zip(indexed, similarities):
            item = artifact['menuRecords'][local_idx]
            normalized = _normalize_menu_record(item)
            item_id = str(normalized['menuId'])
            lexical = _lexical_score(query, normalized.get('menuName', ''), normalized.get('description', ''))
            rank_score = (float(score) * 0.62) + (lexical * 0.23) + ((popularity.get(item_id, 0) / max_pop) * 0.15)
            normalized['rankScore'] = round(rank_score, 4)
            normalized['reason'] = 'ranked by text match, order popularity, and local engagement'
            results.append(normalized)
        results.sort(key=lambda item: item['rankScore'], reverse=True)
        return {'items': results[:_limit(payload, 12)], 'query': query}

    def _predict_cart_optimizer(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        cart_items = payload.get('cartItems', [])
        cart_ids = {
            str(_optional_int(item.get('menuId') or item.get('id')))
            for item in cart_items
            if _optional_int(item.get('menuId') or item.get('id')) is not None
        }
        suggestion_scores: Counter[str] = Counter()
        for cart_id in cart_ids:
            for item_id, count in artifact.get('cooccurrence', {}).get(cart_id, []):
                if item_id not in cart_ids:
                    suggestion_scores[item_id] += count

        suggestions = []
        for item_id, score in suggestion_scores.most_common(5):
            record = artifact.get('menuLookup', {}).get(str(item_id), {})
            normalized = _normalize_menu_record(record)
            normalized['score'] = int(score)
            normalized['reason'] = 'frequently bought with items already in the cart'
            suggestions.append(normalized)

        rule_message, savings = _combo_rule(cart_items)
        return {
            'optimizationAvailable': bool(suggestions or rule_message),
            'message': rule_message or ('Add a frequent pairing to improve the meal mix.' if suggestions else 'Cart already looks balanced.'),
            'suggestions': suggestions,
            'estimatedSavings': round(float(savings), 2),
        }

    def _predict_demand_forecast(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant_id = _optional_int(payload.get('restaurantId')) or 0
        candidates = _candidate_records(payload, artifact.get('menuRecords', []))
        if restaurant_id:
            candidates = [item for item in candidates if _optional_int(item.get('restaurantId')) == restaurant_id]
        candidates = candidates[:_limit(payload, 20)]
        now = datetime.now()
        feature_cols = artifact['featureColumns']
        rows = []
        for item in candidates:
            rows.append({
                'restaurant_id': _optional_int(item.get('restaurantId')) or restaurant_id,
                'menu_id': _optional_int(item.get('menuId')) or 0,
                'day_of_week': now.weekday(),
                'hour': int(payload.get('hour', 19)),
                'is_weekend': 1 if now.weekday() >= 5 else 0,
                'surge_multiplier': float(payload.get('surgeMultiplier', 1.0)),
            })
        if not rows:
            rows.append({'restaurant_id': restaurant_id, 'menu_id': 0, 'day_of_week': now.weekday(), 'hour': 19, 'is_weekend': 0, 'surge_multiplier': 1.0})
        frame = pd.DataFrame(rows)
        predictions = artifact['model'].predict(frame[feature_cols])
        historical = artifact.get('historicalAverage', {})
        forecasts = []
        for item, row, predicted in zip(candidates or [{}] * len(rows), rows, predictions):
            menu_id = str(row['menu_id'])
            historical_average = float(historical.get(row['menu_id'], historical.get(menu_id, max(predicted * 0.8, 1))))
            forecast = _normalize_menu_record(item)
            forecast['predictedQuantity'] = int(max(1, round(float(predicted))))
            forecast['historicalAverage'] = round(historical_average, 2)
            forecast['trend'] = 'HIGH_DEMAND_WARNING' if forecast['predictedQuantity'] > historical_average * 1.35 else 'NORMAL'
            forecast['reason'] = 'forecast from historical order time, item, surge, and restaurant demand features'
            forecasts.append(forecast)
        return {'forecasts': forecasts}

    def _predict_eta(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        row = {
            'distance': float(payload.get('distance', payload.get('distanceKm', 4.0))),
            'traffic_level': str(payload.get('trafficLevel', payload.get('traffic_level', 'Moderate'))),
            'weather': str(payload.get('weather', 'Sunny')),
            'prep_time': float(payload.get('prepTime', payload.get('prep_time', 15))),
            'is_high_rise': int(bool(payload.get('isHighRise', payload.get('is_high_rise', False)))),
        }
        frame = pd.DataFrame([row])
        eta = float(artifact['model'].predict(frame[artifact['featureColumns']])[0])
        factors = []
        if row['traffic_level'].lower() == 'heavy':
            factors.append('heavy traffic')
        if row['weather'].lower() in {'rainy', 'rain', 'storm'}:
            factors.append('weather delay')
        if row['is_high_rise']:
            factors.append('high-rise handoff')
        if row['prep_time'] >= 20:
            factors.append('longer prep time')
        return {
            'etaMinutes': int(max(5, round(eta))),
            'confidence': 0.82,
            'delayFactors': factors or ['normal route conditions'],
        }

    def _predict_fraud(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        feature_cols = artifact['featureColumns']
        if payload.get('users'):
            rows = [_payload_user_features(user) for user in payload['users']]
            frame = pd.DataFrame(rows)
        else:
            frame = pd.DataFrame(artifact.get('baselineFeatures', []))
        if frame.empty:
            frame = pd.DataFrame([_payload_user_features({})])
        for column in feature_cols:
            if column not in frame.columns:
                frame[column] = 0
        scores = -artifact['model'].decision_function(frame[feature_cols])
        clusters = []
        for row, score in zip(frame.to_dict('records'), scores):
            threat = 'CRITICAL' if score > 0.18 else 'SUSPICIOUS' if score > 0.05 else 'LOW'
            clusters.append({
                'userId': row.get('user_id'),
                'riskScore': round(float(score), 4),
                'threatLevel': threat,
                'explanations': _fraud_explanations(row),
            })
        clusters.sort(key=lambda item: item['riskScore'], reverse=True)
        return {'clusters': clusters[:_limit(payload, 20)]}

    def _predict_nlp(self, artifact: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        text = str(payload.get('text') or payload.get('messageText') or '').strip()
        if not text:
            text = 'help'

        def predict_label(model: Pipeline) -> tuple[str, float]:
            probabilities = model.predict_proba([text])[0]
            idx = int(np.argmax(probabilities))
            return str(model.classes_[idx]), float(probabilities[idx])

        intent, intent_confidence = predict_label(artifact['intentModel'])
        category, category_confidence = predict_label(artifact['categoryModel'])
        sentiment, sentiment_confidence = predict_label(artifact['sentimentModel'])
        normalized_text = text.lower()
        if any(word in normalized_text for word in ['refund', 'replacement', 'wrong item', 'missing']):
            intent = 'refund_request' if 'refund' in normalized_text else 'support_ticket'
            category = 'order_accuracy'
            sentiment = 'negative'
        elif any(word in normalized_text for word in ['late', 'delay', 'where is', 'track']):
            intent = 'track_order'
            category = 'delivery_delay'
            sentiment = 'negative'
        elif any(word in normalized_text for word in ['cold', 'stale', 'bad', 'burnt']):
            intent = 'support_ticket'
            category = 'food_quality'
            sentiment = 'negative'
        return {
            'intent': intent,
            'supportCategory': category,
            'sentiment': sentiment,
            'confidence': round(max(intent_confidence, category_confidence, sentiment_confidence), 4),
            'reply': _safe_reply(intent, category, sentiment),
        }


def _frame(frames: dict[str, Any], name: str) -> pd.DataFrame:
    value = frames.get(name)
    return value if isinstance(value, pd.DataFrame) else pd.DataFrame()


def _menu_frame(frames: dict[str, Any]) -> pd.DataFrame:
    menu = _frame(frames, 'menu').copy()
    if menu.empty:
        menu = pd.DataFrame([
            {'menu_id': 1, 'restaurant_id': 1, 'menu_name': 'Paneer Biryani', 'description': 'Fragrant rice with paneer and spices', 'price': 249, 'is_available': True, 'cuisine_type': 'Indian', 'restaurant_rating': 4.4},
            {'menu_id': 2, 'restaurant_id': 1, 'menu_name': 'Masala Chai', 'description': 'Hot spiced tea', 'price': 49, 'is_available': True, 'cuisine_type': 'Indian', 'restaurant_rating': 4.2},
            {'menu_id': 3, 'restaurant_id': 2, 'menu_name': 'Veg Burger', 'description': 'Crispy patty with fresh vegetables', 'price': 169, 'is_available': True, 'cuisine_type': 'Fast Food', 'restaurant_rating': 4.0},
            {'menu_id': 4, 'restaurant_id': 2, 'menu_name': 'French Fries', 'description': 'Crispy salted fries', 'price': 99, 'is_available': True, 'cuisine_type': 'Fast Food', 'restaurant_rating': 4.1},
            {'menu_id': 5, 'restaurant_id': 2, 'menu_name': 'Soft Drink', 'description': 'Chilled beverage', 'price': 69, 'is_available': True, 'cuisine_type': 'Fast Food', 'restaurant_rating': 3.9},
        ])
    rename_map = {
        'menuId': 'menu_id',
        'restaurantId': 'restaurant_id',
        'menuName': 'menu_name',
        'itemDescription': 'description',
        'imagePath': 'image_path',
        'cuisineType': 'cuisine_type',
    }
    menu = menu.rename(columns={key: value for key, value in rename_map.items() if key in menu.columns})
    defaults = {
        'menu_id': 0,
        'restaurant_id': 0,
        'menu_name': '',
        'description': '',
        'price': 0.0,
        'is_available': True,
        'image_path': '',
        'cuisine_type': '',
        'restaurant_rating': 0.0,
    }
    for column, default in defaults.items():
        if column not in menu.columns:
            menu[column] = default
    return menu[list(defaults.keys())].fillna(defaults)


def _records(frame: pd.DataFrame) -> list[dict[str, Any]]:
    return frame.replace({np.nan: None}).to_dict('records')


def _menu_text(menu: pd.DataFrame) -> list[str]:
    return (
        menu['menu_name'].fillna('').astype(str)
        + ' '
        + menu['description'].fillna('').astype(str)
        + ' '
        + menu['cuisine_type'].fillna('').astype(str)
    ).tolist()


def _popularity(order_items: pd.DataFrame, menu: pd.DataFrame) -> dict[str, int]:
    if order_items.empty or 'menu_id' not in order_items.columns:
        return {str(int(row.menu_id)): max(1, len(menu) - idx) for idx, row in enumerate(menu.itertuples())}
    quantity_col = 'quantity' if 'quantity' in order_items.columns else None
    if quantity_col:
        grouped = order_items.groupby('menu_id')[quantity_col].sum()
    else:
        grouped = order_items.groupby('menu_id').size()
    return {str(int(menu_id)): int(value) for menu_id, value in grouped.items()}


def _cooccurrence(order_items: pd.DataFrame) -> dict[str, list[tuple[str, int]]]:
    if order_items.empty or 'order_id' not in order_items.columns or 'menu_id' not in order_items.columns:
        return {'4': [('5', 8), ('3', 3)], '5': [('4', 8), ('3', 4)], '1': [('2', 5)]}
    pairs: dict[str, Counter[str]] = defaultdict(Counter)
    for _, group in order_items.groupby('order_id'):
        ids = sorted({str(int(menu_id)) for menu_id in group['menu_id'].dropna()})
        for left in ids:
            for right in ids:
                if left != right:
                    pairs[left][right] += 1
    return {left: counter.most_common(12) for left, counter in pairs.items()}


def _route_frame(routes: Any) -> pd.DataFrame:
    frame = routes if isinstance(routes, pd.DataFrame) else pd.DataFrame()
    if frame.empty:
        frame = pd.DataFrame({
            'distance': [1.4, 3.0, 6.5, 9.0, 12.5, 4.2],
            'traffic_level': ['Light', 'Moderate', 'Heavy', 'Light', 'Heavy', 'Moderate'],
            'weather': ['Sunny', 'Rainy', 'Rainy', 'Sunny', 'Rainy', 'Sunny'],
            'prep_time': [8, 15, 18, 10, 25, 14],
            'is_high_rise': [0, 0, 1, 0, 1, 0],
            'eta': [17, 29, 48, 36, 70, 31],
        })
    frame = frame.rename(columns={'trafficLevel': 'traffic_level', 'prepTime': 'prep_time', 'isHighRise': 'is_high_rise'})
    for column in ['distance', 'prep_time', 'is_high_rise', 'eta']:
        frame[column] = pd.to_numeric(frame[column], errors='coerce').fillna(0)
    frame['traffic_level'] = frame['traffic_level'].fillna('Moderate').astype(str)
    frame['weather'] = frame['weather'].fillna('Sunny').astype(str)
    return frame


def _demand_training_frame(frames: dict[str, Any]) -> pd.DataFrame:
    orders = _frame(frames, 'orders')
    items = _frame(frames, 'orderitem')
    if orders.empty or items.empty:
        menu = _menu_frame(frames)
        rows = []
        for day in range(7):
            for item in menu.itertuples():
                rows.append({
                    'restaurant_id': int(item.restaurant_id),
                    'menu_id': int(item.menu_id),
                    'day_of_week': day,
                    'hour': 19,
                    'is_weekend': 1 if day >= 5 else 0,
                    'surge_multiplier': 1.0 + (0.2 if day >= 5 else 0),
                    'quantity': max(2, int((item.restaurant_rating or 4) * (2 if day >= 5 else 1.3))),
                })
        return pd.DataFrame(rows)

    orders = orders.rename(columns={'orderId': 'order_id', 'restaurantId': 'restaurant_id'})
    items = items.rename(columns={'orderId': 'order_id', 'menuId': 'menu_id'})
    merged = items.merge(orders, on='order_id', how='left')
    order_time = pd.to_datetime(merged.get('order_time'), errors='coerce')
    merged['day_of_week'] = order_time.dt.dayofweek.fillna(2).astype(int)
    merged['hour'] = order_time.dt.hour.fillna(19).astype(int)
    merged['is_weekend'] = (merged['day_of_week'] >= 5).astype(int)
    if 'surge_multiplier' not in merged.columns:
        merged['surge_multiplier'] = 1.0
    grouped = merged.groupby(['restaurant_id', 'menu_id', 'day_of_week', 'hour', 'is_weekend', 'surge_multiplier'], dropna=False)['quantity'].sum().reset_index()
    return grouped.fillna({'restaurant_id': 0, 'menu_id': 0, 'quantity': 1})


def _fraud_features(frames: dict[str, Any]) -> pd.DataFrame:
    users = _frame(frames, 'users')
    orders = _frame(frames, 'orders')
    reviews = _frame(frames, 'reviews')
    analytics = _frame(frames, 'analytics_events')
    if users.empty:
        users = pd.DataFrame([
            {'user_id': 1, 'created_on': datetime.now(), 'address': 'A', 'latitude': 12.9, 'longitude': 77.6, 'blocked': False},
            {'user_id': 2, 'created_on': datetime.now(), 'address': 'A', 'latitude': 12.9001, 'longitude': 77.6001, 'blocked': False},
            {'user_id': 3, 'created_on': datetime.now(), 'address': 'B', 'latitude': 13.0, 'longitude': 77.7, 'blocked': False},
        ])

    users = users.rename(columns={'userid': 'user_id'})
    now = pd.Timestamp.now(tz='UTC').tz_localize(None)
    created = pd.to_datetime(users.get('created_on'), errors='coerce').dt.tz_localize(None)
    account_age = (now - created.fillna(now)).dt.days.clip(lower=0)
    address_counts = users.get('address', pd.Series([''] * len(users))).fillna('').map(users.get('address', pd.Series()).fillna('').value_counts()).fillna(1)
    coords = (
        users.get('latitude', pd.Series([0] * len(users))).round(3).astype(str)
        + ','
        + users.get('longitude', pd.Series([0] * len(users))).round(3).astype(str)
    )
    coord_counts = coords.map(coords.value_counts()).fillna(1)
    order_counts = orders.groupby('user_id').size() if not orders.empty and 'user_id' in orders.columns else pd.Series(dtype=int)
    review_counts = reviews.groupby('user_id').size() if not reviews.empty and 'user_id' in reviews.columns else pd.Series(dtype=int)
    ip_counts = analytics.groupby('user_id')['ip_address'].nunique() if not analytics.empty and {'user_id', 'ip_address'}.issubset(analytics.columns) else pd.Series(dtype=int)
    ua_counts = analytics.groupby('user_id')['user_agent'].nunique() if not analytics.empty and {'user_id', 'user_agent'}.issubset(analytics.columns) else pd.Series(dtype=int)

    rows = []
    for idx, user in users.reset_index(drop=True).iterrows():
        user_id = int(user.get('user_id', idx + 1))
        event_blob = ''
        if not analytics.empty and 'event_data' in analytics.columns:
            event_blob = ' '.join(analytics.loc[analytics.get('user_id') == user_id, 'event_data'].dropna().astype(str).tolist()).lower()
        rows.append({
            'user_id': user_id,
            'account_age_days': int(account_age.iloc[idx]),
            'order_count': int(order_counts.get(user_id, 0)),
            'review_count': int(review_counts.get(user_id, 0)),
            'shared_address_count': int(address_counts.iloc[idx]),
            'shared_coordinate_count': int(coord_counts.iloc[idx]),
            'ip_user_count': int(ip_counts.get(user_id, 0)),
            'user_agent_count': int(ua_counts.get(user_id, 0)),
            'refund_events': event_blob.count('refund'),
            'coupon_events': event_blob.count('coupon'),
        })
    return pd.DataFrame(rows)


def _nlp_training_rows(frames: dict[str, Any]) -> list[dict[str, str]]:
    rows = [
        {'text': 'where is my order it is late', 'intent': 'track_order', 'category': 'delivery_delay', 'sentiment': 'negative'},
        {'text': 'my food was cold and I need a refund', 'intent': 'refund_request', 'category': 'food_quality', 'sentiment': 'negative'},
        {'text': 'wrong item was delivered', 'intent': 'support_ticket', 'category': 'order_accuracy', 'sentiment': 'negative'},
        {'text': 'how can I apply for rider job', 'intent': 'career_help', 'category': 'application_followup', 'sentiment': 'neutral'},
        {'text': 'the biryani was delicious and hot', 'intent': 'review_praise', 'category': 'positive_review', 'sentiment': 'positive'},
        {'text': 'please add paneer biryani to cart', 'intent': 'add_to_cart', 'category': 'shopping', 'sentiment': 'neutral'},
        {'text': 'search pizza nearby', 'intent': 'search_food', 'category': 'shopping', 'sentiment': 'neutral'},
        {'text': 'checkout and pay now', 'intent': 'checkout', 'category': 'shopping', 'sentiment': 'neutral'},
        {'text': 'support help me with delivery', 'intent': 'support_ticket', 'category': 'support_general', 'sentiment': 'neutral'},
    ]
    reviews = _frame(frames, 'reviews')
    if not reviews.empty and 'review_text' in reviews.columns:
        for _, review in reviews.head(500).iterrows():
            rating = int(review.get('rating') or 3)
            rows.append({
                'text': str(review.get('review_text') or ''),
                'intent': 'review_praise' if rating >= 4 else 'support_ticket',
                'category': 'positive_review' if rating >= 4 else 'food_quality',
                'sentiment': 'positive' if rating >= 4 else 'negative' if rating <= 2 else 'neutral',
            })
    chat = _frame(frames, 'chat_messages')
    if not chat.empty and 'message_text' in chat.columns:
        for message in chat['message_text'].dropna().astype(str).head(500):
            rows.append({'text': message, 'intent': 'support_ticket', 'category': 'support_general', 'sentiment': 'neutral'})
    return rows


def _candidate_records(payload: dict[str, Any], fallback: list[dict[str, Any]]) -> list[dict[str, Any]]:
    candidates = payload.get('candidateItems') or payload.get('items') or payload.get('menuItems')
    if isinstance(candidates, list) and candidates:
        return candidates
    return list(fallback)


def _normalize_menu_record(item: dict[str, Any]) -> dict[str, Any]:
    return {
        'menuId': _optional_int(item.get('menuId') or item.get('menu_id')) or 0,
        'restaurantId': _optional_int(item.get('restaurantId') or item.get('restaurant_id')) or 0,
        'menuName': str(item.get('menuName') or item.get('menu_name') or item.get('name') or ''),
        'description': str(item.get('description') or ''),
        'price': float(item.get('price') or 0),
        'imagePath': str(item.get('imagePath') or item.get('image_path') or ''),
    }


def _limit(payload: dict[str, Any], default: int) -> int:
    try:
        return max(1, min(50, int(payload.get('limit', default))))
    except (TypeError, ValueError):
        return default


def _optional_int(value: Any) -> int | None:
    try:
        if value is None or value == '':
            return None
        return int(value)
    except (TypeError, ValueError):
        return None


def _tokens(text: str) -> list[str]:
    return re.findall(r'[a-z0-9]+', text.lower())


def _lexical_score(query: str, name: str, description: str) -> float:
    if not query:
        return 0.0
    haystack = f'{name} {description}'.lower()
    token_score = sum(1 for token in _tokens(query) if token in haystack) / max(len(_tokens(query)), 1)
    fuzzy = SequenceMatcher(None, query.lower(), name.lower()).ratio()
    return min(1.0, (token_score * 0.7) + (fuzzy * 0.3))


def _combo_rule(cart_items: list[dict[str, Any]]) -> tuple[str | None, float]:
    fries = drinks = 0
    fries_price = drinks_price = 0.0
    for item in cart_items:
        name = str(item.get('name') or item.get('menuName') or '').lower()
        qty = int(item.get('quantity') or 1)
        price = float(item.get('price') or 0)
        if 'fries' in name:
            fries += qty
            fries_price = price
        if any(word in name for word in ['drink', 'coke', 'beverage', 'soda']):
            drinks += qty
            drinks_price = price
    if fries and drinks:
        combo_count = min(fries, drinks)
        savings = (fries_price + drinks_price) * combo_count * 0.25
        if savings > 0:
            return f'Bundle {combo_count} fries and drink pair into a combo to save Rs. {savings:.0f}.', savings
    return None, 0.0


def _payload_user_features(user: dict[str, Any]) -> dict[str, Any]:
    return {
        'user_id': user.get('userId') or user.get('user_id'),
        'account_age_days': int(user.get('accountAgeDays', user.get('account_age_days', 0)) or 0),
        'order_count': int(user.get('orderCount', user.get('order_count', 0)) or 0),
        'review_count': int(user.get('reviewCount', user.get('review_count', 0)) or 0),
        'shared_address_count': int(user.get('sharedAddressCount', user.get('shared_address_count', 1)) or 1),
        'shared_coordinate_count': int(user.get('sharedCoordinateCount', user.get('shared_coordinate_count', 1)) or 1),
        'ip_user_count': int(user.get('ipUserCount', user.get('ip_user_count', 0)) or 0),
        'user_agent_count': int(user.get('userAgentCount', user.get('user_agent_count', 0)) or 0),
        'refund_events': int(user.get('refundEvents', user.get('refund_events', 0)) or 0),
        'coupon_events': int(user.get('couponEvents', user.get('coupon_events', 0)) or 0),
    }


def _fraud_explanations(row: dict[str, Any]) -> list[str]:
    explanations = []
    if row.get('shared_address_count', 0) >= 2:
        explanations.append('shared address across accounts')
    if row.get('shared_coordinate_count', 0) >= 2:
        explanations.append('shared delivery coordinates')
    if row.get('refund_events', 0) > 0:
        explanations.append('refund-heavy activity')
    if row.get('coupon_events', 0) > 2:
        explanations.append('coupon concentration')
    if row.get('account_age_days', 999) < 2:
        explanations.append('new account')
    return explanations or ['within normal baseline']


def _safe_reply(intent: str, category: str, sentiment: str) -> str:
    if intent == 'refund_request' or category in {'food_quality', 'order_accuracy'}:
        return 'I can help triage this. Please keep the order ID ready; support can review refund or replacement options.'
    if intent == 'track_order' or category == 'delivery_delay':
        return 'This looks like a delivery status issue. I have marked it as time-sensitive for support follow-up.'
    if intent == 'career_help':
        return 'I categorized this as an application follow-up so the hiring team can respond with the next step.'
    if sentiment == 'positive':
        return 'Thanks for sharing the positive feedback. I will keep the reply warm and specific.'
    return 'I have categorized the message and prepared the context for a support teammate.'
