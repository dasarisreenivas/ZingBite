# test_smoke.py - Basic smoke tests for ZingBite API authentication lifecycle

import uuid
import pytest
from utils.client import ZingBiteClient
from utils.constants import BASE_URL, API_REGISTER

@pytest.fixture
def client():
    return ZingBiteClient(base_url=BASE_URL)

def test_session_status_initially_logged_out(client):
    """Verify that a fresh client is initially logged out."""
    response = client.check_session()
    assert response.status_code == 200
    data = response.json()
    assert data.get("loggedIn") is False
    assert client.csrf_token is None

def test_user_registration_login_logout_lifecycle(client):
    """Test full registration, session validation, and logout lifecycle."""
    unique_id = str(uuid.uuid4())[:8]
    email = f"smoke_{unique_id}@example.com"
    password = "Password123!"
    username = f"SmokeUser_{unique_id}"
    mobile = "9999999999"
    address = "123 Smoke Test St"

    registration_payload = {
        "username": username,
        "email": email,
        "mobile": mobile,
        "password": password,
        "confirmPassword": password,
        "address": address,
        "latitude": 12.9716,
        "longitude": 77.5946,
        "city": "Bengaluru"
    }

    # 1. Register new user
    reg_response = client.post(API_REGISTER, json=registration_payload)
    assert reg_response.status_code == 200
    reg_data = reg_response.json()
    assert reg_data.get("success") is True
    assert reg_data.get("csrfToken") is not None
    assert client.csrf_token == reg_data.get("csrfToken")

    # 2. Check session status (should now be logged in)
    session_response = client.check_session()
    assert session_response.status_code == 200
    session_data = session_response.json()
    assert session_data.get("loggedIn") is True
    assert session_data.get("csrfToken") == client.csrf_token
    assert session_data.get("user", {}).get("email") == email

    # 3. Log out
    logout_response = client.logout()
    assert logout_response.status_code == 200
    logout_data = logout_response.json()
    assert logout_data.get("success") is True
    assert client.csrf_token is None

    # 4. Check session status again (should be logged out)
    post_logout_response = client.check_session()
    assert post_logout_response.status_code == 200
    post_logout_data = post_logout_response.json()
    assert post_logout_data.get("loggedIn") is False
