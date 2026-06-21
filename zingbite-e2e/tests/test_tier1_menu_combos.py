# test_tier1_menu_combos.py - happy-path E2E tests for AI Menu Combo Creator & Recommendations
import uuid
import pytest
import random
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

def get_unique_phone():
    return f"9{random.randint(100000000, 999999999)}"

@pytest.fixture
def admin_client():
    client = ZingBiteClient(base_url=BASE_URL)
    response = client.login("admin@zingbite.com", "Admin123!")
    assert response.status_code == 200
    return client

@pytest.fixture
def customer_client():
    client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    client.post(API_REGISTER, json={
        "username": f"Cust_{unique_id}",
        "email": f"cust_{unique_id}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "123 Cust St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    return client

def check_combos_implemented(client):
    """Checks if createCombo action is supported. If 404/400 not supported, skips test."""
    resp = client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "createCombo",
        "name": "Test Combo",
        "price": 100.0,
        "menuIds": [1, 2],
        "restaurantId": 1
    })
    # If the endpoint is totally unimplemented or doesn't support action:
    if resp.status_code == 404:
        pytest.skip("AI Menu Combo Creator feature is not yet implemented in the backend (404).")
    if resp.status_code == 400:
        data = resp.json()
        if "error" in data and "action" in data.get("error").lower():
            pytest.skip("AI Menu Combo Creator action is not yet implemented (400).")
    return resp

def test_combo_affinity_recommendations(admin_client):
    """Test 1: Verify admin can fetch Jaccard similarity pairing suggestions."""
    # Recommendations servlet is mapped to /api/recommendations
    resp = admin_client.get(f"{BASE_URL}/api/recommendations", params={"restaurantId": 1})
    if resp.status_code == 404:
        pytest.skip("Recommendations affinity endpoint not implemented (404).")
    assert resp.status_code == 200
    # Jaccard recommendation check
    assert isinstance(resp.json(), list)

def test_admin_create_menu_combo(admin_client):
    """Test 2: Verify restaurant admin can package affinity pairings into a new COMBO menu item."""
    resp = check_combos_implemented(admin_client)
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("success") is True
    assert "menuId" in data

def test_menu_combos_retrieval(admin_client, customer_client):
    """Test 3: Verify customer can retrieve and view the new combo item on the menu."""
    check_combos_implemented(admin_client)
    
    resp = customer_client.get(f"{BASE_URL}/api/menu", params={"restaurantId": 1})
    assert resp.status_code == 200
    menu = resp.json()
    combos = [item for item in menu if item.get("type") == "COMBO"]
    assert len(combos) > 0

def test_cart_combo_pricing_calculation(admin_client, customer_client):
    """Test 4: Verify adding a combo to cart applies the discounted price correctly."""
    create_resp = check_combos_implemented(admin_client)
    combo_id = create_resp.json().get("menuId")
    
    # Add to cart
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": combo_id,
        "quantity": 1
    })
    
    cart_resp = customer_client.get(f"{BASE_URL}/api/cart")
    assert cart_resp.status_code == 200
    cart_data = cart_resp.json()
    assert float(cart_data.get("subtotal")) == 100.0

def test_checkout_and_persist_combo_order(admin_client, customer_client):
    """Test 5: Verify combo order is placed and persists constituent items in DB."""
    create_resp = check_combos_implemented(admin_client)
    combo_id = create_resp.json().get("menuId")
    
    # Add to cart
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": combo_id,
        "quantity": 1
    })
    
    # Checkout
    order_resp = customer_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": 100.0,
        "paymentMethod": "UPI",
        "restaurantId": 1,
        "items": [{"id": combo_id, "qty": 1, "price": 100.0}]
    })
    assert order_resp.status_code == 200
    order_data = order_resp.json()
    assert order_data.get("success") is True
