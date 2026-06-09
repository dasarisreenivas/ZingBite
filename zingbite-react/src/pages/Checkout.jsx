import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import axios from 'axios';
import { MapPin, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user, updateUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const [addressChoice, setAddressChoice] = useState('profile');
  const [manualAddress, setManualAddress] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [paying, setPaying] = useState(false);

  // Leaflet Map states & refs
  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [geocoding, setGeocoding] = useState(false);

  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

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
          if (window.L) {
            setLeafletLoaded(true);
            clearInterval(interval);
          }
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
      } else {
        setManualAddress(`Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`);
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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const customIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">📍</div>`,
      className: 'custom-checkout-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([defaultLat, defaultLng], { icon: customIcon, draggable: true }).addTo(map);
    markerRef.current = marker;

    marker.on('dragend', () => {
      const latLng = marker.getLatLng();
      reverseGeocode(latLng.lat, latLng.lng);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    // Trigger initial reverse geocode
    reverseGeocode(defaultLat, defaultLng);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [leafletLoaded, addressChoice]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      showAlert("Geolocation is not supported by your browser.", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16);
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]);
          }
        }
        reverseGeocode(latitude, longitude);
      },
      (err) => {
        showAlert("Error retrieving location: " + err.message, "error");
      }
    );
  };

  if (!cart || cart.itemCount === 0) {
    navigate('/cart');
    return null;
  }

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    if (paying || verifying) return;
    
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      showAlert("Failed to load Razorpay payment gateway.", "error");
      return;
    }

    setPaying(true);

    try {
      const itemsList = cart.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
      const formattedItems = itemsList.map(item => ({
        id: item.itemId,
        qty: item.quantity,
        price: item.price
      }));

      const finalAddress = addressChoice === 'profile' ? (user?.address || '') : manualAddress;
      
      // Update manual address if chosen
      if (addressChoice === 'manual' && finalAddress) {
        const upRes = await axios.post('/api/profile', {
          action: 'update',
          username: user.userName || user.username || 'User',
          mobile: String(user.phoneNumber || user.mobile || ''),
          address: finalAddress
        });
        if (upRes.data.success && typeof updateUser === 'function') {
          updateUser(upRes.data.user);
        }
      }

      // Step 1: Pre-reserve the order in PENDING_PAYMENT state
      const res = await axios.post('/api/profile', {
        action: 'createOrder',
        total: cart.total,
        paymentMethod: 'Razorpay',
        items: formattedItems
      });

      if (!res.data.success) {
        showAlert(res.data.error || "Failed to reserve order.", "error");
        setPaying(false);
        return;
      }

      const orderId = res.data.orderId;

      // Step 2: Launch the Payment Gateway Interface
      const options = {
        key: "rzp_test_RU5HIdwTwlQNOw",
        amount: Math.round(cart.total * 100),
        currency: "INR",
        name: "ZingBite",
        description: "Order Payment",
        handler: async function (response) {
          setVerifying(true);
          try {
            // Step 3: Transactional Server-Side Verification
            const verifyRes = await axios.post('/api/payment/verify', {
              orderId: orderId,
              transactionId: response.razorpay_payment_id,
              paymentMethod: 'Razorpay'
            });

            if (verifyRes.data.success) {
              trackEvent('ORDER_PLACED', { orderId, amount: cart.total });
              clearCart();
              navigate(`/track-order?orderId=${orderId}`);
            } else {
              showAlert(verifyRes.data.error || "Payment verification failed.", "error");
            }
          } catch (err) {
            console.error("Payment verification timeout/drop:", err);
            // In case of transient server verification network drops, redirect to track-order page anyway.
            // The user cart is cleared, and they see the tracking screen showing the order verification loader,
            // while the background reconciler checks the gateway status and self-corrects the order.
            trackEvent('ORDER_PLACED', { orderId, amount: cart.total });
            clearCart();
            navigate(`/track-order?orderId=${orderId}`);
          } finally {
            setVerifying(false);
          }
        },
        modal: {
          ondismiss: async function () {
            console.log("Payment gateway dismissed. Cancelling reserved order.");
            try {
              // Notify server of cancellation immediately to release locks/inventories
              await axios.post('/api/payment/verify', {
                orderId: orderId,
                transactionId: 'pay_abandoned_' + orderId,
                paymentMethod: 'Razorpay'
              });
            } catch (e) {
              console.error("Failed to notify server of cancellation:", e);
            }
          }
        },
        theme: {
          color: "#F7374F"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Failed to initialize checkout transaction:", err);
      showAlert("An error occurred during checkout setup. Please try again.", "error");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <style>{`
        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 400px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 24px;
          align-items: start;
        }

        .checkout-address-card {
          background-color: #fff;
          border: 1px solid var(--border-medium);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .checkout-payment-card {
          background-color: #fff;
          border: 1px solid var(--border-medium);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .checkout-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 800;
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s;
        }

        .option-label:hover {
          background: var(--bg-surface);
        }

        .address-field {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          outline: none;
        }

        .address-field:focus {
          border-color: var(--brand-red);
        }

        .bill-summary-box {
          background-color: var(--bg-surface);
          padding: 16px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          border: 1px solid var(--border-light);
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bill-row:last-child {
          margin-bottom: 0;
        }

        .bill-divider {
          border: none;
          border-top: 1px dashed var(--text-muted);
          margin: 12px 0;
        }

        .bill-total-row {
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 800;
        }

        .pay-action-btn {
          width: 100%;
          padding: 16px;
          background-color: var(--success);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          box-shadow: 0 4px 12px rgba(96, 178, 70, 0.2);
        }

        .pay-action-btn:hover {
          background-color: #50a037;
        }

        @media (max-width: 850px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="checkout-layout fade-in">
        <div className="checkout-address-card">
          <h2 className="checkout-title">
            <MapPin size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: 'var(--brand-red)' }} />
            Delivery Address
          </h2>
          
          <div className="option-group">
            <label className="option-label">
              <input 
                type="radio" 
                checked={addressChoice === 'profile'} 
                onChange={() => setAddressChoice('profile')} 
              /> Use profile address
            </label>
            <label className="option-label">
              <input 
                type="radio" 
                checked={addressChoice === 'manual'} 
                onChange={() => setAddressChoice('manual')} 
              /> Enter manually
            </label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              type="text" 
              className="address-field" 
              placeholder="Enter your delivery address" 
              value={addressChoice === 'profile' ? (user ? user.address : '') : manualAddress}
              onChange={(e) => {
                if (addressChoice === 'manual') {
                  setManualAddress(e.target.value);
                }
              }}
              disabled={addressChoice === 'profile'}
            />
            {addressChoice === 'manual' && (
              <>
                <button 
                  type="button"
                  onClick={detectLocation}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    background: 'var(--brand-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}
                >
                  <MapPin size={12} /> {geocoding ? 'Detecting Location...' : 'Auto-Detect Current Location'}
                </button>
                <div 
                  ref={mapRef} 
                  style={{ 
                    height: '220px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--border-medium)',
                    marginTop: '8px',
                    zIndex: 1
                  }} 
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                  * Drag the red marker pin or click anywhere on the map to select your delivery coordinates.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="checkout-payment-card">
          <h2 className="checkout-title">
            <CreditCard size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: 'var(--brand-red)' }} />
            Payment
          </h2>
          <div className="option-group">
            <label className="option-label"><input type="radio" name="pay" defaultChecked /> <CreditCard size={16} style={{ marginRight: '6px' }} /> Credit / Debit Card</label>
            <label className="option-label"><input type="radio" name="pay" /> <Smartphone size={16} style={{ marginRight: '6px' }} /> UPI</label>
            <label className="option-label"><input type="radio" name="pay" /> <Banknote size={16} style={{ marginRight: '6px' }} /> Cash on Delivery</label>
          </div>

          <div className="bill-summary-box">
            <div className="bill-row"><span>Item Total</span><span>&#8377;{cart.subtotal.toFixed(2)}</span></div>
            <div className="bill-row"><span>Delivery Fee</span><span>&#8377;{cart.shipping.toFixed(2)}</span></div>
            <div className="bill-row"><span>Taxes</span><span>&#8377;{cart.tax.toFixed(2)}</span></div>
            {cart.discount > 0 && (
              <div className="bill-row" style={{ color: 'var(--success)', fontWeight: 700 }}>
                <span>Promo Discount</span>
                <span>-&#8377;{cart.discount.toFixed(2)}</span>
              </div>
            )}
            <hr className="bill-divider" />
            <div className="bill-row bill-total-row">
              <strong>TO PAY</strong>
              <strong>&#8377;{cart.total.toFixed(2)}</strong>
            </div>
          </div>

          <button 
            onClick={handlePay} 
            className="pay-action-btn"
            disabled={paying || verifying}
          >
            {paying ? 'PROCEEDING TO PAY...' : `PROCEED TO PAY (\u20B9${cart.total.toFixed(2)})`}
          </button>
        </div>
      </div>

      {verifying && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          color: '#fff'
        }}>
          <div style={{
            background: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '40px 30px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.37)'
          }}>
            <div className="spin" style={{
              width: '48px',
              height: '48px',
              border: '4px solid rgba(247, 55, 79, 0.1)',
              borderTopColor: '#f7374f',
              borderRadius: '50%',
              margin: '0 auto 24px'
            }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Verifying Payment</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              We are transactionally securing your order with the bank gateway. Please do not refresh, close this page, or press back.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
