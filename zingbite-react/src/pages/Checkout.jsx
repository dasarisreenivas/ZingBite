import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import axios from 'axios';
import { MapPin, CreditCard, Smartphone, Banknote, Truck, Percent, Shield, Lock } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Checkout = () => {
  const { cart, clearCart, fetchSurge, fetchCart } = useCart();
  const { user, updateUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const [addressChoice, setAddressChoice] = useState('profile');
  const [manualAddress, setManualAddress] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [manualLat, setManualLat] = useState(null);
  const [manualLng, setManualLng] = useState(null);
  const [manualCity, setManualCity] = useState('');
  const [paying, setPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    if (window.L) { setLeafletLoaded(true); return; }
    let link = document.querySelector('link[href*="leaflet.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);
    }
    let script = document.querySelector('script[src*="leaflet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      script.onload = () => {
        const interval = setInterval(() => {
          if (window.L) { setLeafletLoaded(true); clearInterval(interval); }
        }, 50);
      };
      document.body.appendChild(script);
    }
  }, []);

  const reverseGeocode = async (lat, lng) => {
    setGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      const data = await response.json();
      if (data && data.display_name) {
        setManualAddress(data.display_name);
        setManualLat(lat);
        setManualLng(lng);
        const cityName = data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.suburb || '';
        setManualCity(cityName);
      } else {
        setManualAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);
        setManualLat(lat);
        setManualLng(lng);
        setManualCity('');
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setManualAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);
    } finally {
      setGeocoding(false);
    }
  };

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || addressChoice !== 'manual') {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
      return;
    }
    if (mapInstanceRef.current) return;
    const L = window.L;
    if (!L) return;
    const defaultLat = 12.9716;
    const defaultLng = 77.5946;
    const map = L.map(mapRef.current).setView([defaultLat, defaultLng], 14);
    mapInstanceRef.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
    const customIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,
      className: 'custom-checkout-marker', iconSize: [24, 24], iconAnchor: [12, 12]
    });
    const marker = L.marker([defaultLat, defaultLng], { icon: customIcon, draggable: true }).addTo(map);
    markerRef.current = marker;
    marker.on('dragend', () => { const latLng = marker.getLatLng(); reverseGeocode(latLng.lat, latLng.lng); });
    map.on('click', (e) => { marker.setLatLng(e.latlng); reverseGeocode(e.latlng.lat, e.latlng.lng); });
    reverseGeocode(defaultLat, defaultLng);
    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; markerRef.current = null; }
    };
  }, [leafletLoaded, addressChoice]);

  useEffect(() => {
    const updateSurgeForCheckout = async () => {
      if (addressChoice === 'profile') {
        if (user && user.latitude && user.longitude) {
          await fetchSurge(user.latitude, user.longitude);
          await fetchCart();
        }
      } else if (addressChoice === 'manual') {
        if (manualLat !== null && manualLng !== null) {
          await fetchSurge(manualLat, manualLng);
          await fetchCart();
        }
      }
    };
    updateSurgeForCheckout();
  }, [addressChoice, user?.latitude, user?.longitude, manualLat, manualLng, fetchSurge, fetchCart]);

  const detectLocation = () => {
    if (!navigator.geolocation) { showAlert("Geolocation is not supported by your browser.", "error"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) { mapInstanceRef.current.setView([latitude, longitude], 16); if (markerRef.current) markerRef.current.setLatLng([latitude, longitude]); }
        reverseGeocode(latitude, longitude);
      },
      (err) => { showAlert("Error retrieving location: " + err.message, "error"); }
    );
  };

  if (!cart || cart.itemCount === 0) {
    navigate('/cart');
    return null;
  }

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (paying || verifying) return;

    if (paymentMethod === 'cod') {
      setPaying(true);
      try {
        const itemsList = cart.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
        const formattedItems = itemsList.map(item => ({ id: item.itemId, qty: item.quantity, price: item.price }));
        const finalAddress = addressChoice === 'profile' ? (user?.address || '') : manualAddress;
        if (addressChoice === 'manual' && finalAddress) {
          const upRes = await axios.post('/api/profile', { action: 'update', username: user.userName || user.username || 'User', mobile: String(user.phoneNumber || user.mobile || ''), address: finalAddress, latitude: finalAddress === manualAddress ? manualLat : null, longitude: finalAddress === manualAddress ? manualLng : null, city: finalAddress === manualAddress ? manualCity : '' });
          if (upRes.data.success && typeof updateUser === 'function') updateUser(upRes.data.user);
        }
        const firstItem = itemsList[0];
        const restaurantId = firstItem ? firstItem.restaurantId : null;
        const latitude = addressChoice === 'profile' ? (user?.latitude || null) : manualLat;
        const longitude = addressChoice === 'profile' ? (user?.longitude || null) : manualLng;
        const res = await axios.post('/api/profile', { action: 'createOrder', total: cart.total, paymentMethod: 'COD', items: formattedItems, restaurantId, latitude, longitude });
        if (!res.data.success) { showAlert(res.data.error || "Failed to place order.", "error"); setPaying(false); return; }
        trackEvent('ORDER_PLACED', { orderId: res.data.orderId, amount: cart.total, method: 'COD' });
        clearCart();
        navigate(`/track-order?orderId=${res.data.orderId}`);
      } catch (err) {
        console.error("Failed to place COD order:", err);
        showAlert("An error occurred placing your order. Please try again.", "error");
      } finally { setPaying(false); }
      return;
    }

    const isLoaded = await loadRazorpay();
    if (!isLoaded) { showAlert("Failed to load Razorpay payment gateway.", "error"); return; }
    setPaying(true);
    try {
      const itemsList = cart.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
      const formattedItems = itemsList.map(item => ({ id: item.itemId, qty: item.quantity, price: item.price }));
      const finalAddress = addressChoice === 'profile' ? (user?.address || '') : manualAddress;
      if (addressChoice === 'manual' && finalAddress) {
        const upRes = await axios.post('/api/profile', { action: 'update', username: user.userName || user.username || 'User', mobile: String(user.phoneNumber || user.mobile || ''), address: finalAddress, latitude: finalAddress === manualAddress ? manualLat : null, longitude: finalAddress === manualAddress ? manualLng : null, city: finalAddress === manualAddress ? manualCity : '' });
        if (upRes.data.success && typeof updateUser === 'function') updateUser(upRes.data.user);
      }
      const firstItem = itemsList[0];
      const restaurantId = firstItem ? firstItem.restaurantId : null;
      const latitude = addressChoice === 'profile' ? (user?.latitude || null) : manualLat;
      const longitude = addressChoice === 'profile' ? (user?.longitude || null) : manualLng;
      const res = await axios.post('/api/profile', { action: 'createOrder', total: cart.total, paymentMethod: 'Razorpay', items: formattedItems, restaurantId, latitude, longitude });
      if (!res.data.success) { showAlert(res.data.error || "Failed to reserve order.", "error"); setPaying(false); return; }
      const orderId = res.data.orderId;
      const razorpayOrderId = res.data.razorpayOrderId;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_RU5HIdwTwlQNOw",
        amount: Math.round(cart.total * 100),
        currency: "INR",
        name: "ZingBite",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          setVerifying(true);
          try {
            const verifyRes = await axios.post('/api/payment/verify', {
              orderId,
              transactionId: response.razorpay_payment_id,
              paymentMethod: 'Razorpay',
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature
            });
            if (verifyRes.data.success) { trackEvent('ORDER_PLACED', { orderId, amount: cart.total }); clearCart(); navigate(`/track-order?orderId=${orderId}`); }
            else { showAlert(verifyRes.data.error || "Payment verification failed.", "error"); }
          } catch (err) {
            console.error("Payment verification timeout/drop:", err);
            trackEvent('ORDER_PLACED', { orderId, amount: cart.total });
            clearCart();
            navigate(`/track-order?orderId=${orderId}`);
          } finally { setVerifying(false); }
        },
        modal: {
          ondismiss: async function () {
            console.log("Payment gateway dismissed. Cancelling reserved order.");
            try { await axios.post('/api/payment/verify', { orderId, transactionId: 'pay_abandoned_' + orderId, paymentMethod: 'Razorpay' }); } catch (e) { console.error("Failed to notify server of cancellation:", e); }
          }
        },
        theme: { color: "#F7374F" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Failed to initialize checkout transaction:", err);
      showAlert("An error occurred during checkout setup. Please try again.", "error");
    } finally { setPaying(false); }
  };

  return (
    <>
      <style>{`
        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
        }
        .chk-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .chk-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 20px;
          padding-bottom: 14px;
          border-bottom: 1.5px solid var(--border-light);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chk-title svg { color: var(--brand-red); }
        .option-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .option-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 14px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s var(--ease-premium);
        }
        .option-label:hover { border-color: var(--brand-red); background: rgba(247,55,79,0.02); }
        .option-label input[type="radio"] { accent-color: var(--brand-red); width: 16px; height: 16px; }
        .address-field {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.25s var(--ease-premium);
        }
        .address-field:focus { border-color: var(--brand-red); box-shadow: 0 0 0 4px rgba(247,55,79,0.06); }
        .address-field:disabled { background: var(--bg-surface); color: var(--text-muted); cursor: not-allowed; }
        .locate-btn {
          align-self: flex-start;
          padding: 9px 16px;
          font-size: 0.82rem;
          font-weight: 700;
          background: var(--brand-red);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 2px 8px rgba(247,55,79,0.2);
        }
        .locate-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(247,55,79,0.3); }
        .chk-summary {
          background: var(--bg-surface);
          padding: 20px;
          border-radius: 14px;
          margin-bottom: 20px;
          border: 1px solid var(--border-light);
        }
        .chk-row { display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem; }
        .chk-divider { border: none; border-top: 1.5px dashed var(--border-light); margin: 12px 0; }
        .chk-total { font-size: 1.2rem; font-weight: 800; color: var(--text-primary); }
        .pay-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--success), #4a9a32);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          box-shadow: 0 4px 16px rgba(96,178,70,0.25);
        }
        .pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(96,178,70,0.35); }
        .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        @media (max-width: 850px) {
          .checkout-layout { grid-template-columns: 1fr; margin: 16px auto 32px; gap: 20px; }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div className="checkout-layout page-enter">
        <div className="chk-card">
          <h2 className="chk-title"><MapPin size={20} /> Delivery Address</h2>
          <div className="option-group">
            <label className="option-label">
              <input type="radio" checked={addressChoice === 'profile'} onChange={() => setAddressChoice('profile')} /> Use saved address
            </label>
            <label className="option-label">
              <input type="radio" checked={addressChoice === 'manual'} onChange={() => setAddressChoice('manual')} /> Enter new address
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              className="address-field"
              placeholder="Enter your delivery address"
              value={addressChoice === 'profile' ? (user ? user.address : '') : manualAddress}
              onChange={(e) => { if (addressChoice === 'manual') setManualAddress(e.target.value); }}
              disabled={addressChoice === 'profile'}
            />
            {addressChoice === 'manual' && (
              <>
                <button type="button" onClick={detectLocation} className="locate-btn">
                  <MapPin size={13} /> {geocoding ? 'Detecting...' : 'Auto-Detect Location'}
                </button>
                <div ref={mapRef} style={{ height: '220px', borderRadius: '12px', border: '1px solid var(--border-medium)', zIndex: 1 }} />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Drag the marker or click on the map to set your delivery location.</p>
              </>
            )}
          </div>
        </div>

        <div className="chk-card">
          <h2 className="chk-title"><CreditCard size={20} /> Payment</h2>
          <div className="option-group">
            <label className="option-label"><input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} /> <CreditCard size={16} /> Credit / Debit Card</label>
            <label className="option-label"><input type="radio" name="pay" value="upi" checked={paymentMethod === 'upi'} onChange={e => setPaymentMethod(e.target.value)} /> <Smartphone size={16} /> UPI</label>
            <label className="option-label"><input type="radio" name="pay" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)} /> <Banknote size={16} /> Cash on Delivery</label>
          </div>

          <div className="chk-summary">
            <div className="chk-row"><span>Item Total</span><span>&#8377;{cart.subtotal.toFixed(2)}</span></div>
             <div className="chk-row">
               <span><Truck size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} /> Delivery Fee</span>
               <span>&#8377;{cart.surgeMultiplier > 1.0 ? Math.max(0, cart.shipping - cart.surgeFee).toFixed(2) : cart.shipping.toFixed(2)}</span>
             </div>
             {cart.surgeMultiplier > 1.0 && (
               <div className="chk-row" style={{ color: 'var(--brand-red)', fontWeight: 600 }}>
                 <span>⚡ Surge Charge ({cart.surgeReason})</span>
                 <span>+&#8377;{cart.surgeFee.toFixed(2)}</span>
               </div>
             )}
             <div className="chk-row"><span>Taxes</span><span>&#8377;{cart.tax.toFixed(2)}</span></div>
             {cart.discount > 0 && (
               <div className="chk-row" style={{ color: 'var(--success)', fontWeight: 700 }}>
                 <span><Percent size={12} style={{ marginRight: 2, verticalAlign: 'middle' }} /> Discount</span>
                 <span>-&#8377;{cart.discount.toFixed(2)}</span>
               </div>
             )}
            <hr className="chk-divider" />
            <div className="chk-row chk-total">
              <strong>TO PAY</strong>
              <strong>&#8377;{cart.total.toFixed(2)}</strong>
            </div>
          </div>

          <button onClick={handlePay} className="pay-btn" disabled={paying || verifying}>
            {paying ? 'Redirecting to Payment...' : `SECURE PAY (\u20B9${cart.total.toFixed(2)})`}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Lock size={12} /> Secured by Razorpay
          </div>
        </div>
      </div>

      {verifying && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 9999, color: '#fff' }}>
          <div style={{ background: 'rgba(20, 20, 30, 0.95)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px 30px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.37)' }}>
            <div className="spin" style={{ width: '48px', height: '48px', border: '4px solid rgba(247, 55, 79, 0.1)', borderTopColor: '#f7374f', borderRadius: '50%', margin: '0 auto 24px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Securing Your Payment</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Shield size={16} /> Verifying transaction with payment gateway&hellip;
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
