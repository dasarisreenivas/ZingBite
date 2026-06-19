# test_tier1_restaurant_admin.py - Happy-path tests for Restaurant Admin View
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
    assert response.status_code == 200, "Super admin login failed"
    return sa_client

@pytest.fixture
def restaurant_user_data():
    unique_id = str(uuid.uuid4())[:8]
    return {
        "username": f"RestOwner_{unique_id}",
        "email": f"rest_owner_{unique_id}@example.com",
        "mobile": "9876543211",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "Bangalore Main Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    }

def test_submit_restaurant_request(client, restaurant_user_data):
    """Test 1: Submit a restaurant onboarding request as a customer."""
    # Register customer
    reg_response = client.post(API_REGISTER, json=restaurant_user_data)
    assert reg_response.status_code == 200
    
    # Submit request
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": f"Gourmet Heaven {uuid.uuid4().hex[:6]}",
        "cuisine": "Continental",
        "address": "123 Food Street, Bengaluru",
        "deliveryTime": "30 mins",
        "licenseNo": "LIC987654",
        "aadhaarNo": "999988887777",
        "gstNo": "29AAAAA1111A1Z1"
    }
    
    response = client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    assert response.status_code == 200
    assert response.json().get("success") is True

def test_duplicate_pending_request_conflict(client, restaurant_user_data):
    """Test 2: Submitting a request when one is already pending returns conflict (409)."""
    client.post(API_REGISTER, json=restaurant_user_data)
    
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": "Rest 1",
        "cuisine": "Fast Food",
        "address": "Address 1",
        "licenseNo": "LIC001",
        "aadhaarNo": "111122223333",
        "gstNo": "GST001"
    }
    
    response1 = client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    assert response1.status_code == 200
    
    # Try again
    response2 = client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    assert response2.status_code == 409
    assert "error" in response2.json()

def test_approve_restaurant_request(client, super_admin_client, restaurant_user_data):
    """Test 3: Super Admin reviews and approves the restaurant onboarding request."""
    # Register customer
    reg_response = client.post(API_REGISTER, json=restaurant_user_data)
    assert reg_response.status_code == 200
    user_id = client.check_session().json().get("user", {}).get("userID")
    assert user_id is not None
    
    # Submit request
    rest_name = f"Tasty Bites {uuid.uuid4().hex[:6]}"
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "North Indian",
        "address": "456 Food Street, Bengaluru",
        "deliveryTime": "20 mins",
        "licenseNo": "LIC12345",
        "aadhaarNo": "888877776666",
        "gstNo": "29BBBBB2222B2Z2"
    }
    client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    
    # Super admin lists requests to find our request ID
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    assert stats_response.status_code == 200
    requests_list = stats_response.json().get("restaurantRequests", [])
    
    our_request = None
    for req in requests_list:
        if req.get("adminId") == user_id and req.get("status") == "Pending":
            our_request = req
            break
            
    assert our_request is not None, "Pending restaurant request not found in admin list"
    request_id = our_request.get("id")
    
    # Super admin approves
    approve_payload = {
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    }
    approve_response = super_admin_client.post(f"{BASE_URL}/api/super-admin", json=approve_payload)
    assert approve_response.status_code == 200
    assert approve_response.json().get("success") is True
    
    # Verify that the user's role is updated to restaurant_admin
    session_response = client.check_session()
    assert session_response.status_code == 200
    assert session_response.json().get("user", {}).get("role") == "restaurant_admin"

def test_add_menu_item(client, super_admin_client, restaurant_user_data):
    """Test 4: Restaurant Admin successfully adds a menu item to their approved restaurant."""
    client.post(API_REGISTER, json=restaurant_user_data)
    user_id = client.check_session().json().get("user", {}).get("userID")
    
    # Submit request
    rest_name = f"Indian Delights {uuid.uuid4().hex[:6]}"
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "North Indian",
        "address": "456 Food Street, Bengaluru",
        "deliveryTime": "20 mins",
        "licenseNo": "LIC12345",
        "aadhaarNo": "888877776666",
        "gstNo": "29BBBBB2222B2Z2"
    }
    client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    
    # Super admin approves
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Fetch restaurant ID from restaurant admin GET endpoint
    rest_data_resp = client.get(f"{BASE_URL}/api/restaurant-admin")
    assert rest_data_resp.status_code == 200
    restaurant_id = rest_data_resp.json().get("restaurant", {}).get("restaurantId")
    assert restaurant_id is not None
    
    # Add Menu Item
    menu_payload = {
        "action": "addMenuItem",
        "name": "Butter Chicken",
        "price": 320.0,
        "description": "Rich creamy chicken dish",
        "restaurantId": restaurant_id
    }
    menu_response = client.post(f"{BASE_URL}/api/restaurant-admin", json=menu_payload)
    assert menu_response.status_code == 200
    assert menu_response.json().get("success") is True

def test_toggle_menu_item_availability(client, super_admin_client, restaurant_user_data):
    """Test 5: Restaurant Admin toggles menu item availability."""
    client.post(API_REGISTER, json=restaurant_user_data)
    user_id = client.check_session().json().get("user", {}).get("userID")
    
    # Submit request & approve
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": f"Healthy Eats {uuid.uuid4().hex[:6]}",
        "cuisine": "Salads",
        "address": "789 Green Rd, Bengaluru",
        "licenseNo": "LIC12345",
        "aadhaarNo": "888877776666",
        "gstNo": "29BBBBB2222B2Z2"
    }
    client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    request_id = next(req.get("id") for req in stats_response.json().get("restaurantRequests", []) if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Add menu item
    rest_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_data.get("restaurant", {}).get("restaurantId")
    client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Greek Salad",
        "price": 180.0,
        "description": "Fresh olives, feta, and lettuce",
        "restaurantId": restaurant_id
    })
    
    # Retrieve menu items to get menuId
    rest_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    menu_items = rest_data.get("menu", [])
    greek_salad = next(item for item in menu_items if item.get("menuName") == "Greek Salad")
    menu_id = greek_salad.get("menuId")
    
    # Toggle to unavailable
    toggle_resp = client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "toggleAvailability",
        "menuId": menu_id,
        "isAvailable": False
    })
    assert toggle_resp.status_code == 200
    assert toggle_resp.json().get("success") is True
    
    # Verify via get
    rest_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    greek_salad_updated = next(item for item in rest_data.get("menu", []) if item.get("menuId") == menu_id)
    assert greek_salad_updated.get("isAvailable") is False
