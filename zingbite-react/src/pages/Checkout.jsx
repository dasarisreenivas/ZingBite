import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import axios from 'axios';
import { MapPin, CreditCard, Smartphone, Banknote } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const [addressChoice, setAddressChoice] = useState('profile');

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
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      showAlert("Failed to load Razorpay payment gateway.", "error");
      return;
    }

    const options = {
      key: "rzp_test_RU5HIdwTwlQNOw",
      amount: Math.round(cart.total * 100),
      currency: "INR",
      name: "ZingBite",
      description: "Order Payment",
      handler: async function (response) {
        try {
          const itemsList = cart.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
          const formattedItems = itemsList.map(item => ({
            id: item.itemId,
            qty: item.quantity,
            price: item.price
          }));

          const res = await axios.post('/api/profile', {
            action: 'createOrder',
            total: cart.total,
            paymentMethod: 'Razorpay',
            items: formattedItems
          });
          const orderId = res.data.orderId || 'ZB-latest';
          clearCart();
          navigate(`/track-order?orderId=${orderId}`);
        } catch (err) {
          console.error("Failed to save order to database:", err);
          clearCart();
          navigate('/track-order');
        }
      },
      theme: {
        color: "#F7374F"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
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

          <input 
            type="text" 
            className="address-field" 
            placeholder="Enter your delivery address" 
            defaultValue={addressChoice === 'profile' && user ? user.address : ''}
          />
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

          <button onClick={handlePay} className="pay-action-btn">PROCEED TO PAY (&#8377;{cart.total.toFixed(2)})</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
