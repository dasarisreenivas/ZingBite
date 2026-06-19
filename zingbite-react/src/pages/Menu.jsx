import { useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSSE from '../hooks/useSSE';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { 
  Minus, Plus, ArrowRight, AlertCircle,
  Search, MapPin, Clock, Star, ShoppingBag, Flame, AlertTriangle
} from 'lucide-react';

const DEFAULT_RESTAURANT_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop';
const DEFAULT_DISH_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop';
const MENU_PAGE_SIZE = 8;
const RECOMMENDATION_PAGE_SIZE = 4;

const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');
  const restaurantNameParam = searchParams.get('restaurantName') || 'Restaurant Menu';
  
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [visibleMenuCount, setVisibleMenuCount] = useState(MENU_PAGE_SIZE);
  const [visibleRecommendationCount, setVisibleRecommendationCount] = useState(RECOMMENDATION_PAGE_SIZE);
  
  const { user } = useContext(AuthContext);
  const { cart, addToCart, updateQuantity, conflictPopup, clearAndAdd, setConflictPopup, cartError, setCartError } = useCart();

  const isFetchingMenuRef = useRef(false);

  const fetchMenu = useCallback(async (isBackground = false) => {
    if (isFetchingMenuRef.current) return;
    isFetchingMenuRef.current = true;
    if (!isBackground) setLoading(true);
    try {
      const res = await axios.get(`/api/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`);
      setMenuList(res.data.menuList || []);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isBackground) setLoading(false);
      isFetchingMenuRef.current = false;
    }
  }, [restaurantId, restaurantNameParam]);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu(false);
    }
  }, [restaurantId, fetchMenu]);

  const menuSsePath = window.location.pathname.startsWith('/zingbite')
    ? `/zingbite/api/stream?topic=menu&restaurantId=${restaurantId}`
    : `/api/stream?topic=menu&restaurantId=${restaurantId}`;

  useSSE(restaurantId ? menuSsePath : null, (event) => {
    try {
      console.log("[ZingBite SSE] Real-time menu update");
      fetchMenu(true);
    } catch (err) {
      console.error(err);
    }
  }, { enabled: !!restaurantId });

  const cartItemIds = useMemo(() => {
    if (!cart || !cart.items) return '';
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    return itemsArray.map(item => item.itemId).join(',');
  }, [cart]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!restaurantId) return;
      try {
        setRecommendationsLoading(true);
        const res = await axios.get(`/api/recommendations?restaurantId=${restaurantId}&cartItems=${cartItemIds}`);
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("[ZingBite] Error fetching recommendations:", err);
      } finally { setRecommendationsLoading(false); }
    };
    fetchRecommendations();
  }, [restaurantId, cartItemIds]);

  const getCartQuantity = (itemId) => {
    if (!cart || !cart.items) return 0;
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    const item = itemsArray.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddClick = async (itemId) => {
    if (!user) { navigate(`/login?redirect=/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`); return; }
    setCartError(null);
    await addToCart(itemId, 1);
  };

  const isVegDish = (item) => {
    const nonVegKeywords = ['chicken', 'mutton', 'egg', 'fish', 'pork', 'beef', 'shrimp', 'prawn', 'meat', 'kebab', 'tikka', 'biryani'];
    const nameLower = (item.menuName || '').toLowerCase();
    const descLower = (item.description || '').toLowerCase();
    return !nonVegKeywords.some(keyword => nameLower.includes(keyword) || descLower.includes(keyword));
  };

  const hasItems = menuList.length > 0;
  const dynRestaurant = hasItems && menuList[0].restaurant ? menuList[0].restaurant : null;
  const restName = dynRestaurant ? dynRestaurant.restaurantName : restaurantNameParam;
  const restCuisine = dynRestaurant ? (dynRestaurant.cusineType || dynRestaurant.cuisineType || 'Cuisine details') : 'Cuisine details';
  const restAddress = dynRestaurant ? (dynRestaurant.address || 'Address details') : 'Address details';
  const restDelivery = dynRestaurant ? (dynRestaurant.deliveryTime || '30 mins') : '30 mins';
  const restBanner = dynRestaurant?.imagePath || DEFAULT_RESTAURANT_IMAGE;

  const slides = useMemo(() => [
    restBanner,
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2035&auto=format&fit=crop"
  ], [restBanner]);

  useEffect(() => {
    if (slides.length === 0) return;
    const slideInterval = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => { setVisibleMenuCount(MENU_PAGE_SIZE); }, [restaurantId, searchTerm, filterType, sortBy]);
  useEffect(() => { setVisibleRecommendationCount(RECOMMENDATION_PAGE_SIZE); }, [restaurantId, cartItemIds]);

  const visibleMenuList = restaurantId ? menuList : [];
  const isMenuLoading = Boolean(restaurantId) && loading;

  const filteredList = visibleMenuList.filter(item => {
    const matchesSearch = (item.menuName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'Veg') return isVegDish(item);
    if (filterType === 'NonVeg') return !isVegDish(item);
    return true;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'PriceLowHigh') return a.price - b.price;
    if (sortBy === 'PriceHighLow') return b.price - a.price;
    return 0;
  });
  const visibleMenuItems = sortedList.slice(0, visibleMenuCount);
  const visibleRecommendations = recommendations.slice(0, visibleRecommendationCount);
  const hasMoreMenuItems = visibleMenuCount < sortedList.length;
  const hasMoreRecommendations = visibleRecommendationCount < recommendations.length;

  return (
    <>
      <style>{`
        .menu-page-container { max-width: 1400px; width: 92%; margin: 0 auto 64px; padding: 0; }
        .restaurant-hero { position: relative; height: 340px; border-radius: 24px; overflow: hidden; margin-top: 24px; margin-bottom: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
        .slideshow-container { width: 100%; height: 100%; position: relative; }
        .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease-in-out; z-index: 1; }
        .hero-slide.active { opacity: 1; z-index: 2; }
        .hero-bg { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.35) 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 32px; color: white; z-index: 3; text-align: center; }
        .hero-overlay::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.12) 0%, transparent 60%); }
        .hero-glass-card { position: relative; max-width: 720px; width: 100%; }
        .hero-glass-card h1 { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 8px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.5); letter-spacing: -0.5px; }
        .hero-info-row { display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 0.9rem; color: rgba(255,255,255,0.95); flex-wrap: wrap; margin-bottom: 12px; }
        .hero-info-item { display: flex; align-items: center; gap: 5px; }
        .hero-separator { color: rgba(255,255,255,0.45); }
        .cuisine-tag { font-size: 0.88rem; color: rgba(255,255,255,0.7); margin-bottom: 14px; }
        .promo-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(247,55,79,0.2); border: 1px solid rgba(247,55,79,0.35); padding: 6px 18px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; color: #ffcbd1; backdrop-filter: blur(4px); }
        .slideshow-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .slideshow-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: all 0.3s ease; }
        .slideshow-dot.active { background: #fff; transform: scale(1.3); box-shadow: 0 0 8px rgba(255,255,255,0.5); }
        .menu-controls-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
        .search-menu-wrapper { position: relative; flex: 1; min-width: 280px; }
        .search-menu-wrapper input { width: 100%; padding: 14px 16px 14px 46px; border: 1.5px solid var(--border-medium); border-radius: 14px; font-size: 0.95rem; outline: none; box-shadow: 0 2px 12px rgba(0,0,0,0.03); transition: all 0.25s var(--ease-premium); }
        .search-menu-wrapper input:focus { border-color: var(--brand-red); box-shadow: 0 0 0 4px rgba(247,55,79,0.08); }
        .search-icon-pos { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
        .filter-sort-wrapper { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .filter-pills { display: flex; background: var(--bg-surface); border-radius: 30px; padding: 4px; border: 1px solid var(--border-light); }
        .filter-pill { background: transparent; border: none; padding: 7px 16px; font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; border-radius: 26px; transition: all 0.25s var(--ease-premium); display: flex; align-items: center; gap: 4px; }
        .filter-pill.active { background: #fff; color: var(--brand-red); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .sort-select { padding: 10px 36px 10px 14px; border-radius: 12px; border: 1.5px solid var(--border-medium); font-size: 0.85rem; font-weight: 600; color: var(--text-primary); outline: none; cursor: pointer; background: #fff; transition: all 0.25s var(--ease-premium); appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 14px; }
        .sort-select:hover { border-color: var(--brand-red); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); }
        .sort-select:focus { border-color: var(--brand-red); box-shadow: 0 0 0 3px rgba(247,55,79,0.1); }
        .menu-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap: 24px; }
        .menu-dish-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; gap: 20px; box-shadow: 0 2px 16px rgba(0,0,0,0.02); transition: all 0.35s var(--ease-premium); opacity: 0; transform: translateY(20px); position: relative; overflow: visible; }
        .menu-dish-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(247,55,79,0.06); border-color: rgba(247,55,79,0.12); }
        .dish-card-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
        .dish-card-header-tags { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .dish-type-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
        .dish-type-badge.veg { background: rgba(96,178,70,0.08); color: var(--success); border: 1px solid rgba(96,178,70,0.15); }
        .dish-type-badge.veg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
        .dish-type-badge.nonveg { background: rgba(226,55,68,0.08); color: var(--danger); border: 1px solid rgba(226,55,68,0.15); }
        .dish-type-badge.nonveg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--danger); }
        .dish-featured-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 700; color: #ff9f40; background: rgba(255,159,64,0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,159,64,0.15); text-transform: uppercase; }
        .dish-card-title { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px; line-height: 1.3; }
        .dish-card-price-row { display: flex; align-items: baseline; gap: 2px; margin-bottom: 10px; color: var(--brand-red); font-weight: 800; }
        .dish-card-price-row .price-symbol { font-size: 1rem; }
        .dish-card-price-row .price-value { font-size: 1.3rem; font-family: 'Outfit', sans-serif; }
        .dish-card-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .dish-card-media { position: relative; width: 130px; height: 130px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; }
        .dish-card-img-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.04); border: 1px solid var(--border-light); background: var(--bg-surface); }
        .dish-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-premium); }
        .menu-dish-card:hover .dish-card-img { transform: scale(1.08); }
        .dish-card-action { position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); z-index: 10; }
        .add-btn { background: #fff; color: var(--success); border: 1.5px solid var(--success); font-weight: 800; font-size: 0.85rem; padding: 6px 20px; border-radius: 12px; cursor: pointer; transition: all 0.25s var(--ease-premium); box-shadow: 0 4px 12px rgba(96,178,70,0.12); white-space: nowrap; }
        .add-btn:hover:not(:disabled) { background: var(--success); color: #fff; box-shadow: 0 6px 18px rgba(96,178,70,0.25); transform: scale(1.03); }
        .add-btn:disabled { background: var(--bg-surface); border-color: var(--border-medium); color: var(--text-muted); box-shadow: none; cursor: not-allowed; }
        .qty-stepper { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1.5px solid var(--success); border-radius: 12px; width: 90px; height: 32px; box-shadow: 0 4px 12px rgba(96,178,70,0.1); overflow: hidden; }
        .step-btn { width: 28px; height: 100%; background: transparent; border: none; color: var(--success); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .step-btn:hover { background: rgba(96,178,70,0.08); }
        .step-val { font-weight: 800; font-size: 0.9rem; color: var(--text-primary); }
        .cart-bar-popup { position: fixed; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, var(--success), #4a9a32); color: #fff; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; box-shadow: 0 -4px 24px rgba(0,0,0,0.12); }
        .cart-bar-link { color: #fff; font-weight: 700; display: flex; align-items: center; gap: 6px; text-decoration: none; }
        .no-data-dish { grid-column: 1 / -1; text-align: center; padding: 64px 24px; color: var(--text-secondary); border: 1.5px dashed var(--border-medium); border-radius: 20px; background: #fff; }
        .zingbite-promise-section { margin-top: 64px; border-top: 1px solid var(--border-light); padding-top: 48px; }
        .promise-header { text-align: center; margin-bottom: 36px; }
        .promise-subtitle { font-size: 0.8rem; font-weight: 800; color: var(--brand-red); text-transform: uppercase; letter-spacing: 1px; }
        .promise-title { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 0; letter-spacing: -0.5px; }
        .promise-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 20px; }
        .promise-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 32px 24px; text-align: center; transition: all 0.3s var(--ease-premium); box-shadow: 0 2px 16px rgba(0,0,0,0.02); }
        .promise-card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(247,55,79,0.05); border-color: rgba(247,55,79,0.12); }
        .promise-icon-wrapper { width: 56px; height: 56px; border-radius: 16px; background: rgba(247,55,79,0.08); color: var(--brand-red); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: transform 0.3s ease; }
        .promise-card:hover .promise-icon-wrapper { transform: scale(1.1) rotate(-4deg); }
        .promise-card h3 { font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0 0 10px; }
        .promise-card p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
        @keyframes cardFadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        .animate-card { animation: cardFadeInUp 0.55s var(--ease-premium) both; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.25s ease-out both; }
        .modal-content { background: #fff; padding: 36px; border-radius: 24px; max-width: 420px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.2); text-align: center; }
        .modal-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(247,55,79,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .modal-title { font-size: 1.3rem; font-family: 'Outfit', sans-serif; font-weight: 700; margin: 0 0 10px; color: var(--text-primary); }
        .modal-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
        .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
        .modal-btn-outline { flex: 1; padding: 13px; background: transparent; border: 2px solid var(--border-medium); color: var(--text-primary); font-weight: 600; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; transition: all 0.25s var(--ease-premium); }
        .modal-btn-outline:hover { border-color: var(--brand-red); color: var(--brand-red); }
        .modal-btn-primary { flex: 2; padding: 13px; background: linear-gradient(135deg, var(--brand-red), #d42d42); color: #fff; border: none; font-weight: 700; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 14px rgba(247,55,79,0.25); transition: all 0.25s var(--ease-premium); }
        .modal-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(247,55,79,0.35); }
        @media (max-width: 992px) { .menu-items-grid { grid-template-columns: 1fr; gap: 20px; } }
        @media (max-width: 768px) {
          .restaurant-hero { height: auto; min-height: 280px; }
          .hero-glass-card h1 { font-size: 1.8rem; }
          .menu-controls-bar { flex-direction: column; align-items: stretch; }
          .search-menu-wrapper { width: 100%; }
          .filter-sort-wrapper { justify-content: space-between; width: 100%; }
          .filter-pills { flex: 1; justify-content: center; }
          .filter-pill { flex: 1; justify-content: center; padding: 6px 10px; font-size: 0.8rem; }
        }
        @media (max-width: 576px) {
          .menu-dish-card { padding: 16px; gap: 16px; border-radius: 16px; }
          .dish-card-media { width: 105px; height: 105px; }
          .dish-card-title { font-size: 1.1rem; }
          .hero-glass-card h1 { font-size: 1.5rem; }
        }
      `}</style>

      <div className="menu-page-container page-enter">
        <div className="restaurant-hero">
          <div className="slideshow-container">
            {slides.map((slide, idx) => (
              <div key={idx} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
                <img src={slide} alt={restName} className="hero-bg" />
              </div>
            ))}
          </div>
          <div className="hero-overlay">
            <div className="hero-glass-card">
              <h1>{restName}</h1>
              <div className="hero-info-row">
                <span className="hero-info-item"><Star size={14} fill="#ffb703" color="#ffb703" /> <strong>4.2</strong> (100+)</span>
                <span className="hero-separator">|</span>
                <span className="hero-info-item"><Clock size={14} /> {restDelivery}</span>
                <span className="hero-separator">|</span>
                <span className="hero-info-item"><MapPin size={14} /> {restAddress}</span>
              </div>
              <p className="cuisine-tag">Cuisines: <strong>{restCuisine}</strong></p>
              <div className="promo-tag"><Flame size={14} /> ZINGBITE50: 50% OFF up to &#8377;100</div>
            </div>
          </div>
          <div className="slideshow-dots">
            {slides.map((_, idx) => (
              <button key={idx} className={`slideshow-dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)} />
            ))}
          </div>
        </div>

        <div className="menu-controls-bar">
          <div className="search-menu-wrapper">
            <Search size={18} className="search-icon-pos" />
            <input type="text" placeholder="Search dishes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-sort-wrapper">
            <div className="filter-pills">
              <button className={`filter-pill ${filterType === 'All' ? 'active' : ''}`} onClick={() => setFilterType('All')}>All</button>
              <button className={`filter-pill ${filterType === 'Veg' ? 'active' : ''}`} onClick={() => setFilterType('Veg')}>Veg</button>
              <button className={`filter-pill ${filterType === 'NonVeg' ? 'active' : ''}`} onClick={() => setFilterType('NonVeg')}>Non-Veg</button>
            </div>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Default">Sort: Default</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="menu-items-grid">
          {isMenuLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: '360px', borderRadius: '20px' }} className="skeleton animate-card" />
            ))
          ) : sortedList.length > 0 ? (
            visibleMenuItems.map((item, idx) => {
              const qty = getCartQuantity(item.menuId);
              const isVeg = isVegDish(item);
              return (
                <div key={item.menuId} className="menu-dish-card animate-card" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="dish-card-info">
                    <div>
                      <div className="dish-card-header-tags">
                        <div className={isVeg ? "dish-type-badge veg" : "dish-type-badge nonveg"}>
                          <span className="dot"></span><span>{isVeg ? 'VEG' : 'NON-VEG'}</span>
                        </div>
                        {idx % 3 === 0 && <span className="dish-featured-tag"><Star size={12} fill="#ff9f40" color="#ff9f40" /> Bestseller</span>}
                      </div>
                      <h3 className="dish-card-title">{item.menuName}</h3>
                      <div className="dish-card-price-row">
                        <span className="price-symbol">&#8377;</span>
                        <span className="price-value">{item.price}</span>
                      </div>
                      <p className="dish-card-desc">{item.description}</p>
                    </div>
                  </div>
                  <div className="dish-card-media">
                    <div className="dish-card-img-container">
                      <img src={item.imagePath || DEFAULT_DISH_IMAGE} alt={item.menuName} className="dish-card-img" loading="lazy"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_DISH_IMAGE; }}
                      />
                    </div>
                    <div className="dish-card-action">
                      {qty === 0 ? (
                        <button className="add-btn" disabled={!item.isAvailable} onClick={() => handleAddClick(item.menuId)}>
                          {item.isAvailable ? 'ADD' : 'SOLD OUT'}
                        </button>
                      ) : (
                        <div className="qty-stepper">
                          <button className="step-btn" onClick={() => updateQuantity(item.menuId, qty - 1)}><Minus size={12} /></button>
                          <span className="step-val">{qty}</span>
                          <button className="step-btn" onClick={() => updateQuantity(item.menuId, qty + 1)}><Plus size={12} /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-data-dish">
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>No dishes found</p>
              <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Try adjusting your search or filter.</p>
            </div>
          )}
        </div>

        {hasMoreMenuItems && (
          <div className="load-more-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="button" className="load-more-btn" onClick={() => setVisibleMenuCount(count => count + MENU_PAGE_SIZE)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.25s var(--ease-premium)' }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--brand-red)'; e.target.style.color = 'var(--brand-red)'; e.target.style.background = 'rgba(247,55,79,0.03)'; }}
              onMouseLeave={e => { e.target.style.borderColor = ''; e.target.style.color = ''; e.target.style.background = ''; }}
            >
              Load more dishes ({sortedList.length - visibleMenuCount} left) <ArrowRight size={14} />
            </button>
          </div>
        )}

        {!recommendationsLoading && recommendations.length > 0 && (
          <div className="animate-card" style={{ marginTop: '56px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="promise-subtitle">PAIRED PERFECTION</span>
              <h2 className="promise-title" style={{ fontSize: '1.8rem', marginTop: '4px' }}>Frequently Ordered Together</h2>
            </div>
            <div className="menu-items-grid">
              {visibleRecommendations.map((item, idx) => {
                const qty = getCartQuantity(item.menuId);
                const isVeg = isVegDish(item);
                return (
                  <div key={`rec-${item.menuId}`} className="menu-dish-card" style={{ animationDelay: `${idx * 0.05}s`, borderLeft: '4px solid var(--brand-red)' }}>
                    <div className="dish-card-info">
                      <div>
                        <div className="dish-card-header-tags">
                          <div className={isVeg ? "dish-type-badge veg" : "dish-type-badge nonveg"}><span className="dot"></span><span>{isVeg ? 'VEG' : 'NON-VEG'}</span></div>
                          <span className="dish-featured-tag" style={{ color: 'var(--brand-red)', background: 'rgba(247,55,79,0.05)', borderColor: 'rgba(247,55,79,0.1)' }}><ShoppingBag size={12} /> Recommended</span>
                        </div>
                        <h3 className="dish-card-title">{item.menuName}</h3>
                        <div className="dish-card-price-row"><span className="price-symbol">&#8377;</span><span className="price-value">{item.price}</span></div>
                        <p className="dish-card-desc">{item.description}</p>
                      </div>
                    </div>
                    <div className="dish-card-media">
                      <div className="dish-card-img-container">
                        <img src={item.imagePath || DEFAULT_DISH_IMAGE} alt={item.menuName} className="dish-card-img" loading="lazy"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_DISH_IMAGE; }}
                        />
                      </div>
                      <div className="dish-card-action">
                        {qty === 0 ? (
                          <button className="add-btn" disabled={!item.isAvailable} onClick={() => handleAddClick(item.menuId)}>{item.isAvailable ? 'ADD' : 'SOLD OUT'}</button>
                        ) : (
                          <div className="qty-stepper">
                            <button className="step-btn" onClick={() => updateQuantity(item.menuId, qty - 1)}><Minus size={12} /></button>
                            <span className="step-val">{qty}</span>
                            <button className="step-btn" onClick={() => updateQuantity(item.menuId, qty + 1)}><Plus size={12} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {hasMoreRecommendations && (
                <div className="load-more-wrap" style={{ gridColumn: '1 / -1', margin: '4px auto 0' }}>
                  <button type="button" className="load-more-btn" onClick={() => setVisibleRecommendationCount(count => count + RECOMMENDATION_PAGE_SIZE)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.25s var(--ease-premium)' }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--brand-red)'; e.target.style.color = 'var(--brand-red)'; e.target.style.background = 'rgba(247,55,79,0.03)'; }}
                    onMouseLeave={e => { e.target.style.borderColor = ''; e.target.style.color = ''; e.target.style.background = ''; }}
                  >
                    More recommendations ({recommendations.length - visibleRecommendationCount} left) <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="zingbite-promise-section">
          <div className="promise-header">
            <span className="promise-subtitle">WHY ORDER FROM US?</span>
            <h2 className="promise-title">The ZingBite Promise</h2>
          </div>
          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-icon-wrapper"><Flame size={24} /></div>
              <h3>Gourmet Selection</h3>
              <p>We partner only with top-rated local kitchens to bring you handpicked culinary creations.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon-wrapper"><Clock size={24} /></div>
              <h3>Superfast Delivery</h3>
              <p>Smart route optimization and live telemetry tracking ensure your food arrives hot and fresh.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon-wrapper"><MapPin size={24} /></div>
              <h3>Live Telemetry Tracking</h3>
              <p>Follow your rider live on an interactive map from our kitchen to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>

      {cartError && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 3000,
          background: '#fff', border: '1.5px solid var(--danger)',
          borderRadius: '12px', padding: '14px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'slideIn 0.3s ease-out',
          maxWidth: '380px'
        }}>
          <AlertTriangle size={18} color="var(--danger)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cartError}</span>
          <button onClick={() => setCartError(null)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', marginLeft: '4px', padding: '2px'
          }}>✕</button>
        </div>,
        document.body
      )}

      {cart && cart.itemCount > 0 && ReactDOM.createPortal(
        <div className="cart-bar-popup slide-up">
          <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} /> {cart.itemCount} item{cart.itemCount > 1 ? 's' : ''} in cart
          </span>
          <Link to="/cart" className="cart-bar-link">VIEW CART <ArrowRight size={18} /></Link>
        </div>,
        document.body
      )}

      {conflictPopup && ReactDOM.createPortal(
        <div className="modal-overlay" onClick={() => setConflictPopup(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon"><AlertCircle size={32} color="var(--brand-red)" /></div>
            <h3 className="modal-title">Items from another restaurant</h3>
            <p className="modal-desc">Your cart contains items from a different restaurant. Start fresh to add items from this one?</p>
            <div className="modal-actions">
              <button className="modal-btn-outline" onClick={() => setConflictPopup(null)}>Cancel</button>
              <button className="modal-btn-primary" onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}>Start Fresh</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Menu;
