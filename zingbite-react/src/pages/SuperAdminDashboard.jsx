import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  Users, Store, ShoppingBag, IndianRupee, Briefcase, 
  FileText, Plus, CheckCircle, XCircle, AlertTriangle, 
  Loader, Shield, UserCheck, Check, X, FileCheck2, LogOut
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();

  const [activeTab, setActiveTab] = useState('metrics');
  const [data, setData] = useState({
    userCount: 0,
    restaurantCount: 0,
    orderCount: 0,
    totalRevenue: 0,
    users: [],
    applications: [],
    restaurantRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Action triggers
  const [actionLoading, setActionLoading] = useState(null);

  // Forms state
  const [restaurantForm, setRestaurantForm] = useState({ name: '', cuisine: '', address: '', deliveryTime: '', imagePath: '' });
  const [jobForm, setJobForm] = useState({ title: '', department: '', location: '', description: '' });
  const [submittingRest, setSubmittingRest] = useState(false);
  const [submittingJob, setSubmittingJob] = useState(false);

  const fetchAdminData = async (isBackground = false) => {
    try {
      const res = await axios.get('/api/super-admin');
      setData(res.data);
      if (!isBackground) setError(null);
    } catch (err) {
      console.error(err);
      if (!isBackground) {
        setError(err.response?.data?.error || 'Access denied or failed to load super admin stats.');
      }
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login?redirect=/admin');
      return;
    }
    fetchAdminData(false);
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchAdminData(true);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, [user, authLoading]);

  const handleChangeRole = async (targetUserId, newRole) => {
    setActionLoading(`role-${targetUserId}`);
    try {
      await axios.post('/api/super-admin', {
        action: 'changeUserRole',
        userId: targetUserId,
        role: newRole
      });
      await fetchAdminData();
    } catch (err) {
      showAlert('Failed to update user role.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateAppStatus = async (appId, newStatus) => {
    setActionLoading(`app-${appId}`);
    try {
      await axios.post('/api/super-admin', {
        action: 'updateApplicationStatus',
        appId,
        status: newStatus
      });
      await fetchAdminData();
    } catch (err) {
      showAlert('Failed to update application status.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReviewRestaurant = async (requestId, decision) => {
    setActionLoading(`req-${requestId}`);
    try {
      await axios.post('/api/super-admin', {
        action: 'reviewRestaurant',
        requestId,
        status: decision
      });
      showAlert(`Restaurant Request successfully ${decision}!`, 'success');
      await fetchAdminData();
    } catch (err) {
      showAlert('Failed to review restaurant request.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    if (!restaurantForm.name || !restaurantForm.cuisine || !restaurantForm.address) {
      showAlert('Please fill out all required fields.', 'warning');
      return;
    }
    setSubmittingRest(true);
    try {
      await axios.post('/api/super-admin', {
        action: 'addRestaurant',
        name: restaurantForm.name,
        cuisine: restaurantForm.cuisine,
        address: restaurantForm.address,
        deliveryTime: restaurantForm.deliveryTime || undefined,
        imagePath: restaurantForm.imagePath || undefined
      });
      showAlert('Restaurant added successfully!', 'success');
      setRestaurantForm({ name: '', cuisine: '', address: '', deliveryTime: '', imagePath: '' });
      await fetchAdminData();
    } catch (err) {
      showAlert('Failed to create restaurant.', 'error');
    } finally {
      setSubmittingRest(false);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.department || !jobForm.location || !jobForm.description) {
      showAlert('Please fill out all required fields.', 'warning');
      return;
    }
    setSubmittingJob(true);
    try {
      await axios.post('/api/super-admin', {
        action: 'addJob',
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location,
        description: jobForm.description
      });
      showAlert('Job listing published successfully!', 'success');
      setJobForm({ title: '', department: '', location: '', description: '' });
      await fetchAdminData();
    } catch (err) {
      showAlert('Failed to create job posting.', 'error');
    } finally {
      setSubmittingJob(false);
    }
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
        <AlertTriangle size={48} style={{ color: 'var(--brand-red)', marginBottom: '16px', margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Access Restricted</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>{error}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button 
            onClick={() => navigate('/login?redirect=/admin')} 
            className="btn-primary" 
            style={{ width: 'auto', padding: '10px 20px', fontSize: '0.9rem', borderRadius: '4px' }}
          >
            Switch Account
          </button>
          <button 
            onClick={async () => { await logout(); navigate('/login?redirect=/admin'); }} 
            className="portal-logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Separate pending requests
  const pendingRequests = (data.restaurantRequests || []).filter(r => r.status === 'Pending');
  const reviewedRequests = (data.restaurantRequests || []).filter(r => r.status !== 'Pending');

  return (
    <>
      <style>{`
        .admin-container {
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
        .stat-icon.red { background: rgba(247,55,79,0.08); color: var(--brand-red); }
        .stat-icon.blue { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .stat-icon.green { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .stat-icon.purple { background: rgba(153,102,255,0.08); color: #9966ff; }
        .stat-number { font-size: 1.8rem; font-weight: 800; line-height: 1.1; margin-top: 4px; }
        
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
        .admin-table-wrapper {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow-x: auto;
          box-shadow: var(--shadow-sm);
          margin-bottom: 32px;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          background: var(--bg-surface);
          padding: 16px;
          font-weight: 700;
          border-bottom: 1px solid var(--border-medium);
          font-size: 0.9rem;
        }
        .admin-table td {
          padding: 16px;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.9rem;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        .role-selector {
          padding: 6px 10px;
          border: 1px solid var(--border-medium);
          border-radius: 4px;
          font-size: 0.85rem;
          background: white;
          outline: none;
          font-weight: 600;
        }
        .role-selector:focus {
          border-color: var(--brand-red);
        }
        .management-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        .form-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 28px;
          box-shadow: var(--shadow-sm);
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
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
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
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-primary:hover {
          background: var(--brand-red-hover);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge.applied { background: rgba(54,162,235,0.08); color: #36a2eb; }
        .badge.interview { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.offered { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        .badge.rejected { background: rgba(226,55,68,0.08); color: var(--danger); }
        .badge.pending { background: rgba(255,159,64,0.08); color: #ff9f40; }
        .badge.approved { background: rgba(75,192,192,0.08); color: #4bc0c0; }
        
        .request-card {
          background: white;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: var(--shadow-sm);
        }
        .doc-verify-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: var(--bg-surface);
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-top: 14px;
        }
        .doc-item {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .doc-item strong {
          color: var(--text-primary);
          display: block;
          margin-top: 2px;
          font-family: monospace;
        }
        @media (max-width: 600px) {
          .doc-verify-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .form-card {
            padding: 16px;
          }
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
      `}</style>

      <div className="admin-container fade-in">
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={32} style={{ color: 'var(--brand-red)' }} />
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Super Admin Command Center</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>Site statistics, role allocation, and listings management.</p>
            </div>
          </div>
          <button 
            onClick={async () => { await logout(); navigate('/login?redirect=/admin'); }} 
            className="portal-logout-btn"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Global Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon red"><Users size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Users</span>
              <div className="stat-number">{data.userCount}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><Store size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Restaurants</span>
              <div className="stat-number">{data.restaurantCount}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><ShoppingBag size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Orders Placed</span>
              <div className="stat-number">{data.orderCount}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><IndianRupee size={24} /></div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Gross Revenue</span>
              <div className="stat-number">&#8377;{data.totalRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tab-bar">
          <button 
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`} 
            onClick={() => setActiveTab('metrics')}
          >
            Overview & Creators
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`} 
            onClick={() => setActiveTab('requests')}
          >
            Restaurant Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => setActiveTab('users')}
          >
            Users Control ({data.users.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`} 
            onClick={() => setActiveTab('applications')}
          >
            Applications Review ({data.applications.length})
          </button>
        </div>

        {/* Tab Layouts */}
        {activeTab === 'metrics' && (
          <div className="management-grid">
            {/* Add Restaurant Form */}
            <div className="form-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Store size={20} style={{ color: 'var(--brand-red)' }} /> Register New Restaurant (Direct)
              </h2>
              <form onSubmit={handleAddRestaurant}>
                <div className="form-group">
                  <label>Restaurant Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Royal Biryani House"
                    value={restaurantForm.name}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Cuisine Type *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. North Indian, Mughlai"
                    value={restaurantForm.cuisine}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, cuisine: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Full Address *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Street, City, State"
                    value={restaurantForm.address}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Time (e.g., "35 mins")</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 30 mins"
                    value={restaurantForm.deliveryTime}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, deliveryTime: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    value={restaurantForm.imagePath}
                    onChange={(e) => setRestaurantForm(prev => ({ ...prev, imagePath: e.target.value }))}
                  />
                </div>
                <button type="submit" disabled={submittingRest} className="btn-primary" style={{ width: '100%' }}>
                  {submittingRest ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Add Restaurant'}
                </button>
              </form>
            </div>

            {/* Add Job Form */}
            <div className="form-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={20} style={{ color: 'var(--brand-red)' }} /> Publish New Job Opening
              </h2>
              <form onSubmit={handleAddJob}>
                <div className="form-group">
                  <label>Job Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Operations Manager"
                    value={jobForm.title}
                    onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Department *</label>
                  <select 
                    required 
                    value={jobForm.department}
                    onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Culinary">Culinary</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Bangalore, KA (or Remote)"
                    value={jobForm.location}
                    onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label>Job Description *</label>
                  <textarea 
                    required 
                    rows="4" 
                    placeholder="Outline job responsibilities, skills needed, compensation details..."
                    value={jobForm.description}
                    onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <button type="submit" disabled={submittingJob} className="btn-primary" style={{ width: '100%' }}>
                  {submittingJob ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : 'Publish Job Listing'}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>Pending Approvals ({pendingRequests.length})</h2>
            
            {pendingRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed var(--border-medium)', borderRadius: '12px', background: '#fff', marginBottom: '32px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No pending restaurant onboarding requests found.</p>
              </div>
            ) : (
              <div style={{ marginBottom: '32px' }}>
                {pendingRequests.map(req => (
                  <div key={req.id} className="request-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{req.restaurantName}</h3>
                          <span className="badge pending">Pending verification</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Cuisine: {req.cuisineType} | Address: {req.address}</p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Submitted by Partner ID: #{req.adminId} on {req.submittedDate}</p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          disabled={actionLoading === `req-${req.id}`}
                          onClick={() => handleReviewRestaurant(req.id, 'Approved')}
                          className="btn-primary" 
                          style={{ background: 'var(--success)', padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <Check size={16} /> Approve
                        </button>
                        <button 
                          disabled={actionLoading === `req-${req.id}`}
                          onClick={() => handleReviewRestaurant(req.id, 'Rejected')}
                          className="btn-primary" 
                          style={{ background: 'var(--danger)', padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <X size={16} /> Reject
                        </button>
                      </div>
                    </div>

                    <div className="doc-verify-row">
                      <div className="doc-item">
                        License Certificate
                        <strong>{req.licenseNo}</strong>
                      </div>
                      <div className="doc-item">
                        GST Registration
                        <strong>{req.gstNo}</strong>
                      </div>
                      <div className="doc-item">
                        Aadhaar Number
                        <strong>{req.aadhaarNo}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '18px' }}>Log Registry (Reviewed)</h2>
            {reviewedRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed var(--border-medium)', borderRadius: '12px', background: '#fff' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Reviewed onboarding requests log will appear here.</p>
              </div>
            ) : (
              <div>
                {reviewedRequests.map(req => (
                  <div key={req.id} className="request-card" style={{ opacity: 0.8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontWeight: 800 }}>{req.restaurantName}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Address: {req.address}</p>
                      </div>
                      <span className={`badge ${req.status === 'Approved' ? 'approved' : 'rejected'}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Role Control</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((u) => (
                  <tr key={u.userID}>
                    <td style={{ fontWeight: 700 }}>#{u.userID}</td>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>{u.phoneNumber || 'N/A'}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <select 
                          className="role-selector"
                          value={u.role || 'customer'}
                          disabled={actionLoading === `role-${u.userID}`}
                          onChange={(e) => handleChangeRole(u.userID, e.target.value)}
                        >
                          <option value="customer">Customer</option>
                          <option value="delivery_partner">Delivery Partner</option>
                          <option value="restaurant_admin">Restaurant Admin</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                        {actionLoading === `role-${u.userID}` && (
                          <Loader size={14} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="admin-table-wrapper">
            {data.applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No applications received yet.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Target Role</th>
                    <th>Email / Phone</th>
                    <th>Applied Date</th>
                    <th>Resume</th>
                    <th>Status Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.applications.map((app) => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 700 }}>{app.candidateName}</td>
                      <td>{app.jobTitle}</td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>{app.email}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.phone}</div>
                      </td>
                      <td>{app.appliedDate}</td>
                      <td>
                        <a 
                          href={app.resumeUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
                        >
                          <FileText size={14} /> Resume
                        </a>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <select 
                            className="role-selector"
                            value={app.status || 'Applied'}
                            disabled={actionLoading === `app-${app.id}`}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          >
                            <option value="Applied">Applied</option>
                            <option value="Interview Scheduled">Interview</option>
                            <option value="Offer Extended">Offer</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          {actionLoading === `app-${app.id}` && (
                            <Loader size={14} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminDashboard;
