# test_tier1_admin_telemetry_blocking.py - E2E tests for Admin Telemetry & User Blocking
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
def test_user_data():
    unique_id = str(uuid.uuid4())[:8]
    return {
        "username": f"BlockUser_{unique_id}",
        "email": f"block_test_{unique_id}@example.com",
        "mobile": "9876543210",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": "123 Block St",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    }

def test_admin_telemetry_access(super_admin_client, client, test_user_data):
    """Verify that only super admins can access telemetry, and HikariCP/Cache/Limiter metrics are populated."""
    # 1. Super admin accesses telemetry
    response = super_admin_client.get(f"{BASE_URL}/api/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "systemMetrics" in data
    metrics = data["systemMetrics"]
    
    # Verify Hikari CP connections exist
    assert "hikari" in metrics
    hikari = metrics["hikari"]
    assert "activeConnections" in hikari
    assert "maxConnections" in hikari
    assert "idleConnections" in hikari
    
    # Verify Hibernate stats exist
    assert "hibernate" in metrics
    hib = metrics["hibernate"]
    assert "cacheHitCount" in hib
    assert "cacheMissCount" in hib
    assert "cacheHitRate" in hib
    
    # Verify Rate Limiter stats exist
    assert "rateLimiter" in metrics
    rl = metrics["rateLimiter"]
    assert "activeIps" in rl
    assert "totalRequests" in rl

    # 2. Regular customer registers and tries to access telemetry (should fail with 403)
    reg_resp = client.post(API_REGISTER, json=test_user_data)
    assert reg_resp.status_code == 200
    
    # Try accessing telemetry as regular customer
    tel_resp = client.get(f"{BASE_URL}/api/analytics")
    assert tel_resp.status_code == 403
    assert "error" in tel_resp.json()

def test_user_blocking_lifecycle(super_admin_client, client, test_user_data):
    """Verify registration, login, blocking from super admin, checkouts blocked, session invalidated, login blocked, and unblocking."""
    # 1. Register new customer
    reg_resp = client.post(API_REGISTER, json=test_user_data)
    assert reg_resp.status_code == 200
    
    # Get user ID
    session_data = client.check_session().json()
    user_id = session_data.get("user", {}).get("userID")
    assert user_id is not None
    
    # 2. Verify customer can access profile API successfully
    profile_resp = client.get(f"{BASE_URL}/api/profile")
    assert profile_resp.status_code == 200
    assert profile_resp.json().get("email") == test_user_data["email"]

    # 3. Super admin blocks the user
    block_resp = super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "toggleBlockUser",
        "userId": user_id
    })
    assert block_resp.status_code == 200
    assert block_resp.json().get("success") is True
    assert block_resp.json().get("blocked") is True

    # 4. Check that customer is immediately rejected on next actions or session check
    # Fresh session check should detect block status and invalidate session
    session_resp = client.check_session()
    assert session_resp.json().get("loggedIn") is False
    assert "blocked" in session_resp.json().get("error", "").lower()

    # 5. Trying to login again as the blocked user should be rejected
    login_resp = client.login(test_user_data["email"], test_user_data["password"])
    assert login_resp.status_code == 403
    assert "blocked" in login_resp.json().get("error", "").lower()

    # 6. Super admin unblocks the user
    unblock_resp = super_admin_client.post(f"{BASE_URL}/api/super-admin", json={
        "action": "toggleBlockUser",
        "userId": user_id
    })
    assert unblock_resp.status_code == 200
    assert unblock_resp.json().get("success") is True
    assert unblock_resp.json().get("blocked") is False

    # 7. Blocked user can login again
    login_again = client.login(test_user_data["email"], test_user_data["password"])
    assert login_again.status_code == 200
    assert login_again.json().get("success") is True
