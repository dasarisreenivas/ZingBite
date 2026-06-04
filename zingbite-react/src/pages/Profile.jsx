import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  User, MapPin, ClipboardList, Trash2, Plus, LogOut, 
  CheckCircle, ShoppingBag, Edit, Calendar, IndianRupee, Loader, ArrowRight
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateUser, loading: authLoading } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.userName || user?.username || 'Guest User',
    email: user?.email || 'guest@zingbite.com',
    mobile: String(user?.phoneNumber || user?.mobile || ''),
    address: user?.address || '123 Main Street'
  });

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
  
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem(`addresses_${user?.email}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'Home', address: user?.address || '123 Main Street, Indiranagar, Bangalore' },
      { id: 2, type: 'Work', address: '456 Tech Park, Whitefield, Bangalore' }
    ];
  });

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(addresses));
    }
  }, [addresses, user?.email]);
  
  const [newAddressType, setNewAddressType] = useState('Other');
  const [newAddressText, setNewAddressText] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [reordering, setReordering] = useState(false);

  const [pastOrders, setPastOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

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
      const interval = setInterval(() => fetchPastOrders(true), 4000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/profile', {
        action: 'update',
        username: profileData.username,
        mobile: profileData.mobile,
        address: profileData.address
      });
      if (res.data.success) {
        updateUser(res.data.user);
        setIsEditing(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update profile');
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
      address: newAddressText
    }]);
    setNewAddressText('');
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleReorder = async (orderItems) => {
    setReordering(true);
    try {
      // Loop through items and add them to cart
      for (const item of orderItems) {
        await addToCart(item.id, item.qty);
      }
      navigate('/cart');
    } catch (err) {
      console.error(err);
      alert('Error during reordering. Please try again.');
    } finally {
      setReordering(false);
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
      <div className="profile-container empty-profile fade-in">
        <User size={80} color="var(--text-muted)" style={{ marginBottom: '20px' }} />
        <h2>Please Log In</h2>
        <p>Log in to view your profile dashboard, saved addresses, and past orders.</p>
        <button onClick={() => navigate('/login?redirect=/profile')} className="login-btn">LOG IN NOW</button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .profile-layout {
          max-width: 1200px;
          margin: 24px auto 48px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: start;
        }
        
        .profile-sidebar {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px 16px;
          box-shadow: var(--shadow-sm);
          text-align: center;
        }
        
        .profile-avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          font-size: 2.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          border: 2px solid rgba(247,55,79,0.15);
        }
        
        .profile-sidebar-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px;
        }
        
        .profile-sidebar-email {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 24px;
          word-break: break-all;
        }
        
        .profile-menu-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--border-light);
          padding-top: 20px;
        }
        
        .profile-menu-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-align: left;
        }
        
        .profile-menu-btn:hover {
          color: var(--brand-red);
          background: rgba(247,55,79,0.04);
        }
        
        .profile-menu-btn.active {
          color: #fff;
          background: var(--brand-red);
        }
        
        .profile-menu-btn.logout-btn {
          color: var(--danger);
          margin-top: 16px;
          border: 1px solid rgba(226, 55, 68, 0.15);
        }
        
        .profile-menu-btn.logout-btn:hover {
          background: rgba(226, 55, 68, 0.05);
        }
        
        .profile-content-area {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 32px;
          box-shadow: var(--shadow-sm);
          min-height: 480px;
        }
        
        .profile-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        
        .profile-content-header h2 {
          font-size: 1.6rem;
          margin: 0;
        }
        
        /* Edit profile form */
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 500px;
        }
        
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .profile-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .profile-field label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .profile-field input, 
        .profile-field textarea {
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          background: #fdfdfd;
        }
        
        .profile-field input:focus, 
        .profile-field textarea:focus {
          border-color: var(--brand-red);
          background: #fff;
        }
        
        .profile-field.disabled-field input {
          background: var(--bg-surface);
          color: var(--text-muted);
          cursor: not-allowed;
        }
        
        .profile-edit-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.85rem;
        }
        
        .profile-edit-trigger:hover {
          color: var(--brand-red);
          border-color: var(--brand-red);
        }
        
        .profile-save-btn {
          padding: 12px 24px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.95rem;
          align-self: flex-start;
        }
        
        .profile-save-btn:hover {
          background: var(--brand-red-hover);
        }
        
        /* Addresses style */
        .addresses-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .address-card {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .address-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .address-badge {
          background: rgba(247,55,79,0.08);
          color: var(--brand-red);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .address-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        
        .delete-address-btn {
          align-self: flex-end;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .delete-address-btn:hover {
          color: var(--danger);
        }
        
        .add-address-card {
          border: 1px dashed var(--border-medium);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.2s;
          min-height: 160px;
        }
        
        .add-address-card:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.01);
        }
        
        /* Past Orders */
        .orders-timeline {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .order-card {
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        
        .order-header-info {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 12px;
          margin-bottom: 12px;
        }
        
        .order-shop h4 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        
        .order-shop span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .order-amount-status {
          text-align: right;
        }
        
        .order-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          background: rgba(96, 178, 70, 0.08);
          color: var(--success);
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        
        .order-items-list {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        
        .order-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .order-total-lbl {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        .reorder-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .reorder-btn:hover:not(:disabled) {
          background: var(--brand-red-hover);
        }
        
        .reorder-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .track-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--success);
          color: #fff;
          border: none;
          font-weight: 700;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(96, 178, 70, 0.2);
        }
        
        .track-live-btn:hover {
          background: #50a037;
          box-shadow: 0 4px 12px rgba(96, 178, 70, 0.35);
        }
        
        .empty-profile {
          max-width: 500px;
          margin: 80px auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .empty-profile h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
        }
        
        .empty-profile p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        
        .login-btn {
          padding: 12px 32px;
          background: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
        }
        
        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .profile-content-area {
            padding: 24px;
          }
        }
        
        @media (max-width: 768px) {
          .addresses-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
      
      <div className="profile-layout fade-in">
        {/* Sidebar Info & Nav */}
        <aside className="profile-sidebar">
          <div className="profile-avatar-circle">
            {profileData.username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <h3 className="profile-sidebar-name">{profileData.username}</h3>
          <p className="profile-sidebar-email">{profileData.email}</p>
          
          <nav className="profile-menu-list">
            <button 
              className={`profile-menu-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ClipboardList size={16} /> Past Orders
            </button>
            <button 
              className={`profile-menu-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={16} /> Saved Addresses
            </button>
            <button 
              className={`profile-menu-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <User size={16} /> My Account
            </button>
            <button onClick={logout} className="profile-menu-btn logout-btn">
              <LogOut size={16} /> Log Out
            </button>
          </nav>
        </aside>

        {/* Dynamic Detail Content */}
        <main className="profile-content-area">
          {activeTab === 'details' && (
            <div>
              <div className="profile-content-header">
                <h2>Account Information</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="profile-edit-trigger">
                    <Edit size={14} /> Edit Profile
                  </button>
                )}
              </div>
              
              <form onSubmit={handleProfileSave} className="profile-form">
                <div className="form-row-2">
                  <div className="profile-field">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      disabled={!isEditing} 
                      value={profileData.username}
                      onChange={e => setProfileData({...profileData, username: e.target.value})}
                    />
                  </div>
                  <div className="profile-field disabled-field">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      disabled 
                      value={profileData.email}
                    />
                  </div>
                </div>

                <div className="profile-field">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    required 
                    disabled={!isEditing} 
                    value={profileData.mobile}
                    onChange={e => setProfileData({...profileData, mobile: e.target.value})}
                  />
                </div>

                <div className="profile-field">
                  <label>Default Address</label>
                  <textarea 
                    rows={3} 
                    required 
                    disabled={!isEditing} 
                    value={profileData.address}
                    onChange={e => setProfileData({...profileData, address: e.target.value})}
                  ></textarea>
                </div>
                
                {isEditing && (
                  <button type="submit" className="profile-save-btn">SAVE CHANGES</button>
                )}
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="profile-content-header">
                <h2>Manage Addresses</h2>
              </div>

              <div className="addresses-grid">
                {addresses.map((a) => (
                  <div key={a.id} className="address-card">
                    <div>
                      <div className="address-card-header">
                        <MapPin size={16} color="var(--brand-red)" />
                        <span className="address-badge">{a.type}</span>
                      </div>
                      <p>{a.address}</p>
                    </div>
                    <button onClick={() => handleDeleteAddress(a.id)} className="delete-address-btn">
                      <Trash2 size={16} /> Delete Address
                    </button>
                  </div>
                ))}

                {showAddressForm ? (
                  <form onSubmit={handleAddAddress} className="address-card" style={{ borderStyle: 'solid' }}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Address Label</label>
                      <select 
                        value={newAddressType}
                        onChange={e => setNewAddressType(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)' }}
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Address</label>
                      <textarea 
                        rows={2} 
                        required
                        value={newAddressText}
                        onChange={e => setNewAddressText(e.target.value)}
                        placeholder="House No, Building Name, Street, Landmark"
                        style={{ width: '100%', padding: '10px', marginTop: '4px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontFamily: 'inherit' }}
                      ></textarea>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button type="button" onClick={() => setShowAddressForm(false)} style={{ padding: '8px 12px', border: '1px solid var(--border-medium)', background: 'transparent', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Cancel</button>
                      <button type="submit" style={{ padding: '8px 16px', background: 'var(--brand-red)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                    </div>
                  </form>
                ) : (
                  <div onClick={() => setShowAddressForm(true)} className="add-address-card">
                    <Plus size={24} style={{ marginBottom: '8px' }} />
                    <span style={{ fontWeight: 600 }}>Add New Address</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <div className="profile-content-header">
                <h2>Past Orders</h2>
              </div>

              <div className="orders-timeline">
                {ordersLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <Loader size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                    <p>Loading your order history...</p>
                  </div>
                ) : pastOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <ShoppingBag size={48} style={{ margin: '0 auto 12px', strokeWidth: 1.5, color: 'var(--text-muted)' }} />
                    <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>No Orders Placed Yet</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Hungry? Place an order to see it here!</p>
                  </div>
                ) : (
                  pastOrders.map((o) => (
                    <div key={o.id} className="order-card">
                      <div className="order-header-info">
                        <div className="order-shop">
                          <h4>{o.restaurantName}</h4>
                          <span><Calendar size={12} /> {o.date} &bull; ID: {o.id}</span>
                        </div>
                        <div className="order-amount-status">
                          <div className="order-status-badge">
                            <CheckCircle size={12} /> {o.status}
                          </div>
                        </div>
                      </div>

                      <div className="order-items-list">
                        {o.items.map((item, i) => (
                          <div key={i}>{item.name} &times; {item.qty}</div>
                        ))}
                      </div>

                      <div className="order-actions">
                        <span className="order-total-lbl">Total Paid: &#8377;{o.total.toFixed(2)}</span>
                        {o.status !== 'Delivered' ? (
                          <button 
                            onClick={() => navigate(`/track-order?orderId=${o.id}`)}
                            className="track-live-btn"
                          >
                            <MapPin size={14} /> Track Live
                          </button>
                        ) : (
                          <button 
                            disabled={reordering}
                            onClick={() => handleReorder(o.items)}
                            className="reorder-btn"
                          >
                            {reordering ? (
                              <><Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> Adding...</>
                            ) : (
                              <><ShoppingBag size={14} /> Reorder Items</>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
