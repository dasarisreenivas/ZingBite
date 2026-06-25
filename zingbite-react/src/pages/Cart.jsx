import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, ShoppingCart, Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag, Percent, Truck } from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, coupon, applyCoupon, removeCoupon } = useCart();
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [splitCount, setSplitCount] = useState(2);

  const items = cart?.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];

  useEffect(() => {
    const fetchOptimization = async () => {
      if (items.length === 0) return;
      try {
        const formattedItems = items.map(i => ({
          menuId: i.itemId,
          name: i.itemName,
          price: i.price,
          quantity: i.quantity
        }));
        const res = await axios.post('/api/ai/cart-optimize', { cartItems: formattedItems });
        if (res.data && res.data.optimizationAvailable) {
          setAiSuggestion(res.data.message);
        } else {
          setAiSuggestion(null);
        }
      } catch (err) {
        console.error("AI Cart Optimization Error:", err);
      }
    };
    fetchOptimization();
  }, [items]);

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

  if (!cart || items.length === 0) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(247,55,79,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <ShoppingCart size={44} color="var(--text-muted)" strokeWidth={1.2} />
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>Your cart is empty</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem', maxWidth: '400px' }}>Looks like you haven't added anything yet. Explore restaurants near you and find something delicious!</p>
        <Link to="/" style={{ padding: '14px 36px', background: 'linear-gradient(135deg, var(--brand-red), #d42d42)', color: '#fff', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(247,55,79,0.25)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(247,55,79,0.35)'; }}
          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 8px 24px rgba(247,55,79,0.25)'; }}
        ><ShoppingBag size={16} /> BROWSE RESTAURANTS</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .cart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          width: min(1200px, calc(100% - 40px));
          margin: 24px auto 48px;
          gap: 28px;
          align-items: start;
        }
        .cart-items-box {
          padding: 28px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
        }
        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1.5px solid var(--border-light);
        }
        .cart-header h2 {
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .item-count-badge {
          font-size: 0.8rem;
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(247,55,79,0.12);
          font-weight: 700;
        }
        .clear-cart-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1.5px solid rgba(226,55,68,0.2);
          color: var(--danger);
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .clear-cart-btn:hover {
          background: rgba(226,55,68,0.04);
          border-color: var(--danger);
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
          border-bottom: 1px dashed var(--border-light);
          gap: 16px;
        }
        .cart-item-row:last-child { border-bottom: none; }
        .item-details { flex: 1; min-width: 0; }
        .item-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--text-primary);
        }
        .item-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--brand-red);
          margin: 0 0 10px;
        }
        .qty-control-box {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid rgba(96,178,70,0.25);
          border-radius: 10px;
          height: 34px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 2px 8px rgba(96,178,70,0.06);
        }
        .qty-adjust-btn {
          width: 34px;
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
        .qty-adjust-btn:hover { background: rgba(96,178,70,0.06); }
        .qty-val-display {
          padding: 0 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 700;
          min-width: 20px;
          text-align: center;
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
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--border-light);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .item-remove-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .item-remove-btn:hover { color: var(--danger); }
        .summary-card {
          position: sticky;
          top: 96px;
          padding: 24px;
          border: 1px solid var(--border-light);
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border-radius: 20px;
        }
        .summary-card::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 20px;
          right: 20px;
          height: 3px;
          background: linear-gradient(90deg, var(--brand-red), #ff6b81, var(--brand-red));
          border-radius: 20px 20px 0 0;
        }
        .coupon-box {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }
        .coupon-title {
          font-size: 0.9rem;
          margin: 0 0 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coupon-title svg { color: var(--brand-red); }
        .coupon-input-group {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .coupon-field {
          flex: 1;
          padding: 10px 14px;
          border: 1.5px solid var(--border-medium);
          border-radius: 10px;
          font-size: 0.85rem;
          outline: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: border-color 0.25s var(--ease-premium);
        }
        .coupon-field:focus { border-color: var(--brand-red); }
        .coupon-apply-btn {
          padding: 10px 18px;
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.25s var(--ease-premium);
        }
        .coupon-apply-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(247,55,79,0.3);
        }
        .applied-coupon-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: rgba(96,178,70,0.06);
          border: 1.5px dashed var(--success);
          border-radius: 10px;
          margin-top: 6px;
        }
        .quick-codes-section { margin-top: 12px; }
        .chips-container {
          display: flex;
          gap: 6px;
          margin-top: 6px;
          flex-wrap: wrap;
        }
        .coupon-chip-btn {
          padding: 5px 12px;
          background: rgba(247,55,79,0.04);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 20px;
          font-size: 0.7rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          font-weight: 600;
        }
        .coupon-chip-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.06);
        }
        .bill-label { font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; }
        .bill-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .bill-total-row {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          padding-top: 12px;
          padding-bottom: 16px;
          border-top: 1.5px dashed var(--border-light);
          margin-top: 8px;
        }
        .checkout-action-btn {
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
          box-shadow: 0 4px 16px rgba(96, 178, 70, 0.25);
        }
        .checkout-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(96, 178, 70, 0.35);
        }
        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr;
            margin: 16px auto 32px;
            gap: 20px;
          }
          .summary-card { position: static; }
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
          .cart-items-box { padding: 20px; }
        }
      `}</style>

      <div className="cart-layout page-enter">
        <div className="cart-items-box">
          <div className="cart-header">
            <h2>
              <ShoppingBag size={20} color="var(--brand-red)" />
              Your Cart
              <span className="item-count-badge">{cart.itemCount} ITEM{cart.itemCount > 1 ? 'S' : ''}</span>
            </h2>
            <button onClick={clearCart} className="clear-cart-btn"><Trash2 size={14} /> Clear</button>
          </div>

          {aiSuggestion && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: 'rgba(247, 55, 79, 0.05)',
              border: '1px solid rgba(247, 55, 79, 0.15)',
              color: 'var(--brand-red)',
              fontSize: '0.88rem',
              marginBottom: '20px',
              fontWeight: 600
            }}>
              <Sparkles size={18} style={{ color: 'var(--brand-red)', flexShrink: 0, animation: 'pulse 1.5s infinite' }} />
              <div style={{ flex: 1 }}>{aiSuggestion}</div>
              <button
                onClick={() => {
                  applyCoupon('ZING50');
                  setAiSuggestion(null);
                }}
                style={{
                  background: 'var(--brand-red)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(247, 55, 79, 0.2)'
                }}
              >
                Apply Bundle Deal
              </button>
            </div>
          )}

          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.itemId} className="cart-item-row">
                <div className="item-details">
                  <h3 className="item-title">{item.itemName}</h3>
                  <p className="item-price">&#8377;{(item.price * item.quantity).toFixed(2)}</p>
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
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.itemId)} className="item-remove-btn">
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-card">
          <div className="coupon-box">
            <h3 className="coupon-title"><Tag size={15} /> Apply Promo Code</h3>
            {coupon ? (
              <div className="applied-coupon-row">
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Percent size={13} /> {coupon.code} ({coupon.description})
                </span>
                <button onClick={removeCoupon} className="item-remove-btn" style={{ fontSize: '0.75rem' }}>Remove</button>
              </div>
            ) : (
              <div className="coupon-input-group">
                <input type="text" placeholder="e.g. ZING50" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="coupon-field" />
                <button onClick={handleApplyPromo} className="coupon-apply-btn">Apply</button>
              </div>
            )}
            {couponError && <p style={{ color: 'var(--danger)', fontSize: '0.78rem', margin: '6px 0 0', fontWeight: 600 }}>{couponError}</p>}
            {!coupon && (
              <div className="quick-codes-section">
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Quick Codes:</span>
                <div className="chips-container">
                  <button onClick={() => handleQuickApply('ZING50')} className="coupon-chip-btn">ZING50 (50% Off)</button>
                  <button onClick={() => handleQuickApply('FREEDEL')} className="coupon-chip-btn">FREEDEL (Free Delivery)</button>
                </div>
              </div>
            )}
          </div>

          {/* AI Smart Splitter */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
              <Sparkles size={15} style={{ color: 'var(--brand-red)' }} /> AI Smart Splitter
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: '1.4' }}>
              Splitting with friends? Enter number of people to calculate equal shares.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Split between:</label>
              <input
                type="number"
                min="2"
                max="20"
                value={splitCount}
                onChange={(e) => setSplitCount(Math.max(2, parseInt(e.target.value) || 2))}
                style={{
                  width: '60px',
                  padding: '6px 10px',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '8px',
                  outline: 'none',
                  textAlign: 'center',
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>people</span>
            </div>
            <div style={{
              background: 'rgba(96, 178, 70, 0.05)',
              border: '1px solid rgba(96, 178, 70, 0.15)',
              padding: '10px 14px',
              borderRadius: '8px',
              color: 'var(--success)',
              fontSize: '0.82rem',
              fontWeight: 700,
            }}>
              Each pays: &#8377;{(cart.total / splitCount).toFixed(2)}
            </div>
          </div>

          <div className="bill-label">Bill Details</div>
          <div className="bill-row"><span>Item Total</span><span>&#8377;{cart.subtotal.toFixed(2)}</span></div>
          <div className="bill-row">
            <span><Truck size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Delivery Fee</span>
            <span>&#8377;{cart.surgeMultiplier > 1.0 ? Math.max(0, cart.shipping - cart.surgeFee).toFixed(2) : cart.shipping.toFixed(2)}</span>
          </div>
          {cart.surgeMultiplier > 1.0 && (
            <div className="bill-row" style={{ color: 'var(--brand-red)', fontWeight: 600 }}>
              <span>⚡ Surge Charge ({cart.surgeReason})</span>
              <span>+&#8377;{cart.surgeFee.toFixed(2)}</span>
            </div>
          )}
          <div className="bill-row"><span>Taxes and Charges</span><span>&#8377;{cart.tax.toFixed(2)}</span></div>
          {cart.discount > 0 && (
            <div className="bill-row" style={{ color: 'var(--success)', fontWeight: 700 }}>
              <span><Percent size={12} style={{ marginRight: '2px', verticalAlign: 'middle' }} /> Promo Discount</span>
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
            {user ? `PROCEED TO PAY (\u20B9${cart.total.toFixed(2)})` : 'LOGIN TO PROCEED'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
