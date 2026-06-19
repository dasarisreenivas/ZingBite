# test_tier1_chat_ui.py - Happy-path E2E tests for Chat UI (WebSocket & REST)
import uuid
import json
import asyncio
import pytest
import websockets
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER, WS_CHAT_ENDPOINT

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
def order_setup(super_admin_client):
    """Sets up a restaurant, customer, and creates an order."""
    unique_id = str(uuid.uuid4())[:8]
    
    # 1. Restaurant Owner
    owner_client = ZingBiteClient(base_url=BASE_URL)
    owner_client.post(API_REGISTER, json={
        "username": f"Owner_{unique_id}",
        "email": f"owner_{unique_id}@example.com",
        "mobile": "9876543214",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Rest Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    owner_id = owner_client.check_session().json().get("user", {}).get("userID")
    
    # Onboarding
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "submitRestaurantRequest",
        "name": f"Chat Rest {unique_id}",
        "cuisine": "Fast Food",
        "address": "789 Grill St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": "LIC-CHAT",
        "aadhaarNo": "111122223333",
        "gstNo": "29GRILL1111A1Z1"
    })
    
    # Approval
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == owner_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Add Menu
    rest_data = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_data.get("restaurant", {}).get("restaurantId")
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Burger",
        "price": 100.0,
        "description": "Tasty burger",
        "restaurantId": restaurant_id
    })
    menu_id = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json().get("menu", [])[0].get("menuId")
    
    # 2. Customer
    cust_client = ZingBiteClient(base_url=BASE_URL)
    cust_client.post(API_REGISTER, json={
        "username": f"Cust_{unique_id}",
        "email": f"cust_{unique_id}@example.com",
        "mobile": "9876543215",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Cust St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    customer_user = cust_client.check_session().json().get("user", {})
    customer_id = customer_user.get("userID")
    
    # 3. Create Order
    order_response = cust_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": 100.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [{"id": menu_id, "qty": 1, "price": 100.0}]
    })
    order_id_str = order_response.json().get("orderId")
    order_id = int(order_id_str.replace("ZB-", ""))
    
    return {
        "customer_client": cust_client,
        "customer_id": customer_id,
        "order_id": order_id,
        "order_id_str": order_id_str
    }

def test_empty_chat_history(order_setup):
    """Test 1: Verify chat history is initially empty."""
    cust_client = order_setup["customer_client"]
    order_id_str = order_setup["order_id_str"]
    
    response = cust_client.get(f"{BASE_URL}/api/chat", params={"orderId": order_id_str})
    assert response.status_code == 200
    assert len(response.json()) == 0

def test_websocket_unauthorized_missing_session(order_setup):
    """Test 2: Verify WebSocket connection fails without active HTTP session cookies."""
    order_id = order_setup["order_id"]
    customer_id = order_setup["customer_id"]
    
    # Establish WS connection with a client that has no session
    anon_client = ZingBiteClient(base_url=BASE_URL)
    ws_url = f"{WS_CHAT_ENDPOINT}/order/{order_id}/{customer_id}"
    
    async def try_connect():
        try:
            async with anon_client.connect_websocket(ws_url) as ws:
                await ws.recv()
            return False
        except Exception:
            return True
            
    assert asyncio.run(try_connect()) is True

def test_websocket_unauthorized_user_mismatch(order_setup):
    """Test 3: Verify WebSocket connection gets rejected if user ID in path does not match session."""
    cust_client = order_setup["customer_client"]
    order_id = order_setup["order_id"]
    wrong_user_id = order_setup["customer_id"] + 9999
    
    ws_url = f"{WS_CHAT_ENDPOINT}/order/{order_id}/{wrong_user_id}"
    
    async def try_connect():
        try:
            async with cust_client.connect_websocket(ws_url) as ws:
                await ws.recv()
            return False
        except Exception:
            return True
            
    assert asyncio.run(try_connect()) is True

def test_websocket_message_exchange(order_setup):
    """Test 4: Verify message exchange over WebSocket."""
    cust_client = order_setup["customer_client"]
    order_id = order_setup["order_id"]
    customer_id = order_setup["customer_id"]
    
    ws_url = f"{WS_CHAT_ENDPOINT}/order/{order_id}/{customer_id}"
    
    async def run_ws():
        async with cust_client.connect_websocket(ws_url) as ws:
            # Send message
            msg = {
                "messageText": "Hello support team!",
                "receiverId": 0
            }
            await ws.send(json.dumps(msg))
            
            # Read broadcast response
            response = await asyncio.wait_for(ws.recv(), timeout=5.0)
            data = json.loads(response)
            return data
            
    data = asyncio.run(run_ws())
    assert data.get("senderId") == customer_id
    assert data.get("messageText") == "Hello support team!"
    assert data.get("orderId") == order_id

def test_chat_history_rest_verification(order_setup):
    """Test 5: Verify websocket messages are persisted in chat history REST API."""
    cust_client = order_setup["customer_client"]
    order_id = order_setup["order_id"]
    customer_id = order_setup["customer_id"]
    order_id_str = order_setup["order_id_str"]
    
    # 1. Send message via WS
    ws_url = f"{WS_CHAT_ENDPOINT}/order/{order_id}/{customer_id}"
    async def send_msg():
        async with cust_client.connect_websocket(ws_url) as ws:
            await ws.send(json.dumps({
                "messageText": "REST history check",
                "receiverId": 0
            }))
            # Wait for echo to ensure persistence finishes
            await asyncio.wait_for(ws.recv(), timeout=3.0)
            
    asyncio.run(send_msg())
    
    # 2. Check REST API
    response = cust_client.get(f"{BASE_URL}/api/chat", params={"orderId": order_id_str})
    assert response.status_code == 200
    history = response.json()
    assert len(history) > 0
    assert any(m.get("messageText") == "REST history check" for m in history)
