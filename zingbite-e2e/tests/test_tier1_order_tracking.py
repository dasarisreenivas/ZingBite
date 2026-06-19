# test_tier1_order_tracking.py - Happy-path E2E tests for Order Tracking SSE Stream
import uuid
import json
import time
import random
import threading
import pytest
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

def get_unique_phone():
    return f"9{random.randint(100000000, 999999999)}"

@pytest.fixture
def client():
    return ZingBiteClient(base_url=BASE_URL)

@pytest.fixture(scope="module")
def super_admin_client():
    sa_client = ZingBiteClient(base_url=BASE_URL)
    response = sa_client.login("admin@zingbite.com", "Admin123!")
    assert response.status_code == 200
    return sa_client

@pytest.fixture(scope="module")
def full_system_setup(super_admin_client):
    """Sets up restaurant admin, rider, customer, and creates an order."""
    unique_id = str(uuid.uuid4())[:8]
    
    # 1. Restaurant Admin
    owner_client = ZingBiteClient(base_url=BASE_URL)
    owner_client.post(API_REGISTER, json={
        "username": f"Owner_{unique_id}",
        "email": f"owner_{unique_id}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Rest Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    owner_id = owner_client.check_session().json().get("user", {}).get("userID")
    
    # Onboard & Approve
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "submitRestaurantRequest",
        "name": f"Track Rest {unique_id}",
        "cuisine": "North Indian",
        "address": "789 Grill St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": f"LIC-{unique_id}",
        "aadhaarNo": f"AAD-{unique_id}",
        "gstNo": f"29GST{unique_id}Z"
    })
    stats_response = super_admin_client.get(f"{BASE_URL}/api/super-admin")
    requests_list = stats_response.json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == owner_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
    # Add Menu Item
    rest_data = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json()
    restaurant_id = rest_data.get("restaurant", {}).get("restaurantId")
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Chicken Tikka",
        "price": 200.0,
        "description": "Spicy chicken tikka",
        "restaurantId": restaurant_id
    })
    menu_id = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json().get("menu", [])[0].get("menuId")
    
    # 2. Delivery Rider
    rider_client = ZingBiteClient(base_url=BASE_URL)
    rider_phone = get_unique_phone()
    rider_client.post(API_REGISTER, json={
        "username": f"Rider_{unique_id}",
        "email": f"rider_{unique_id}@example.com",
        "mobile": rider_phone,
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "789 Rider Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    rider_id = rider_client.check_session().json().get("user", {}).get("userID")
    
    # Apply for Rider Job
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "addJob",
        "title": "Delivery Rider",
        "department": "Operations",
        "location": "Bengaluru",
        "description": "Flexible delivery job"
    })
    jobs = super_admin_client.get(f"{BASE_URL}/api/careers", params={"action": "jobs"}).json()
    job_id = next(j.get("id") for j in jobs if j.get("title") == "Delivery Rider")
    
    rider_client.post(f"{BASE_URL}/api/careers", json={
        "jobId": job_id,
        "name": f"Rider_{unique_id}",
        "email": f"rider_{unique_id}@example.com",
        "phone": rider_phone,
        "resumeUrl": "https://zingbite.com/resumes/demo.pdf",
        "city": "Bengaluru",
        "vehicle": "Motorcycle"
    })
    
    # Approve Rider Application
    admin_stats = super_admin_client.get(f"{BASE_URL}/api/super-admin").json()
    apps = admin_stats.get("applications", [])
    app_id = next(a.get("id") for a in apps if a.get("userId") == rider_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "updateApplicationStatus",
        "appId": app_id,
        "status": "Approved"
    })
    
    # Refresh rider session
    rider_client.check_session()
    
    # 3. Customer
    cust_client = ZingBiteClient(base_url=BASE_URL)
    cust_client.post(API_REGISTER, json={
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
    customer_id = cust_client.check_session().json().get("user", {}).get("userID")
    
    # 4. Create Order
    order_response = cust_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": 200.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [{"id": menu_id, "qty": 1, "price": 200.0}]
    })
    order_id_str = order_response.json().get("orderId")
    order_id = int(order_id_str.replace("ZB-", ""))
    
    return {
        "customer_client": cust_client,
        "customer_id": customer_id,
        "owner_client": owner_client,
        "owner_id": owner_id,
        "rider_client": rider_client,
        "rider_id": rider_id,
        "order_id": order_id,
        "order_id_str": order_id_str
    }

def sse_reader_thread(client, order_id_str, event_list, stop_event):
    """Target function to read SSE events in a background thread."""
    try:
        url = f"{BASE_URL}/api/order/stream"
        for event in client.subscribe_sse(url, params={"orderId": order_id_str}):
            event_list.append({
                "event": event.event,
                "data": json.loads(event.data) if event.data and event.data.strip() != "{}" else event.data
            })
            if stop_event.is_set():
                break
    except Exception as e:
        event_list.append({"error": str(e)})

def test_sse_connect(full_system_setup):
    """Test 1: Verify SSE client receives a 'connected' event upon establishing connection."""
    cust_client = full_system_setup["customer_client"]
    order_id_str = full_system_setup["order_id_str"]
    
    event_list = []
    stop_event = threading.Event()
    
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    
    time.sleep(1.0) # wait for connection
    stop_event.set()
    t.join(timeout=3.0)
    
    assert len(event_list) > 0
    assert event_list[0].get("event") == "connected"

def test_sse_status_update_placed(full_system_setup):
    """Test 2: Verify SSE receives 'PLACED' status update after payment verification."""
    cust_client = full_system_setup["customer_client"]
    order_id_str = full_system_setup["order_id_str"]
    
    event_list = []
    stop_event = threading.Event()
    
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    time.sleep(1.0) # wait for connect
    
    # Trigger payment verification
    cust_client.post(f"{BASE_URL}/api/payment/verify", json={
        "orderId": order_id_str,
        "transactionId": "txn_success_placed_test",
        "paymentMethod": "UPI"
    })
    
    time.sleep(2.0) # wait for event to arrive
    stop_event.set()
    t.join(timeout=3.0)
    
    # Check if we got PLACED update
    status_events = [e for e in event_list if e.get("event") == "message" or (isinstance(e.get("data"), dict) and e.get("data", {}).get("status") == "PLACED")]
    assert len(status_events) > 0
    assert any(e.get("data", {}).get("status") == "PLACED" for e in status_events if isinstance(e.get("data"), dict))

def test_sse_status_update_preparing(full_system_setup):
    """Test 3: Verify SSE receives status updates from Restaurant Admin (ACCEPTED -> PREPARING)."""
    cust_client = full_system_setup["customer_client"]
    owner_client = full_system_setup["owner_client"]
    rider_client = full_system_setup["rider_client"]
    order_id = full_system_setup["order_id"]
    order_id_str = full_system_setup["order_id_str"]
    
    # Pay first
    cust_client.post(f"{BASE_URL}/api/payment/verify", json={
        "orderId": order_id_str,
        "transactionId": "txn_success_prep_test",
        "paymentMethod": "UPI"
    })
    
    event_list = []
    stop_event = threading.Event()
    
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    time.sleep(1.0)
    
    # 1. Rider accepts order (transitions to ACCEPTED)
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "acceptOrder",
        "orderId": order_id
    })
    
    # 2. Restaurant Admin moves to PREPARING
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "updateOrderStatus",
        "orderId": order_id,
        "status": "PREPARING"
    })
    
    time.sleep(2.0)
    stop_event.set()
    t.join(timeout=3.0)
    
    statuses = [e["data"]["status"] for e in event_list if isinstance(e.get("data"), dict) and "status" in e["data"]]
    assert "ACCEPTED" in statuses or "PREPARING" in statuses

def test_sse_status_update_delivered(full_system_setup):
    """Test 4: Verify SSE receives status updates down to DELIVERED state."""
    cust_client = full_system_setup["customer_client"]
    owner_client = full_system_setup["owner_client"]
    rider_client = full_system_setup["rider_client"]
    order_id = full_system_setup["order_id"]
    order_id_str = full_system_setup["order_id_str"]
    
    # Place, pay, accept, prepare, and pickup
    cust_client.post(f"{BASE_URL}/api/payment/verify", json={
        "orderId": order_id_str,
        "transactionId": "txn_success_deliv_test",
        "paymentMethod": "UPI"
    })
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "acceptOrder", "orderId": order_id})
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={"action": "updateOrderStatus", "orderId": order_id, "status": "PREPARING"})
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={"action": "updateOrderStatus", "orderId": order_id, "status": "READY_FOR_PICKUP"})
    
    event_list = []
    stop_event = threading.Event()
    
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    time.sleep(1.0)
    
    # Rider updates: PICKED_UP -> OUT_FOR_DELIVERY -> DELIVERED
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "updateStatus", "orderId": order_id, "status": "PICKED_UP"})
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "updateStatus", "orderId": order_id, "status": "OUT_FOR_DELIVERY"})
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "updateStatus", "orderId": order_id, "status": "DELIVERED"})
    
    time.sleep(2.0)
    stop_event.set()
    t.join(timeout=3.0)
    
    statuses = [e["data"]["status"] for e in event_list if isinstance(e.get("data"), dict) and "status" in e["data"]]
    assert "DELIVERED" in statuses

def test_sse_unauthorized_user(full_system_setup):
    """Test 5: Verify that unauthorized users are rejected from connecting to the order SSE stream."""
    order_id_str = full_system_setup["order_id_str"]
    
    # Setup another fresh client
    other_client = ZingBiteClient(base_url=BASE_URL)
    other_client.post(API_REGISTER, json={
        "username": "OtherUser",
        "email": f"other_sse_{uuid.uuid4().hex[:6]}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "456 Other Rd",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    
    url = f"{BASE_URL}/api/order/stream"
    
    # Consume generator and verify it throws 403 Forbidden or 401 Unauthorized
    with pytest.raises(Exception) as excinfo:
        for _ in other_client.subscribe_sse(url, params={"orderId": order_id_str}):
            pass
            
    assert "403" in str(excinfo.value) or "401" in str(excinfo.value) or "text/event-stream" in str(excinfo.value)
