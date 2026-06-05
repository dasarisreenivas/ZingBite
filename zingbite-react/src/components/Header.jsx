import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, Home, ShoppingCart, LogOut, User, Menu, X, Briefcase, Shield, Bike, Store, MapPin } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock specialized roles (delivery partner, restaurant admin, super admin) 
  // out of customer-facing pages (home, menu, cart, checkout, profile)
  useEffect(() => {
    if (user && user.role && user.role !== 'customer') {
      const path = location.pathname;
      const isCustomerPage = ['/', '/home', '/menu', '/cart', '/checkout', '/profile', '/track-order'].includes(path) || path.startsWith('/info/');
      if (isCustomerPage) {
        if (user.role === 'delivery_partner') {
          navigate('/delivery');
        } else if (user.role === 'restaurant_admin') {
          navigate('/restaurant-admin');
        } else if (user.role === 'super_admin') {
          navigate('/admin');
        }
      }
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getHomeLink = () => {
    if (!user) return '/';
    if (user.role === 'delivery_partner') return '/delivery';
    if (user.role === 'restaurant_admin') return '/restaurant-admin';
    if (user.role === 'super_admin') return '/admin';
    return '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          padding: 0 20px;
        }
        .header.scrolled {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          height: 72px;
          transition: height 0.3s ease;
        }
        .header.scrolled .header-inner {
          height: 64px;
        }
        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .logo-link:hover {
          transform: scale(1.03);
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: var(--brand-red);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 2px 10px rgba(247, 55, 79, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .logo-link:hover .logo-icon {
          box-shadow: 0 4px 16px rgba(247, 55, 79, 0.4);
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
        }
        .logo-text span {
          color: var(--brand-red);
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          position: relative;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }
        .nav-link.active {
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.06);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--brand-red);
          border-radius: 2px;
        }
        .nav-welcome {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          padding: 8px 12px;
          background: var(--bg-surface);
          border-radius: 20px;
        }
        .nav-btn-logout {
          background: none;
          border: 1px solid var(--border-medium);
          color: var(--text-primary);
          font-weight: 500;
          cursor: pointer;
          font-size: 0.9rem;
          font-family: inherit;
          padding: 8px 18px;
          border-radius: 20px;
          transition: all 0.25s ease;
        }
        .nav-btn-logout:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
        }
        .nav-btn-signup {
          background: var(--brand-red);
          color: #fff;
          padding: 9px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.25);
        }
        .nav-btn-signup:hover {
          background: var(--brand-red-hover);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(247, 55, 79, 0.35);
        }
        .cart-badge {
          background: var(--brand-red);
          color: #fff;
          border-radius: 10px;
          padding: 1px 7px;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 18px;
          text-align: center;
          animation: bounceIn 0.4s ease-out;
        }
        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: background 0.2s;
        }
        .hamburger:hover {
          background: var(--bg-surface);
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          margin: 5px 0;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 285px;
          max-width: 85%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 24px 20px;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 1px solid var(--border-light);
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu .nav-link {
          padding: 14px 16px;
          font-size: 1rem;
        }
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 999;
          animation: fadeIn 0.35s ease-out;
        }
        .close-btn-hover {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .close-btn-hover:hover {
          background: var(--bg-surface);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: block; }
        }
      `}</style>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link to={getHomeLink()} className="logo-link">
            <div className="logo-icon"><Flame size={18} color="#fff" /></div>
            <h1 className="logo-text">Zing<span>Bite</span></h1>
          </Link>
          
          <nav className="nav-desktop">
            {/* Show Home link only for customers/guests */}
            {(!user || user.role === 'customer') && (
              <Link to="/" className={`nav-link ${isActive('/') || isActive('/home') ? 'active' : ''}`}>
                <Home size={16} /> Home
              </Link>
            )}
            
            {(!user || user.role === 'customer') && (
              <Link to="/track-order" className={`nav-link ${isActive('/track-order') ? 'active' : ''}`}>
                <MapPin size={16} /> Track Order
              </Link>
            )}
            
            <Link to="/careers" className={`nav-link ${isActive('/careers') ? 'active' : ''}`}>
              <Briefcase size={16} /> Careers
            </Link>

            {/* Dynamic authorized portal link based on user role */}
            {user && user.role === 'delivery_partner' && (
              <Link to="/delivery" className={`nav-link ${isActive('/delivery') ? 'active' : ''}`}>
                <Bike size={16} /> Delivery Portal
              </Link>
            )}
            {user && user.role === 'restaurant_admin' && (
              <Link to="/restaurant-admin" className={`nav-link ${isActive('/restaurant-admin') ? 'active' : ''}`}>
                <Store size={16} /> Restaurant Portal
              </Link>
            )}
            {user && user.role === 'super_admin' && (
              <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                <Shield size={16} /> Admin Panel
              </Link>
            )}

            {user ? (
              <>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  <User size={16} /> Profile
                </Link>
                {(!user || user.role === 'customer') && (
                  <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
                    <ShoppingCart size={16} /> Cart
                    {cart?.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
                  </Link>
                )}
                <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Login</Link>
                <Link to="/register" className="nav-btn-signup">Sign Up</Link>
              </>
            )}
          </nav>

          <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="logo-link" style={{ pointerEvents: 'none' }}>
            <div className="logo-icon"><Flame size={18} color="#fff" /></div>
            <h1 className="logo-text" style={{ fontSize: '1.3rem' }}>Zing<span>Bite</span></h1>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="close-btn-hover">
            <X size={22} color="var(--text-primary)" />
          </button>
        </div>

        {(!user || user.role === 'customer') && (
          <>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}><Home size={16} /> Home</Link>
            <Link to="/track-order" className={`nav-link ${isActive('/track-order') ? 'active' : ''}`}><MapPin size={16} /> Track Order</Link>
          </>
        )}
        <Link to="/careers" className={`nav-link ${isActive('/careers') ? 'active' : ''}`}><Briefcase size={16} /> Careers</Link>
        
        {/* Dynamic authorized mobile portal links */}
        {user && (user.role === 'delivery_partner' || user.role === 'restaurant_admin' || user.role === 'super_admin') && (
          <>
            <div style={{ padding: '8px 16px', fontWeight: 700, color: 'var(--brand-red)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              My Portal
            </div>
            {user.role === 'delivery_partner' && (
              <Link to="/delivery" className="nav-link" style={{ paddingLeft: '24px' }}>
                <Bike size={16} /> Delivery Portal
              </Link>
            )}
            {user.role === 'restaurant_admin' && (
              <Link to="/restaurant-admin" className="nav-link" style={{ paddingLeft: '24px' }}>
                <Store size={16} /> Restaurant Portal
              </Link>
            )}
            {user.role === 'super_admin' && (
              <Link to="/admin" className="nav-link" style={{ paddingLeft: '24px' }}>
                <Shield size={16} /> Admin Panel
              </Link>
            )}
            <div style={{ height: '1px', background: 'var(--border-light)', margin: '8px 0' }} />
          </>
        )}

        {user ? (
          <>
            <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
              <User size={16} /> Profile
            </Link>
            {(!user || user.role === 'customer') && (
              <Link to="/cart" className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
                <ShoppingCart size={16} /> Cart {cart?.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
              </Link>
            )}
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button onClick={handleLogout} className="nav-btn-logout" style={{width:'100%'}}>Logout</button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '20px' }}>
            <Link to="/login" className="nav-link" style={{ justifyContent: 'center', border: '1px solid var(--border-medium)' }}>Login</Link>
            <Link to="/register" className="nav-btn-signup" style={{textAlign:'center'}}>Sign Up</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
