from __future__ import annotations

import pandas as pd

from ml_platform.config import MlConfig
from ml_platform.data import DataRepository
from ml_platform.models import MODEL_NAMES, MlPredictor, MlTrainer


def test_route_samples_fallback_has_eta_features(tmp_path):
    config = MlConfig(
        root_dir=tmp_path,
        models_dir=tmp_path / 'models',
        imports_dir=tmp_path / 'imports',
        route_csv=tmp_path / 'missing.csv',
        db_url=None,
    )

    frame = DataRepository(config).load_route_samples()

    assert {'distance', 'traffic_level', 'weather', 'prep_time', 'is_high_rise', 'eta'}.issubset(frame.columns)
    assert len(frame) >= 3


def test_train_all_saves_manifest_and_artifacts(tmp_path):
    config = MlConfig(
        root_dir=tmp_path,
        models_dir=tmp_path / 'models',
        imports_dir=tmp_path / 'imports',
        route_csv=tmp_path / 'missing.csv',
        db_url=None,
    )

    result = MlTrainer(config).train_all()
    manifest = (tmp_path / 'models' / 'model_manifest.json').read_text(encoding='utf-8')

    assert set(result.keys()) == set(MODEL_NAMES)
    assert 'recommender' in manifest
    assert (tmp_path / 'models' / 'eta').exists()


def test_predictor_returns_core_model_outputs(tmp_path):
    config = MlConfig(
        root_dir=tmp_path,
        models_dir=tmp_path / 'models',
        imports_dir=tmp_path / 'imports',
        route_csv=tmp_path / 'missing.csv',
        db_url=None,
    )
    trainer = MlTrainer(config)
    trainer.train_all()
    predictor = MlPredictor(config)

    eta = predictor.predict('eta', {'distance': 4, 'trafficLevel': 'Heavy', 'weather': 'Rainy', 'prepTime': 18})
    nlp = predictor.predict('nlp', {'text': 'my order is late and cold'})
    cart = predictor.predict('cart_optimizer', {'cartItems': [{'name': 'French Fries', 'price': 99, 'quantity': 1}, {'name': 'Soft Drink', 'price': 69, 'quantity': 1}]})

    assert eta['etaMinutes'] > 0
    assert nlp['intent']
    assert cart['optimizationAvailable'] is True


def test_flask_predict_endpoint(tmp_path):
    config = MlConfig(
        root_dir=tmp_path,
        models_dir=tmp_path / 'models',
        imports_dir=tmp_path / 'imports',
        route_csv=tmp_path / 'missing.csv',
        db_url=None,
    )
    MlTrainer(config).train('search_rank')

    from ml_platform.service import create_app

    client = create_app(config).test_client()
    response = client.post('/predict/search_rank', json={'query': 'biryani'})

    assert response.status_code == 200
    assert response.get_json()['items']
