# test_tier1_restaurant_status.py - Tests for Restaurant status handling (open/close, cache, cart/checkout rejection)
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

@pytest.fixture
def customer_user_data():
    unique_id = str(uuid.uuid4())[:8]
    return {
        "username": f"Customer_{unique_id}",
        "email": f"customer_{unique_id}@example.com",
        "mobile": "9876543222",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "Bangalore Main Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    }

def test_restaurant_status_toggle_and_rejection(client, super_admin_client, restaurant_user_data, customer_user_data):
    """Verify toggling restaurant status and backend rejection of cart additions and checkout when closed."""
    # 1. Onboard a new restaurant
    reg_response = client.post(API_REGISTER, json=restaurant_user_data)
    assert reg_response.status_code == 200
    user_id = client.check_session().json().get("user", {}).get("userID")
    
    rest_name = f"Status Bites {uuid.uuid4().hex[:6]}"
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "Fast Food",
        "address": "123 Main St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": "LIC_STATUS_1",
        "aadhaarNo": "112233445566",
        "gstNo": "29CCCCCC1111C1Z1"
    }
    client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    
    # Approve request
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Verify owner becomes restaurant_admin
    session_response = client.check_session()
    assert session_response.json().get("user", {}).get("role") == "restaurant_admin"
    
    # Get restaurant details
    rest_admin_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_admin_data.get("restaurant", {}).get("restaurantId")
    assert restaurant_id is not None
    
    # Add a menu item
    client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Paneer Tikka",
        "price": 240.0,
        "description": "Grilled cottage cheese",
        "restaurantId": restaurant_id
    })
    
    # Retrieve menu items to get menuId
    rest_admin_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    menu_items = rest_admin_data.get("menu", [])
    paneer_tikka = next(item for item in menu_items if item.get("menuName") == "Paneer Tikka")
    menu_id = paneer_tikka.get("menuId")
    
    # Verify restaurant defaults to open (isOpen is true)
    assert rest_admin_data.get("restaurant", {}).get("isOpen") is True
    
    # 2. Toggle restaurant status to CLOSED
    toggle_resp = client.post(f"{BASE_URL}/api/restaurant-admin", json={"action": "toggleRestaurantStatus"})
    assert toggle_resp.status_code == 200
    assert toggle_resp.json().get("isOpen") is False
    
    # 3. Customer tries to add item to cart (should fail with 400 Closed)
    customer_client = ZingBiteClient(base_url=BASE_URL)
    customer_client.post(API_REGISTER, json=customer_user_data)
    
    add_cart_resp = customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })
    assert add_cart_resp.status_code == 400
    assert "closed" in add_cart_resp.json().get("error", "").lower()
    
    # Customer tries clearAndAdd (should also fail)
    clear_add_resp = customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "clearAndAdd",
        "itemId": menu_id,
        "quantity": 1
    })
    assert clear_add_resp.status_code == 400
    assert "closed" in clear_add_resp.json().get("error", "").lower()
    
    # 4. Customer tries to checkout/createOrder directly (should fail with 400 Closed)
    order_payload = {
        "action": "createOrder",
        "total": 240.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [
            {"id": menu_id, "qty": 1, "price": 240.0}
        ]
    }
    create_order_resp = customer_client.post(f"{BASE_URL}/api/profile", json=order_payload)
    assert create_order_resp.status_code == 400
    assert "closed" in create_order_resp.json().get("error", "").lower()
    
    # 5. Toggle restaurant status back to OPEN
    toggle_resp_2 = client.post(f"{BASE_URL}/api/restaurant-admin", json={"action": "toggleRestaurantStatus"})
    assert toggle_resp_2.status_code == 200
    assert toggle_resp_2.json().get("isOpen") is True
    
    # Customer tries adding to cart now (should succeed)
    add_cart_success_resp = customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })
    assert add_cart_success_resp.status_code == 200
    assert add_cart_success_resp.json().get("itemCount") == 1


def test_restaurant_status_concurrency_and_integrity(client, super_admin_client, restaurant_user_data, customer_user_data):
    """Verify concurrency and database integrity when ordering during restaurant status transition."""
    import concurrent.futures
    import time
    
    # 1. Onboard a new restaurant
    reg_response = client.post(API_REGISTER, json=restaurant_user_data)
    assert reg_response.status_code == 200
    user_id = client.check_session().json().get("user", {}).get("userID")
    
    rest_name = f"Concurrency Bites {uuid.uuid4().hex[:6]}"
    rest_payload = {
        "action": "submitRestaurantRequest",
        "name": rest_name,
        "cuisine": "Fast Food",
        "address": "456 Concur St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": f"LIC_CONCUR_{uuid.uuid4().hex[:4]}",
        "aadhaarNo": "112233445577",
        "gstNo": "29CCCCCC1111C1Z2"
    }
    client.post(f"{BASE_URL}/api/restaurant-admin", json=rest_payload)
    
    # Approve request
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == user_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Get restaurant details
    rest_admin_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_admin_data.get("restaurant", {}).get("restaurantId")
    
    # Add a menu item
    client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Paneer Roll",
        "price": 120.0,
        "description": "Tasty roll",
        "restaurantId": restaurant_id
    })
    
    # Retrieve menu items to get menuId
    rest_admin_data = client.get(f"{BASE_URL}/api/restaurant-admin").json()
    menu_items = rest_admin_data.get("menu", [])
    paneer_roll = next(item for item in menu_items if item.get("menuName") == "Paneer Roll")
    menu_id = paneer_roll.get("menuId")
    
    # Verify restaurant is OPEN initially
    assert rest_admin_data.get("restaurant", {}).get("isOpen") is True
    
    # Register customer
    customer_client = ZingBiteClient(base_url=BASE_URL)
    customer_client.post(API_REGISTER, json=customer_user_data)
    
    # Verify starting order histories
    history_before = customer_client.get(f"{BASE_URL}/api/profile?action=orders").json()
    
    # Setup concurrent requests
    # Request 1: Customer creates order
    order_payload = {
        "action": "createOrder",
        "total": 120.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "mockWeather": "clear",
        "items": [
            {"id": menu_id, "qty": 1, "price": 120.0}
        ]
    }
    
    def send_order():
        return customer_client.post(f"{BASE_URL}/api/profile", json=order_payload)
        
    def send_toggle():
        return client.post(f"{BASE_URL}/api/restaurant-admin", json={"action": "toggleRestaurantStatus"})
        
    # Execute concurrently
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        # Submit both tasks
        future_order = executor.submit(send_order)
        future_toggle = executor.submit(send_toggle)
        
        # Wait for both to complete
        order_resp = future_order.result()
        toggle_resp = future_toggle.result()
        
    # Assert toggle completed successfully (closed the restaurant)
    assert toggle_resp.status_code == 200
    assert toggle_resp.json().get("isOpen") is False
    
    # Query database state (orders)
    history_after = customer_client.get(f"{BASE_URL}/api/profile?action=orders").json()
    
    # Evaluate outcomes
    if order_resp.status_code == 200:
        # Case A: Order succeeded because it processed before the closed status was committed.
        print(f"[Concurrency Test] Case A: Order succeeded.")
        assert order_resp.json().get("success") is True
        assert len(history_after) == len(history_before) + 1
        
        # Verify the created order in history matches
        new_order = history_after[0]
        assert any(abs(new_order.get("total") - val) < 1e-2 for val in [120.0, 220.0, 225.0])
    elif order_resp.status_code == 400:
        # Case B: Order was rejected because the restaurant closed first.
        print(f"[Concurrency Test] Case B: Order rejected (restaurant closed).")
        assert "closed" in order_resp.json().get("error", "").lower()
        # CRITICAL Database Integrity verification:
        # Check that NO order history entries were created
        assert len(history_after) == len(history_before), "Order history count changed on rejected order!"
        
        # Verify from restaurant admin portal that no new orders are listed
        rest_admin_data_after = client.get(f"{BASE_URL}/api/restaurant-admin").json()
        orders_list = rest_admin_data_after.get("orders", [])
        # Find if any orders belong to this customer
        cust_profile = customer_client.get(f"{BASE_URL}/api/profile").json()
        cust_name = cust_profile.get("user", {}).get("username")
        matching_orders = [o for o in orders_list if o.get("userName") == cust_name]
        assert len(matching_orders) == 0, "Order was created in restaurant's active list even though request was rejected!"
    else:
        # Unhandled case, e.g., 500 server error - should fail the test
        assert False, f"Unexpected response status: {order_resp.status_code}, content: {order_resp.text}"

