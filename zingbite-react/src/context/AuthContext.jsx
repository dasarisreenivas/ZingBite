/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true; // Send cookies
axios.defaults.baseURL = typeof window !== 'undefined' ? window.location.origin + '/zingbite' : '/zingbite';

// CSRF token management (persisted in sessionStorage)
const CSRF_KEY = 'zingbite_csrf_token';

export const setCsrfToken = (token) => {
  try {
    if (token) {
      sessionStorage.setItem(CSRF_KEY, token);
    } else {
      sessionStorage.removeItem(CSRF_KEY);
    }
  } catch (e) {
    // sessionStorage may be unavailable
  }
};

export const getCsrfToken = () => {
  try {
    return sessionStorage.getItem(CSRF_KEY);
  } catch (e) {
    return null;
  }
};

// Axios interceptor to attach CSRF token to state-changing requests
axios.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token && ['post', 'put', 'delete'].includes(config.method?.toLowerCase())) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/login');
        if (response.data.loggedIn) {
          setUser(response.data.user);
          if (response.data.csrfToken) {
            setCsrfToken(response.data.csrfToken);
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        setUser(response.data.user);
        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken);
        }
        return { success: true, user: response.data.user };
      }
      return { success: false, error: response.data.error };
    } catch (err) {
      if (err.response && err.response.data) {
        return { success: false, error: err.response.data.error || 'Login failed' };
      }
      return { success: false, error: 'Network error or server down' };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (err) {
      console.error("Failed to call logout API:", err);
    }
    setUser(null);
    setCsrfToken(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
