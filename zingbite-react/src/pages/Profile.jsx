import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight,
  Bike,
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Edit3,
  Home,
  IndianRupee,
  Loader,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Package,
  Phone,
  Plus,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Trash2,
  User,
  WalletCards
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { useTheme } from '../context/ThemeContext';
import useLeaflet from '../hooks/useLeaflet';
import useSSE from '../hooks/useSSE';
import '../styles/profile.css';

const ORDERS_PAGE_SIZE = 5;
const DEFAULT_MAP_CENTER = [12.9716, 77.5946];

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const getText = (value, fallback = '') => {
  const text = String(value ?? '').trim();
  return text || fallback;
};

const capitalizeWordStarts = (value) => (
  String(value || '').replace(/(^|\s)(\S)/g, (_, space, char) => `${space}${char.toUpperCase()}`)
);

const formatMoney = (value) => {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount) ? amount.toFixed(2) : '0.00';
};

const normalizeStatus = (status) => String(status || 'Delivered').trim().toUpperCase().replace(/[\s-]/g, '_');

const getStatusClass = (status) => {
  const normalized = normalizeStatus(status).toLowerCase();
  if (normalized.includes('delivered')) return 'delivered';
  if (normalized.includes('pending') || normalized.includes('placed')) return 'pending';
  if (normalized.includes('preparing') || normalized.includes('ready')) return 'preparing';
  if (normalized.includes('cancel')) return 'cancelled';
  return 'active';
};

const getInitials = (name) => {
  const cleanName = getText(name, 'Guest User');
  return cleanName
    .split(/\s+/)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const getOrderId = (order) => {
  const rawId = order?.id || order?.orderId || '';
  if (!rawId) return 'ZB';
  return String(rawId).startsWith('ZB-') ? String(rawId) : `ZB-${rawId}`;
};

const Profile = () => {
  const { user, logout, updateUser, loading: authLoading } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { showAlert } = useModal();
  const { darkMode, toggleTheme } = useTheme();
  const { leafletLoaded, L } = useLeaflet();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [roleUpgrade, setRoleUpgrade] = useState({ action: '', loading: false });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [visibleOrderCount, setVisibleOrderCount] = useState(ORDERS_PAGE_SIZE);
  const [pastOrders, setPastOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: user?.userName || user?.username || 'Guest User',
    email: user?.email || 'guest@zingbite.com',
    mobile: String(user?.phoneNumber || user?.mobile || ''),
    address: user?.address || 'Address not saved',
    latitude: toNumber(user?.latitude),
    longitude: toNumber(user?.longitude),
    city: user?.city || ''
  });
  const [addresses, setAddresses] = useState(() => {
    const saved = user?.email ? localStorage.getItem(`addresses_${user.email}`) : null;
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', address: user?.address || '123 Main Street, Indiranagar, Bangalore' },
      { id: 2, type: 'Work', address: '456 Tech Park, Whitefield, Bangalore' }
    ];
  });
  const [newAddress, setNewAddress] = useState({
    type: 'Other',
    address: '',
    latitude: null,
    longitude: null,
    city: ''
  });

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const isFetchingOrdersRef = useRef(false);

  const userName = profileData.username;
  const firstName = userName.split(' ')[0] || 'there';
  const commandTitle = capitalizeWordStarts(`${firstName}'s command center`);
  const deliveredOrders = useMemo(() => (
    pastOrders.filter(order => normalizeStatus(order.status) === 'DELIVERED').length
  ), [pastOrders]);
  const activeOrders = useMemo(() => (
    pastOrders.filter(order => !['DELIVERED', 'CANCELLED'].includes(normalizeStatus(order.status))).length
  ), [pastOrders]);
  const totalSpend = useMemo(() => (
    pastOrders.reduce((sum, order) => {
      const amount = Number(order.total ?? order.totalAmount ?? 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0)
  ), [pastOrders]);
  const primaryAddress = addresses[0]?.address || profileData.address || 'Address not saved';
  const visiblePastOrders = pastOrders.slice(0, visibleOrderCount);
  const hasMorePastOrders = visibleOrderCount < pastOrders.length;

  const fetchPastOrders = useCallback(async (isBackground = false) => {
    if (isFetchingOrdersRef.current) return;
    isFetchingOrdersRef.current = true;
    if (!isBackground) setOrdersLoading(true);
    try {
      const res = await axios.get('/api/orders');
      setPastOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching past orders:', err);
    } finally {
      if (!isBackground) setOrdersLoading(false);
      isFetchingOrdersRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    setProfileData({
      username: user.userName || user.username || 'Guest User',
      email: user.email || 'guest@zingbite.com',
      mobile: String(user.phoneNumber || user.mobile || ''),
      address: user.address || 'Address not saved',
      latitude: toNumber(user.latitude),
      longitude: toNumber(user.longitude),
      city: user.city || ''
    });
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(addresses));
    }
  }, [addresses, user?.email]);

  useEffect(() => {
    if (user) {
      fetchPastOrders(false);
    }
  }, [fetchPastOrders, user]);

  const profileSsePath = window.location.pathname.startsWith('/zingbite')
    ? '/zingbite/api/stream?topic=user_orders'
    : '/api/stream?topic=user_orders';

  useSSE(user ? profileSsePath : null, () => {
    fetchPastOrders(true);
  }, { enabled: !!user });

  const reverseGeocode = async (lat, lng, targetField) => {
    setGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      const data = await response.json();
      if (!data?.display_name) return;
      const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || '';
      if (targetField === 'profile') {
        setProfileData(prev => ({ ...prev, address: data.display_name, latitude: lat, longitude: lng, city }));
      } else {
        setNewAddress(prev => ({ ...prev, address: data.display_name, latitude: lat, longitude: lng, city }));
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
    } finally {
      setGeocoding(false);
    }
  };

  const detectLocation = (targetField) => {
    if (!navigator.geolocation) {
      showAlert('Geolocation is not supported by your browser.', 'error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16);
          markerRef.current?.setLatLng([latitude, longitude]);
        }
        reverseGeocode(latitude, longitude, targetField);
      },
      (err) => showAlert(`Error retrieving location: ${err.message}`, 'error')
    );
  };

  const mapTarget = activeTab === 'account' && isEditing
    ? 'profile'
    : activeTab === 'addresses' && showAddressForm
      ? 'newAddress'
      : null;

  useEffect(() => {
    if (!mapTarget || !leafletLoaded || !L || !mapRef.current) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return undefined;
    }

    if (mapInstanceRef.current) return undefined;

    const initLat = mapTarget === 'profile'
      ? profileData.latitude ?? DEFAULT_MAP_CENTER[0]
      : newAddress.latitude ?? DEFAULT_MAP_CENTER[0];
    const initLng = mapTarget === 'profile'
      ? profileData.longitude ?? DEFAULT_MAP_CENTER[1]
      : newAddress.longitude ?? DEFAULT_MAP_CENTER[1];

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([initLat, initLng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([initLat, initLng], { draggable: true }).addTo(map);
    markerRef.current = marker;

    const updateLocation = (lat, lng) => reverseGeocode(lat, lng, mapTarget);
    marker.on('dragend', () => {
      const latLng = marker.getLatLng();
      updateLocation(latLng.lat, latLng.lng);
    });
    map.on('click', (event) => {
      marker.setLatLng(event.latlng);
      updateLocation(event.latlng.lat, event.latlng.lng);
    });

    setTimeout(() => map.invalidateSize(), 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [L, leafletLoaded, mapTarget]);

  const handleProfileSave = async (event) => {
    event.preventDefault();
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
        showAlert('Profile updated successfully.', 'success');
      }
    } catch (err) {
      showAlert(err.response?.data?.error || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = (event) => {
    event.preventDefault();
    if (!newAddress.address.trim()) return;
    setAddresses(prev => [...prev, {
      id: Date.now(),
      type: newAddress.type,
      address: newAddress.address,
      latitude: newAddress.latitude,
      longitude: newAddress.longitude,
      city: newAddress.city
    }]);
    setNewAddress({ type: 'Other', address: '', latitude: null, longitude: null, city: '' });
    setShowAddressForm(false);
  };

  const handleReorder = async (orderItems = []) => {
    setReordering(true);
    try {
      for (const item of orderItems) {
        await addToCart(item.id, item.qty || item.quantity || 1);
      }
      navigate('/cart');
    } catch (err) {
      console.error(err);
      showAlert('Error during reordering. Please try again.', 'error');
    } finally {
      setReordering(false);
    }
  };

  const handleRoleUpgradeRequest = async (targetRole) => {
    setRoleUpgrade({ action: targetRole, loading: true });
    try {
      if (targetRole === 'restaurant_admin') {
        navigate('/partner-with-us');
        return;
      }
      if (targetRole === 'delivery_partner') {
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

  const openTab = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setShowAddressForm(false);
  };

  if (authLoading) {
    return (
      <div className="profile-page-loader">
        <Loader size={36} className="spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <main className="profile-guest page-enter">
        <div className="profile-guest-icon"><User size={46} /></div>
        <h1>Please log in</h1>
        <p>Log in to view your profile dashboard, saved addresses, and past orders.</p>
        <button type="button" className="profile-primary-btn" onClick={() => navigate('/login?redirect=/profile')}>
          Log in now <ArrowRight size={16} />
        </button>
      </main>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', Icon: User },
    { id: 'orders', label: 'Orders', Icon: Package },
    { id: 'addresses', label: 'Addresses', Icon: MapPin },
    { id: 'account', label: 'Account', Icon: ShieldCheck }
  ];

  return (
    <main className="zb-profile page-enter">
      <section className="profile-command-band">
        <div className="profile-command-copy">
          <span className="profile-eyebrow"><ShieldCheck size={15} /> ZingBite profile</span>
          <h1>{commandTitle}</h1>
          <p>Manage orders, addresses, access, and delivery preferences from one polished account workspace.</p>
        </div>
        <div className="profile-identity-panel">
          <div className="profile-avatar">{getInitials(userName)}</div>
          <div>
            <h2>{userName}</h2>
            <span><Mail size={14} /> {profileData.email}</span>
          </div>
          <button type="button" className="profile-icon-btn" onClick={() => openTab('account')} aria-label="Edit profile">
            <Edit3 size={18} />
          </button>
        </div>
      </section>

      <nav className="profile-tabs" aria-label="Profile sections">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`profile-tab ${activeTab === id ? 'active' : ''}`}
            onClick={() => openTab(id)}
          >
            <Icon size={17} />
            <span>{label}</span>
          </button>
        ))}
        <button type="button" className="profile-tab profile-theme-tab" onClick={toggleTheme}>
          {darkMode ? <Moon size={17} /> : <Sun size={17} />}
          <span>{darkMode ? 'Dark' : 'Light'}</span>
        </button>
        <button type="button" className="profile-tab profile-logout-tab" onClick={logout}>
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </nav>

      {activeTab === 'overview' && (
        <section className="profile-section profile-overview">
          <div className="profile-metric-grid">
            <article className="profile-metric tone-red">
              <span><Package size={18} /></span>
              <small>Total orders</small>
              <strong>{pastOrders.length}</strong>
            </article>
            <article className="profile-metric tone-green">
              <span><CheckCircle size={18} /></span>
              <small>Delivered</small>
              <strong>{deliveredOrders}</strong>
            </article>
            <article className="profile-metric tone-cyan">
              <span><Clock size={18} /></span>
              <small>Active runs</small>
              <strong>{activeOrders}</strong>
            </article>
            <article className="profile-metric tone-amber">
              <span><IndianRupee size={18} /></span>
              <small>Lifetime spend</small>
              <strong>&#8377;{formatMoney(totalSpend)}</strong>
            </article>
          </div>

          <div className="profile-overview-grid">
            <section className="profile-info-band">
              <div className="profile-section-heading">
                <div>
                  <span>Account snapshot</span>
                  <h2>Profile readiness</h2>
                </div>
                <button type="button" className="profile-secondary-btn" onClick={() => openTab('account')}>
                  Edit <ChevronRight size={16} />
                </button>
              </div>
              <div className="profile-detail-list">
                <div>
                  <Mail size={16} />
                  <span>Email</span>
                  <strong>{profileData.email}</strong>
                </div>
                <div>
                  <Phone size={16} />
                  <span>Mobile</span>
                  <strong>{profileData.mobile || 'Not provided'}</strong>
                </div>
                <div>
                  <MapPin size={16} />
                  <span>Primary address</span>
                  <strong>{primaryAddress}</strong>
                </div>
                <div>
                  <CreditCard size={16} />
                  <span>Account role</span>
                  <strong>{String(user.role || 'customer').replace(/_/g, ' ')}</strong>
                </div>
              </div>
            </section>

            <section className="profile-actions-band">
              <div className="profile-section-heading">
                <div>
                  <span>Fast actions</span>
                  <h2>What would you like to do?</h2>
                </div>
              </div>
              <div className="profile-action-list">
                <button type="button" onClick={() => openTab('orders')}>
                  <ReceiptText size={18} />
                  <span>Review past orders</span>
                  <ChevronRight size={16} />
                </button>
                <button type="button" onClick={() => openTab('addresses')}>
                  <MapPin size={18} />
                  <span>Manage delivery addresses</span>
                  <ChevronRight size={16} />
                </button>
                <button type="button" onClick={() => handleRoleUpgradeRequest('restaurant_admin')}>
                  <Building2 size={18} />
                  <span>Partner with ZingBite</span>
                  <ChevronRight size={16} />
                </button>
                <button type="button" onClick={() => handleRoleUpgradeRequest('delivery_partner')}>
                  <Bike size={18} />
                  <span>Ride with ZingBite</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>
          </div>
        </section>
      )}

      {activeTab === 'orders' && (
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>Order history</span>
              <h2>Your ZingBite receipts</h2>
            </div>
            <button type="button" className="profile-primary-btn compact" onClick={() => navigate('/')}>
              Browse menu <ArrowRight size={15} />
            </button>
          </div>

          {ordersLoading ? (
            <div className="profile-empty-state">
              <Loader size={28} className="spin" />
              <p>Loading your order history...</p>
            </div>
          ) : pastOrders.length === 0 ? (
            <div className="profile-empty-state">
              <ShoppingBag size={34} />
              <h3>No orders yet</h3>
              <p>Your completed and active orders will appear here.</p>
            </div>
          ) : (
            <div className="profile-order-list">
              {visiblePastOrders.map((order) => {
                const statusClass = getStatusClass(order.status);
                const isDelivered = normalizeStatus(order.status) === 'DELIVERED';
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <article key={getOrderId(order)} className="profile-order-item">
                    <div className="profile-order-main">
                      <div className="profile-order-icon"><Package size={18} /></div>
                      <div>
                        <h3>{order.restaurantName || 'ZingBite Kitchen'}</h3>
                        <p>
                          <Calendar size={13} />
                          {order.date || 'Recent'} <span>ID {getOrderId(order)}</span>
                        </p>
                        {items.length > 0 && (
                          <div className="profile-order-items">
                            {items.slice(0, 4).map((item, index) => (
                              <span key={`${item.id || item.name || index}-${index}`}>
                                {item.name || 'Menu item'} x {item.qty || item.quantity || 1}
                              </span>
                            ))}
                            {items.length > 4 && <span>+{items.length - 4} more</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="profile-order-side">
                      <span className={`profile-status-pill ${statusClass}`}>
                        <CheckCircle size={12} /> {String(order.status || 'Delivered').replace(/_/g, ' ')}
                      </span>
                      <strong>&#8377;{formatMoney(order.total ?? order.totalAmount)}</strong>
                      {isDelivered ? (
                        <button type="button" className="profile-secondary-btn" disabled={reordering} onClick={() => handleReorder(items)}>
                          {reordering ? <Loader size={14} className="spin" /> : <ShoppingBag size={14} />}
                          Reorder
                        </button>
                      ) : (
                        <button type="button" className="profile-primary-btn compact" onClick={() => navigate(`/track-order?orderId=${getOrderId(order)}`)}>
                          Track <MapPin size={14} />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
              {hasMorePastOrders && (
                <div className="profile-load-more">
                  <button type="button" className="profile-secondary-btn" onClick={() => setVisibleOrderCount(count => count + ORDERS_PAGE_SIZE)}>
                    Show more orders ({pastOrders.length - visibleOrderCount} left) <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {activeTab === 'addresses' && (
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>Delivery points</span>
              <h2>Saved addresses</h2>
            </div>
            <button type="button" className="profile-primary-btn compact" onClick={() => setShowAddressForm(prev => !prev)}>
              <Plus size={15} /> Add address
            </button>
          </div>

          <div className="profile-address-grid">
            {addresses.map((address) => (
              <article key={address.id} className="profile-address-item">
                <div className="profile-address-icon">
                  {address.type === 'Home' ? <Home size={18} /> : <MapPin size={18} />}
                </div>
                <span>{address.type}</span>
                <p>{address.address}</p>
                {address.city && <small>{address.city}</small>}
                <button type="button" className="profile-icon-btn danger" onClick={() => setAddresses(prev => prev.filter(item => item.id !== address.id))} aria-label={`Remove ${address.type} address`}>
                  <Trash2 size={16} />
                </button>
              </article>
            ))}
          </div>

          {showAddressForm && (
            <form className="profile-form-grid profile-address-form" onSubmit={handleAddAddress}>
              <label>
                <span>Label</span>
                <select value={newAddress.type} onChange={event => setNewAddress(prev => ({ ...prev, type: event.target.value }))}>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="wide">
                <span>Full address</span>
                <textarea
                  required
                  rows={3}
                  value={newAddress.address}
                  onChange={event => setNewAddress(prev => ({ ...prev, address: event.target.value }))}
                  placeholder="House no, building, street, landmark"
                />
              </label>
              <div className="profile-map-tool wide">
                <button type="button" className="profile-secondary-btn" onClick={() => detectLocation('newAddress')}>
                  <MapPin size={15} /> {geocoding ? 'Detecting...' : 'Auto-detect location'}
                </button>
                <div ref={mapRef} className="profile-map" />
              </div>
              <div className="profile-form-actions wide">
                <button type="button" className="profile-secondary-btn" onClick={() => setShowAddressForm(false)}>Cancel</button>
                <button type="submit" className="profile-primary-btn compact">Save address</button>
              </div>
            </form>
          )}
        </section>
      )}

      {activeTab === 'account' && (
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>Account settings</span>
              <h2>Identity and access</h2>
            </div>
            <button type="button" className="profile-secondary-btn" onClick={() => setIsEditing(prev => !prev)}>
              <Edit3 size={15} /> {isEditing ? 'Cancel edit' : 'Edit profile'}
            </button>
          </div>

          {isEditing ? (
            <form className="profile-form-grid" onSubmit={handleProfileSave}>
              <label>
                <span>Full name</span>
                <input
                  required
                  value={profileData.username}
                  onChange={event => setProfileData(prev => ({ ...prev, username: event.target.value }))}
                />
              </label>
              <label>
                <span>Email</span>
                <input value={profileData.email} disabled />
              </label>
              <label>
                <span>Mobile</span>
                <input
                  value={profileData.mobile}
                  onChange={event => setProfileData(prev => ({ ...prev, mobile: event.target.value }))}
                  placeholder="Phone number"
                />
              </label>
              <label className="wide">
                <span>Default address</span>
                <textarea
                  rows={3}
                  value={profileData.address}
                  onChange={event => setProfileData(prev => ({ ...prev, address: event.target.value }))}
                  placeholder="Add your default delivery address"
                />
              </label>
              <div className="profile-map-tool wide">
                <button type="button" className="profile-secondary-btn" onClick={() => detectLocation('profile')}>
                  <MapPin size={15} /> {geocoding ? 'Detecting...' : 'Auto-detect location'}
                </button>
                <div ref={mapRef} className="profile-map" />
              </div>
              <div className="profile-form-actions wide">
                <button type="submit" className="profile-primary-btn" disabled={loading}>
                  {loading ? <Loader size={15} className="spin" /> : <ShieldCheck size={15} />}
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-detail-list">
              <div>
                <User size={16} />
                <span>Full name</span>
                <strong>{profileData.username}</strong>
              </div>
              <div>
                <Mail size={16} />
                <span>Email</span>
                <strong>{profileData.email}</strong>
              </div>
              <div>
                <Phone size={16} />
                <span>Mobile</span>
                <strong>{profileData.mobile || 'Not provided'}</strong>
              </div>
              <div>
                <WalletCards size={16} />
                <span>Role</span>
                <strong>{String(user.role || 'customer').replace(/_/g, ' ')}</strong>
              </div>
              <div className="wide">
                <MapPin size={16} />
                <span>Default address</span>
                <strong>{profileData.address}</strong>
              </div>
            </div>
          )}

          <div className="profile-access-grid">
            {user?.role !== 'restaurant_admin' && (
              <button type="button" onClick={() => handleRoleUpgradeRequest('restaurant_admin')} disabled={roleUpgrade.loading}>
                <Building2 size={18} />
                <span>
                  <strong>Restaurant partner</strong>
                  Open a ZingBite kitchen profile
                </span>
                <ChevronRight size={16} />
              </button>
            )}
            {user?.role !== 'delivery_partner' && (
              <button type="button" onClick={() => handleRoleUpgradeRequest('delivery_partner')} disabled={roleUpgrade.loading}>
                <Bike size={18} />
                <span>
                  <strong>Delivery partner</strong>
                  Start accepting delivery runs
                </span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
