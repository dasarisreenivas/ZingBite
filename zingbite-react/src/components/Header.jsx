import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Bike,
  Briefcase,
  Compass,
  Flame,
  Home,
  Mail,
  MapPin,
  Moon,
  Shield,
  ShoppingCart,
  Store,
  Sun,
  User,
  X,
  Heart
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import MailboxModal from './MailboxModal';
import NotificationCenter from './NotificationCenter';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMailbox, setShowMailbox] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  ));
  const headerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Lock specialized roles (delivery partner, restaurant admin, super admin) 
  // out of customer-facing pages (home, menu, cart, checkout, profile)
  useEffect(() => {
    if (user && user.role && user.role !== 'customer') {
      const path = location.pathname;
      const isCustomerPage = ['/', '/home', '/menu', '/cart', '/checkout', '/profile', '/track-order'].includes(path);
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
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeMenus = () => {
    setMobileMenuOpen(false);
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
          background: var(--surface-glass);
          backdrop-filter: blur(24px) saturate(200%);
          -webkit-backdrop-filter: blur(24px) saturate(200%);
          border-bottom: 1px solid var(--border-light);
          transition: all 0.35s var(--ease-premium);
          padding: 0 20px;
        }
        .header.scrolled {
          background: var(--surface-card);
          box-shadow: var(--shadow-sm);
        }
        .scroll-progress {
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--brand-red), #ff7a8a);
          transition: width 0.1s linear;
          z-index: 1;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto;
          height: 72px;
          transition: height 0.35s var(--ease-premium);
          gap: 18px;
        }
        .header.scrolled .header-inner {
          height: 64px;
        }
        .logo-link {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          transition: transform 0.4s var(--ease-spring);
        }
        .logo-link:hover {
          transform: scale(1.04);
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 2px 12px rgba(247, 55, 79, 0.3);
          transition: box-shadow 0.4s var(--ease-premium), transform 0.4s var(--ease-spring);
        }
        .logo-link:hover .logo-icon {
          box-shadow: 0 4px 20px rgba(247, 55, 79, 0.45);
          transform: rotate(-5deg) scale(1.05);
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.5px;
          transition: color 0.3s ease;
        }
        .logo-text span {
          color: var(--brand-red);
        }
        .nav-desktop {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          min-width: 0;
          flex: 1;
          flex-wrap: nowrap;
        }
        .nav-link {
          position: relative;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          transition: all 0.3s var(--ease-premium);
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
          overflow: hidden;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: var(--brand-red);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.35s var(--ease-premium);
          border-radius: 2px;
        }
        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-surface);
        }
        .nav-link:hover::before {
          transform: scaleX(1);
        }
        .nav-link.active {
          color: var(--brand-red);
          background: var(--brand-tint-medium);
        }
        .nav-link.active::before {
          transform: scaleX(1);
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
          transition: all 0.3s var(--ease-premium);
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .nav-btn-logout:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: rgba(226, 55, 68, 0.04);
          transform: translateY(-1px);
        }
        .nav-btn-signup {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          padding: 9px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.35s var(--ease-premium);
          box-shadow: 0 2px 8px rgba(247, 55, 79, 0.25);
          white-space: nowrap;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .nav-btn-signup::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .nav-btn-signup:hover::after {
          transform: translateX(100%);
        }
        .nav-btn-signup:hover {
          background: linear-gradient(135deg, var(--brand-red-hover), #e55a6a);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.4);
        }
        .theme-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-medium);
          background: var(--bg-surface);
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.28s var(--ease-premium), color 0.28s var(--ease-premium), border-color 0.28s var(--ease-premium), background 0.28s var(--ease-premium), box-shadow 0.28s var(--ease-premium);
        }
        .theme-toggle-btn:hover,
        .theme-toggle-btn:focus-visible {
          color: var(--brand-red);
          border-color: rgba(247, 55, 79, 0.25);
          background: var(--brand-tint-medium);
          box-shadow: 0 8px 20px rgba(247, 55, 79, 0.12);
          transform: translateY(-1px);
          outline: none;
        }
        .mobile-theme-toggle {
          width: 100%;
          min-height: 48px;
          justify-content: flex-start;
          gap: 10px;
          padding: 0 16px;
          border-radius: var(--radius-sm);
          font: inherit;
          font-weight: 600;
        }
        .cart-badge {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          border-radius: 10px;
          padding: 1px 7px;
          font-size: 0.7rem;
          font-weight: 700;
          min-width: 18px;
          text-align: center;
          animation: badgePop 0.35s var(--ease-spring) both;
        }
        @keyframes badgePop {
          0% { transform: scale(0); }
          70% { transform: scale(1.15); }
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
          transition: all 0.35s var(--ease-premium);
        }
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
          width: 20px;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
          width: 20px;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          max-width: 85%;
          height: 100vh;
          background: var(--surface-overlay);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 24px 20px;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-left: 1px solid var(--border-light);
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-menu .nav-link {
          padding: 14px 16px;
          font-size: 1rem;
          white-space: normal;
          overflow: visible;
          border-radius: var(--radius-sm);
        }
        .mobile-menu .nav-link:hover {
          background: var(--brand-tint-medium);
          transform: translateX(4px);
        }
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 999;
          animation: fadeIn 0.35s ease-out;
          border: 0;
          cursor: pointer;
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
        .mobile-notification-wrap {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none; }
          .hamburger { display: block; }
          .mobile-notification-wrap {
            display: flex !important;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            margin-left: auto;
          }
        }
        @media (max-width: 1120px) {
          .header-inner { width: 96%; }
          .nav-link { padding: 8px 9px; font-size: 0.84rem; }
          .nav-btn-logout { padding: 8px 13px; }
          .nav-btn-signup { padding: 9px 16px; }
        }
      `}</style>

      <header className={`header ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="header-inner">
          <Link to={getHomeLink()} onClick={closeMenus} className="logo-link">
            <div className="logo-icon"><Flame size={18} color="#fff" /></div>
            <h1 className="logo-text">Zing<span>Bite</span></h1>
          </Link>
          
          <nav className="nav-desktop" aria-label="Primary navigation">
            {/* Show Home link only for customers/guests */}
            {(!user || user.role === 'customer') && (
              <Link to="/" onClick={closeMenus} className={`nav-link ${isActive('/') || isActive('/home') ? 'active' : ''}`}>
                <Home size={16} /> Home
              </Link>
            )}
            
            {(!user || user.role === 'customer') && (
              <Link to="/track-order" onClick={closeMenus} className={`nav-link ${isActive('/track-order') ? 'active' : ''}`}>
                <MapPin size={16} /> Track Order
              </Link>
            )}
            <Link to="/careers" onClick={closeMenus} className={`nav-link ${isActive('/careers') ? 'active' : ''}`}>
              <Briefcase size={16} /> Careers
            </Link>
            {/* Dynamic authorized portal link based on user role */}
            {user && user.role === 'delivery_partner' && (
              <Link to="/delivery" onClick={closeMenus} className={`nav-link ${isActive('/delivery') ? 'active' : ''}`}>
                <Bike size={16} /> Delivery Portal
              </Link>
            )}
            {user && user.role === 'restaurant_admin' && (
              <Link to="/restaurant-admin" onClick={closeMenus} className={`nav-link ${isActive('/restaurant-admin') ? 'active' : ''}`}>
                <Store size={16} /> Restaurant Portal
              </Link>
            )}
            {user && user.role === 'super_admin' && (
              <Link to="/admin" onClick={closeMenus} className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
                <Shield size={16} /> Admin Panel
              </Link>
            )}
            {user && user.role === 'super_admin' && (
              <Link to="/vrp" onClick={closeMenus} className={`nav-link ${isActive('/vrp') ? 'active' : ''}`}>
                <Compass size={16} /> VRP Dispatch
              </Link>
            )}

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {user ? (
              <>
                <Link to="/profile" onClick={closeMenus} className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  <User size={16} /> Profile
                </Link>
                {user && user.role === 'customer' && (
                  <Link to="/wishlist" onClick={closeMenus} className={`nav-link ${isActive('/wishlist') ? 'active' : ''}`}>
                    <Heart size={16} /> Wishlist
                  </Link>
                )}
                {(!user || user.role === 'customer') && (
                  <Link to="/cart" onClick={closeMenus} className={`nav-link ${isActive('/cart') ? 'active' : ''}`}>
                    <ShoppingCart size={16} /> Cart
                    {cart?.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
                  </Link>
                )}
                <button type="button" onClick={() => setShowMailbox(true)} className="nav-link" style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.9rem',color:'inherit',display:'flex',alignItems:'center',gap:'6px',padding:'8px 12px'}}>
                  <Mail size={16} /> Mailbox
                </button>
                {!isMobile && <NotificationCenter />}
                <button type="button" onClick={handleLogout} className="nav-btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenus} className={`nav-link ${isActive('/login') ? 'active' : ''}`}>Login</Link>
                <Link to="/register" onClick={closeMenus} className="nav-btn-signup">Sign Up</Link>
              </>
            )}
          </nav>

          {user && isMobile && (
            <div className="mobile-notification-wrap">
              <NotificationCenter />
            </div>
          )}

          <button
            type="button"
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={closeMobileMenu}
          aria-label="Close navigation menu"
        />
      )}

      <div
        id="mobile-navigation"
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
          <div className="logo-link" style={{ pointerEvents: 'none' }}>
            <div className="logo-icon"><Flame size={18} color="#fff" /></div>
            <h1 className="logo-text" style={{ fontSize: '1.3rem' }}>Zing<span>Bite</span></h1>
          </div>
          <button type="button" onClick={closeMobileMenu} className="close-btn-hover" aria-label="Close navigation menu">
            <X size={22} color="var(--text-primary)" />
          </button>
        </div>

        {(!user || user.role === 'customer') && (
          <>
            <Link to="/" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/') || isActive('/home') ? 'active' : ''}`}><Home size={16} /> Home</Link>
            <Link to="/track-order" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/track-order') ? 'active' : ''}`}><MapPin size={16} /> Track Order</Link>
          </>
        )}
        <Link to="/careers" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/careers') ? 'active' : ''}`}><Briefcase size={16} /> Careers</Link>

        <button
          type="button"
          className="theme-toggle-btn mobile-theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
        
        {/* Dynamic authorized mobile portal links */}
        {user && (user.role === 'delivery_partner' || user.role === 'restaurant_admin' || user.role === 'super_admin') && (
          <>
            <div style={{ padding: '8px 16px', fontWeight: 700, color: 'var(--brand-red)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              My Portal
            </div>
            {user.role === 'delivery_partner' && (
              <Link to="/delivery" onClick={closeMobileMenu} className="nav-link mobile-nav-item" style={{ paddingLeft: '24px' }}>
                <Bike size={16} /> Delivery Portal
              </Link>
            )}
            {user.role === 'restaurant_admin' && (
              <Link to="/restaurant-admin" onClick={closeMobileMenu} className="nav-link mobile-nav-item" style={{ paddingLeft: '24px' }}>
                <Store size={16} /> Restaurant Portal
              </Link>
            )}
            {user.role === 'super_admin' && (
              <Link to="/admin" onClick={closeMobileMenu} className="nav-link mobile-nav-item" style={{ paddingLeft: '24px' }}>
                <Shield size={16} /> Admin Panel
              </Link>
            )}
            {user.role === 'super_admin' && (
              <Link to="/vrp" onClick={closeMobileMenu} className="nav-link mobile-nav-item" style={{ paddingLeft: '24px' }}>
                <Compass size={16} /> VRP Dispatch
              </Link>
            )}
            <div style={{ height: '1px', background: 'var(--border-light)', margin: '8px 0' }} />
          </>
        )}

        {user ? (
          <>
            <Link to="/profile" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}>
              <User size={16} /> Profile
            </Link>
            {user && user.role === 'customer' && (
              <Link to="/wishlist" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
                <Heart size={16} /> Wishlist
              </Link>
            )}
            {(!user || user.role === 'customer') && (
              <Link to="/cart" onClick={closeMobileMenu} className={`nav-link mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}>
                <ShoppingCart size={16} /> Cart {cart?.itemCount > 0 && <span className="cart-badge">{cart.itemCount}</span>}
              </Link>
            )}
            <button type="button" onClick={() => { setShowMailbox(true); closeMobileMenu(); }} className="nav-link mobile-nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', color: 'inherit' }}>
              <Mail size={16} /> Mailbox
            </button>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button type="button" onClick={handleLogout} className="nav-btn-logout" style={{width:'100%'}}>Logout</button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '20px' }}>
            <Link to="/login" onClick={closeMobileMenu} className="nav-link mobile-nav-item" style={{ justifyContent: 'center', border: '1px solid var(--border-medium)' }}>Login</Link>
            <Link to="/register" onClick={closeMobileMenu} className="nav-btn-signup" style={{textAlign:'center'}}>Sign Up</Link>
          </div>
        )}
      </div>

      <style>{`
        .mobile-menu.open .mobile-nav-item {
          animation: slideLeft 0.35s var(--ease-premium) both;
        }
        .mobile-menu.open .mobile-nav-item:nth-child(1) { animation-delay: 0.05s; }
        .mobile-menu.open .mobile-nav-item:nth-child(2) { animation-delay: 0.1s; }
        .mobile-menu.open .mobile-nav-item:nth-child(3) { animation-delay: 0.15s; }
        .mobile-menu.open .mobile-nav-item:nth-child(4) { animation-delay: 0.2s; }
        .mobile-menu.open .mobile-nav-item:nth-child(5) { animation-delay: 0.25s; }
        .mobile-menu.open .mobile-nav-item:nth-child(6) { animation-delay: 0.3s; }
        .mobile-menu.open .mobile-nav-item:nth-child(7) { animation-delay: 0.35s; }
        .mobile-menu.open .mobile-nav-item:nth-child(8) { animation-delay: 0.4s; }
        .mobile-menu.open .mobile-nav-item:nth-child(9) { animation-delay: 0.45s; }
        .mobile-menu.open .mobile-nav-item:nth-child(10) { animation-delay: 0.5s; }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {showMailbox && <MailboxModal onClose={() => setShowMailbox(false)} />}
    </>
  );
};

export default React.memo(Header);
