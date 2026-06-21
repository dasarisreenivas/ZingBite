# test_milestone_g_surge_pricing.py - E2E tests for Smart Surge Pricing & Weather Integration
import uuid
import pytest
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

@pytest.fixture
def client():
    return ZingBiteClient(base_url=BASE_URL)

@pytest.fixture
def super_admin_client():
    sa_client = ZingBiteClient(base_url=BASE_URL)
    response = sa_client.login("admin@zingbite.com", "Admin123!")
    assert response.status_code == 200
    return sa_client

@pytest.fixture
def store_menu_setup(super_admin_client):
    owner_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    
    owner_client.post(API_REGISTER, json={
        "username": f"Owner_{unique_id}",
        "email": f"owner_{unique_id}@example.com",
        "mobile": "9876543212",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Main Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    user_id = owner_client.check_session().json().get("user", {}).get("userID")
    
    rest_name = f"Tasty Grill {unique_id}"
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "Fast Food",
        "address": "789 Grill St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": f"LIC-{unique_id}",
        "aadhaarNo": "111122223333",
        "gstNo": "29GRILL1111A1Z1"
    })
    
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    rest_data = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_data.get("restaurant", {}).get("restaurantId")
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Chicken Burger",
        "price": 150.0,
        "description": "Juicy chicken burger",
        "restaurantId": restaurant_id
    })
    
    rest_data = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json()
    menu_items = rest_data.get("menu", [])
    burger_item = next(item for item in menu_items if item.get("menuName") == "Chicken Burger")
    menu_id = burger_item.get("menuId")
    
    return {
        "restaurantId": restaurant_id,
        "menuId": menu_id,
        "price": 150.0
    }

@pytest.fixture
def customer_client():
    cust_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    cust_client.post(API_REGISTER, json={
        "username": f"Cust_{unique_id}",
        "email": f"cust_{unique_id}@example.com",
        "mobile": "9876543213",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Cust St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    return cust_client

def test_api_surge_endpoints(customer_client):
    # Test 1: normal surge pricing details
    response = customer_client.get(f"{BASE_URL}/api/surge?latitude=12.9716&longitude=77.5946")
    assert response.status_code == 200
    data = response.json()
    assert "multiplier" in data or "surgeMultiplier" in data
    assert "reason" in data or "surgeReason" in data

    # Test 2: mockWeather = thunderstorm (1.5x)
    response = customer_client.get(f"{BASE_URL}/api/surge?latitude=12.9716&longitude=77.5946&mockWeather=thunderstorm")
    assert response.status_code == 200
    data = response.json()
    mult = data.get("multiplier", data.get("surgeMultiplier", 1.0))
    assert mult >= 1.5

    # Test 3: coordinates ending in .999 (1.5x thunderstorm)
    response = customer_client.get(f"{BASE_URL}/api/surge?latitude=12.999&longitude=77.999")
    assert response.status_code == 200
    data = response.json()
    mult = data.get("multiplier", data.get("surgeMultiplier", 1.0))
    assert mult >= 1.5

def test_cart_surge_fee(customer_client, store_menu_setup):
    menu_id = store_menu_setup["menuId"]
    
    # Add item to cart
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })

    # Call api/surge with thunderstorm mock so session gets updated
    customer_client.get(f"{BASE_URL}/api/surge?latitude=12.999&longitude=77.999")

    # Get cart and verify surge fee & multiplier are present
    response = customer_client.get(f"{BASE_URL}/api/cart")
    assert response.status_code == 200
    data = response.json()
    assert "surgeMultiplier" in data
    assert "surgeFee" in data
    assert float(data.get("surgeMultiplier")) >= 1.5
    # base shipping is 50.0. Surge fee = 50.0 * (1.5 - 1.0) = 25.0
    assert float(data.get("surgeFee")) >= 25.0

def test_create_order_with_surge(customer_client, store_menu_setup):
    menu_id = store_menu_setup["menuId"]
    price = store_menu_setup["price"]
    restaurant_id = store_menu_setup["restaurantId"]
    
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })

    # Place order with coordinates ending in .999 to force thunderstorm surge (1.5x)
    order_payload = {
        "action": "createOrder",
        "total": price + 50.0 + 50.0 + 25.0, # subtotal(150) + base_shipping(50) + tax(50) + surge(25) = 275
        "paymentMethod": "COD",
        "restaurantId": restaurant_id,
        "items": [
            {
                "id": menu_id,
                "qty": 1,
                "price": price
            }
        ],
        "latitude": 12.999,
        "longitude": 77.999
    }
    
    response = customer_client.post(f"{BASE_URL}/api/profile", json=order_payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert "orderId" in data
