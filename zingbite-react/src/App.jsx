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
import OrderTracking from './pages/OrderTracking';
import DeliveryDashboard from './pages/DeliveryDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import CareerPortal from './pages/CareerPortal';
import SuperAdminDashboard from './pages/SuperAdminDashboard';

function App() {
  return (
    <ModalProvider>
      <AuthProvider>
        <CartProvider>
          <Router basename="/zingbite">
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <main style={{ flex: 1, minHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
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
                </Routes>
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
