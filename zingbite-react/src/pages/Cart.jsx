import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, coupon, applyCoupon, removeCoupon } = useCart();
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  
  const [promoCode, setPromoCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyPromo = () => {
    setCouponError('');
    if (!promoCode) return;
    const res = applyCoupon(promoCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setPromoCode('');
    }
  };

  const handleQuickApply = (code) => {
    setCouponError('');
    applyCoupon(code);
  };

  const items = cart?.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];

  if (!cart || items.length === 0) {
    return (
      <>
        <style>{`
          .empty-cart {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            text-align: center;
          }
          .btn-primary {
            background-color: var(--brand-red);
            color: #fff;
            padding: 12px 24px;
            border-radius: var(--radius-sm);
            font-weight: 700;
            text-decoration: none;
            display: inline-block;
            transition: background 0.2s;
          }
          .btn-primary:hover {
            background-color: var(--brand-red-hover);
          }
        `}</style>
        <div className="empty-cart fade-in">
          <ShoppingCart size={80} color="var(--text-muted)" strokeWidth={1} style={{marginBottom:'24px'}} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Your cart is empty</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>Add items from restaurants nearby to start your checkout.</p>
          <Link to="/" className="btn-primary">SEE RESTAURANTS NEAR YOU</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .cart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 400px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 24px;
          align-items: start;
        }

        .cart-items-box {
          padding: 24px;
          border: 1px solid var(--border-medium);
          background-color: #fff;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-medium);
        }

        .cart-header h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-count-badge {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: var(--bg-surface);
          padding: 4px 10px;
          border-radius: 12px;
          border: 1px solid var(--border-medium);
          font-weight: 600;
        }

        .clear-cart-btn {
          padding: 6px 14px;
          background: transparent;
          border: 1px solid var(--danger);
          color: var(--danger);
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-cart-btn:hover {
          background: rgba(226, 55, 68, 0.05);
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px dashed var(--border-medium);
          gap: 20px;
        }

        .cart-item-row:last-child {
          border-bottom: none;
        }

        .item-details {
          flex: 1;
        }

        .item-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 6px;
          color: var(--text-primary);
        }

        .item-subtotal {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--brand-red);
          margin: 0 0 12px;
        }

        .qty-control-box {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          height: 32px;
          overflow: hidden;
          background: #fff;
        }

        .qty-adjust-btn {
          width: 32px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .qty-adjust-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .qty-val-display {
          padding: 0 8px;
          color: var(--success);
          font-size: 0.9rem;
          font-weight: 700;
        }

        .item-image-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .item-thumb {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-medium);
        }

        .item-remove-btn {
          color: var(--danger);
          font-size: 0.75rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }

        .item-remove-btn:hover {
          opacity: 0.8;
        }

        .summary-card {
          position: sticky;
          top: 96px;
          padding: 24px;
          border: 1px solid var(--border-medium);
          background-color: #fff;
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
        }

        .coupon-box {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .coupon-title {
          font-size: 0.95rem;
          margin: 0 0 10px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .coupon-input-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .coupon-field {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          outline: none;
          text-transform: uppercase;
        }

        .coupon-field:focus {
          border-color: var(--brand-red);
        }

        .coupon-apply-btn {
          padding: 8px 14px;
          background-color: var(--brand-red);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }

        .coupon-apply-btn:hover {
          background-color: var(--brand-red-hover);
        }

        .applied-coupon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: rgba(96, 178, 70, 0.06);
          border: 1px dashed var(--success);
          border-radius: var(--radius-sm);
          margin-top: 6px;
        }

        .quick-codes-section {
          margin-top: 12px;
        }

        .chips-container {
          display: flex;
          gap: 6px;
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .coupon-chip-btn {
          padding: 4px 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: 30px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }

        .coupon-chip-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .bill-total-row {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          padding-top: 12px;
          padding-bottom: 20px;
          border-top: 1px dashed var(--border-medium);
          margin-top: 12px;
        }

        .checkout-action-btn {
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

        .checkout-action-btn:hover {
          background-color: #50a037;
        }

        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
          .summary-card {
            position: static;
          }
        }

        @media (max-width: 480px) {
          .cart-item-row {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 12px;
          }
          .item-image-col {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>

      <div className="cart-layout fade-in">
        <div className="cart-items-box">
          <div className="cart-header">
            <h2>
              Secure Checkout
              <span className="item-count-badge">{cart.itemCount} ITEMS</span>
            </h2>
            <button onClick={clearCart} className="clear-cart-btn">CLEAR CART</button>
          </div>

          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.itemId} className="cart-item-row">
                <div className="item-details">
                  <h3 className="item-title">{item.itemName}</h3>
                  <p className="item-subtotal">&#8377;{(item.price * item.quantity).toFixed(2)}</p>
                  <div className="qty-control-box">
                    <button className="qty-adjust-btn" onClick={() => updateQuantity(item.itemId, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="qty-val-display">{item.quantity}</span>
                    <button className="qty-adjust-btn" onClick={() => updateQuantity(item.itemId, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="item-image-col">
                  <div className="item-thumb">
                    <img 
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop" 
                      alt={item.itemName} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.itemId)} className="item-remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card">
          {/* Coupon Input Section */}
          <div className="coupon-box">
            <h3 className="coupon-title">Apply Promo Code</h3>
            {coupon ? (
              <div className="applied-coupon-row">
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>
                  {coupon.code} ({coupon.description})
                </span>
                <button onClick={removeCoupon} className="item-remove-btn" style={{ fontSize: '0.75rem' }}>Remove</button>
              </div>
            ) : (
              <div className="coupon-input-group">
                <input 
                  type="text" 
                  placeholder="e.g. ZING50" 
                  value={promoCode} 
                  onChange={e => setPromoCode(e.target.value)} 
                  className="coupon-field"
                />
                <button onClick={handleApplyPromo} className="coupon-apply-btn">APPLY</button>
              </div>
            )}
            {couponError && <p style={{ color: 'var(--danger)', fontSize: '0.78rem', margin: '6px 0 0', fontWeight: 600 }}>{couponError}</p>}
            
            {/* Quick Coupons List */}
            {!coupon && (
              <div className="quick-codes-section">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Quick Codes:</span>
                <div className="chips-container">
                  <button onClick={() => handleQuickApply('ZING50')} className="coupon-chip-btn">ZING50 (50% Off)</button>
                  <button onClick={() => handleQuickApply('FREEDEL')} className="coupon-chip-btn">FREEDEL (Free Delivery)</button>
                </div>
              </div>
            )}
          </div>

          <h2 style={{ fontSize: '1.25rem', fontFamily: "'Outfit', sans-serif", fontWeight: 800, margin: '0 0 16px' }}>Bill Details</h2>
          <div className="bill-row"><span>Item Total</span><span>&#8377;{cart.subtotal.toFixed(2)}</span></div>
          <div className="bill-row"><span>Delivery Fee</span><span>&#8377;{cart.shipping.toFixed(2)}</span></div>
          <div className="bill-row"><span>Taxes and Charges</span><span>&#8377;{cart.tax.toFixed(2)}</span></div>
          {cart.discount > 0 && (
            <div className="bill-row" style={{ color: 'var(--success)', fontWeight: 700 }}>
              <span>Promo Discount</span>
              <span>-&#8377;{cart.discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="bill-row bill-total-row">
            <span>TO PAY</span>
            <span>&#8377;{cart.total.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => user ? navigate('/checkout') : navigate('/login?redirect=/checkout')}
            className="checkout-action-btn"
          >
            {user ? 'PROCEED TO PAY' : 'LOGIN TO PROCEED'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
