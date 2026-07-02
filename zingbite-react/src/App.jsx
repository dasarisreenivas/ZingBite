import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';

import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import ProtectedRoute from './components/ProtectedRoute';
import { Flame } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import { trackPageView } from './utils/analytics';

const Home = React.lazy(() => import('./pages/Home'));
const Menu = React.lazy(() => import('./pages/Menu'));
const Restaurants = React.lazy(() => import('./pages/Restaurants'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Info = React.lazy(() => import('./pages/Info'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Mailbox = React.lazy(() => import('./pages/Mailbox'));
const OrderTracking = React.lazy(() => import('./pages/OrderTracking'));
const DeliveryDashboard = React.lazy(() => import('./pages/DeliveryDashboard'));
const RestaurantDashboard = React.lazy(() => import('./pages/RestaurantDashboard'));
const CareerPortal = React.lazy(() => import('./pages/CareerPortal'));
const SuperAdminDashboard = React.lazy(() => import('./pages/SuperAdminDashboard'));
const VRPDashboard = React.lazy(() => import('./pages/VRPDashboard'));
const SDUIDashboard = React.lazy(() => import('./pages/SDUIDashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
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
          <WishlistProvider>
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
                            <Route path="/restaurants" element={<Restaurants />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/info/:sectionId" element={<Info />} />
                            <Route path="/about-us" element={<Info />} />
                            <Route path="/team" element={<Info />} />
                            <Route path="/blog" element={<Info />} />
                            <Route path="/help-faq" element={<Info />} />
                            <Route path="/contact-us" element={<Info />} />
                            <Route path="/partner-with-us" element={<Info />} />
                            <Route path="/ride-with-us" element={<Info />} />
                            <Route path="/terms" element={<Info />} />
                            <Route path="/privacy" element={<Info />} />
                            <Route path="/cookies" element={<Info />} />
                            <Route path="/refunds" element={<Info />} />
                            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                            <Route path="/mail-inbox" element={<ProtectedRoute><Mailbox /></ProtectedRoute>} />
                            <Route path="/track-order" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
                            <Route path="/careers" element={<ProtectedRoute><CareerPortal /></ProtectedRoute>} />
                            <Route path="/delivery" element={<ProtectedRoute allowedRoles={['delivery_partner']}><DeliveryDashboard /></ProtectedRoute>} />
                            <Route path="/restaurant-admin" element={<ProtectedRoute allowedRoles={['restaurant_admin']}><RestaurantDashboard /></ProtectedRoute>} />
                            <Route path="/admin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdminDashboard /></ProtectedRoute>} />
                            <Route path="/sdui-portal" element={<ProtectedRoute allowedRoles={['super_admin']}><SDUIDashboard /></ProtectedRoute>} />
                            <Route path="/vrp" element={<ProtectedRoute allowedRoles={['super_admin']}><VRPDashboard /></ProtectedRoute>} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </RouteMotionFrame>
                      </React.Suspense>
                    </ErrorBoundary>
                  </main>
                  <Footer />
                  <AIAssistant />
                </div>
              </Router>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
