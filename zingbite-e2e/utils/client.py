# client.py - ZingBite API Client for E2E testing

import random
import requests
import httpx
import websockets
from httpx_sse import connect_sse
from utils.constants import API_LOGIN, API_LOGOUT

class ZingBiteClient:
    def __init__(self, base_url="http://localhost:8080/zingbite"):
        self.base_url = base_url
        self.session = requests.Session()
        self.csrf_token = None
        self.session.headers.update({
            "Accept": "application/json",
            "Content-Type": "application/json"
        })

    def request(self, method, url, **kwargs):
        """
        Perform an HTTP request.
        - Automatically attaches X-CSRF-Token header to state-changing methods if available.
        - Automatically parses and updates the stored CSRF token from 200 OK JSON responses.
        """
        headers = kwargs.pop("headers", {})
        if self.csrf_token and method.upper() in ["POST", "PUT", "DELETE"]:
            headers["X-CSRF-Token"] = self.csrf_token
        
        # Merge with existing session headers
        merged_headers = dict(self.session.headers)
        merged_headers.update(headers)
        
        # Inject dynamic X-Forwarded-For to bypass rate limiter
        merged_headers["X-Forwarded-For"] = f"12.34.56.{random.randint(1, 254)}"
        
        response = self.session.request(method, url, headers=merged_headers, **kwargs)
        
        if response.status_code == 200:
            try:
                data = response.json()
                if isinstance(data, dict) and "csrfToken" in data:
                    self.csrf_token = data.get("csrfToken")
                    if self.csrf_token:
                        self.session.headers["X-CSRF-Token"] = self.csrf_token
                    else:
                        if "X-CSRF-Token" in self.session.headers:
                            del self.session.headers["X-CSRF-Token"]
            except Exception:
                pass
                
        return response

    def login(self, email, password):
        """Log in a user and store the CSRF token and session cookies."""
        payload = {
            "email": email,
            "password": password
        }
        return self.post(API_LOGIN, json=payload)

    def logout(self):
        """Log out the current user, clear CSRF token and invalidate session."""
        response = self.post(API_LOGOUT)
        self.csrf_token = None
        if "X-CSRF-Token" in self.session.headers:
            del self.session.headers["X-CSRF-Token"]
        self.session.cookies.clear()
        return response

    def check_session(self):
        """Check if user is logged in, and refresh CSRF token if they are."""
        return self.get(API_LOGIN)

    def get(self, url, **kwargs):
        """Perform a GET request using the session."""
        return self.request("GET", url, **kwargs)

    def post(self, url, json=None, **kwargs):
        """Perform a POST request."""
        return self.request("POST", url, json=json, **kwargs)

    def put(self, url, json=None, **kwargs):
        """Perform a PUT request."""
        return self.request("PUT", url, json=json, **kwargs)

    def delete(self, url, **kwargs):
        """Perform a DELETE request."""
        return self.request("DELETE", url, **kwargs)

    def subscribe_sse(self, url, params=None, timeout=20.0):
        """
        Subscribe to an SSE stream using httpx-sse.
        Yields httpx_sse.ServerSentEvent instances.
        """
        # Synchronize cookies and headers from requests.Session
        cookies = self.session.cookies.get_dict()
        headers = dict(self.session.headers)
        # Inject dynamic X-Forwarded-For to bypass rate limiter
        headers["X-Forwarded-For"] = f"12.34.56.{random.randint(1, 254)}"
        
        with httpx.Client(cookies=cookies, headers=headers, timeout=timeout) as client:
            with connect_sse(client, "GET", url, params=params) as event_source:
                for event in event_source.iter_sse():
                    yield event

    def connect_websocket(self, url):
        """
        Establish a WebSocket connection, attaching the active session's JSESSIONID cookie.
        Returns a websockets.connect context manager.
        """
        jsessionid = self.session.cookies.get("JSESSIONID")
        headers = {}
        if jsessionid:
            headers["Cookie"] = f"JSESSIONID={jsessionid}"
        # Inject dynamic X-Forwarded-For to bypass rate limiter
        headers["X-Forwarded-For"] = f"12.34.56.{random.randint(1, 254)}"
        
        return websockets.connect(url, additional_headers=headers)
