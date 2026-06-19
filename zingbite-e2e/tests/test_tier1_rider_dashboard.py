# test_tier1_rider_dashboard.py - Happy-path E2E tests for Rider Dashboard
import uuid
import random
import pytest
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

def get_unique_phone():
    return f"9{random.randint(100000000, 999999999)}"

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
def setup_rider_dashboard(super_admin_client):
    """Sets up a restaurant, customer, and a pending paid order."""
    unique_id = str(uuid.uuid4())[:8]
    
    # 1. Restaurant Admin
    owner_client = ZingBiteClient(base_url=BASE_URL)
    reg_owner_resp = owner_client.post(API_REGISTER, json={
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
    assert reg_owner_resp.status_code == 200
    owner_id = owner_client.check_session().json().get("user", {}).get("userID")
    
    # Onboard & Approve
    submit_resp = owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "submitRestaurantRequest",
        "name": f"Rider Rest {unique_id}",
        "cuisine": "Fast Food",
        "address": "789 Grill St, Bengaluru",
        "deliveryTime": "25 mins",
        "licenseNo": f"LIC-{unique_id}",
        "aadhaarNo": f"AAD-{unique_id}",
        "gstNo": f"29GST{unique_id}Z"
    })
    assert submit_resp.status_code == 200
    
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
    add_menu_resp = owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "addMenuItem",
        "name": "Burger Combo",
        "price": 180.0,
        "description": "Double burger with fries",
        "restaurantId": restaurant_id
    })
    assert add_menu_resp.status_code == 200
    menu_id = owner_client.get(f"{BASE_URL}/api/restaurant-admin").json().get("menu", [])[0].get("menuId")
    
    # 2. Customer
    cust_client = ZingBiteClient(base_url=BASE_URL)
    reg_cust_resp = cust_client.post(API_REGISTER, json={
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
    assert reg_cust_resp.status_code == 200
    customer_id = cust_client.check_session().json().get("user", {}).get("userID")
    
    # 3. Create Order
    order_response = cust_client.post(f"{BASE_URL}/api/profile", json={
        "action": "createOrder",
        "total": 180.0,
        "paymentMethod": "UPI",
        "restaurantId": restaurant_id,
        "items": [{"id": menu_id, "qty": 1, "price": 180.0}]
    })
    order_id_str = order_response.json().get("orderId")
    order_id = int(order_id_str.replace("ZB-", ""))
    
    # 4. Pay Order
    cust_client.post(f"{BASE_URL}/api/payment/verify", json={
        "orderId": order_id_str,
        "transactionId": f"txn_{unique_id}",
        "paymentMethod": "UPI"
    })
    
    # Ensure restaurant prepares it up to READY_FOR_PICKUP
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "updateOrderStatus",
        "orderId": order_id,
        "status": "ACCEPTED"
    })
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "updateOrderStatus",
        "orderId": order_id,
        "status": "PREPARING"
    })
    owner_client.post(f"{BASE_URL}/api/restaurant-admin", json={
        "action": "updateOrderStatus",
        "orderId": order_id,
        "status": "READY_FOR_PICKUP"
    })
    
    return {
        "restaurant_id": restaurant_id,
        "order_id": order_id,
        "order_id_str": order_id_str,
        "unique_id": unique_id
    }

@pytest.fixture
def rider_client(super_admin_client, setup_rider_dashboard):
    """Fixture that registers and onboards a fresh delivery rider, then logs them in."""
    unique_id = setup_rider_dashboard["unique_id"]
    r_client = ZingBiteClient(base_url=BASE_URL)
    
    rider_email = f"rider_db_{unique_id}@example.com"
    rider_phone = f"9{random.randint(100000000, 999999999)}"
    reg_rider_resp = r_client.post(API_REGISTER, json={
        "username": f"RiderDB_{unique_id}",
        "email": rider_email,
        "mobile": rider_phone,
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "123 Rider St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    assert reg_rider_resp.status_code == 200
    rider_id = r_client.check_session().json().get("user", {}).get("userID")
    
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "addJob",
        "title": "Delivery Rider",
        "department": "Operations",
        "location": "Bengaluru",
        "description": "Flexible delivery job"
    })
    jobs = super_admin_client.get(f"{BASE_URL}/api/careers", params={"action": "jobs"}).json()
    job_id = next(j.get("id") for j in jobs if j.get("title") == "Delivery Rider")
    
    apply_resp = r_client.post(f"{BASE_URL}/api/careers", json={
        "jobId": job_id,
        "name": f"RiderDB_{unique_id}",
        "email": rider_email,
        "phone": rider_phone,
        "resumeUrl": "https://zingbite.com/resumes/demo.pdf",
        "city": "Bengaluru",
        "vehicle": "Bicycle"
    })
    assert apply_resp.status_code == 200
    
    admin_stats = super_admin_client.get(f"{BASE_URL}/api/super-admin").json()
    apps = admin_stats.get("applications", [])
    app_id = next(a.get("id") for a in apps if a.get("userId") == rider_id)
    approve_resp = super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "updateApplicationStatus",
        "appId": app_id,
        "status": "Approved"
    })
    assert approve_resp.status_code == 200
    
    r_client.check_session()
    return r_client

def test_rider_onboarding(client, super_admin_client, setup_rider_dashboard):
    """Test 1: Register customer, apply for job, approve to elevate role to delivery_partner."""
    unique_id = setup_rider_dashboard["unique_id"]
    
    # 1. Register rider user
    rider_email = f"rider_db_{unique_id}@example.com"
    rider_phone = get_unique_phone()
    reg_rider_resp = client.post(API_REGISTER, json={
        "username": f"RiderDB_{unique_id}",
        "email": rider_email,
        "mobile": rider_phone,
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "123 Rider St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    assert reg_rider_resp.status_code == 200
    rider_id = client.check_session().json().get("user", {}).get("userID")
    
    # 2. Add Job
    super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "addJob",
        "title": "Delivery Rider",
        "department": "Operations",
        "location": "Bengaluru",
        "description": "Flexible delivery job"
    })
    jobs = super_admin_client.get(f"{BASE_URL}/api/careers", params={"action": "jobs"}).json()
    job_id = next(j.get("id") for j in jobs if j.get("title") == "Delivery Rider")
    
    # 3. Apply
    apply_resp = client.post(f"{BASE_URL}/api/careers", json={
        "jobId": job_id,
        "name": f"RiderDB_{unique_id}",
        "email": rider_email,
        "phone": rider_phone,
        "resumeUrl": "https://zingbite.com/resumes/demo.pdf",
        "city": "Bengaluru",
        "vehicle": "Bicycle"
    })
    assert apply_resp.status_code == 200
    
    # 4. Approve
    admin_stats = super_admin_client.get(f"{BASE_URL}/api/super-admin").json()
    apps = admin_stats.get("applications", [])
    app_id = next(a.get("id") for a in apps if a.get("userId") == rider_id)
    approve_resp = super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "updateApplicationStatus",
        "appId": app_id,
        "status": "Approved"
    })
    assert approve_resp.status_code == 200
    
    # Refresh session and verify upgraded role
    session_data = client.check_session().json()
    assert session_data.get("user", {}).get("role") == "delivery_partner"
    assert session_data.get("user", {}).get("riderStatus") == "Active"

def test_retrieve_dashboard(rider_client, setup_rider_dashboard):
    """Test 2: Retrieve rider dashboard stats and lists."""
    response = rider_client.get(f"{BASE_URL}/api/delivery")
    assert response.status_code == 200
    data = response.json()
    
    # Verify expected lists and counts
    assert "available" in data
    assert "active" in data
    assert "completed" in data
    assert "totalEarnings" in data

def test_accept_delivery_task(rider_client, setup_rider_dashboard):
    """Test 3: Accept a pending delivery task."""
    order_id = setup_rider_dashboard["order_id"]
    
    # Accept order
    accept_resp = rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "acceptOrder",
        "orderId": order_id
    })
    assert accept_resp.status_code == 200
    assert accept_resp.json().get("success") is True
    
    # Verify it is now in active
    dash = rider_client.get(f"{BASE_URL}/api/delivery").json()
    active_ids = [o.get("orderId") for o in dash.get("active", [])]
    assert order_id in active_ids

def test_update_location_and_gps(rider_client, setup_rider_dashboard):
    """Test 4: Update rider location and GPS progress coordinates."""
    order_id = setup_rider_dashboard["order_id"]
    
    # Accept order first
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "acceptOrder",
        "orderId": order_id
    })
    
    # 1. Update general rider location
    loc_resp = rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateLocation",
        "latitude": 12.9800,
        "longitude": 77.6000
    })
    assert loc_resp.status_code == 200
    assert loc_resp.json().get("success") is True
    
    # 2. Update specific order GPS progress
    gps_resp = rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateGPS",
        "orderId": order_id,
        "progress": 50.0,
        "latitude": 12.9810,
        "longitude": 77.6010
    })
    assert gps_resp.status_code == 200
    assert gps_resp.json().get("success") is True

def test_complete_delivery(rider_client, setup_rider_dashboard):
    """Test 5: Update order status to DELIVERED and verify completion."""
    order_id = setup_rider_dashboard["order_id"]
    
    # Accept order first
    rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "acceptOrder",
        "orderId": order_id
    })
    
    # Since status is READY_FOR_PICKUP, transition it to PICKED_UP -> OUT_FOR_DELIVERY -> DELIVERED
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "updateStatus", "orderId": order_id, "status": "PICKED_UP"})
    rider_client.post(f"{BASE_URL}/api/delivery", json={"action": "updateStatus", "orderId": order_id, "status": "OUT_FOR_DELIVERY"})
    
    final_resp = rider_client.post(f"{BASE_URL}/api/delivery", json={
        "action": "updateStatus",
        "orderId": order_id,
        "status": "DELIVERED"
    })
    assert final_resp.status_code == 200
    assert final_resp.json().get("success") is True
    
    # Verify it is now in completed
    dash = rider_client.get(f"{BASE_URL}/api/delivery").json()
    completed_ids = [o.get("orderId") for o in dash.get("completed", [])]
    assert order_id in completed_ids
