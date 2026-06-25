import pytest

from app import app


BASE_PAYLOAD = {
    "riderLat": 12.9580,
    "riderLon": 77.5890,
    "restLat": 12.9716,
    "restLon": 77.5946,
    "custALat": 12.9821,
    "custALon": 77.6085,
    "custBLat": 12.9645,
    "custBLon": 77.6142,
    "prepTimeA": 10,
    "prepTimeB": 15,
    "weather": "Rainy",
    "perishableLifo": False,
    "useAStar": True,
}


@pytest.fixture()
def client():
    app.config.update(TESTING=True)
    with app.test_client() as test_client:
        yield test_client


def test_predict_route_contract(client):
    response = client.post("/api/predict-route", json=BASE_PAYLOAD)

    assert response.status_code == 200
    data = response.get_json()
    required_keys = {
        "weather",
        "perishableLifo",
        "useAStar",
        "costMatrix",
        "timeWindows",
        "nodes",
        "edges",
        "sequence",
        "pathFM",
        "pathLM1",
        "pathLM2",
        "logs",
        "surgeZones",
        "predictiveETAs",
    }
    assert required_keys <= data.keys()
    assert sorted(data["sequence"]) == ["Customer A", "Customer B"]
    assert len(data["nodes"]) == 15
    assert data["predictiveETAs"]["Customer A"]["total"] > 0
    assert data["predictiveETAs"]["Customer B"]["total"] > 0


def test_perishable_orders_use_lifo_sequence(client):
    payload = {**BASE_PAYLOAD, "perishableLifo": True}
    response = client.post("/api/predict-route", json=payload)

    assert response.status_code == 200
    assert response.get_json()["sequence"] == ["Customer B", "Customer A"]

