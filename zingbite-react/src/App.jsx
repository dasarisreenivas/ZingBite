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

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <CartProvider>
          <Router basename="/zingbite">
            <PageViewTracker />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1, minHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
                <ErrorBoundary>
                  <React.Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flex: 1 }}>
                      <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
                    </div>
                  }>
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
