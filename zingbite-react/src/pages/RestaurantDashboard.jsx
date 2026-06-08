import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  Store, Utensils, ClipboardList, Plus, Search, 
  ToggleLeft, ToggleRight, CheckCircle2, ChevronRight, 
  MapPin, Phone, IndianRupee, Loader, AlertCircle, FileText, CheckCircle, LogOut 
} from 'lucide-react';

const RestaurantDashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const [activeTab, setActiveTab] = useState('orders');
  const [data, setData] = useState({ restaurant: null, menu: [], orders: [], request: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Onboarding Form state
  const [onboardForm, setOnboardForm] = useState({
    name: '', cuisine: '', address: '', deliveryTime: '30 mins', imagePath: '',
    licenseNo: '', aadhaarNo: '', gstNo: ''
  });
  const [submittingOnboard, setSubmittingOnboard] = useState(false);

  // Modals & form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDish, setNewDish] = useState({ name: '', price: '', description: '', imagePath: '' });
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  
  // Search and filter states
  const [menuSearch, setMenuSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');

  const fetchRestaurantData = async (isBackground = false) => {
    try {
      const res = await axios.get('/api/restaurant-admin');
      setData(res.data);
      if (!isBackground) setError(null);
    } catch (err) {
      console.error(err);
      if (!isBackground) {
        setError(err.response?.data?.error || 'Failed to load restaurant data.');
      }
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login?redirect=/restaurant-admin');
      return;
    }
    if (user.role !== 'restaurant_admin' && user.role !== 'customer') {
      setError('Access Restricted. You are currently logged in as a ' + user.role + '. Only Restaurant Admins or onboarding partners can access this portal.');
      setLoading(false);
      return;
    }
    fetchRestaurantData(false);

    const eventSource = new EventSource('/api/stream?topic=restaurant_orders');
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.log("[ZingBite SSE] Received real-time restaurant dashboard update:", payload);
        
        // Play notification sound on new order
        if (payload && (payload.event === 'new_order' || payload.event === 'new_request')) {
          try {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav');
            audio.volume = 0.5;
            audio.play();
          } catch (audioErr) {
            console.log("Audio play blocked by browser autoplay policy:", audioErr);
          }
        }
        
        fetchRestaurantData(true);
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
  }, [user, authLoading]);

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!onboardForm.name || !onboardForm.cuisine || !onboardForm.address || !onboardForm.licenseNo || !onboardForm.aadhaarNo || !onboardForm.gstNo) {
      showAlert('Please fill out all required fields.', 'warning');
      return;
    }
    setSubmittingOnboard(true);
    try {
      await axios.post('/api/restaurant-admin', {
        action: 'submitRestaurantRequest',
        name: onboardForm.name,
        cuisine: onboardForm.cuisine,
        address: onboardForm.address,
        deliveryTime: onboardForm.deliveryTime,
        imagePath: onboardForm.imagePath || undefined,
        licenseNo: onboardForm.licenseNo,
        aadhaarNo: onboardForm.aadhaarNo,
        gstNo: onboardForm.gstNo
      });
      showAlert('Onboarding request submitted successfully! Super admin will verify your documents.', 'success');
      await fetchRestaurantData();
    } catch (err) {
      showAlert('Failed to submit onboarding request.', 'error');
    } finally {
      setSubmittingOnboard(false);
    }
  };

  const handleToggleAvailability = async (menuId, currentAvailable) => {
    try {
      await axios.post('/api/restaurant-admin', {
        action: 'toggleAvailability',
        menuId,
        isAvailable: !currentAvailable
      });
      setData(prev => ({
        ...prev,
        menu: (prev.menu || []).map(item => item.menuId === menuId ? { ...item, isAvailable: !currentAvailable } : item)
      }));
    } catch (err) {
      showAlert('Failed to update availability.', 'error');
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price || !newDish.description) {
      showAlert('Please fill out all required fields.', 'warning');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('/api/restaurant-admin', {
        action: 'addMenuItem',
        name: newDish.name,
        price: parseFloat(newDish.price),
        description: newDish.description,
        imagePath: newDish.imagePath || undefined,
        restaurantId: data.restaurant.restaurantId
      });
      setShowAddModal(false);
      setNewDish({ name: '', price: '', description: '', imagePath: '' });
      await fetchRestaurantData();
    } catch (err) {
      showAlert('Failed to add menu item.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setActionLoading(orderId);
    try {
      await axios.post('/api/restaurant-admin', {
        action: 'updateOrderStatus',
        orderId,
        status: newStatus
      });
      await fetchRestaurantData();
    } catch (err) {
      showAlert('Failed to update order status.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const renderOrderStepper = (o) => {
    const getStatusStep = (status) => {
      switch (status) {
        case 'Placed':
        case 'Accepted':
          return 0;
        case 'Preparing':
          return 1;
        case 'Waiting to Dispatch':
          return 2;
        case 'Out for Delivery':
          return 3;
        case 'Delivered':
          return 5;
        default:
          return 0;
      }
    };

    const currentStep = getStatusStep(o.status);

    const steps = [
      { key: 0, label: 'Placed', statusName: 'Accepted' },
      { key: 1, label: 'Preparing', statusName: 'Preparing', actionLabel: 'Start Cooking' },
      { key: 2, label: 'Food Ready', statusName: 'Waiting to Dispatch', actionLabel: 'Mark Ready' },
      { key: 3, label: 'Dispatched', statusName: 'Out for Delivery', actionLabel: 'Dispatch' },
      { key: 4, label: 'Delivered', statusName: 'Delivered' }
    ];

    return (
      <div className="premium-stepper-container">
        <div className="premium-stepper">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            const isPending = currentStep < idx;
            const isActionable = (idx === 1 && currentStep === 0) || 
                                 (idx === 2 && currentStep === 1) || 
                                 (idx === 3 && currentStep === 2);

            let nodeClass = 'stepper-node';
            if (isCompleted) nodeClass += ' completed';
            if (isActive) nodeClass += ' active';
            if (isPending) nodeClass += ' pending';
            if (isActionable) nodeClass += ' actionable';

            return (
              <React.Fragment key={step.key}>
                {idx > 0 && (
                  <div className={`stepper-line ${isCompleted || isActive ? 'active' : ''}`} />
                )}
                <div className={nodeClass}>
                  {isActionable ? (
                    <button
                      disabled={actionLoading === o.orderId}
                      onClick={() => handleUpdateOrderStatus(o.orderId, step.statusName)}
                      className="stepper-btn-node"
                      title={step.actionLabel}
                    >
                      {actionLoading === o.orderId ? (
                        <Loader className="spin" size={14} />
                      ) : (
                        idx === 1 ? <Utensils size={14} /> : 
                        idx === 2 ? <CheckCircle2 size={14} /> : 
                        <ChevronRight size={14} />
                      )}
                      <span className="stepper-btn-label">{step.actionLabel}</span>
                    </button>
                  ) : (
                    <div className="stepper-circle">
                      {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                    </div>
                  )}
                  <span className="stepper-label">{step.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '400px' }}>
        <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '32px', background: '#fff', border: '1px solid var(--border-medium)', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }} className="fade-in">
        <AlertCircle size={48} style={{ color: 'var(--brand-red)', marginBottom: '16px', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Access Restricted</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>{error}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={() => navigate('/login?redirect=/restaurant-admin')} 
            className="btn-primary" 
            style={{ width: 'auto', padding: '10px 20px', fontSize: '0.9rem', borderRadius: '4px' }}
          >
            Switch Account
          </button>
          <button 
            onClick={async () => { await logout(); navigate('/login?redirect=/restaurant-admin'); }} 
            className="portal-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const { restaurant, menu = [], orders = [], request } = data || {};

  const deliveredOrders = (orders || []).filter(o => (o.status || '').toLowerCase() === 'delivered');
  const activeOrdersCount = (orders || []).filter(o => (o.status || '').toLowerCase() !== 'delivered').length;
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = deliveredOrders.length > 0 ? (totalRevenue / deliveredOrders.length) : 0;

  // Onboarding Layout
  if (!restaurant) {
    const isPending = request && request.status === 'Pending';
    const isRejected = request && request.status === 'Rejected';

    return (
      <>
        <style>{`
          .onboard-container {
            max-width: 650px;
            margin: 48px auto;
            padding: 32px;
            background: #fff;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
          }
          .form-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          @media (max-width: 600px) {
            .onboard-container {
              padding: 20px 16px;
              margin: 24px 12px;
            }
            .form-row-2 {
              grid-template-columns: 1fr;
              gap: 12px;
            }
          }
          .form-title {
            font-size: 1.6rem;
            font-weight: 800;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .form-group {
            margin-bottom: 16px;
          }
          .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            font-size: 0.9rem;
          }
          .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border-medium);
            border-radius: var(--radius-sm);
            font-size: 0.95rem;
            outline: none;
          }
          .form-group input:focus, .form-group textarea:focus {
            border-color: var(--brand-red);
          }
          .btn-primary {
            background: var(--brand-red);
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: var(--radius-sm);
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background: var(--brand-red-hover);
          }
          .status-panel {
            text-align: center;
            padding: 40px 24px;
          }
        `}</style>

        <div className="onboard-container fade-in">
          {isPending ? (
            <div className="status-panel">
              <Loader size={48} style={{ animation: 'spin 2s linear infinite', color: '#ff9f40', margin: '0 auto 16px' }} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Onboarding Application Submitted</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Your application for <strong>{request.restaurantName}</strong> is currently pending. The Super Admin is reviewing your License (<strong>{request.licenseNo}</strong>), Aadhaar, and GST details.
              </p>
              <div style={{ background: 'rgba(255,159,64,0.06)', border: '1px solid rgba(255,159,64,0.2)', padding: '12px', borderRadius: '8px', marginTop: '20px', fontSize: '0.82rem', color: '#ff9f40', fontWeight: 700 }}>
                STATUS: PENDING SUPER ADMIN VERIFICATION
              </div>
            </div>
          ) : (
            <div>
              <div className="form-title">
                <Store size={26} style={{ color: 'var(--brand-red)' }} /> Partner Onboarding Application
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
                Register your kitchen on ZingBite. Provide business identification documents for verification to unlock your merchant portal.
              </p>

              {isRejected && (
                <div style={{ background: 'rgba(226,55,68,0.06)', border: '1px solid rgba(226,55,68,0.2)', padding: '14px', borderRadius: '8px', color: 'var(--danger)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '20px' }}>
                  <AlertCircle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                  Your previous request was rejected. Please check your document identifiers and re-submit details.
                </div>
              )}

              <form onSubmit={handleOnboardSubmit}>
                <div className="form-group">
                  <label>Restaurant Name *</label>
                  <input 
                    type="text" required placeholder="e.g. Punjabi Tadka Kitchen"
                    value={onboardForm.name} onChange={e => setOnboardForm({...onboardForm, name: e.target.value})}
                  />
                </div>
                <div className="form-row-2">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Cuisine Type *</label>
                    <input 
                      type="text" required placeholder="e.g. North Indian"
                      value={onboardForm.cuisine} onChange={e => setOnboardForm({...onboardForm, cuisine: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Avg Delivery Time *</label>
                    <input 
                      type="text" required placeholder="e.g. 35 mins"
                      value={onboardForm.deliveryTime} onChange={e => setOnboardForm({...onboardForm, deliveryTime: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Address *</label>
                  <input 
                    type="text" required placeholder="Street, City, State"
                    value={onboardForm.address} onChange={e => setOnboardForm({...onboardForm, address: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Image URL (Cover Banner)</label>
                  <input 
                    type="url" placeholder="https://images.unsplash.com/..."
                    value={onboardForm.imagePath} onChange={e => setOnboardForm({...onboardForm, imagePath: e.target.value})}
                  />
                </div>

                <div style={{ height: '1px', background: 'var(--border-medium)', margin: '20px 0' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} /> Licensing & Identification Verification
                </h3>

                <div className="form-group">
                  <label>FSSAI Food License Number *</label>
                  <input 
                    type="text" required placeholder="14-digit FSSAI Number"
                    value={onboardForm.licenseNo} onChange={e => setOnboardForm({...onboardForm, licenseNo: e.target.value})}
                  />
                </div>
                <div className="form-row-2">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Owner Aadhaar Number *</label>
                    <input 
                      type="text" required placeholder="12-digit Aadhaar"
                      value={onboardForm.aadhaarNo} onChange={e => setOnboardForm({...onboardForm, aadhaarNo: e.target.value})}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>GSTIN Registration Number *</label>
                    <input 
                      type="text" required placeholder="15-digit GSTIN"
                      value={onboardForm.gstNo} onChange={e => setOnboardForm({...onboardForm, gstNo: e.target.value})}
                    />
                  </div>
                </div>

                <button type="submit" disabled={submittingOnboard} className="btn-primary">
                  {submittingOnboard ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Submit Onboarding Request'}
                </button>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }

  const filteredMenu = (menu || []).filter(item => 
    ((item.menuName || '').toLowerCase().includes(menuSearch.toLowerCase())) || 
    ((item.description || '').toLowerCase().includes(menuSearch.toLowerCase()))
  );

  const filteredOrders = (orders || []).filter(order => {
    if (orderFilter === 'All') return true;
    return (order.status || '').toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <>
      <style>{`
        .admin-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 0 24px;
        }
        .restaurant-header-banner {
          position: relative;
          background-color: #1e1e24;
          color: white;
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 32px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          z-index: 1;
        }
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 100%);
          backdrop-filter: blur(6px);
          z-index: -1;
        }
        .banner-info-wrap {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .restaurant-img {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 4px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s ease;
        }
        .restaurant-img:hover {
          transform: scale(1.05);
        }
        .banner-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .banner-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .banner-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .banner-badge {
          background: var(--brand-red);
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.3);
        }
        .banner-subtext {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .banner-subtext span {
          line-height: 1;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: rgba(247, 55, 79, 0.2);
        }
        .kpi-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kpi-card.revenue .kpi-icon-wrap {
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .kpi-card.active-orders .kpi-icon-wrap {
          background: rgba(255, 159, 64, 0.1);
          color: #ff9f40;
        }
        .kpi-card.total-orders .kpi-icon-wrap {
          background: rgba(54, 162, 235, 0.1);
          color: #36a2eb;
        }
        .kpi-card.avg-value .kpi-icon-wrap {
          background: rgba(153, 102, 255, 0.1);
          color: #9966ff;
        }
        .kpi-info {
          display: flex;
          flex-direction: column;
        }
        .kpi-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .kpi-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-top: 2px;
        }
        .kpi-badge {
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 8px;
          text-transform: uppercase;
        }
        .kpi-badge.positive {
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
        }
        .kpi-badge.text {
          background: var(--bg-surface);
          color: var(--text-muted);
        }
        .kpi-badge.pulsing {
          background: rgba(226, 55, 68, 0.1);
          color: var(--danger);
          animation: pulseGlow 1.5s infinite;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0px rgba(226, 55, 68, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(226, 55, 68, 0); }
          100% { box-shadow: 0 0 0 0px rgba(226, 55, 68, 0); }
        }

        .dashboard-content-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 992px) {
          .dashboard-content-layout {
            grid-template-columns: 1fr;
          }
        }
        .main-content-area {
          min-width: 0;
        }
        .dashboard-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
        }
        .sidebar-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-light);
        }
        .profile-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .profile-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .profile-value {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .code-font {
          font-family: monospace;
          letter-spacing: 0.5px;
        }
        .stacked-bar-container {
          display: flex;
          height: 12px;
          border-radius: 6px;
          overflow: hidden;
          background: var(--bg-surface);
          margin-bottom: 16px;
        }
        .stacked-segment {
          height: 100%;
          transition: width 0.3s ease;
        }
        .stacked-segment.placed { background: #36a2eb; }
        .stacked-segment.cooking { background: #ff9f40; }
        .stacked-segment.ready { background: #ffcd56; }
        .stacked-segment.shipping { background: #9966ff; }
        .stacked-segment.delivered { background: #4bc0c0; }

        .stacked-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .legend-item .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .legend-item .dot.placed { background: #36a2eb; }
        .legend-item .dot.cooking { background: #ff9f40; }
        .legend-item .dot.ready { background: #ffcd56; }
        .legend-item .dot.shipping { background: #9966ff; }
        .legend-item .dot.delivered { background: #4bc0c0; }

        .tab-bar {
          display: flex;
          background: var(--bg-surface);
          border-radius: 30px;
          padding: 6px;
          margin-bottom: 28px;
          gap: 4px;
          max-width: fit-content;
          border: 1px solid var(--border-medium);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .tab-btn {
          background: transparent;
          border: none;
          padding: 10px 24px;
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }
        .tab-btn.active {
          background: white;
          color: var(--brand-red);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
        }
        .search-bar-container {
          display: flex;
          gap: 12px;
          margin-bottom: 28px;
          align-items: center;
          flex-wrap: wrap;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .search-input-wrapper input:focus {
          border-color: var(--brand-red);
        }
        .search-icon-inside {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .btn-primary {
          background: var(--brand-red);
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .menu-item-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
          transform: translateY(20px);
        }
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: rgba(247, 55, 79, 0.25);
        }
        .menu-item-img-wrapper {
          position: relative;
          height: 160px;
          width: 100%;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .menu-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .menu-item-card:hover .menu-item-img {
          transform: scale(1.08);
        }
        .menu-item-body {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .admin-toggle-switch {
          position: relative;
          width: 48px;
          height: 24px;
          background-color: var(--border-medium);
          border-radius: 12px;
          transition: background-color 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }
        .admin-toggle-switch.available {
          background-color: var(--success);
        }
        .admin-toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background-color: white;
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .admin-toggle-switch.available .admin-toggle-knob {
          transform: translateX(24px);
        }
        .animate-card {
          animation: cardFadeInUp 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) both;
        }
        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-left: 6px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .order-card.status-placed, .order-card.status-accepted { border-left-color: #36a2eb; }
        .order-card.status-preparing { border-left-color: #ff9f40; }
        .order-card.status-waiting-to-dispatch { border-left-color: #ffcd56; }
        .order-card.status-out-for-delivery { border-left-color: #9966ff; }
        .order-card.status-delivered { border-left-color: #4bc0c0; }

        .order-info-section {
          flex: 2;
          min-width: 280px;
        }
        .order-actions-section {
          flex: 1;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 12px;
        }
        .customer-info-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          padding: 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          transition: background-color var(--transition-fast);
        }
        .customer-info-box:hover {
          background: var(--bg-surface-hover);
        }
        .customer-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .customer-detail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 6px;
        }
        .call-customer-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(96, 178, 70, 0.1);
          color: var(--success);
          border: 1px solid rgba(96, 178, 70, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          margin-left: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        .call-customer-btn:hover {
          background: var(--success);
          color: white;
          box-shadow: 0 2px 6px rgba(96, 178, 70, 0.25);
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: white;
          padding: 32px;
          border-radius: var(--radius-lg);
          max-width: 500px;
          width: 100%;
          box-shadow: var(--shadow-lg);
        }
        .portal-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .portal-logout-btn:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
        }
        .portal-banner-logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 24px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.25s ease;
          z-index: 10;
        }
        .portal-banner-logout-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--brand-red);
        }
        .badge {
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.accepted { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.waiting-to-dispatch { background: rgba(255,206,86,0.08); color: #e09f00; }
        .badge.out-for-delivery { background: rgba(153,102,255,0.08); color: #9966ff; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .pill-filter {
          padding: 8px 16px;
          border: 1px solid var(--border-medium);
          border-radius: 24px;
          background: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.25s ease;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .pill-filter:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.02);
        }
        .pill-filter.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.2);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .premium-stepper-container {
          width: 100%;
          padding: 16px 8px 0;
          margin-top: 16px;
          border-top: 1px dashed var(--border-medium);
        }
        .premium-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 100%;
        }
        .stepper-line {
          flex: 1;
          height: 3px;
          background: var(--border-medium);
          margin: 0 -8px;
          transform: translateY(-12px);
          transition: background-color 0.3s ease;
        }
        .stepper-line.active {
          background: var(--success);
        }
        .stepper-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 5;
          min-width: 60px;
        }
        .stepper-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }
        .stepper-node.completed .stepper-circle {
          background: var(--success);
          border-color: var(--success);
          color: white;
        }
        .stepper-node.active .stepper-circle {
          background: white;
          border-color: var(--brand-red);
          color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.15);
          animation: nodePulse 1.5s infinite;
        }
        .stepper-node.pending .stepper-circle {
          background: var(--bg-surface);
          border-color: var(--border-medium);
          color: var(--text-muted);
        }
        .stepper-btn-node {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #4bc0c0 0%, #68d8d8 100%);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transform: translateY(-12px);
          box-shadow: 0 4px 10px rgba(75, 192, 192, 0.3);
          transition: all 0.2s ease;
          animation: actionPulseRider 2s infinite;
        }
        .stepper-btn-node:hover {
          transform: translateY(-14px) scale(1.05);
        }
        .stepper-btn-node:disabled {
          background: var(--border-medium);
          box-shadow: none;
          cursor: not-allowed;
        }
        .stepper-btn-label {
          white-space: nowrap;
        }
        .stepper-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-top: 6px;
          white-space: nowrap;
          text-align: center;
        }
        .stepper-node.completed .stepper-label,
        .stepper-node.active .stepper-label {
          color: var(--text-primary);
        }
        .stepper-node.actionable .stepper-label {
          margin-top: -6px;
          color: var(--text-primary);
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes nodePulse {
          0% { box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.3); }
          70% { box-shadow: 0 0 0 6px rgba(247, 55, 79, 0); }
          100% { box-shadow: 0 0 0 0px rgba(247, 55, 79, 0); }
        }
        @keyframes actionPulseRider {
          0% { transform: translateY(-12px) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); box-shadow: 0 6px 14px rgba(75, 192, 192, 0.4); }
          100% { transform: translateY(-12px) scale(1); }
        }
        @media (max-width: 768px) {
          .admin-container {
            margin: 20px auto;
            padding: 0 16px;
          }
          .restaurant-header-banner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 32px 20px;
            gap: 20px;
          }
          .banner-info-wrap {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;
          }
          .banner-details {
            align-items: center;
          }
          .banner-title-row {
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          .banner-title {
            font-size: 1.8rem;
          }
          .banner-subtext {
            justify-content: center;
            font-size: 0.88rem;
          }
          .tab-bar {
            max-width: 100%;
            width: 100%;
          }
          .tab-btn {
            flex: 1;
            text-align: center;
            padding: 10px 12px;
            font-size: 0.88rem;
          }
          .search-bar-container {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-input-wrapper {
            width: 100%;
            min-width: 100%;
          }
          .search-bar-container button {
            width: 100%;
            justify-content: center;
          }
          .order-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .order-info-section {
            min-width: 100%;
          }
          .order-actions-section {
            align-items: flex-start;
            min-width: 100%;
            text-align: left;
            margin-top: 8px;
          }
          .order-actions-section div {
            text-align: left !important;
          }
          .order-actions-section button {
            width: 100%;
          }
        }
        @media (max-width: 600px) {
          .modal-content {
            padding: 20px;
            margin: 12px;
          }
          .premium-stepper-container {
            padding: 12px 0 0;
          }
          .stepper-label {
            font-size: 0.65rem;
          }
          .stepper-btn-node {
            padding: 6px 10px;
            font-size: 0.72rem;
          }
        }
        @media (max-width: 480px) {
          .stepper-label {
            display: none;
          }
          .stepper-node {
            min-width: 32px;
          }
          .stepper-circle {
            width: 22px;
            height: 22px;
            font-size: 0.65rem;
          }
          .stepper-line {
            transform: translateY(-9px);
            height: 2px;
          }
          .stepper-btn-node {
            transform: translateY(-9px);
            padding: 4px 8px;
            font-size: 0.68rem;
          }
          @keyframes actionPulseRider {
            0% { transform: translateY(-9px) scale(1); }
            50% { transform: translateY(-9px) scale(1.03); box-shadow: 0 4px 10px rgba(75, 192, 192, 0.3); }
            100% { transform: translateY(-9px) scale(1); }
          }
        }
      `}</style>

      <div className="admin-container fade-in">
        {/* Banner */}
        {restaurant && (
          <div 
            className="restaurant-header-banner"
            style={{ 
              backgroundImage: `url(${restaurant.imagePath || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="banner-overlay" />
            <div className="banner-info-wrap">
              <img 
                src={restaurant.imagePath || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop';
                }}
                alt={restaurant.restaurantName} 
                className="restaurant-img" 
              />
              <div className="banner-details">
                <div className="banner-title-row">
                  <h1 className="banner-title">{restaurant.restaurantName}</h1>
                  <span className="banner-badge">Portal Admin</span>
                </div>
                <p className="banner-subtext">
                  <MapPin size={16} /> <span>{restaurant.address}</span>
                </p>
                {restaurant.cuisineType && (
                  <p className="banner-subtext" style={{ marginTop: '4px' }}>
                    <Utensils size={14} /> <span>Cuisine: {restaurant.cuisineType}</span>
                  </p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* KPI Stats Grid */}
        {restaurant && (
          <div className="kpi-grid">
            <div className="kpi-card revenue">
              <div className="kpi-icon-wrap">
                <IndianRupee size={20} />
              </div>
              <div className="kpi-info">
                <span className="kpi-label">Total Revenue</span>
                <h3 className="kpi-value">&#8377;{totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="kpi-badge positive">Delivered</div>
            </div>

            <div className="kpi-card active-orders">
              <div className="kpi-icon-wrap">
                <ClipboardList size={20} />
              </div>
              <div className="kpi-info">
                <span className="kpi-label">Active Orders</span>
                <h3 className="kpi-value">{activeOrdersCount}</h3>
              </div>
              <div className="kpi-badge pulsing">Live</div>
            </div>

            <div className="kpi-card total-orders">
              <div className="kpi-icon-wrap">
                <Store size={20} />
              </div>
              <div className="kpi-info">
                <span className="kpi-label">Total Orders</span>
                <h3 className="kpi-value">{orders.length}</h3>
              </div>
              <div className="kpi-badge text">Lifetime</div>
            </div>

            <div className="kpi-card avg-value">
              <div className="kpi-icon-wrap">
                <Utensils size={20} />
              </div>
              <div className="kpi-info">
                <span className="kpi-label">Avg Order Value</span>
                <h3 className="kpi-value">&#8377;{avgOrderValue.toFixed(2)}</h3>
              </div>
              <div className="kpi-badge text">Delivered</div>
            </div>
          </div>
        )}

        {/* Tab Bar */}
        <div className="tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} 
            onClick={() => setActiveTab('orders')}
          >
            Orders Manager
          </button>
          <button 
            className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} 
            onClick={() => setActiveTab('menu')}
          >
            Menu Manager
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === 'menu' && (
          <div className="fade-in">
            <div className="search-bar-container">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon-inside" />
                <input 
                  type="text" 
                  placeholder="Search dishes by name or description..." 
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                />
              </div>
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                <Plus size={18} /> Add Menu Item
              </button>
            </div>

            {filteredMenu.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No menu items found. Add some delicious dishes to get started!</p>
              </div>
            ) : (
              <div className="menu-grid">
                {filteredMenu.map((item, idx) => (
                  <div 
                    key={item.menuId} 
                    className="menu-item-card animate-card"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <div className="menu-item-img-wrapper">
                      <img 
                        src={item.imagePath || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'} 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop';
                        }}
                        alt={item.menuName} 
                        className="menu-item-img" 
                      />
                    </div>
                    <div className="menu-item-body">
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{item.menuName}</h4>
                          <span style={{ fontWeight: 800, color: 'var(--brand-red)', display: 'flex', alignItems: 'center' }}>
                            <IndianRupee size={14} />{item.price}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                          {item.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: item.isAvailable ? 'var(--success)' : 'var(--text-muted)' }}>
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                          <button 
                            className="toggle-container-btn"
                            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                            onClick={() => handleToggleAvailability(item.menuId, item.isAvailable)}
                            aria-label="Toggle availability"
                          >
                            <div className={`admin-toggle-switch ${item.isAvailable ? 'available' : ''}`}>
                              <div className="admin-toggle-knob" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="dashboard-content-layout fade-in">
            <div className="main-content-area">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="hide-scrollbar">
                {['All', 'Placed', 'Accepted', 'Preparing', 'Out for Delivery', 'Delivered'].map(status => (
                  <button 
                    key={status}
                    className={`pill-filter ${orderFilter === status ? 'active' : ''}`}
                    onClick={() => setOrderFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px', border: '1px dashed var(--border-medium)', borderRadius: '12px' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>No orders in this category.</p>
                </div>
              ) : (
                <div className="order-list">
                  {filteredOrders.map((o) => (
                    <div key={o.orderId} className={`order-card status-${(o.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="order-info-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>ID: {o.formattedId}</h3>
                          <span className={`badge ${(o.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                            {o.status}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ordered {o.time}</span>
                        </div>
                        
                        <div className="customer-info-box">
                          <div className="customer-name">
                            Customer: {o.userName}
                          </div>
                          <div className="customer-detail">
                            <Phone size={12} /> 
                            <span>{o.userPhone}</span>
                            <a href={`tel:${o.userPhone}`} className="call-customer-btn">
                              <Phone size={10} /> Call
                            </a>
                          </div>
                          <div className="customer-detail" style={{ alignItems: 'flex-start' }}>
                            <MapPin size={12} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                            <span>Address: {o.userAddress}</span>
                          </div>
                        </div>
                      </div>

                      <div className="order-actions-section">
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Amount Earned</span>
                          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            &#8377;{(o.total || 0).toFixed(2)}
                          </div>
                        </div>
                        
                        {o.riderName ? (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textAlign: 'right', marginTop: '8px' }}>
                            Rider: <strong>{o.riderName}</strong>
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.78rem', color: '#ff9f40', textAlign: 'right', marginTop: '8px', fontWeight: 600 }}>
                            Awaiting Rider Match...
                          </div>
                        )}
                      </div>

                      {renderOrderStepper(o)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            {restaurant && (
              <div className="dashboard-sidebar">
                <div className="sidebar-card">
                  <h3 className="sidebar-card-title">Kitchen Profile</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="profile-item">
                      <span className="profile-label">Average Delivery Time</span>
                      <span className="profile-value">{restaurant.deliveryTime || '30 mins'}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">Food License (FSSAI)</span>
                      <span className="profile-value code-font">{restaurant.licenseNo || '14-digit Number'}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">GSTIN ID</span>
                      <span className="profile-value code-font">{restaurant.gstNo || '15-digit ID'}</span>
                    </div>
                    <div className="profile-item">
                      <span className="profile-label">Owner Aadhaar</span>
                      <span className="profile-value code-font">
                        {restaurant.aadhaarNo ? `XXXX-XXXX-${restaurant.aadhaarNo.slice(-4)}` : 'XXXX-XXXX-XXXX'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3 className="sidebar-card-title">Order Status Summary</h3>
                  <div className="progress-bar-stacked">
                    {orders.length > 0 ? (
                      (() => {
                        const placed = orders.filter(o => ['placed', 'accepted'].includes((o.status || '').toLowerCase())).length;
                        const cooking = orders.filter(o => (o.status || '').toLowerCase() === 'preparing').length;
                        const ready = orders.filter(o => (o.status || '').toLowerCase() === 'waiting to dispatch').length;
                        const shipping = orders.filter(o => (o.status || '').toLowerCase() === 'out for delivery').length;
                        const delivered = orders.filter(o => (o.status || '').toLowerCase() === 'delivered').length;

                        const pct = (val) => ((val / orders.length) * 100).toFixed(1);

                        return (
                          <>
                            <div className="stacked-bar-container">
                              <div className="stacked-segment placed" style={{ width: `${pct(placed)}%` }} title={`Placed/Accepted: ${placed}`} />
                              <div className="stacked-segment cooking" style={{ width: `${pct(cooking)}%` }} title={`Preparing: ${cooking}`} />
                              <div className="stacked-segment ready" style={{ width: `${pct(ready)}%` }} title={`Ready: ${ready}`} />
                              <div className="stacked-segment shipping" style={{ width: `${pct(shipping)}%` }} title={`Out for Delivery: ${shipping}`} />
                              <div className="stacked-segment delivered" style={{ width: `${pct(delivered)}%` }} title={`Delivered: ${delivered}`} />
                            </div>
                            <div className="stacked-legend">
                              <div className="legend-item"><span className="dot placed"></span> Placed ({placed})</div>
                              <div className="legend-item"><span className="dot cooking"></span> Cooking ({cooking})</div>
                              <div className="legend-item"><span className="dot ready"></span> Ready ({ready})</div>
                              <div className="legend-item"><span className="dot shipping"></span> Out ({shipping})</div>
                              <div className="legend-item"><span className="dot delivered"></span> Delivered ({delivered})</div>
                            </div>
                          </>
                        );
                      })()
                    ) : (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No order data available yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add MenuItem Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px' }}>Add New Menu Item</h2>
            <form onSubmit={handleAddDish}>
              <div className="form-group">
                <label>Dish Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Garlic Butter Naan" 
                  value={newDish.name}
                  onChange={(e) => setNewDish(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Price (INR) *</label>
                <input 
                  type="number" 
                  required
                  step="0.01"
                  placeholder="e.g. 120.00" 
                  value={newDish.price}
                  onChange={(e) => setNewDish(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Describe the dish ingredients, taste, portion..." 
                  value={newDish.description}
                  onChange={(e) => setNewDish(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..." 
                  value={newDish.imagePath}
                  onChange={(e) => setNewDish(prev => ({ ...prev, imagePath: e.target.value }))}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button 
                  type="button" 
                  className="pill-filter" 
                  onClick={() => setShowAddModal(false)}
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: 'auto' }}
                >
                  {submitting ? (
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    'Add Item'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDashboard;
