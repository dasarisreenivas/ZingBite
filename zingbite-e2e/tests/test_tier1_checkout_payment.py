# test_tier1_checkout_payment.py - Happy-path tests for Customer Checkout & Payment Verification
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

def test_get_empty_cart(customer_client):
    """Test 1: Verify the shopping cart starts empty."""
    response = customer_client.get(f"{BASE_URL}/api/cart")
    assert response.status_code == 200
    data = response.json()
    assert data.get("itemCount") == 0
    assert len(data.get("items", [])) == 0

def test_add_to_cart(customer_client, store_menu_setup):
    """Test 2: Add an item to the cart and verify totals."""
    menu_id = store_menu_setup["menuId"]
    price = store_menu_setup["price"]
    
    add_payload = {
        "action": "add",
        "itemId": menu_id,
        "quantity": 2
    }
    response = customer_client.post(f"{BASE_URL}/api/cart", json=add_payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("itemCount") == 2
    assert float(data.get("subtotal")) == price * 2

def test_update_cart_quantity(customer_client, store_menu_setup):
    """Test 3: Update item quantity in the cart."""
    menu_id = store_menu_setup["menuId"]
    price = store_menu_setup["price"]
    
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })
    
    update_payload = {
        "action": "updateQuantity",
        "itemId": menu_id,
        "quantity": 3
    }
    response = customer_client.post(f"{BASE_URL}/api/cart", json=update_payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("itemCount") == 3
    assert float(data.get("subtotal")) == price * 3

def test_create_order(customer_client, store_menu_setup):
    """Test 4: Place/checkout an order from the cart."""
    menu_id = store_menu_setup["menuId"]
    price = store_menu_setup["price"]
    restaurant_id = store_menu_setup["restaurantId"]
    
    # Place item in cart
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 2
    })
    
    # Create order payload
    order_payload = {
        "action": "createOrder",
        "total": price * 2,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [
            {
                "id": menu_id,
                "qty": 2,
                "price": price
            }
        ]
    }
    
    response = customer_client.post(f"{BASE_URL}/api/profile", json=order_payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert "orderId" in data
    assert data.get("orderId").startswith("ZB-")

def test_verify_payment(customer_client, store_menu_setup):
    """Test 5: Verify payment for the created order."""
    menu_id = store_menu_setup["menuId"]
    price = store_menu_setup["price"]
    restaurant_id = store_menu_setup["restaurantId"]
    
    customer_client.post(f"{BASE_URL}/api/cart", json={
        "action": "add",
        "itemId": menu_id,
        "quantity": 1
    })
    
    order_response = customer_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": price,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [{"id": menu_id, "qty": 1, "price": price}]
    })
    order_id = order_response.json().get("orderId")
    
    # Verify payment
    verify_payload = {
        "orderId": order_id,
        "transactionId": "txn_success_test_123",
        "paymentMethod": "UPI"
    }
    verify_response = customer_client.post(f"{BASE_URL}/api/payment/verify", json=verify_payload)
    assert verify_response.status_code == 200
    data = verify_response.json()
    assert data.get("success") is True
    assert data.get("status") == "COMPLETED"
