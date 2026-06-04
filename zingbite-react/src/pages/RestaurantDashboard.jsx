import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Store, Utensils, ClipboardList, Plus, Search, 
  ToggleLeft, ToggleRight, CheckCircle2, ChevronRight, 
  MapPin, Phone, IndianRupee, Loader, AlertCircle, FileText, CheckCircle, LogOut 
} from 'lucide-react';

const RestaurantDashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

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
    if (user.role !== 'restaurant_admin') {
      setError('Access Restricted. You are currently logged in as a ' + user.role + '. Only Restaurant Admins can access this portal.');
      setLoading(false);
      return;
    }
    fetchRestaurantData(false);
    const interval = setInterval(() => fetchRestaurantData(true), 4000);
    return () => clearInterval(interval);
  }, [user, authLoading]);

  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    if (!onboardForm.name || !onboardForm.cuisine || !onboardForm.address || !onboardForm.licenseNo || !onboardForm.aadhaarNo || !onboardForm.gstNo) {
      alert('Please fill out all required fields.');
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
      alert('Onboarding request submitted successfully! Super admin will verify your documents.');
      await fetchRestaurantData();
    } catch (err) {
      alert('Failed to submit onboarding request.');
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
      alert('Failed to update availability.');
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price || !newDish.description) {
      alert('Please fill out all required fields.');
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
      alert('Failed to add menu item.');
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
      alert('Failed to update order status.');
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
          return 4;
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button 
              onClick={async () => { await logout(); navigate('/login?redirect=/restaurant-admin'); }} 
              className="portal-logout-btn"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
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
          margin: 32px auto;
          padding: 0 20px;
        }
        .restaurant-header-banner {
          background: linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%);
          color: white;
          border-radius: var(--radius-lg);
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .restaurant-img {
          width: 96px;
          height: 96px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 3px solid rgba(255,255,255,0.2);
        }
        .tab-bar {
          display: flex;
          border-bottom: 2px solid var(--border-light);
          margin-bottom: 24px;
          gap: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .tab-bar::-webkit-scrollbar {
          display: none;
        }
        .tab-btn {
          background: none;
          border: none;
          padding: 12px 4px;
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .tab-btn.active {
          color: var(--brand-red);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-red);
        }
        .search-bar-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
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
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .menu-item-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .menu-item-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .menu-item-img {
          height: 160px;
          width: 100%;
          object-fit: cover;
        }
        .menu-item-body {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .order-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 20px;
        }
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
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .portal-banner-logout-btn:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-1px);
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
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
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
          border-radius: 20px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .pill-filter.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .restaurant-header-banner {
            flex-direction: column;
            padding: 24px 16px;
            text-align: center;
            gap: 16px;
          }
          .restaurant-header-banner div {
            display: flex;
            flex-direction: column;
            align-items: center;
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
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff5263 100%);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transform: translateY(-12px);
          box-shadow: 0 4px 10px rgba(247, 55, 79, 0.3);
          transition: all 0.2s ease;
          animation: actionPulse 2s infinite;
        }
        .stepper-node.actionable:nth-of-type(3) .stepper-btn-node {
          background: linear-gradient(135deg, var(--brand-red) 0%, #ff5263 100%);
          box-shadow: 0 4px 10px rgba(247, 55, 79, 0.3);
        }
        .stepper-node.actionable:nth-of-type(5) .stepper-btn-node {
          background: linear-gradient(135deg, #ff9f40 0%, #ffbe7a 100%);
          box-shadow: 0 4px 10px rgba(255, 159, 64, 0.3);
        }
        .stepper-node.actionable:nth-of-type(7) .stepper-btn-node {
          background: linear-gradient(135deg, #9966ff 0%, #b38aff 100%);
          box-shadow: 0 4px 10px rgba(153, 102, 255, 0.3);
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
        @keyframes actionPulse {
          0% { transform: translateY(-12px) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); box-shadow: 0 6px 14px rgba(247, 55, 79, 0.4); }
          100% { transform: translateY(-12px) scale(1); }
        }
        @media (max-width: 600px) {
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
      `}</style>

      <div className="admin-container fade-in">
        {/* Banner */}
        {restaurant && (
          <div className="restaurant-header-banner" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <img 
                src={restaurant.imagePath || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop'} 
                alt={restaurant.restaurantName} 
                className="restaurant-img" 
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{restaurant.restaurantName}</h1>
                  <span className="badge out" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>Portal Admin</span>
                </div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '6px', margin: '6px 0 0 0' }}>
                  <MapPin size={14} /> {restaurant.address} | Cuisine: {restaurant.cuisineType}
                </p>
              </div>
            </div>
            <button 
              onClick={async () => { await logout(); navigate('/login?redirect=/restaurant-admin'); }} 
              className="portal-banner-logout-btn"
            >
              <LogOut size={16} /> Logout
            </button>
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
          <div>
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
                {filteredMenu.map((item) => (
                  <div key={item.menuId} className="menu-item-card">
                    <img 
                      src={item.imagePath || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'} 
                      alt={item.menuName} 
                      className="menu-item-img" 
                    />
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
                        <button 
                          className="toggle-btn" 
                          onClick={() => handleToggleAvailability(item.menuId, item.isAvailable)}
                        >
                          {item.isAvailable ? (
                            <>
                              <ToggleRight size={28} style={{ color: 'var(--success)' }} />
                              <span style={{ color: 'var(--success)' }}>Available</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={28} style={{ color: 'var(--text-muted)' }} />
                              <span style={{ color: 'var(--text-muted)' }}>Unavailable</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
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
                  <div key={o.orderId} className="order-card">
                    <div className="order-info-section">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>ID: {o.formattedId}</h3>
                        <span className={`badge ${(o.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                          {o.status}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ordered {o.time}</span>
                      </div>
                      
                      <div style={{ background: 'var(--bg-surface)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                          Customer: {o.userName}
                        </div>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          <Phone size={12} /> {o.userPhone}
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          <MapPin size={12} style={{ flexShrink: 0 }} /> Address: {o.userAddress}
                        </p>
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
