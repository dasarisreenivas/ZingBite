# test_tier1_auth_profiles.py - Happy-path tests for User Auth & Profiles
import uuid
import pytest
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

@pytest.fixture
def client():
    return ZingBiteClient(base_url=BASE_URL)

@pytest.fixture
def registered_user_data():
    unique_id = str(uuid.uuid4())[:8]
    return {
        "username": f"User_{unique_id}",
        "email": f"auth_profile_{unique_id}@example.com",
        "mobile": "9876543210",
        "password": "Password123!",
        "confirmPassword": "Password123!",
        "address": f"Street {unique_id}",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    }

def test_registration_success(client, registered_user_data):
    """Test 1: Verify successful user registration."""
    response = client.post(API_REGISTER, json=registered_user_data)
    assert response.status_code == 200
    data = response.json()
    assert data.get("success") is True
    assert client.csrf_token is not None

def test_registration_duplicate_email(client, registered_user_data):
    """Test 2: Verify duplicate email registration returns SC_CONFLICT (409)."""
    # Register once
    response1 = client.post(API_REGISTER, json=registered_user_data)
    assert response1.status_code == 200
    
    # Try duplicate registration
    client2 = ZingBiteClient(base_url=BASE_URL)
    response2 = client2.post(API_REGISTER, json=registered_user_data)
    assert response2.status_code == 409
    data = response2.json()
    assert "error" in data

def test_login_success(client, registered_user_data):
    """Test 3: Verify login works with registered credentials after logout."""
    # Register first
    reg_response = client.post(API_REGISTER, json=registered_user_data)
    assert reg_response.status_code == 200
    
    # Log out
    client.logout()
    session_data = client.check_session().json()
    assert session_data.get("loggedIn") is False
    
    # Log back in
    login_response = client.login(registered_user_data["email"], registered_user_data["password"])
    assert login_response.status_code == 200
    login_data = login_response.json()
    assert login_data.get("success") is True
    assert client.csrf_token is not None

def test_profile_update(client, registered_user_data):
    """Test 4: Verify profile details can be updated."""
    # Register and login
    client.post(API_REGISTER, json=registered_user_data)
    
    # Send profile update
    update_payload = {
        "action": "update",
        "username": "UpdatedName",
        "mobile": "8765432109",
        "address": "456 Updated St",
        "latitude": 13.0,
        "longitude": 77.6,
        "city": "UpdatedCity"
    }
    
    update_response = client.post(f"{BASE_URL}/api/profile", json=update_payload)
    assert update_response.status_code == 200
    update_data = update_response.json()
    assert update_data.get("success") is True
    
    # Verify updated profile values via GET
    get_response = client.get(f"{BASE_URL}/api/profile")
    assert get_response.status_code == 200
    profile = get_response.json()
    assert profile.get("userName") == "UpdatedName"
    assert profile.get("phoneNumber") == 8765432109
    assert profile.get("address") == "456 Updated St"
    assert profile.get("city") == "UpdatedCity"

def test_profile_unauthorized(client):
    """Test 5: Verify unauthorized profile access is blocked."""
    response = client.get(f"{BASE_URL}/api/profile")
    assert response.status_code == 401
    assert "error" in response.json()
