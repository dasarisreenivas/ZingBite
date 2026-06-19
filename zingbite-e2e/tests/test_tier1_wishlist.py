# test_tier1_wishlist.py - Happy-path tests for Customer Wishlist / Favorites System
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
    """Fixture that sets up a restaurant, adds a menu item, and returns IDs."""
    owner_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    
    # 1. Register restaurant owner
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
    
    # 2. Submit onboarding request
    rest_name = f"Tasty Grill {unique_id}"
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "Fast Food",
        "address": "789 Grill St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": "LIC-GRILL",
        "aadhaarNo": "111122223333",
        "gstNo": "29GRILL1111A1Z1"
    })
    
    # 3. Super admin approves request
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # 4. Add menu item
    rest_data = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_data.get("restaurant", {}).get("restaurantId")
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Chicken Burger",
        "price": 150.0,
        "description": "Juicy chicken burger",
        "restaurantId": restaurant_id
    })
    
    # 5. Get menu item ID
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

def test_wishlist_unauthorized(client):
    """Verify wishlist operations fail for unauthenticated sessions."""
    # GET wishlist should return 401
    get_res = client.get(f"{BASE_URL}/api/wishlist")
    assert get_res.status_code == 401
    assert "error" in get_res.json()

    # POST toggle should return 401 or 403 (CSRF blocked)
    post_res = client.post(f"{BASE_URL}/api/wishlist", json={"foodItemId": 1})
    assert post_res.status_code in (401, 403)
    if post_res.status_code == 401:
        assert "error" in post_res.json()

def test_wishlist_lifecycle(customer_client, store_menu_setup):
    """Verify add/remove toggle and fetch wishlist functionality."""
    menu_id = store_menu_setup["menuId"]

    # 1. Verify initially empty
    get_res = customer_client.get(f"{BASE_URL}/api/wishlist")
    assert get_res.status_code == 200
    assert len(get_res.json()) == 0

    # 2. Add item to wishlist (should return status: added)
    add_res = customer_client.post(f"{BASE_URL}/api/wishlist", json={"foodItemId": menu_id})
    assert add_res.status_code == 200
    assert add_res.json().get("status") == "added"

    # 3. Verify item is in wishlist
    get_res = customer_client.get(f"{BASE_URL}/api/wishlist")
    assert get_res.status_code == 200
    wishlist = get_res.json()
    assert len(wishlist) == 1
    assert wishlist[0].get("menuId") == menu_id
    assert wishlist[0].get("menuName") == "Chicken Burger"

    # 4. Remove item from wishlist (toggle again, should return status: removed)
    remove_res = customer_client.post(f"{BASE_URL}/api/wishlist", json={"foodItemId": menu_id})
    assert remove_res.status_code == 200
    assert remove_res.json().get("status") == "removed"

    # 5. Verify wishlist is empty again
    get_res = customer_client.get(f"{BASE_URL}/api/wishlist")
    assert get_res.status_code == 200
    assert len(get_res.json()) == 0
