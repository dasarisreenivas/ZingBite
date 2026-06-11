import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Info from './pages/Info';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { Flame } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import { trackPageView } from './utils/analytics';

const OrderTracking = React.lazy(() => import('./pages/OrderTracking'));
const DeliveryDashboard = React.lazy(() => import('./pages/DeliveryDashboard'));
const RestaurantDashboard = React.lazy(() => import('./pages/RestaurantDashboard'));
const CareerPortal = React.lazy(() => import('./pages/CareerPortal'));
const SuperAdminDashboard = React.lazy(() => import('./pages/SuperAdminDashboard'));
const VRPDashboard = React.lazy(() => import('./pages/VRPDashboard'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

function PremiumAtmosphere() {
  return (
    <div className="premium-ambient-scene" aria-hidden="true">
      <span className="ambient-slab slab-one" />
      <span className="ambient-slab slab-two" />
      <span className="ambient-slab slab-three" />
      <span className="ambient-ribbon ribbon-one" />
      <span className="ambient-ribbon ribbon-two" />
    </div>
  );
}

function InteractionFX() {
  useEffect(() => {
    const interactiveSelector = [
      'a[href]',
      'button',
      '[role="button"]',
      'input:not([type="hidden"])',
      'select',
      'textarea',
      'label',
      'summary',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest(interactiveSelector);
      if (!target || target.closest('.leaflet-container')) return;
      if (target.disabled || target.getAttribute('aria-disabled') === 'true') return;
      target.classList.remove('interaction-pressed');
      void target.offsetWidth;
      target.classList.add('interaction-pressed');
      const canHostRipple = !['INPUT', 'SELECT', 'TEXTAREA', 'OPTION'].includes(target.tagName);
      if (canHostRipple) {
        const rect = target.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const ripple = document.createElement('span');
          const size = Math.max(rect.width, rect.height) * 1.15;
          ripple.className = 'interaction-ripple';
          ripple.style.width = `${size}px`;
          ripple.style.height = `${size}px`;
          ripple.style.left = `${event.clientX - rect.left}px`;
          ripple.style.top = `${event.clientY - rect.top}px`;
          target.classList.add('has-interaction-ripple');
          target.appendChild(ripple);
          window.setTimeout(() => ripple.remove(), 680);
        }
      }
      window.setTimeout(() => target.classList.remove('interaction-pressed'), 260);
    };
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, []);
  return null;
}

function RouteMotionFrame({ children }) {
  const location = useLocation();
  return (
    <div className="route-motion-frame" key={`${location.pathname}${location.search}`}>
      {children}
    </div>
  );
}

function PremiumLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '300px',
      flex: 1,
      gap: '16px'
    }}>
      <style>{`
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .premium-loader-ring {
          position: relative;
          width: 48px;
          height: 48px;
        }
        .premium-loader-ring::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 3px solid rgba(247, 55, 79, 0.1);
          border-top-color: var(--brand-red);
          animation: spin 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .premium-loader-ring::after {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-bottom-color: var(--brand-red);
          animation: spin 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite reverse;
        }
      `}</style>
      <div className="premium-loader-ring" />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700,
        fontSize: '0.95rem',
        color: 'var(--text-secondary)'
      }}>
        <Flame size={16} color="var(--brand-red)" style={{ animation: 'loaderFloat 1.5s ease-in-out infinite' }} />
        Loading...
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AuthProvider>
        <CartProvider>
          <Router basename="/zingbite">
            <ScrollToTop />
            <PageViewTracker />
            <InteractionFX />
            <div className="app-shell">
              <PremiumAtmosphere />
              <Header />
              <main className="app-main">
                <ErrorBoundary>
                  <React.Suspense fallback={<PremiumLoader />}>
                    <RouteMotionFrame>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/info/:sectionId" element={<Info />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/track-order" element={<OrderTracking />} />
                        <Route path="/delivery" element={<ProtectedRoute allowedRoles={['delivery_partner']}><DeliveryDashboard /></ProtectedRoute>} />
                        <Route path="/restaurant-admin" element={<ProtectedRoute allowedRoles={['restaurant_admin', 'customer']}><RestaurantDashboard /></ProtectedRoute>} />
                        <Route path="/careers" element={<CareerPortal />} />
                        <Route path="/admin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdminDashboard /></ProtectedRoute>} />
                        <Route path="/vrp" element={<VRPDashboard />} />
                      </Routes>
                    </RouteMotionFrame>
                  </React.Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ModalProvider>
    </ThemeProvider>
  );
}

export default App;