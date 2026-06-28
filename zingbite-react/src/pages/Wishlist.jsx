import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';
import { AlertCircle, Heart, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { getMenuItemDisplayText, isVegDish } from '../utils/menuDisplay';

const DEFAULT_DISH_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop';

const Wishlist = () => {
  const { wishlist, toggleWishlist, loading } = useWishlist();
  const { cart, addToCart, updateQuantity, conflictPopup, clearAndAdd, setConflictPopup } = useCart();

  const getCartQuantity = (itemId) => {
    if (!cart || !cart.items) return 0;
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    const item = itemsArray.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  // --- 1. Loading State ---
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
      </div>
    );
  }

  // --- 2. Empty State ---
  if (wishlist.length === 0) {
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(247,55,79,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Heart size={44} color="var(--brand-red)" strokeWidth={1.2} />
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', fontFamily: "'Outfit', sans-serif" }}>Your wishlist is empty</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem', maxWidth: '400px' }}>
          Save your favorite meals here to order them quickly anytime you crave them!
        </p>
        <Link to="/" style={{ padding: '14px 36px', background: 'linear-gradient(135deg, var(--brand-red), #d42d42)', color: '#fff', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(247,55,79,0.25)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(247,55,79,0.35)'; }}
          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 8px 24px rgba(247,55,79,0.25)'; }}
        >
          <ShoppingBag size={16} /> EXPLORE MENU
        </Link>
      </div>
    );
  }

  // --- 3. Populated State ---
  return (
    <>
      <style>{`
        .wishlist-container {
          max-width: 1200px;
          width: 92%;
          margin: 40px auto 64px;
        }
        .wishlist-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          border-bottom: 1.5px solid var(--border-light);
          padding-bottom: 16px;
        }
        .wishlist-header h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          margin: 0;
          color: var(--text-primary);
        }
        .wishlist-count {
          font-size: 0.85rem;
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.06);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(247, 55, 79, 0.12);
          font-weight: 700;
        }
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .wishlist-card {
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all 0.3s var(--ease-premium);
          position: relative;
        }
        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(247, 55, 79, 0.05);
          border-color: rgba(247, 55, 79, 0.1);
        }
        .wishlist-card-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }
        .wishlist-card-img-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          flex-shrink: 0;
        }
        .wishlist-card-img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          object-fit: cover;
          border: 1px solid var(--border-light);
        }
        .wishlist-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .wishlist-card-price {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--brand-red);
          margin-bottom: 8px;
        }
        .wishlist-card-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .remove-icon-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
          padding: 4px;
        }
        .remove-icon-btn:hover {
          color: var(--danger);
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(6px);
          padding: 20px;
        }
        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 32px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .modal-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(247, 55, 79, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .modal-title {
          margin: 0 0 10px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .modal-desc {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 26px;
        }
        .modal-btn-outline,
        .modal-btn-primary {
          flex: 1;
          border-radius: 12px;
          padding: 13px;
          font: inherit;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .modal-btn-outline {
          background: transparent;
          border: 2px solid var(--border-medium);
          color: var(--text-primary);
        }
        .modal-btn-outline:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }
        .modal-btn-primary {
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          border: none;
          color: #fff;
          box-shadow: 0 4px 14px rgba(247, 55, 79, 0.25);
        }
        .modal-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.35);
        }
      `}</style>

      <div className="wishlist-container page-enter">
        <div className="wishlist-header">
          <h2>My Favorites</h2>
          <span className="wishlist-count">{wishlist.length} ITEM{wishlist.length !== 1 ? 'S' : ''}</span>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const qty = getCartQuantity(item.menuId);
            const isVeg = isVegDish(item);
            const dishDisplay = getMenuItemDisplayText(item);

            return (
              <div key={item.menuId} className="wishlist-card">
                <button 
                  type="button" 
                  className="remove-icon-btn" 
                  onClick={() => toggleWishlist(item)} 
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>

                <div className="wishlist-card-img-wrapper">
                  <img 
                    src={item.imagePath || DEFAULT_DISH_IMAGE} 
                    alt={dishDisplay.title}
                    className="wishlist-card-img"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_DISH_IMAGE; }}
                  />
                </div>

                <div className="wishlist-card-details">
                  <div>
                    <div className="dish-card-header-tags" style={{ marginBottom: '6px' }}>
                      <div className={isVeg ? "dish-type-badge veg" : "dish-type-badge nonveg"}>
                        <span className="dot"></span>
                        <span>{isVeg ? 'VEG' : 'NON-VEG'}</span>
                      </div>
                    </div>
                    <h3 className="wishlist-card-title">{dishDisplay.title}</h3>
                    {dishDisplay.subtitle && <p className="wishlist-card-desc">{dishDisplay.subtitle}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="wishlist-card-price">&#8377;{item.price}</div>
                    
                    {/* Add to Cart / Qty Stepper */}
                    <div style={{ position: 'relative' }}>
                      {qty === 0 ? (
                        <button 
                          type="button"
                          className="add-btn" 
                          disabled={!item.isAvailable} 
                          onClick={() => addToCart(item.menuId, 1)}
                        >
                          {item.isAvailable ? 'ADD' : 'SOLD OUT'}
                        </button>
                      ) : (
                        <div className="qty-stepper" style={{ position: 'static' }}>
                          <button type="button" className="step-btn" onClick={() => updateQuantity(item.menuId, qty - 1)}>
                            <Minus size={12} />
                          </button>
                          <span className="step-val">{qty}</span>
                          <button type="button" className="step-btn" onClick={() => updateQuantity(item.menuId, qty + 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {conflictPopup && createPortal(
        <div className="modal-overlay" onClick={() => setConflictPopup(null)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-icon"><AlertCircle size={32} color="var(--brand-red)" /></div>
            <h3 className="modal-title">Items from another restaurant</h3>
            <p className="modal-desc">Your cart contains items from a different restaurant. Start fresh to add this favorite?</p>
            <div className="modal-actions">
              <button type="button" className="modal-btn-outline" onClick={() => setConflictPopup(null)}>Cancel</button>
              <button type="button" className="modal-btn-primary" onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}>Start Fresh</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Wishlist;
