import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { 
  CircleCheck, CircleX, Minus, Plus, ArrowRight, AlertCircle, 
  Search, MapPin, Clock, Star, Info, ShoppingBag
} from 'lucide-react';

const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');
  const restaurantNameParam = searchParams.get('restaurantName') || 'Restaurant Menu';
  
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user } = React.useContext(AuthContext);
  const { cart, addToCart, updateQuantity, conflictPopup, clearAndAdd, setConflictPopup } = useCart();

  useEffect(() => {
    const fetchMenu = async (isBackground = false) => {
      try {
        const res = await axios.get(`/api/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`);
        setMenuList(res.data.menuList || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (!isBackground) setLoading(false);
      }
    };
    if (restaurantId) {
      fetchMenu(false);
      const interval = setInterval(() => fetchMenu(true), 4000);
      return () => clearInterval(interval);
    }
  }, [restaurantId, restaurantNameParam]);

  const getCartQuantity = (itemId) => {
    if (!cart || !cart.items) return 0;
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    const item = itemsArray.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddClick = (itemId) => {
    if (!user) {
      navigate(`/login?redirect=/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`);
      return;
    }
    addToCart(itemId, 1);
  };

  // Safe classification of Veg vs Non-Veg based on keywords
  const isVegDish = (item) => {
    const nonVegKeywords = ['chicken', 'mutton', 'egg', 'fish', 'pork', 'beef', 'shrimp', 'prawn', 'meat', 'kebab', 'tikka', 'biryani'];
    const nameLower = (item.menuName || '').toLowerCase();
    const descLower = (item.description || '').toLowerCase();
    return !nonVegKeywords.some(keyword => nameLower.includes(keyword) || descLower.includes(keyword));
  };

  // Filter list by search term
  const filteredList = menuList.filter(item => 
    (item.menuName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract restaurant details dynamically from first menu item if possible
  const hasItems = menuList.length > 0;
  const dynRestaurant = hasItems && menuList[0].restaurant ? menuList[0].restaurant : null;
  
  const restName = dynRestaurant ? dynRestaurant.restaurantName : restaurantNameParam;
  const restCuisine = dynRestaurant ? dynRestaurant.cuisineType : 'Cuisine details';
  const restAddress = dynRestaurant ? dynRestaurant.address : 'Address details';
  const restDelivery = dynRestaurant ? dynRestaurant.deliveryTime : '30 mins';
  const restBanner = dynRestaurant?.imagePath || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop';

  return (
    <>
      <style>{`
        .menu-page-container {
          max-width: 900px;
          margin: 0 auto 64px;
          padding: 0 20px;
        }

        .restaurant-hero {
          position: relative;
          height: 240px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-md);
        }

        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.3) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 32px;
          color: white;
        }

        .hero-overlay h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0 0 6px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .hero-info-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.85);
          flex-wrap: wrap;
        }

        .hero-info-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .search-menu-bar {
          position: relative;
          margin-bottom: 32px;
        }

        .search-menu-bar input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 1rem;
          outline: none;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s;
        }

        .search-menu-bar input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.15);
        }

        .search-icon-pos {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .menu-items-section {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 24px 32px;
          box-shadow: var(--shadow-sm);
        }

        .menu-dish-row {
          display: flex;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-light);
          gap: 24px;
          align-items: center;
        }

        .menu-dish-row:last-child {
          border-bottom: none;
        }

        .dish-details {
          flex: 1;
        }

        .veg-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--success);
          border-radius: 3px;
          padding: 2px;
          margin-bottom: 8px;
        }

        .nonveg-indicator {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          border: 1.5px solid var(--danger);
          border-radius: 3px;
          padding: 2px;
          margin-bottom: 8px;
        }

        .veg-dot {
          width: 7px;
          height: 7px;
          background: var(--success);
          border-radius: 50%;
        }

        .nonveg-dot {
          width: 7px;
          height: 7px;
          background: var(--danger);
          border-radius: 50%;
        }

        .dish-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: var(--text-primary);
        }

        .dish-price {
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text-primary);
          margin: 0 0 10px;
        }

        .dish-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }

        .dish-img-panel {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .dish-img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
        }

        .dish-action-container {
          position: absolute;
          bottom: -10px;
          width: 90px;
          height: 34px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .dish-add-btn {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dish-add-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .dish-qty-panel {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dish-qty-btn {
          width: 30px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dish-qty-btn:hover {
          background: rgba(96, 178, 70, 0.05);
        }

        .dish-qty-val {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .cart-bar-popup {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--success);
          color: #fff;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        }

        .cart-bar-link {
          color: #fff;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .no-data-dish {
          text-align: center;
          padding: 48px;
          color: var(--text-secondary);
        }

        @media (max-width: 600px) {
          .menu-dish-row {
            flex-direction: column-reverse;
            align-items: stretch;
            gap: 16px;
            padding: 16px 0;
          }
          .dish-img-panel {
            width: 100%;
            height: auto;
            align-self: center;
            margin-bottom: 8px;
          }
          .dish-img {
            width: 120px;
            height: 120px;
          }
          .dish-action-container {
            bottom: -10px;
          }
        }
      `}</style>

      <div className="menu-page-container fade-in">
        {/* Banner Hero */}
        <div className="restaurant-hero">
          <img src={restBanner} alt={restName} className="hero-bg" />
          <div className="hero-overlay">
            <h1>{restName}</h1>
            <div className="hero-info-row">
              <span className="hero-info-item"><Star size={14} fill="#ffb703" color="#ffb703" /> 4.2 (100+ ratings)</span>
              <span>•</span>
              <span className="hero-info-item"><Clock size={14} /> {restDelivery}</span>
              <span>•</span>
              <span className="hero-info-item"><MapPin size={14} /> {restAddress}</span>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              Cuisine: {restCuisine}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-menu-bar">
          <Search size={18} className="search-icon-pos" />
          <input 
            type="text" 
            placeholder="Search for delicious dishes in the menu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Menu Items List */}
        <div className="menu-items-section">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ height: '120px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center' }} className="skeleton" />
            ))
          ) : filteredList.length > 0 ? (
            filteredList.map((item) => {
              const qty = getCartQuantity(item.menuId);
              const isVeg = isVegDish(item);

              return (
                <div key={item.menuId} className="menu-dish-row">
                  <div className="dish-details">
                    <div className={isVeg ? "veg-indicator" : "nonveg-indicator"}>
                      <div className={isVeg ? "veg-dot" : "nonveg-dot"} />
                    </div>
                    
                    <h3 className="dish-title">{item.menuName}</h3>
                    <p className="dish-price">&#8377;{item.price}</p>
                    <p className="dish-desc">{item.description}</p>
                  </div>
                  
                  <div className="dish-img-panel">
                    <img 
                      src={item.imagePath || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop"} 
                      alt={item.menuName} 
                      className="dish-img" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop";
                      }}
                    />
                    
                    <div className="dish-action-container">
                      {qty === 0 ? (
                        <button 
                          className="dish-add-btn"
                          disabled={!item.isAvailable}
                          onClick={() => handleAddClick(item.menuId)}
                          style={{ color: item.isAvailable ? 'var(--success)' : 'var(--text-muted)' }}
                        >
                          {item.isAvailable ? 'ADD' : 'OUT'}
                        </button>
                      ) : (
                        <div className="dish-qty-panel">
                          <button className="dish-qty-btn" onClick={() => updateQuantity(item.menuId, qty - 1)}>
                            <Minus size={13} />
                          </button>
                          <span className="dish-qty-val">{qty}</span>
                          <button className="dish-qty-btn" onClick={() => updateQuantity(item.menuId, qty + 1)}>
                            <Plus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-data-dish">No dishes found matching your search.</p>
          )}
        </div>
      </div>

      {/* Cart Popup - Portal to body */}
      {cart && cart.itemCount > 0 && ReactDOM.createPortal(
        <div className="cart-bar-popup slide-up">
          <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} /> {cart.itemCount} item{cart.itemCount > 1 ? 's' : ''} added
          </span>
          <Link to="/cart" className="cart-bar-link">VIEW CART <ArrowRight size={18} /></Link>
        </div>,
        document.body
      )}

      {/* Conflict Modal - Portal to body */}
      {conflictPopup && ReactDOM.createPortal(
        <div style={styles.modalOverlay} onClick={() => setConflictPopup(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalIcon}>
              <AlertCircle size={32} color="var(--brand-red)" />
            </div>
            <h3 style={styles.modalTitle}>Items already in cart</h3>
            <p style={styles.modalDesc}>Your cart contains items from another restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
            <div style={styles.modalActions}>
              <button 
                style={styles.modalBtnOutline} 
                onClick={() => setConflictPopup(null)}
              >NO</button>
              <button 
                style={styles.modalBtnPrimary}
                onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}
              >YES, START AFRESH</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    animation: 'fadeIn 0.25s ease-out both'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '36px',
    borderRadius: '24px',
    maxWidth: '420px',
    width: '90%',
    boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  modalIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'rgba(247, 55, 79, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  modalTitle: {
    fontSize: '1.3rem',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 700,
    margin: '0 0 10px',
    color: 'var(--text-primary)'
  },
  modalDesc: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    margin: '0 0 4px'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  modalBtnOutline: {
    flex: 1,
    padding: '13px 16px',
    background: 'transparent',
    border: '2px solid var(--border-medium)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease'
  },
  modalBtnPrimary: {
    flex: 2,
    padding: '13px 16px',
    background: 'var(--brand-red)',
    color: '#fff',
    border: 'none',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: '0.9rem',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(247, 55, 79, 0.25)',
    transition: 'all 0.25s ease'
  }
};

export default Menu;
