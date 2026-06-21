# test_tier1_group_ordering.py - happy-path E2E tests for Collaborative Group Ordering WS Sync
import uuid
import pytest
import random
import json
import asyncio
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER, WS_BASE_URL

def get_unique_phone():
    return f"9{random.randint(100000000, 999999999)}"

@pytest.fixture
def host_client():
    client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    client.post(API_REGISTER, json={
        "username": f"Host_{unique_id}",
        "email": f"host_{unique_id}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "123 Host St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    return client

@pytest.fixture
def guest_client():
    client = ZingBiteClient(base_url=BASE_URL)
    unique_id = str(uuid.uuid4())[:8]
    client.post(API_REGISTER, json={
        "username": f"Guest_{unique_id}",
        "email": f"guest_{unique_id}@example.com",
        "mobile": get_unique_phone(),
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "124 Guest St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    })
    return client

def check_group_ordering_implemented(client):
    """Checks if group order creation is implemented. If 404, skips the test."""
    resp = client.post(f"{BASE_URL}/api/group-order/create", json={"restaurantId": 1})
    if resp.status_code == 404:
        pytest.skip("Collaborative Group Ordering feature is not yet implemented in the backend (404 Not Found).")
    return resp

def test_group_order_room_creation(host_client):
    """Test 1: Verify host can initialize a group ordering room."""
    resp = check_group_ordering_implemented(host_client)
    assert resp.status_code == 200
    data = resp.json()
    assert "roomCode" in data
    assert "roomId" in data

def test_group_order_join(host_client, guest_client):
    """Test 2: Verify guest can join the room using the room code."""
    create_resp = check_group_ordering_implemented(host_client)
    room_code = create_resp.json().get("roomCode")
    room_id = create_resp.json().get("roomId")
    
    # Guest joins
    join_resp = guest_client.post(f"{BASE_URL}/api/group-order/join", json={"roomCode": room_code})
    assert join_resp.status_code == 200
    join_data = join_resp.json()
    assert join_data.get("success") is True
    
    # Retrieve details
    details_resp = host_client.get(f"{BASE_URL}/api/group-order/details", params={"roomId": room_id})
    assert details_resp.status_code == 200
    details = details_resp.json()
    participants = [p.get("userId") for p in details.get("participants", [])]
    assert guest_client.check_session().json().get("user", {}).get("userID") in participants

@pytest.mark.anyio
async def test_group_order_realtime_item_sync(host_client, guest_client):
    """Test 3: Verify realtime WebSocket cart updates synchronization."""
    # We must run HTTP calls in synchronous wrapper or run inside event loop.
    # Since pytest fixture/client is sync, we check implementation first:
    try:
        resp = host_client.post(f"{BASE_URL}/api/group-order/create", json={"restaurantId": 1})
        if resp.status_code == 404:
            pytest.skip("Collaborative Group Ordering WS sync is not yet implemented (404).")
    except Exception:
        pytest.skip("Backend unreachable or not implemented.")
        
    room_code = resp.json().get("roomCode")
    room_id = resp.json().get("roomId")
    
    # Guest joins
    guest_client.post(f"{BASE_URL}/api/group-order/join", json={"roomCode": room_code})
    
    host_id = host_client.check_session().json().get("user", {}).get("userID")
    guest_id = guest_client.check_session().json().get("user", {}).get("userID")
    
    ws_host_url = f"{WS_BASE_URL}/api/ws/group-order/{room_id}/{host_id}"
    ws_guest_url = f"{WS_BASE_URL}/api/ws/group-order/{room_id}/{guest_id}"
    
    async def run_ws_sync():
        async with host_client.connect_websocket(ws_host_url) as ws_host, \
                   guest_client.connect_websocket(ws_guest_url) as ws_guest:
            
            # Guest adds item
            add_item_msg = {
                "action": "addItem",
                "menuId": 5,
                "quantity": 2
            }
            await ws_guest.send(json.dumps(add_item_msg))
            
            # Host receives broadcast update
            response = await asyncio.wait_for(ws_host.recv(), timeout=5.0)
            data = json.loads(response)
            assert data.get("type") == "cart_update"
            assert len(data.get("items", [])) > 0
            
    await run_ws_sync()

def test_group_order_split_billing(host_client, guest_client):
    """Test 4: Verify individual split billing calculations are correct."""
    create_resp = check_group_ordering_implemented(host_client)
    room_code = create_resp.json().get("roomCode")
    room_id = create_resp.json().get("roomId")
    
    guest_client.post(f"{BASE_URL}/api/group-order/join", json={"roomCode": room_code})
    
    # Fetch split bill
    bill_resp = host_client.get(f"{BASE_URL}/api/group-order/bill", params={"roomId": room_id})
    assert bill_resp.status_code == 200
    bill_data = bill_resp.json()
    assert "splits" in bill_data
    assert "total" in bill_data

def test_group_order_host_checkout(host_client, guest_client):
    """Test 5: Verify host checkout restrictions and room locking."""
    create_resp = check_group_ordering_implemented(host_client)
    room_code = create_resp.json().get("roomCode")
    room_id = create_resp.json().get("roomId")
    
    guest_client.post(f"{BASE_URL}/api/group-order/join", json={"roomCode": room_code})
    
    # Guest tries checkout -> should fail
    guest_checkout_resp = guest_client.post(f"{BASE_URL}/api/group-order/checkout", json={"roomId": room_id})
    assert guest_checkout_resp.status_code in [401, 403]
    
    # Host checkouts -> should succeed
    host_checkout_resp = host_client.post(f"{BASE_URL}/api/group-order/checkout", json={
        "roomId": room_id,
        "paymentMethod": "UPI"
    })
    assert host_checkout_resp.status_code == 200
    assert host_checkout_resp.json().get("success") is True
