import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';

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
import { Loader } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './utils/analytics';

const OrderTracking = React.lazy(() => import('./pages/OrderTracking'));
const DeliveryDashboard = React.lazy(() => import('./pages/DeliveryDashboard'));
const RestaurantDashboard = React.lazy(() => import('./pages/RestaurantDashboard'));
const CareerPortal = React.lazy(() => import('./pages/CareerPortal'));
const SuperAdminDashboard = React.lazy(() => import('./pages/SuperAdminDashboard'));
const VRPDashboard = React.lazy(() => import('./pages/VRPDashboard'));

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

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <CartProvider>
          <Router basename="/zingbite">
            <PageViewTracker />
            <InteractionFX />
            <div className="app-shell">
              <PremiumAtmosphere />
              <Header />
              <main className="app-main">
                <ErrorBoundary>
                  <React.Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flex: 1 }}>
                      <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
                    </div>
                  }>
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
                        <Route path="/delivery" element={<DeliveryDashboard />} />
                        <Route path="/restaurant-admin" element={<RestaurantDashboard />} />
                        <Route path="/careers" element={<CareerPortal />} />
                        <Route path="/admin" element={<SuperAdminDashboard />} />
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
  );
}

export default App;
