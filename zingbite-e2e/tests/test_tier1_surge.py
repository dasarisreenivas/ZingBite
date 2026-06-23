# test_tier1_surge.py - happy-path tests for Surge Pricing & Weather Dynamics
import uuid
import pytest
import random
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

def get_unique_phone():
    return f"9{random.randint(100000000, 999999999)}"

@pytest.fixture
def client():
    return ZingBiteClient(base_url=BASE_URL)

@pytest.fixture
def customer_client():
    cust_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    cust_client.post(API_REGISTER, json={
        "username": f"Cust_{unique_id}",
        "email": f"cust_{unique_id}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Cust St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    return cust_client

@pytest.fixture
def super_admin_client():
    client = ZingBiteClient(base_url=BASE_URL)
    response = client.login("admin@zingbite.com", "Admin123!")
    assert response.status_code == 200
    return client

@pytest.fixture
def store_menu_setup(client):
    """Sets up a restaurant and adds a menu item."""
    sa_client = ZingBiteClient(base_url=BASE_URL)
    sa_client.login("admin@zingbite.com", "Admin123!")
    
    owner_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    
    owner_client.post(API_REGISTER, json={
        "username": f"Owner_{unique_id}",
        "email": f"owner_{unique_id}@example.com",
        "mobile": get_unique_phone(),
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
        "aadhaarNo": f"AAD-{unique_id}",
        "gstNo": f"29GST{unique_id}Z"
    })
    
    requests_list = sa_client.get(f"{BASE_URL}/api/super-admin").json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    sa_client.post(f"{BASE_URL}/api/super-admin", json={
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
    
    menu_items = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json().get("menu", [])
    burger_item = next(item for item in menu_items if item.get("menuName") == "Chicken Burger")
    menu_id = burger_item.get("menuId")
    
    return {
        "restaurantId": restaurant_id,
        "menuId": menu_id,
        "price": 150.0
    }

def test_default_surge_pricing_sunny(customer_client, store_menu_setup):
    """Test 1: Verify base/sunny weather returns 1.0 surge multiplier and 0.0 surge fee."""
    # Retrieve surge
    resp = customer_client.get(f"{BASE_URL}/api/surge", params={"latitude": 12.9716, "longitude": 77.5946, "mockWeather": "clear", "isTesting": "true"})
    assert resp.status_code == 200
    data = resp.json()
    assert float(data.get("surgeMultiplier")) == 1.0
    
    # Add to cart
    menu_id = store_menu_setup["menuId"]
    customer_client.post(f"{BASE_URL}/api/cart", json={"action": "add", "itemId": menu_id, "quantity": 1})
    
    # Check cart totals
    cart_resp = customer_client.get(f"{BASE_URL}/api/cart")
    cart_data = cart_resp.json()
    assert float(cart_data.get("surgeMultiplier")) == 1.0
    assert float(cart_data.get("surgeFee")) == 0.0

def test_surge_pricing_rainy(customer_client, store_menu_setup):
    """Test 2: Verify rainy weather mock returns 1.25 multiplier and computes surge fee."""
    # Retrieve surge with rainy mock
    resp = customer_client.get(f"{BASE_URL}/api/surge", params={
        "latitude": 12.9716, "longitude": 77.5946, "mockWeather": "moderate_rain", "isTesting": "true"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert float(data.get("surgeMultiplier")) == 1.25
    
    # Add item to cart
    menu_id = store_menu_setup["menuId"]
    customer_client.post(f"{BASE_URL}/api/cart", json={"action": "add", "itemId": menu_id, "quantity": 1})
    
    # Check cart totals
    cart_resp = customer_client.get(f"{BASE_URL}/api/cart")
    cart_data = cart_resp.json()
    assert float(cart_data.get("surgeMultiplier")) == 1.25
    # Shipping = 50 + 50 * (1.25 - 1.0) = 50 + 12.5 = 62.5
    assert float(cart_data.get("surgeFee")) == 12.5

def test_surge_pricing_stormy(customer_client, store_menu_setup):
    """Test 3: Verify stormy weather mock returns 1.5 multiplier and computes surge fee."""
    resp = customer_client.get(f"{BASE_URL}/api/surge", params={
        "latitude": 12.9716, "longitude": 77.5946, "mockWeather": "thunderstorm", "isTesting": "true"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert float(data.get("surgeMultiplier")) == 1.5
    
    # Add item to cart
    menu_id = store_menu_setup["menuId"]
    customer_client.post(f"{BASE_URL}/api/cart", json={"action": "add", "itemId": menu_id, "quantity": 1})
    
    # Check cart totals
    cart_resp = customer_client.get(f"{BASE_URL}/api/cart")
    cart_data = cart_resp.json()
    assert float(cart_data.get("surgeMultiplier")) == 1.5
    assert float(cart_data.get("surgeFee")) == 25.0

def test_weather_delay_on_eta(super_admin_client):
    """Test 4: Verify weather updates reflect correct weatherDelay mins in VRP predictive ETAs."""
    # 1. Update weather to Rainy
    up_resp = super_admin_client.post(f"{BASE_URL}/api/delivery/vrp", json={
        "action": "updateWeather",
        "weather": "Rainy"
    })
    assert up_resp.status_code == 200
    
    # Get VRP details
    vrp_resp = super_admin_client.get(f"{BASE_URL}/api/delivery/vrp")
    assert vrp_resp.status_code == 200
    vrp_data = vrp_resp.json()
    assert vrp_data.get("weather") == "Rainy"
    assert vrp_data.get("predictiveETAs", {}).get("Customer A", {}).get("weatherDelay") == 5
    
    # 2. Update weather to Stormy
    up_resp = super_admin_client.post(f"{BASE_URL}/api/delivery/vrp", json={
        "action": "updateWeather",
        "weather": "Stormy"
    })
    assert up_resp.status_code == 200
    
    # Get VRP details again
    vrp_resp = super_admin_client.get(f"{BASE_URL}/api/delivery/vrp")
    vrp_data = vrp_resp.json()
    assert vrp_data.get("weather") == "Stormy"
    assert vrp_data.get("predictiveETAs", {}).get("Customer A", {}).get("weatherDelay") == 12

def test_surge_pricing_reset(super_admin_client):
    """Test 5: Verify reset returns weather to Sunny and clears all parameters."""
    # Set to Stormy first
    super_admin_client.post(f"{BASE_URL}/api/delivery/vrp", json={
        "action": "updateWeather",
        "weather": "Stormy"
    })
    
    # Reset
    reset_resp = super_admin_client.post(f"{BASE_URL}/api/delivery/vrp", json={"action": "reset"})
    assert reset_resp.status_code == 200
    
    # Verify defaults
    vrp_resp = super_admin_client.get(f"{BASE_URL}/api/delivery/vrp")
    vrp_data = vrp_resp.json()
    assert vrp_data.get("weather") == "Sunny"
    assert vrp_data.get("predictiveETAs", {}).get("Customer A", {}).get("weatherDelay") == 0
