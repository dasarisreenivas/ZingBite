# test_tier1_rider_gps.py - E2E tests for Rider GPS simulation sequence and Order Tracking SSE
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

@pytest.fixture(scope="module")
def super_admin_client():
    sa_client = ZingBiteClient(base_url=BASE_URL)
    response = sa_client.login("admin@zingbite.com", "Admin123!")
    assert response.status_code == 200
    return sa_client

@pytest.fixture
def rider_setup(super_admin_client):
    """Fixture that registers and approves a delivery rider."""
    rider_client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    rider_phone = get_unique_phone()
    
    # Register rider
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
    
    # Check if job exists, else create it
    jobs = super_admin_client.get(f"{BASE_URL}/api/careers", params={"action": "jobs"}).json()
    job_id = None
    for j in jobs:
        if j.get("title") == "Delivery Rider":
            job_id = j.get("id")
            break
            
    if not job_id:
        super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
            "action": "addJob",
            "title": "Delivery Rider",
            "department": "Operations",
            "location": "Bengaluru",
            "description": "Flexible delivery job"
        })
        jobs = super_admin_client.get(f"{BASE_URL}/api/careers", params={"action": "jobs"}).json()
        job_id = next(j.get("id") for j in jobs if j.get("title") == "Delivery Rider")
    
    # Apply
    rider_client.post(f"{BASE_URL}/api/careers", json={
        "jobId": job_id,
        "name": f"Rider_{unique_id}",
        "email": f"rider_{unique_id}@example.com",
        "phone": rider_phone,
        "resumeUrl": "https://zingbite.com/resumes/demo.pdf",
        "city": "Bengaluru",
        "vehicle": "Motorcycle"
    })
    
    # Approve
    admin_stats = super_admin_client.get(f"{BASE_URL}/api/super-admin").json()
    apps = admin_stats.get("applications", [])
    app_id = next(a.get("id") for a in apps if a.get("userId") == rider_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "updateApplicationStatus",
        "appId": app_id,
        "status": "Approved"
    })
    
    rider_client.check_session()
    return {
        "client": rider_client,
        "id": rider_id
    }

@pytest.fixture
def system_order_setup(super_admin_client, rider_setup):
    """Sets up a restaurant, menu item, customer, and creates/pays an order."""
    unique_id = str(uuid.uuid4())[:8]
    
    # 1. Restaurant
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
    
    requests_list = super_admin_client.get(f"{BASE_URL}/api/super-admin").json().get("restaurantRequests", [])
    request_id = next(req.get("id") for req in requests_list if req.get("adminId") == owner_id)
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "reviewRestaurant",
        "requestId": request_id,
        "status": "Approved"
    })
    
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
    
    # 2. Customer
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
    
    # Place Order
    order_response = cust_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": 200.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [{"id": menu_id, "qty": 1, "price": 200.0}]
    })
    order_id_str = order_response.json().get("orderId")
    order_id = int(order_id_str.replace("ZB-", ""))
    
    # Pay Order
    cust_client.post(f"{BASE_URL}/api/payment/verify", json={
        "orderId": order_id_str,
        "transactionId": "txn_success_placed_test_" + unique_id,
        "paymentMethod": "UPI"
    })
    
    return {
        "customer_client": cust_client,
        "customer_id": customer_id,
        "owner_client": owner_client,
        "rider_client": rider_setup["client"],
        "rider_id": rider_setup["id"],
        "order_id": order_id,
        "order_id_str": order_id_str
    }

def sse_reader_thread(client, order_id_str, event_list, stop_event):
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

def transition_to_out_for_delivery(rider_client, order_id):
    """Helper to step-by-step transition order status to OUT_FOR_DELIVERY."""
    # 1. Accept Order (transitions to ACCEPTED)
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "acceptOrder",
        "orderId": order_id
    })
    
    # 2. Transition to PREPARING
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateStatus",
        "status": "PREPARING",
        "orderId": order_id
    })
    
    # 3. Transition to READY_FOR_PICKUP
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateStatus",
        "status": "READY_FOR_PICKUP",
        "orderId": order_id
    })
    
    # 4. Transition to PICKED_UP
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateStatus",
        "status": "PICKED_UP",
        "orderId": order_id
    })
    
    # 5. Transition to OUT_FOR_DELIVERY
    return rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateStatus",
        "status": "OUT_FOR_DELIVERY",
        "orderId": order_id
    })

def test_sse_tracking_stream_initialization(system_order_setup):
    """Test 1: Verify SSE client connection initialization event."""
    cust_client = system_order_setup["customer_client"]
    order_id_str = system_order_setup["order_id_str"]
    
    event_list = []
    stop_event = threading.Event()
    
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    
    time.sleep(1.0)
    stop_event.set()
    t.join(timeout=3.0)
    
    assert len(event_list) > 0
    assert event_list[0].get("event") == "connected"

def test_rider_telemetry_coordinate_ingestion(system_order_setup):
    """Test 2: Verify active rider can update location coordinates successfully."""
    rider_client = system_order_setup["rider_client"]
    order_id = system_order_setup["order_id"]
    order_id_str = system_order_setup["order_id_str"]
    
    # Step-by-step transition order status to OUT_FOR_DELIVERY
    stat_resp = transition_to_out_for_delivery(rider_client, order_id)
    assert stat_resp.status_code == 200
    
    # Rider updates location coordinates
    loc_payload = {
        "orderId": order_id_str,
        "latitude": 12.9800,
        "longitude": 77.6000,
        "bearing": 90.0,
        "status": "OUT_FOR_DELIVERY",
        "gpsProgress": 25.0,
        "etaMinutes": 10.0
    }
    
    loc_resp = rider_client.post(f"{BASE_URL}/api/delivery/location", json=loc_payload)
    assert loc_resp.status_code == 200
    assert loc_resp.json().get("success") is True

def test_live_coordinate_propagation_to_sse(system_order_setup):
    """Test 3: Verify coordinate telemetry propagates to customer's SSE stream in real-time."""
    cust_client = system_order_setup["customer_client"]
    rider_client = system_order_setup["rider_client"]
    order_id = system_order_setup["order_id"]
    order_id_str = system_order_setup["order_id_str"]
    
    # Transition to OUT_FOR_DELIVERY
    transition_to_out_for_delivery(rider_client, order_id)
    
    event_list = []
    stop_event = threading.Event()
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    time.sleep(1.0) # Wait for stream initialization
    
    # Post coordinate update
    loc_payload = {
        "orderId": order_id_str,
        "latitude": 12.9850,
        "longitude": 77.6050,
        "bearing": 45.0,
        "status": "OUT_FOR_DELIVERY",
        "gpsProgress": 50.0,
        "etaMinutes": 5.0
    }
    rider_client.post(f"{BASE_URL}/api/delivery/location", json=loc_payload)
    
    time.sleep(2.0)
    stop_event.set()
    t.join(timeout=3.0)
    
    # Look for location_update event
    loc_events = [e for e in event_list if isinstance(e.get("data"), dict) and e.get("data", {}).get("event") == "location_update"]
    assert len(loc_events) > 0
    assert loc_events[-1].get("data", {}).get("gpsProgress") == 50.0
    assert loc_events[-1].get("data", {}).get("riderLat") == 12.9850

def test_map_path_fallback(system_order_setup):
    """Test 4: Verify the initial SSE data payload contains precomputed VRP path arrays."""
    cust_client = system_order_setup["customer_client"]
    order_id_str = system_order_setup["order_id_str"]
    
    event_list = []
    stop_event = threading.Event()
    t = threading.Thread(target=sse_reader_thread, args=(cust_client, order_id_str, event_list, stop_event), daemon=True)
    t.start()
    time.sleep(1.5)
    stop_event.set()
    t.join(timeout=3.0)
    
    # Second event is usually the initPayload message containing VRP paths
    assert len(event_list) >= 2
    init_data = event_list[1].get("data")
    assert isinstance(init_data, dict)
    assert "pathFM" in init_data
    assert "pathLM1" in init_data
    assert isinstance(init_data.get("pathFM"), list)
    assert isinstance(init_data.get("pathLM1"), list)

def test_unauthorized_telemetry_rejection(system_order_setup):
    """Test 5: Verify unauthorized clients are rejected from updating GPS telemetry."""
    cust_client = system_order_setup["customer_client"]
    order_id_str = system_order_setup["order_id_str"]
    
    loc_payload = {
        "orderId": order_id_str,
        "latitude": 12.9800,
        "longitude": 77.6000,
        "bearing": 90.0,
        "status": "OUT_FOR_DELIVERY",
        "gpsProgress": 25.0,
        "etaMinutes": 10.0
    }
    
    # Customer client is not delivery_partner role
    resp = cust_client.post(f"{BASE_URL}/api/delivery/location", json=loc_payload)
    assert resp.status_code in [401, 403]
