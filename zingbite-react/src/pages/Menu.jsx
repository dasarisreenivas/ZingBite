import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { 
  CircleCheck, CircleX, Minus, Plus, ArrowRight, AlertCircle, 
  Search, MapPin, Clock, Star, Info, ShoppingBag, IndianRupee
} from 'lucide-react';

const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');
  const restaurantNameParam = searchParams.get('restaurantName') || 'Restaurant Menu';
  
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All' | 'Veg' | 'NonVeg'
  const [sortBy, setSortBy] = useState('Default'); // 'Default' | 'PriceLowHigh' | 'PriceHighLow'
  const [currentSlide, setCurrentSlide] = useState(0);
  
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

  // Extract restaurant details dynamically from first menu item if possible
  const hasItems = menuList.length > 0;
  const dynRestaurant = hasItems && menuList[0].restaurant ? menuList[0].restaurant : null;
  
  const restName = dynRestaurant ? dynRestaurant.restaurantName : restaurantNameParam;
  const restCuisine = dynRestaurant ? dynRestaurant.cuisineType : 'Cuisine details';
  const restAddress = dynRestaurant ? dynRestaurant.address : 'Address details';
  const restDelivery = dynRestaurant ? dynRestaurant.deliveryTime : '30 mins';
  const restBanner = dynRestaurant?.imagePath || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop';

  const slides = [
    restBanner,
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2035&auto=format&fit=crop"
  ];

  useEffect(() => {
    if (slides.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Filter list by search term and veg/non-veg type
  const filteredList = menuList.filter(item => {
    const matchesSearch = (item.menuName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'Veg') return isVegDish(item);
    if (filterType === 'NonVeg') return !isVegDish(item);
    return true;
  });

  // Sort list
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'PriceLowHigh') return a.price - b.price;
    if (sortBy === 'PriceHighLow') return b.price - a.price;
    return 0; // Default order
  });

  return (
    <>
      <style>{`
        .menu-page-container {
          max-width: 1200px;
          margin: 0 auto 64px;
          padding: 0 24px;
        }

        .restaurant-hero {
          position: relative;
          height: 340px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-md);
        }

        .slideshow-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          z-index: 1;
        }

        .hero-slide.active {
          opacity: 1;
          z-index: 2;
        }

        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 15%, rgba(0, 0, 0, 0.3) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 24px 32px;
          color: white;
          z-index: 3;
          text-align: center;
        }

        .hero-glass-card {
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-lg);
          padding: 28px 36px;
          max-width: 580px;
          width: 100%;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          transform: translateY(0);
          animation: heroCardFloat 4s ease-in-out infinite;
        }

        @keyframes heroCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .hero-glass-card h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 2.3rem;
          font-weight: 800;
          margin: 0 0 8px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
          letter-spacing: -0.5px;
        }

        .hero-info-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.95);
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .hero-info-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .cuisine-tag {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 14px;
        }

        .promo-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(247, 55, 79, 0.25);
          border: 1px solid rgba(247, 55, 79, 0.4);
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffcbd1;
          letter-spacing: 0.5px;
        }

        .slideshow-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .slideshow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slideshow-dot.active {
          background: #fff;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }

        .menu-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .search-menu-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-menu-wrapper input {
          width: 100%;
          padding: 14px 16px 14px 44px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          outline: none;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .search-menu-wrapper input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 4px rgba(247, 55, 79, 0.12);
        }

        .search-icon-pos {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .filter-sort-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-pills {
          display: flex;
          background: var(--bg-surface);
          border-radius: 24px;
          padding: 4px;
          border: 1px solid var(--border-medium);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }

        .filter-pill {
          background: transparent;
          border: none;
          padding: 6px 14px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 20px;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .filter-pill.active {
          background: #fff;
          color: var(--brand-red);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .sort-select {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-medium);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          background: #fff;
          transition: border-color 0.2s;
        }

        .sort-select:focus {
          border-color: var(--brand-red);
        }

        .menu-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .menu-dish-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
          transform: translateY(20px);
        }

        .menu-dish-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: rgba(247, 55, 79, 0.25);
        }

        .dish-image-wrapper {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: var(--bg-surface);
        }

        .dish-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .menu-dish-card:hover .dish-card-img {
          transform: scale(1.08);
        }

        .dish-badge-veg {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--success);
          border: 1px solid rgba(96, 178, 70, 0.2);
        }

        .dish-badge-nonveg {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.95);
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--danger);
          border: 1px solid rgba(226, 55, 68, 0.2);
        }

        .veg-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
        }

        .nonveg-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--danger);
        }

        .dish-card-price {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 0.95rem;
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
        }

        .dish-card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .dish-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 6px;
        }

        .dish-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0 0 16px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .dish-card-footer {
          border-top: 1px solid var(--border-light);
          padding-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-qty-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1.5px solid var(--success);
          border-radius: 20px;
          overflow: hidden;
          width: 96px;
          height: 32px;
          background: #fff;
          box-shadow: 0 2px 6px rgba(96, 178, 70, 0.1);
        }

        .stepper-btn {
          width: 30px;
          height: 100%;
          background: transparent;
          border: none;
          color: var(--success);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .stepper-btn:hover {
          background: rgba(96, 178, 70, 0.08);
        }

        .stepper-val {
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .card-add-btn {
          border: 1.5px solid var(--success);
          background: transparent;
          color: var(--success);
          font-weight: 800;
          font-size: 0.8rem;
          padding: 6px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.5px;
        }

        .card-add-btn:hover:not(:disabled) {
          background: var(--success);
          color: white;
          box-shadow: 0 4px 10px rgba(96, 178, 70, 0.2);
        }

        .card-add-btn:disabled {
          border-color: var(--border-medium);
          color: var(--text-muted);
          cursor: not-allowed;
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
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
          color: var(--text-secondary);
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-lg);
          background: #fff;
        }

        @keyframes cardFadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-card {
          animation: cardFadeInUp 0.55s cubic-bezier(0.25, 0.8, 0.25, 1) both;
        }

        @media (max-width: 992px) {
          .menu-items-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .restaurant-hero {
            height: auto;
            min-height: 280px;
          }
          .hero-glass-card {
            padding: 20px;
            margin: 12px;
          }
          .hero-glass-card h1 {
            font-size: 1.8rem;
          }
          .menu-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-menu-wrapper {
            width: 100%;
          }
          .filter-sort-wrapper {
            justify-content: space-between;
            width: 100%;
          }
          .filter-pills {
            flex: 1;
            justify-content: center;
          }
          .filter-pill {
            flex: 1;
            justify-content: center;
            padding: 6px 10px;
            font-size: 0.8rem;
          }
          .sort-select {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .menu-items-grid {
            grid-template-columns: 1fr;
          }
          .hero-glass-card h1 {
            font-size: 1.5rem;
          }
          .hero-info-row {
            font-size: 0.78rem;
            gap: 8px;
          }
          .promo-tag {
            font-size: 0.75rem;
            padding: 4px 10px;
          }
        }
      `}</style>

      <div className="menu-page-container fade-in">
        {/* Banner Slideshow Hero */}
        <div className="restaurant-hero">
          <div className="slideshow-container">
            {slides.map((slide, idx) => (
              <div 
                key={idx} 
                className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
              >
                <img src={slide} alt={restName} className="hero-bg" />
              </div>
            ))}
          </div>

          <div className="hero-overlay">
            <div className="hero-glass-card">
              <h1>{restName}</h1>
              <div className="hero-info-row">
                <span className="hero-info-item">
                  <Star size={14} fill="#ffb703" color="#ffb703" /> 
                  <strong>4.2</strong> (100+ ratings)
                </span>
                <span>•</span>
                <span className="hero-info-item">
                  <Clock size={14} /> {restDelivery}
                </span>
                <span>•</span>
                <span className="hero-info-item">
                  <MapPin size={14} /> {restAddress}
                </span>
              </div>
              <p className="cuisine-tag">
                Cuisines: <strong>{restCuisine}</strong>
              </p>
              <div className="promo-tag">
                🏷️ ZINGBITE50: 50% OFF up to ₹100 on your first order!
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="slideshow-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`slideshow-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Controls Bar: Search, Category Filter, and Sorting */}
        <div className="menu-controls-bar">
          <div className="search-menu-wrapper">
            <Search size={18} className="search-icon-pos" />
            <input 
              type="text" 
              placeholder="Search for delicious dishes in the menu..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-sort-wrapper">
            {/* Category Pills */}
            <div className="filter-pills">
              <button 
                className={`filter-pill ${filterType === 'All' ? 'active' : ''}`}
                onClick={() => setFilterType('All')}
              >
                All
              </button>
              <button 
                className={`filter-pill ${filterType === 'Veg' ? 'active' : ''}`}
                onClick={() => setFilterType('Veg')}
              >
                <div className="veg-indicator-dot" /> Veg
              </button>
              <button 
                className={`filter-pill ${filterType === 'NonVeg' ? 'active' : ''}`}
                onClick={() => setFilterType('NonVeg')}
              >
                <div className="nonveg-indicator-dot" /> Non-Veg
              </button>
            </div>

            {/* Sorting Dropdown */}
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Default">Sort: Default</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-items-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                style={{ height: '360px', borderRadius: 'var(--radius-lg)' }} 
                className="skeleton animate-card" 
              />
            ))
          ) : sortedList.length > 0 ? (
            sortedList.map((item, idx) => {
              const qty = getCartQuantity(item.menuId);
              const isVeg = isVegDish(item);

              return (
                <div 
                  key={item.menuId} 
                  className="menu-dish-card animate-card"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  <div className="dish-image-wrapper">
                    <img 
                      src={item.imagePath || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop"} 
                      alt={item.menuName} 
                      className="dish-card-img" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop";
                      }}
                    />
                    
                    {/* Floating Badges */}
                    <div className={isVeg ? "dish-badge-veg" : "dish-badge-nonveg"}>
                      <div className={isVeg ? "veg-indicator-dot" : "nonveg-indicator-dot"} />
                      <span>{isVeg ? 'VEG' : 'NON-VEG'}</span>
                    </div>

                    <div className="dish-card-price">
                      <IndianRupee size={14} style={{ marginRight: '1px' }} />
                      <span>{item.price}</span>
                    </div>
                  </div>
                  
                  <div className="dish-card-body">
                    <div>
                      <h3 className="dish-card-title">{item.menuName}</h3>
                      <p className="dish-card-desc">{item.description}</p>
                    </div>
                    
                    <div className="dish-card-footer">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {item.isAvailable ? 'Available' : 'Sold Out'}
                      </span>

                      {qty === 0 ? (
                        <button 
                          className="card-add-btn"
                          disabled={!item.isAvailable}
                          onClick={() => handleAddClick(item.menuId)}
                        >
                          {item.isAvailable ? 'ADD' : 'OUT OF STOCK'}
                        </button>
                      ) : (
                        <div className="card-qty-stepper">
                          <button className="stepper-btn" onClick={() => updateQuantity(item.menuId, qty - 1)}>
                            <Minus size={13} />
                          </button>
                          <span className="stepper-val">{qty}</span>
                          <button className="stepper-btn" onClick={() => updateQuantity(item.menuId, qty + 1)}>
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
            <div className="no-data-dish">
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>No dishes found matching your search or filters.</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Try broadening your search term or category filters.</p>
            </div>
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
