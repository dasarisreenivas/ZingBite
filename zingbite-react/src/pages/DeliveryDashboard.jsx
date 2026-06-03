import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bike, CheckCircle2, Navigation, IndianRupee, Loader, AlertTriangle, MapPin, ClipboardCheck, LogOut } from 'lucide-react';

const DeliveryDashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ available: [], active: [], completed: [], totalEarnings: 0, completedCount: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [simulators, setSimulators] = useState({});
  const [watchers, setWatchers] = useState({});

  const restaurantLat = 12.9716;
  const restaurantLng = 77.5946;
  const customerLat = 12.9821;
  const customerLng = 77.6085;
  const latDiff = customerLat - restaurantLat;
  const lngDiff = customerLng - restaurantLng;
  const denom = latDiff * latDiff + lngDiff * lngDiff;

  const calculateProgressFromCoords = (lat, lng) => {
    if (denom === 0) return 0;
    const dLat = lat - restaurantLat;
    const dLng = lng - restaurantLng;
    const fraction = (dLat * latDiff + dLng * lngDiff) / denom;
    return Math.max(0, Math.min(100, fraction * 100));
  };

  const handleUpdateGPS = async (orderId, progress, latitude = null, longitude = null) => {
    try {
      const payload = {
        action: 'updateGPS',
        orderId,
        progress
      };
      if (latitude !== null && longitude !== null) {
        payload.latitude = latitude;
        payload.longitude = longitude;
      }
      await axios.post('/api/delivery', payload);
      setData(prev => ({
        ...prev,
        active: (prev.active || []).map(a => a.orderId === orderId ? { 
          ...a, 
          gpsProgress: progress,
          gpsCoordinates: (latitude !== null) ? `${latitude.toFixed(5)},${longitude.toFixed(5)}` : a.gpsCoordinates
        } : a)
      }));
    } catch (err) {
      console.error("Failed to update GPS progress:", err);
    }
  };

  const toggleAutoSimulate = (orderId, currentProgress = 0) => {
    if (simulators[orderId]) {
      clearInterval(simulators[orderId]);
      setSimulators(prev => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } else {
      let prog = currentProgress >= 100 ? 0 : currentProgress;
      const intervalId = setInterval(async () => {
        prog = Math.min(100, prog + 5);
        await handleUpdateGPS(orderId, prog);
        if (prog >= 100) {
          clearInterval(intervalId);
          setSimulators(prev => {
            const copy = { ...prev };
            delete copy[orderId];
            return copy;
          });
        }
      }, 1200);

      setSimulators(prev => ({
        ...prev,
        [orderId]: intervalId
      }));
    }
  };

  const toggleWatchLocation = (orderId) => {
    if (watchers[orderId]) {
      navigator.geolocation.clearWatch(watchers[orderId]);
      setWatchers(prev => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } else {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser or is blocked in insecure contexts.");
        return;
      }
      
      // Geolocation API requires a secure context (HTTPS) or localhost
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        alert("🔒 Browser Security Block:\nReal-time device Geolocation API is restricted by modern browsers to Secure Contexts (HTTPS) or localhost.\n\nSince you are accessing via HTTP/IP, please use the 'Auto-Simulation' or manual range slider instead, or run the app on localhost/HTTPS.");
        return;
      }

      if (simulators[orderId]) {
        toggleAutoSimulate(orderId);
      }
      
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const progress = calculateProgressFromCoords(latitude, longitude);
          handleUpdateGPS(orderId, progress, latitude, longitude);
        },
        (error) => {
          console.error("Geolocation watch error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("❌ Geolocation Permission Denied:\nPlease allow location access in your browser settings to track live rider coordinates, or use the 'Auto-Simulation' / manual range slider instead.");
          } else {
            alert("Error retrieving geolocation: " + error.message);
          }
          // Stop watching
          setWatchers(prev => {
            const copy = { ...prev };
            delete copy[orderId];
            return copy;
          });
        },
        { enableHighAccuracy: true, maximumAge: 1000 }
      );
      
      setWatchers(prev => ({
        ...prev,
        [orderId]: watchId
      }));
    }
  };

  useEffect(() => {
    return () => {
      Object.values(simulators).forEach(id => clearInterval(id));
      Object.values(watchers).forEach(id => navigator.geolocation.clearWatch(id));
    };
  }, [simulators, watchers]);

  const fetchDeliveryData = async (isBackground = false) => {
    try {
      const res = await axios.get('/api/delivery');
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login?redirect=/delivery');
      return;
    }
    if (user.role !== 'delivery_partner') {
      setLoading(false);
      return;
    }
    fetchDeliveryData(false);
    const interval = setInterval(() => fetchDeliveryData(true), 4000);
    return () => clearInterval(interval);
  }, [user, authLoading]);

  const handleClaimRun = async (orderId) => {
    setActionLoading(orderId);
    try {
      await axios.post('/api/delivery', { action: 'acceptOrder', orderId });
      alert('Delivery run claimed successfully! It is now in your active runs feed.');
      await fetchDeliveryData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to claim delivery run. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (orderId, nextStatus) => {
    setActionLoading(orderId);
    try {
      await axios.post('/api/delivery', { orderId, status: nextStatus });
      await fetchDeliveryData();
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login?redirect=/delivery');
  };

  const renderRiderStepper = (o) => {
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
      { key: 0, label: 'Claimed' },
      { key: 1, label: 'Cooking' },
      { key: 2, label: 'Ready' },
      { key: 3, label: 'In Transit', targetStatus: 'Delivered', actionLabel: 'Deliver' },
      { key: 4, label: 'Delivered' }
    ];

    return (
      <div className="premium-stepper-container">
        <div className="premium-stepper">
          {steps.map((step, idx) => {
            const isCompleted = currentStep > idx;
            const isActive = currentStep === idx;
            const isPending = currentStep < idx;
            const isActionable = idx === 3 && currentStep === 3;

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
                      onClick={() => handleUpdateStatus(o.orderId, 'Delivered')}
                      className="stepper-btn-node"
                      title={step.actionLabel}
                    >
                      {actionLoading === o.orderId ? (
                        <Loader className="spin" size={14} />
                      ) : (
                        <CheckCircle2 size={14} />
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
        
        {currentStep === 0 && (
          <div style={{ padding: '8px 12px', background: 'rgba(54,162,235,0.04)', border: '1px solid rgba(54,162,235,0.1)', borderRadius: '6px', marginTop: '16px', fontSize: '0.78rem', color: '#36a2eb', fontWeight: 600, textAlign: 'center' }}>
            Waiting for restaurant to start cooking...
          </div>
        )}
        {currentStep === 1 && (
          <div style={{ padding: '8px 12px', background: 'rgba(255,159,64,0.04)', border: '1px solid rgba(255,159,64,0.1)', borderRadius: '6px', marginTop: '16px', fontSize: '0.78rem', color: '#ff9f40', fontWeight: 600, textAlign: 'center' }}>
            Kitchen is preparing the food...
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ padding: '8px 12px', background: 'rgba(255,206,86,0.04)', border: '1px solid rgba(255,206,86,0.1)', borderRadius: '6px', marginTop: '16px', fontSize: '0.78rem', color: '#e09f00', fontWeight: 600, textAlign: 'center' }}>
            Food is ready! Waiting for dispatch...
          </div>
        )}
        {currentStep === 3 && (
          <div style={{ padding: '8px 12px', background: 'rgba(75,192,192,0.04)', border: '1px solid rgba(75,192,192,0.1)', borderRadius: '6px', marginTop: '16px', fontSize: '0.78rem', color: '#4bc0c0', fontWeight: 600, textAlign: 'center' }}>
            In transit! Click "Deliver" above to complete.
          </div>
        )}
      </div>
    );
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
      </div>
    );
  }

  if (user && user.role !== 'delivery_partner') {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '32px', background: '#fff', border: '1px solid var(--border-medium)', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }} className="fade-in">
        <AlertTriangle size={48} style={{ color: 'var(--brand-red)', marginBottom: '16px', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Access Restricted</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>
          You do not have permission to access the Delivery Partner Portal. You are currently logged in as a <strong>{user.role}</strong>.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={() => navigate('/login?redirect=/delivery')} 
            className="action-btn claim" 
            style={{ width: 'auto', marginTop: 0, padding: '10px 20px', borderRadius: '4px' }}
          >
            Switch Account
          </button>
          <button 
            onClick={handleLogout} 
            className="portal-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .delivery-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: var(--shadow-sm);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        .section-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 16px; margin-top: 32px; }
        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }
        .delivery-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .delivery-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.placed { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.accepted { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.preparing { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.waiting-to-dispatch { background: rgba(255,206,86,0.08); color: #e09f00; }
        .badge.out-for-delivery { background: rgba(153,102,255,0.08); color: #9966ff; }
        .badge.delivered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .action-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .action-btn.claim { background: var(--brand-red); color: #fff; }
        .action-btn.claim:hover { background: var(--brand-red-hover); }
        .action-btn.start { background: #ff9f40; color: #fff; }
        .action-btn.start:hover { background: #e08b30; }
        .action-btn.out { background: #9966ff; color: #fff; }
        .action-btn.out:hover { background: #804ce6; }
        .action-btn.deliver { background: #4bc0c0; color: #fff; }
        .action-btn.deliver:hover { background: #38b0b0; }
        .empty-state {
          text-align: center;
          padding: 40px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          background: #fff;
        }
        .loc-box {
          background: var(--bg-surface);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          margin-top: 12px;
          font-size: 0.82rem;
          color: var(--text-secondary);
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
        @media (max-width: 600px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .dashboard-header span {
            align-self: flex-start;
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

      <div className="delivery-container fade-in">
        <div className="dashboard-header">
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Delivery Partner Portal</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Welcome back, {user?.userName || 'Delivery Rider'}!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge out" style={{ padding: '8px 16px', borderRadius: '20px', fontWeight: 700 }}>ACTIVE RIDER</span>
            <button onClick={handleLogout} className="portal-logout-btn">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><IndianRupee size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rider Earnings</span>
              <div className="stat-number">&#8377;{data.totalEarnings.toFixed(2)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><CheckCircle2 size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completed Trips</span>
              <div className="stat-number">{data.completedCount}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red"><Bike size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Runs</span>
              <div className="stat-number">{data.active.length}</div>
            </div>
          </div>
        </div>

        {/* Available Runs (Claim Feed) */}
        <h2 className="section-title">Available Delivery Runs ({data.available.length})</h2>
        {data.available.length === 0 ? (
          <div className="empty-state">
            <AlertTriangle size={32} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
            <p>No available delivery runs at the moment. Waiting for new customer orders...</p>
          </div>
        ) : (
          <div className="orders-grid">
            {data.available.map((o) => (
              <div key={o.orderId} className="delivery-card">
                <div>
                  <div className="delivery-card-header">
                    <span style={{ fontWeight: 800 }}>ID: {o.formattedId}</span>
                    <span className="badge placed">UNCLAIMED</span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{o.restaurantName}</h4>
                  
                  <div className="loc-box">
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} style={{ flexShrink: 0 }} /> Delivery to: <strong>{o.customerAddress}</strong>
                    </p>
                  </div>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                    Payout Incentives: <strong style={{ color: 'var(--success)' }}>&#8377;45.00</strong>
                  </p>
                </div>
                
                <button
                  disabled={actionLoading === o.orderId}
                  onClick={() => handleClaimRun(o.orderId)}
                  className="action-btn claim"
                >
                  {actionLoading === o.orderId ? (
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <><ClipboardCheck size={16} /> ACCEPT RUN</>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Active Deliveries */}
        <h2 className="section-title">My Active Tasks ({data.active.length})</h2>
        {data.active.length === 0 ? (
          <div className="empty-state" style={{ marginBottom: '32px' }}>
            <p>No active delivery runs claimed. Accept a run from the feed above!</p>
          </div>
        ) : (
          <div className="orders-grid">
            {data.active.map((o) => (
              <div key={o.orderId} className="delivery-card">
                <div>
                  <div className="delivery-card-header">
                    <span style={{ fontWeight: 800 }}>ID: {o.formattedId}</span>
                    <span className={`badge ${(o.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      {o.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{o.restaurantName}</h4>
                  
                  <div className="loc-box" style={{ background: '#f5f0ff' }}>
                    <p style={{ fontWeight: 700, marginBottom: '4px' }}>Customer: {o.customerName}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} style={{ flexShrink: 0 }} /> Address: {o.customerAddress}
                    </p>
                  </div>
                  
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                    Collect Amount: <strong>&#8377;{o.total.toFixed(2)}</strong> ({o.payment})
                  </p>
                </div>
                
                {renderRiderStepper(o)}

                {o.status === 'Out for Delivery' && (
                  <div style={{ marginTop: '20px', padding: '16px', background: '#fcfaff', border: '1px solid #dcd3ff', borderRadius: '8px' }}>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#9966ff', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', margin: '0 0 8px 0' }}>
                      <Bike size={16} /> Live GPS Telemetry & Geolocation
                    </h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px', margin: '0 0 12px 0' }}>
                      Route Progress: <strong>{(o.gpsProgress || 0).toFixed(0)}%</strong>
                      {simulators[o.orderId] && <span style={{ color: '#ff9f40', fontWeight: 700, marginLeft: '8px' }}>• Auto-Simulating...</span>}
                      {watchers[o.orderId] && <span style={{ color: '#2ec4b6', fontWeight: 700, marginLeft: '8px' }}>• Live GPS Active...</span>}
                    </p>

                    {o.gpsCoordinates && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '-6px 0 10px 0', fontFamily: 'monospace' }}>
                        Coords: {o.gpsCoordinates}
                      </p>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1"
                        value={o.gpsProgress || 0}
                        onChange={(e) => handleUpdateGPS(o.orderId, parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: '#9966ff', cursor: 'pointer' }}
                        disabled={!!simulators[o.orderId] || !!watchers[o.orderId]}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button 
                        onClick={() => toggleAutoSimulate(o.orderId, o.gpsProgress || 0)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background: simulators[o.orderId] ? '#ff9f40' : '#9966ff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          opacity: watchers[o.orderId] ? 0.5 : 1
                        }}
                        disabled={!!watchers[o.orderId]}
                      >
                        {simulators[o.orderId] ? 'STOP AUTO-SIMULATION' : 'START AUTO-SIMULATION'}
                      </button>

                      <button 
                        onClick={() => toggleWatchLocation(o.orderId)}
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          background: watchers[o.orderId] ? '#ff4d4f' : '#2ec4b6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Navigation size={12} className={watchers[o.orderId] ? 'animate-pulse' : ''} />
                        {watchers[o.orderId] ? 'STOP WATCHING REAL LOCATION' : 'USE REAL GEOLOCATION API'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Completed Deliveries */}
        <h2 className="section-title">Trip Log (Completed)</h2>
        {data.completed.length === 0 ? (
          <div className="empty-state">
            <p>Your completed delivery logs will show up here.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {data.completed.map((o) => (
              <div key={o.orderId} className="delivery-card" style={{ opacity: 0.8 }}>
                <div>
                  <div className="delivery-card-header">
                    <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>ID: {o.formattedId}</span>
                    <span className="badge delivered">{o.status}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 700 }}>{o.restaurantName}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Total Amount: &#8377;{o.total.toFixed(2)}</p>
                </div>
                <div style={{ marginTop: '16px', fontSize: '0.78rem', color: '#4bc0c0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> EARNINGS CREDITED (+&#8377;45.00)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveryDashboard;
