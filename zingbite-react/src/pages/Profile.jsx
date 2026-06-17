import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { 
  User, MapPin, ClipboardList, Trash2, Plus, LogOut, 
  CheckCircle, ShoppingBag, Edit, Calendar, IndianRupee, Loader, ArrowRight,
  Package, Clock, Mail, Phone, CreditCard, ChevronDown, Sun, Moon, Building2, Bike, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ORDERS_PAGE_SIZE = 5;

const Profile = () => {
  const { user, logout, updateUser, loading: authLoading } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const { darkMode, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tabSwitching, setTabSwitching] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.userName || user?.username || 'Guest User',
    email: user?.email || 'guest@zingbite.com',
    mobile: String(user?.phoneNumber || user?.mobile || ''),
    address: user?.address || '123 Main Street',
    latitude: null,
    longitude: null,
    city: ''
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem(`addresses_${user?.email}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', address: user?.address || '123 Main Street, Indiranagar, Bangalore' },
      { id: 2, type: 'Work', address: '456 Tech Park, Whitefield, Bangalore' }
    ];
  });
  
  const [newAddressType, setNewAddressType] = useState('Other');
  const [newAddressText, setNewAddressText] = useState('');
  const [newAddressLat, setNewAddressLat] = useState(null);
  const [newAddressLng, setNewAddressLng] = useState(null);
  const [newAddressCity, setNewAddressCity] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [reordering, setReordering] = useState(false);
  const [roleUpgrade, setRoleUpgrade] = useState({ action: '', loading: false });

  const [pastOrders, setPastOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [visibleOrderCount, setVisibleOrderCount] = useState(ORDERS_PAGE_SIZE);

  const contentRef = useRef(null);

  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    let link = document.querySelector('link[href*="leaflet.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    let script = document.querySelector('script[src*="leaflet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        const interval = setInterval(() => {
          if (window.L) {
            setLeafletLoaded(true);
            clearInterval(interval);
          }
        }, 50);
      };
      document.body.appendChild(script);
    }
  }, []);

  const reverseGeocode = async (lat, lng, targetField) => {
    setGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      const data = await response.json();
      if (data && data.display_name) {
        const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || '';
        if (targetField === 'profile') {
          setProfileData(prev => ({ ...prev, address: data.display_name, latitude: lat, longitude: lng, city }));
        } else {
          setNewAddressText(data.display_name);
          setNewAddressLat(lat);
          setNewAddressLng(lng);
          setNewAddressCity(city);
        }
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setGeocoding(false);
    }
  };

  const detectLocation = (targetField) => {
    if (!navigator.geolocation) {
      showAlert("Geolocation is not supported by your browser.", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16);
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
          }
        }
        reverseGeocode(latitude, longitude, targetField);
      },
      (err) => {
        showAlert("Error retrieving location: " + err.message, "error");
      }
    );
  };

  useEffect(() => {
    const showMap = (activeTab === 'details' && isEditing) || (activeTab === 'addresses' && showAddressForm);
    if (!leafletLoaded || !mapRef.current || !showMap) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return;
    }

    if (mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const initLat = profileData.latitude ?? 12.9716;
    const initLng = profileData.longitude ?? 77.5946;

    const map = L.map(mapRef.current).setView([initLat, initLng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,
      className: 'custom-profile-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([initLat, initLng], { icon: customIcon, draggable: true }).addTo(map);
    markerRef.current = marker;

    const targetField = activeTab === 'details' ? 'profile' : 'newAddress';

    marker.on('dragend', () => {
      const latLng = marker.getLatLng();
      reverseGeocode(latLng.lat, latLng.lng, targetField);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat, e.latlng.lng, targetField);
    });

    reverseGeocode(defaultLat, defaultLng, targetField);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [leafletLoaded, activeTab, isEditing, showAddressForm]);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.userName || user.username || 'Guest User',
        email: user.email || 'guest@zingbite.com',
        mobile: String(user.phoneNumber || user.mobile || ''),
        address: user.address || '123 Main Street'
      });
    }
  }, [user]);
  
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(addresses));
    }
  }, [addresses, user?.email]);

  useEffect(() => {
    const fetchPastOrders = async (isBackground = false) => {
      try {
        const res = await axios.get('/api/profile?action=orders');
        setPastOrders(res.data);
      } catch (err) {
        console.error("Error fetching past orders:", err);
      } finally {
        if (!isBackground) setOrdersLoading(false);
      }
    };
    if (user) {
      fetchPastOrders(false);
      const ssePath = window.location.pathname.startsWith('/zingbite') ? '/zingbite/api/stream?topic=user_orders' : '/api/stream?topic=user_orders';
      const eventSource = new EventSource(ssePath);
      eventSource.onmessage = (event) => {
        try {
          console.log("[ZingBite SSE] Received real-time user profile orders update");
          fetchPastOrders(true);
        } catch (err) {
          console.error("[ZingBite SSE] Error on message:", err);
        }
      };

      eventSource.onerror = (err) => {
        console.error("[ZingBite SSE] EventSource connection error:", err);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [user]);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setTabSwitching(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setTabSwitching(false), 50);
    }, 200);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/profile', {
        action: 'update',
        username: profileData.username,
        mobile: profileData.mobile,
        address: profileData.address,
        ...(profileData.latitude != null && { latitude: profileData.latitude }),
        ...(profileData.longitude != null && { longitude: profileData.longitude }),
        ...(profileData.city && { city: profileData.city })
      });
      if (res.data.success) {
        updateUser(res.data.user);
        setIsEditing(false);
      }
    } catch (err) {
      showAlert(err.response?.data?.error || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressText) return;
    setAddresses([...addresses, {
      id: Date.now(),
      type: newAddressType,
      address: newAddressText,
      latitude: newAddressLat,
      longitude: newAddressLng,
      city: newAddressCity
    }]);
    setNewAddressText('');
    setNewAddressLat(null);
    setNewAddressLng(null);
    setNewAddressCity('');
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleReorder = async (orderItems) => {
    setReordering(true);
    try {
      for (const item of orderItems) {
        await addToCart(item.id, item.qty);
      }
      navigate('/cart');
    } catch (err) {
      console.error(err);
      showAlert('Error during reordering. Please try again.', 'error');
    } finally {
      setReordering(false);
    }
  };

  const visiblePastOrders = pastOrders.slice(0, visibleOrderCount);
  const hasMorePastOrders = visibleOrderCount < pastOrders.length;

  const orderCount = pastOrders.filter(o => {
    const s = (o.status || '').toLowerCase();
    return s === 'delivered';
  }).length;

  const handleRoleUpgradeRequest = async (targetRole) => {
    setRoleUpgrade({ action: targetRole, loading: true });
    try {
      if (targetRole === 'restaurant_admin') {
        navigate('/partner-with-us');
        return;
      } else if (targetRole === 'delivery_partner') {
        navigate('/ride-with-us');
        return;
      }
      const res = await axios.post('/api/profile', { action: 'upgradeRole', role: targetRole });
      if (res.data.success) {
        showAlert('Role upgrade request submitted for admin review.', 'success');
      }
    } catch (err) {
      showAlert(err.response?.data?.error || 'Failed to submit upgrade request.', 'error');
    } finally {
      setRoleUpgrade({ action: '', loading: false });
    }
  };

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '400px' }}>
        <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-enter" style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(247,55,79,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '2px solid rgba(247,55,79,0.12)' }}>
          <User size={48} color="var(--brand-red)" />
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Please Log In</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Log in to view your profile dashboard, saved addresses, and past orders.</p>
        <button onClick={() => navigate('/login?redirect=/profile')} style={{ padding: '14px 36px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 24px rgba(247,55,79,0.25)' }}>LOG IN NOW</button>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <style>{`
        .profile-wrap {
          max-width: 1200px;
          margin: 0 auto 60px;
          padding: 0 20px;
        }

        .profile-cover {
          background: linear-gradient(135deg, var(--brand-red) 0%, #d42d42 100%);
          border-radius: 0 0 28px 28px;
          padding: 32px 32px 24px;
          margin: 0 -20px;
          position: relative;
          overflow: hidden;
        }
        .profile-cover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .profile-cover::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }
        .profile-cover-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          color: #fff;
        }
        .cover-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 3px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 800;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
        }
        .cover-info h1 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .cover-info p {
          opacity: 0.85;
          font-size: 0.9rem;
          margin: 0;
        }
        .cover-info .cover-email {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          opacity: 0.75;
          margin-top: 4px;
        }

        .profile-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 28px;
          margin-top: -16px;
          position: relative;
          z-index: 2;
          align-items: start;
        }

        .profile-nav {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          overflow: hidden;
          padding: 8px;
        }
        .profile-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 14px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.25s var(--ease-premium);
          text-align: left;
          position: relative;
        }
        .profile-nav-item svg {
          flex-shrink: 0;
          transition: transform 0.25s var(--ease-premium);
        }
        .profile-nav-item:hover {
          background: rgba(247,55,79,0.05);
          color: var(--brand-red);
        }
        .profile-nav-item:hover svg {
          transform: scale(1.1);
        }
        .profile-nav-item.active {
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
        }
        .profile-nav-divider {
          height: 1px;
          background: var(--border-light);
          margin: 8px 0;
        }
        .profile-nav-item.logout-item {
          border-radius: 0;
          color: var(--danger);
        }
        .theme-toggle-switch {
          width: 40px;
          height: 22px;
          background: var(--border-medium);
          border-radius: 11px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }
        .theme-toggle-switch.on {
          background: var(--brand-red);
        }
        .theme-toggle-knob {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.3s var(--ease-premium);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .theme-toggle-switch.on .theme-toggle-knob {
          transform: translateX(18px);
        }
        .profile-nav-item.logout-item:hover {
          background: rgba(226,55,68,0.06);
        }
        .profile-nav-item.logout-item.active {
          background: var(--danger);
          color: #fff;
          border-radius: 10px;
        }

        .profile-panel {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid var(--border-light);
          padding: 28px;
          min-height: 400px;
          transition: opacity 0.3s var(--ease-premium), transform 0.3s var(--ease-premium);
        }
        .profile-panel.switching {
          opacity: 0;
          transform: translateY(12px) scale(0.98);
        }
        .profile-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .profile-panel-header h2 {
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .profile-panel-header h2 svg {
          color: var(--brand-red);
        }

        .premium-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .premium-field label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
        }
        .premium-field input,
        .premium-field textarea {
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          background: #fafafa;
          transition: all 0.25s var(--ease-premium);
        }
        .premium-field input:focus,
        .premium-field textarea:focus {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08);
        }
        .premium-field input:disabled,
        .premium-field textarea:disabled {
          background: var(--bg-surface);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.7;
        }

        .profile-info-display {
          display: grid;
          gap: 20px;
        }
        .profile-info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .info-item {
          padding: 16px 18px;
          background: var(--bg-surface);
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }
        .info-item .info-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }
        .info-item .info-label svg {
          color: var(--brand-red);
        }
        .info-item .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .btn-edit:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        .btn-save {
          padding: 12px 28px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(247,55,79,0.25);
          align-self: flex-start;
        }
        .btn-save:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(247,55,79,0.35);
        }
        .btn-save:active {
          transform: translateY(0);
        }

        .address-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .addr-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
          position: relative;
        }
        .addr-card:hover {
          border-color: rgba(247,55,79,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transform: translateY(-2px);
        }
        .addr-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .addr-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.55;
          margin: 0;
        }
        .addr-card-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }
        .addr-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .addr-delete-btn:hover {
          color: var(--danger);
          background: rgba(226,55,68,0.06);
        }
        .addr-add-card {
          border: 1.5px dashed var(--border-medium);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.25s var(--ease-premium);
          min-height: 140px;
          background: transparent;
        }
        .addr-add-card:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.02);
          transform: translateY(-2px);
        }

        .addr-form-card {
          background: var(--bg-surface);
          border: 1.5px solid var(--brand-red);
          border-radius: 14px;
          padding: 20px;
        }

        .order-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-card-item {
          border: 1px solid var(--border-light);
          border-radius: 14px;
          padding: 20px;
          transition: all 0.25s var(--ease-premium);
        }
        .order-card-item:hover {
          border-color: rgba(247,55,79,0.15);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .order-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 12px;
        }
        .order-card-shop h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .order-card-shop span {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .order-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .order-status-pill.pending {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .order-status-pill.preparing {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .order-items {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 14px;
        }
        .order-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order-total {
          font-weight: 700;
          font-size: 1rem;
        }

        .load-more-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .load-more-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.03);
        }

        @media (max-width: 900px) {
          .profile-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .profile-nav {
            display: flex;
            overflow-x: auto;
            padding: 6px;
            gap: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .profile-nav-item {
            white-space: nowrap;
            flex-shrink: 0;
            padding: 10px 14px;
            font-size: 0.85rem;
          }
          .profile-nav-item.logout-item {
            margin-top: 0;
            border-top: none;
            padding-top: 10px;
          }
          .profile-cover {
            padding: 24px 20px;
          }
          .cover-info h1 { font-size: 1.3rem; }
        }

        @media (max-width: 768px) {
          .address-grid {
            grid-template-columns: 1fr;
          }
          .profile-info-row {
            grid-template-columns: 1fr;
          }
          .profile-panel {
            padding: 20px;
          }
        }
      `}</style>

      <div className="profile-wrap">
        {/* Cover Banner */}
        <div className="profile-cover">
          <div className="profile-cover-inner">
            <div className="cover-avatar">
              {profileData.username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="cover-info">
              <h1>{profileData.username}</h1>
              <p>Welcome back, {profileData.username.split(' ')[0]}!</p>
              <div className="cover-email">
                <Mail size={13} /> {profileData.email}
              </div>
            </div>
          </div>
        </div>

        {/* Body: Nav + Content */}
        <div className="profile-body">
          {/* Sidebar Nav */}
          <nav className="profile-nav">
            <button
              className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('orders')}
            >
              <ClipboardList size={16} /> Orders
            </button>
            <button
              className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('addresses')}
            >
              <MapPin size={16} /> Addresses
            </button>
            <button
              className={`profile-nav-item ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('details')}
            >
              <User size={16} /> Account
            </button>
            <div className="profile-nav-divider" />
            <button onClick={toggleTheme} className="profile-nav-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
              <span className={`theme-toggle-switch ${darkMode ? 'on' : ''}`}>
                <span className="theme-toggle-knob" />
              </span>
            </button>
            <button onClick={logout} className="profile-nav-item logout-item">
              <LogOut size={16} /> Sign Out
            </button>
          </nav>

          {/* Content Panel */}
          <main ref={contentRef} className={`profile-panel ${tabSwitching ? 'switching' : ''}`}>
            {activeTab === 'details' && (
              <div>
                <div className="profile-panel-header">
                  <h2><User size={20} /> Account Information</h2>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} className="btn-edit">
                      <Edit size={14} /> Edit Profile
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleProfileSave} className="profile-form" style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '540px' }}>
                    <div className="profile-info-row">
                      <div className="premium-field">
                        <label>Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileData.username}
                          onChange={e => setProfileData({...profileData, username: e.target.value})}
                        />
                      </div>
                      <div className="premium-field">
                        <label>Email Address</label>
                        <input
                          type="email"
                          disabled
                          value={profileData.email}
                        />
                      </div>
                    </div>
                    <div className="premium-field">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={profileData.mobile}
                        onChange={e => setProfileData({...profileData, mobile: e.target.value})}
                      />
                    </div>
                    <div className="premium-field">
                      <label>Default Address</label>
                      <textarea
                        rows={3}
                        required
                        value={profileData.address}
                        onChange={e => setProfileData({...profileData, address: e.target.value})}
                      ></textarea>
                      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => detectLocation('profile')}
                          style={{
                            alignSelf: 'flex-start',
                            padding: '9px 16px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            background: 'var(--brand-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 2px 8px rgba(247,55,79,0.2)'
                          }}
                          onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(247,55,79,0.3)'; }}
                          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 2px 8px rgba(247,55,79,0.2)'; }}
                        >
                          <MapPin size={13} /> {geocoding ? 'Detecting...' : 'Auto-Detect Location'}
                        </button>
                        <div
                          ref={mapRef}
                          style={{
                            height: '180px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-medium)',
                            zIndex: 1
                          }}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-save" disabled={loading}>
                      {loading ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite', marginRight: 4 }} /> Saving...</> : 'Save Changes'}
                    </button>
                  </form>
                ) : (
                  <div className="profile-info-display">
                    <div className="profile-info-row">
                      <div className="info-item">
                        <div className="info-label"><User size={13} /> Full Name</div>
                        <div className="info-value">{profileData.username}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label"><Mail size={13} /> Email</div>
                        <div className="info-value">{profileData.email}</div>
                      </div>
                    </div>
                    <div className="profile-info-row">
                      <div className="info-item">
                        <div className="info-label"><Phone size={13} /> Mobile</div>
                        <div className="info-value">{profileData.mobile || 'Not provided'}</div>
                      </div>
                      <div className="info-item">
                        <div className="info-label"><Clock size={13} /> Member Since</div>
                        <div className="info-value">2025</div>
                      </div>
                    </div>
                    <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="info-label"><MapPin size={13} /> Default Address</div>
                      <div className="info-value" style={{ fontWeight: 500, fontSize: '0.95rem' }}>{profileData.address}</div>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield size={18} color="var(--brand-red)" /> Role & Access
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {user?.role !== 'restaurant_admin' && (
                      <button
                        onClick={() => handleRoleUpgradeRequest('restaurant_admin')}
                        disabled={roleUpgrade.loading}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', border: '1px solid var(--brand-red)',
                          borderRadius: '10px', background: 'transparent',
                          color: 'var(--brand-red)', fontWeight: 700, fontSize: '0.85rem',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <Building2 size={16} /> Partner With Us
                      </button>
                    )}
                    {user?.role !== 'delivery_partner' && (
                      <button
                        onClick={() => handleRoleUpgradeRequest('delivery_partner')}
                        disabled={roleUpgrade.loading}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '10px 18px', border: '1px solid #4bc0c0',
                          borderRadius: '10px', background: 'transparent',
                          color: '#4bc0c0', fontWeight: 700, fontSize: '0.85rem',
                          cursor: 'pointer', transition: 'all 0.2s'
                        }}
                      >
                        <Bike size={16} /> Ride With Us
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="profile-panel-header">
                  <h2><MapPin size={20} /> Saved Addresses</h2>
                </div>

                <div className="address-grid">
                  {addresses.map((a) => (
                    <div key={a.id} className="addr-card">
                      <div className="addr-card-badge">
                        <MapPin size={11} /> {a.type}
                      </div>
                      <p>{a.address}</p>
                      <div className="addr-card-actions">
                        <button onClick={() => handleDeleteAddress(a.id)} className="addr-delete-btn">
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {showAddressForm ? (
                    <form onSubmit={handleAddAddress} className="addr-form-card">
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Address Label</label>
                        <select
                          value={newAddressType}
                          onChange={e => setNewAddressType(e.target.value)}
                          className="premium-select"
                          style={{ width: '100%' }}
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: '14px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Full Address</label>
                        <textarea
                          rows={2}
                          required
                          value={newAddressText}
                          onChange={e => setNewAddressText(e.target.value)}
                          placeholder="House No, Building Name, Street, Landmark"
                          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border-medium)', borderRadius: '10px', fontFamily: 'inherit', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.25s var(--ease-premium)', background: '#fff' }}
                          onFocus={e => e.target.style.borderColor = 'var(--brand-red)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border-medium)'}
                        ></textarea>
                        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <button
                            type="button"
                            onClick={() => detectLocation('newAddress')}
                            style={{
                              alignSelf: 'flex-start',
                              padding: '9px 16px',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              background: 'var(--brand-red)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              transition: 'transform 0.2s',
                              boxShadow: '0 2px 8px rgba(247,55,79,0.2)'
                            }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(247,55,79,0.3)'; }}
                            onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 2px 8px rgba(247,55,79,0.2)'; }}
                          >
                            <MapPin size={13} /> {geocoding ? 'Detecting...' : 'Auto-Detect Location'}
                          </button>
                          <div
                            ref={mapRef}
                            style={{
                              height: '160px',
                              borderRadius: '10px',
                              border: '1px solid var(--border-medium)',
                              zIndex: 1
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setShowAddressForm(false)} style={{ padding: '9px 16px', border: '1.5px solid var(--border-medium)', background: 'transparent', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.target.style.borderColor = 'var(--brand-red)'; e.target.style.color = 'var(--brand-red)'; }}
                          onMouseLeave={e => { e.target.style.borderColor = ''; e.target.style.color = ''; }}
                        >Cancel</button>
                        <button type="submit" style={{ padding: '9px 20px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(247,55,79,0.2)' }}
                          onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(247,55,79,0.3)'; }}
                          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 2px 8px rgba(247,55,79,0.2)'; }}
                        >Save Address</button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setShowAddressForm(true)} className="addr-add-card">
                      <Plus size={28} style={{ marginBottom: '10px', strokeWidth: 2 }} />
                      <span style={{ fontWeight: 600 }}>Add New Address</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="profile-panel-header">
                  <h2><Package size={20} /> Past Orders</h2>
                </div>

                <div className="order-timeline">
                  {ordersLoading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                      <Loader size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                      <p style={{ fontWeight: 600 }}>Loading your order history...</p>
                    </div>
                  ) : pastOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <ShoppingBag size={32} style={{ strokeWidth: 1.5, color: 'var(--text-muted)' }} />
                      </div>
                      <p style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px' }}>No Orders Yet</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Hungry? Your orders will appear here.</p>
                      <button onClick={() => navigate('/')} style={{ padding: '10px 24px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Browse Restaurants</button>
                    </div>
                  ) : (
                    <>
                      {visiblePastOrders.map((o) => {
                        const statusClass = (o.status || '').toLowerCase() === 'delivered' ? '' : (o.status || '').toLowerCase() === 'pending' ? 'pending' : (o.status || '').toLowerCase() === 'preparing' ? 'preparing' : '';
                        return (
                          <div key={o.id} className="order-card-item">
                            <div className="order-card-top">
                              <div className="order-card-shop">
                                <h4>{o.restaurantName}</h4>
                                <span><Calendar size={12} /> {o.date || 'Recent'} &bull; ID: {o.id}</span>
                              </div>
                              <div className={`order-status-pill ${statusClass}`}>
                                <CheckCircle size={11} /> {o.status || 'Delivered'}
                              </div>
                            </div>
                            <div className="order-items">
                              {o.items.map((item, i) => (
                                <span key={i}>{item.name} &times; {item.qty}{i < o.items.length - 1 ? ', ' : ''}</span>
                              ))}
                            </div>
                            <div className="order-card-bottom">
                              <span className="order-total">&#8377;{(o.total || 0).toFixed(2)}</span>
                              {o.status && o.status.toLowerCase() !== 'delivered' ? (
                                <button
                                  onClick={() => navigate(`/track-order?orderId=${o.id}`)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 18px',
                                    background: 'var(--success)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(96, 178, 70, 0.2)'
                                  }}
                                  onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(96, 178, 70, 0.35)'; }}
                                  onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 2px 8px rgba(96, 178, 70, 0.2)'; }}
                                >
                                  <MapPin size={13} /> Track Live
                                </button>
                              ) : (
                                <button
                                  disabled={reordering}
                                  onClick={() => handleReorder(o.items)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 18px',
                                    background: 'var(--brand-red)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: reordering ? 'not-allowed' : 'pointer',
                                    opacity: reordering ? 0.7 : 1,
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(247,55,79,0.2)'
                                  }}
                                  onMouseEnter={e => { if (!reordering) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(247,55,79,0.35)'; }}}
                                  onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 2px 8px rgba(247,55,79,0.2)'; }}
                                >
                                  {reordering ? <><Loader size={13} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</> : <><ShoppingBag size={13} /> Reorder</>}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      {hasMorePastOrders && (
                        <div className="load-more-wrap">
                          <button
                            type="button"
                            className="load-more-btn"
                            onClick={() => setVisibleOrderCount(count => count + ORDERS_PAGE_SIZE)}
                          >
                            Show more orders ({pastOrders.length - visibleOrderCount} remaining) <ArrowRight size={14} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
