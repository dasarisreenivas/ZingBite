import { useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, Flame, Search, ShieldCheck, Star, Truck, UtensilsCrossed, Zap,
  MapPin, Clock, Award, Users, Sparkles, Smartphone, AlertTriangle,
  ChevronLeft, ChevronRight, BadgePercent, Heart, Check, Minus, Plus, ShoppingBag,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { getPromoBackground, getRestaurantPageSize } from '../utils/homeConfig';
import {
  formatDeliveryTime,
  formatRating,
  formatRestaurantPrice,
  getDeliveryMinutes,
  getHomeCustomerCoordinates,
  getRestaurantDistanceLabel
} from '../utils/restaurantMeta';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ScrollReveal';
import { CategoryCartOverlays, CategoryMenuSheet } from '../components/home/CategoryMenuSheet';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop';
const RESTAURANT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';
const CATEGORY_DISH_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop';
const RESTAURANT_PAGE_SIZE = 8;

const CATEGORIES = [
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pasta', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop' },
  { name: 'Cafe', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop' },
  { name: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=600&auto=format&fit=crop' },
  { name: 'Mexican', image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=600&auto=format&fit=crop' },
  { name: 'Thai', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop' }
];

// Particles background component
function Particles() {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${(i * 8.3 + 5) % 100}%`,
      size: 4 + (i % 4) * 2,
      delay: i * 0.7,
      duration: 7 + (i % 5) * 2
    })), []
  );

  return (
    <div className="particles-bg">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}

// Stats counter component
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="count-up">{count}{suffix}</span>;
}

const DEFAULT_SDUI_CONFIG = {
  theme: {
    primaryColor: "#ff4f5a",
    accentColor: "#1a1a1a",
    heroOverlayGradient: "from-black/80 via-black/40 to-transparent"
  },
  sections: [
    { id: "hero_banner", visible: true, order: 1, props: { title: "Hungry? Grab a ZingBite!", subtitle: "Delivering fresh meals to your doorstep within minutes." } },
    { id: "weather_surge_banner", visible: true, order: 2, props: { title: "Weather Alert", subtitle: "Raining heavily outside. Weather surge helps support our delivery partners." } },
    { id: "group_order_cta", visible: true, order: 3, props: { title: "Planning a Group Meal?", description: "Browse restaurants and choose a menu everyone can enjoy.", ctaText: "Browse Restaurants" } },
    { id: "promo_deals", visible: true, order: 4, props: { deals: [ { id: 1, title: "50% OFF", description: "Up to ₹100 | Use Code: ZING50", bgGradient: "linear-gradient(135deg, #f97316, #ec4899)" }, { id: 2, title: "Free Delivery", description: "On orders above ₹299", bgGradient: "linear-gradient(135deg, #3b82f6, #4f46e5)" } ] } },
    { id: "category_carousel", visible: true, order: 5, props: { title: "In the Mood for..." } },
    { id: "food_moods", visible: true, order: 6, props: { title: "What's your vibe today?", moods: [ { iconName: "Dumbbell", tag: "Gym Fuel", cuisine: "healthy" }, { iconName: "Code2", tag: "Late Night Coding", cuisine: "chinese" }, { iconName: "Film", tag: "Movie Night", cuisine: "pizza" }, { iconName: "Flame", tag: "Spicy Craving", cuisine: "biryani" } ] } },
    { id: "trending_combos", visible: true, order: 8, props: { title: "Popular AI Combos", subtitle: "Perfect food pairings calculated by our AI engine", maxCombos: 3 } },
    { id: "recently_opened", visible: true, order: 9, props: { title: "Fresh on the Block", subtitle: "Discover newly onboarded dining spots in your neighborhood", limit: 4 } },
    { id: "featured_restaurants", visible: true, order: 10, props: { title: "Top Curated Picks", subtitle: "Highest-rated culinary spots in your area", minRating: 4.5 } },
    { id: "neighborhood_trends", visible: true, order: 11, props: { title: "Trending Near You", radiusKm: 5 } },
    { id: "restaurant_grid", visible: true, order: 12, props: { pageSize: 8, showFilters: true } },
    { id: "customer_reviews", visible: true, order: 13, props: { title: "Spotlight Review Feed", reviews: [ { id: 1, username: "Rajesh K.", rating: 5, comment: "The Biryani combo was absolutely flavorful and delivered super hot!", restaurantName: "Grand Biryani Palace" }, { id: 2, username: "Sunita M.", rating: 5, comment: "Incredible delivery speed and the app's real-time map updates were neat.", restaurantName: "Pizza Express" } ] } },
    { id: "app_download", visible: true, order: 14, props: { title: "Get the ZingBite App", subtitle: "Order faster, track routes live, and get exclusive rewards.", playStoreLink: "https://play.google.com/store", appStoreLink: "https://apple.com/app-store" } },
    { id: "stats_counter", visible: true, order: 15, props: { restaurantsCount: 150, customersCount: 10000, deliveriesCount: 25000 } }
  ]
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    cart,
    addToCart,
    updateQuantity,
    conflictPopup,
    clearAndAdd,
    setConflictPopup,
    cartError,
    setCartError
  } = useCart();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [visibleRestaurantCount, setVisibleRestaurantCount] = useState(RESTAURANT_PAGE_SIZE);
  const [suggestion, setSuggestion] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [coords, setCoords] = useState(null);
  const [homeCustomerCoords, setHomeCustomerCoords] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const heroRef = useRef(null);
  const categoryRailRef = useRef(null);
  const restaurantRailRef = useRef(null);
  const restaurantSectionRailRefs = useRef({});
  const lastLoggedSearchQueryRef = useRef('');
  const homeCacheRef = useRef({
    restaurants: null,
    suggestion: null,
    isSearch: false,
    customerCoords: null,
    timestamp: 0,
    key: ''
  });
  const [vibeIsPaused, setVibeIsPaused] = useState(false);
  const [vibeDirection, setVibeDirection] = useState('forward');
  const [sduiConfig, setSduiConfig] = useState(null);
  const [comboQuantities, setComboQuantities] = useState({});
  const [favoriteComboIds, setFavoriteComboIds] = useState(() => new Set());
  const [categorySheet, setCategorySheet] = useState({ open: false, category: null });
  const [categoryMenuItems, setCategoryMenuItems] = useState([]);
  const [categoryMenuLoading, setCategoryMenuLoading] = useState(false);
  const [categoryMenuError, setCategoryMenuError] = useState('');

  useEffect(() => {
    const fetchSdui = async () => {
      try {
        const response = await axios.get('/api/sdui/homepage');
        if (response.data && response.data.sections) {
          setSduiConfig(response.data);
        } else {
          setSduiConfig(DEFAULT_SDUI_CONFIG);
        }
      } catch (err) {
        console.warn("Failed to load SDUI config, using fallback defaults:", err);
        setSduiConfig(DEFAULT_SDUI_CONFIG);
      }
    };
    fetchSdui();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleAISearch = (e) => {
      if (e.detail && e.detail.query) {
        setSearchQuery(e.detail.query);
        setDebouncedSearchQuery(e.detail.query);
      }
    };
    window.addEventListener('ai-search', handleAISearch);
    return () => window.removeEventListener('ai-search', handleAISearch);
  }, []);

  // Hero image load handler
  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE;
    img.onload = () => setHeroLoaded(true);
  }, []);

  const fetchRestaurants = useCallback(async () => {
    const cacheKey = JSON.stringify({ q: debouncedSearchQuery.trim(), lat: coords?.lat, lng: coords?.lng });
    const homeCache = homeCacheRef.current;
    const hasCache = homeCache.restaurants !== null && homeCache.key === cacheKey;
    const isStale = hasCache && (Date.now() - homeCache.timestamp > 15000);

    if (hasCache) {
      setRestaurants(homeCache.restaurants);
      setSuggestion(homeCache.suggestion);
      setIsSearch(homeCache.isSearch);
      setHomeCustomerCoords(homeCache.customerCoords);
      setLoading(false);
      setError('');
      if (!isStale) return;
    } else {
      setLoading(true);
      setError('');
    }

    try {
      const params = new URLSearchParams();
      if (debouncedSearchQuery.trim()) params.append('q', debouncedSearchQuery.trim());
      if (coords) { params.append('lat', coords.lat); params.append('lng', coords.lng); }
      const queryString = params.toString();
      const url = queryString ? `/api/home?${queryString}` : '/api/home';
      const response = await axios.get(url);

      let resData, sugData, searchData, customerCoordsData;
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        resData = response.data.restaurants || [];
        sugData = response.data.suggestion || null;
        searchData = response.data.isSearch || false;
        customerCoordsData = getHomeCustomerCoordinates(response.data, coords);
      } else {
        resData = Array.isArray(response.data) ? response.data : [];
        sugData = null;
        searchData = false;
        customerCoordsData = getHomeCustomerCoordinates(null, coords);
      }

      setRestaurants(resData);
      setSuggestion(sugData);
      setIsSearch(searchData);
      setHomeCustomerCoords(customerCoordsData);

      homeCacheRef.current = {
        restaurants: resData,
        suggestion: sugData,
        isSearch: searchData,
        customerCoords: customerCoordsData,
        timestamp: Date.now(),
        key: cacheKey
      };
      setError('');
    } catch (err) {
      console.error(err);
      if (!hasCache) setError('We could not load restaurants right now. Please try again.');
    } finally {
      if (!hasCache) setLoading(false);
    }
  }, [coords, debouncedSearchQuery]);

  const retryRestaurants = useCallback(() => fetchRestaurants(), [fetchRestaurants]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.warn("Geolocation permission denied or failed, falling back.", error),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const trimmed = debouncedSearchQuery.trim();
    if (trimmed && trimmed !== lastLoggedSearchQueryRef.current) {
      trackEvent('SEARCH', { query: trimmed });
      lastLoggedSearchQueryRef.current = trimmed;
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!categorySheet.open || !categorySheet.category) return undefined;

    const controller = new AbortController();
    setCategoryMenuLoading(true);
    setCategoryMenuError('');
    setCategoryMenuItems([]);

    axios.get('/api/menu', {
      params: { category: categorySheet.category },
      signal: controller.signal
    }).then((response) => {
      const menuItems = response.data?.menuList || (Array.isArray(response.data) ? response.data : []);
      setCategoryMenuItems(Array.isArray(menuItems) ? menuItems : []);
    }).catch((err) => {
      if (axios.isCancel(err) || err.name === 'CanceledError') return;
      console.error(err);
      setCategoryMenuError('We could not load dishes for this category right now.');
    }).finally(() => {
      if (!controller.signal.aborted) {
        setCategoryMenuLoading(false);
      }
    });

    return () => controller.abort();
  }, [categorySheet.open, categorySheet.category]);

  useEffect(() => {
    if (!categorySheet.open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [categorySheet.open]);

  useEffect(() => {
    if (!categorySheet.open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCategorySheet(current => ({ ...current, open: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [categorySheet.open]);

  const restaurantPageSize = useMemo(
    () => getRestaurantPageSize(sduiConfig || DEFAULT_SDUI_CONFIG, RESTAURANT_PAGE_SIZE),
    [sduiConfig]
  );

  useEffect(() => {
    setVisibleRestaurantCount(restaurantPageSize);
  }, [debouncedSearchQuery, selectedCuisine, sortBy, coords, restaurantPageSize]);

  const filteredAndSortedRestaurants = useMemo(() => (
    restaurants
      .filter(r => {
        const cuisine = r.cusineType ? r.cusineType.toLowerCase() : '';
        const matchesCuisine = selectedCuisine === 'All' || cuisine.includes(selectedCuisine.toLowerCase());
        return matchesCuisine;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
        if (sortBy === 'time') return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime);
        return 0;
      })
  ), [restaurants, selectedCuisine, sortBy]);
  const visibleRestaurants = useMemo(
    () => filteredAndSortedRestaurants.slice(0, visibleRestaurantCount),
    [filteredAndSortedRestaurants, visibleRestaurantCount]
  );
  const hasMoreRestaurants = visibleRestaurantCount < filteredAndSortedRestaurants.length;
  const remainingRestaurants = filteredAndSortedRestaurants.length - visibleRestaurantCount;

  const scrollRestaurantRail = (direction, railKey = 'main') => {
    const rail = railKey === 'main'
      ? restaurantRailRef.current
      : restaurantSectionRailRefs.current[railKey];
    if (!rail) return;
    const distance = Math.max(300, Math.round(rail.clientWidth * 0.82));
    rail.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  const scrollCategoryRail = (direction) => {
    const rail = categoryRailRef.current;
    if (!rail) return;
    const distance = Math.max(220, Math.round(rail.clientWidth * 0.78));
    rail.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  const openCategoryMenu = (categoryName) => {
    setCategorySheet({ open: true, category: categoryName });
    trackEvent('CATEGORY_MENU_OPEN', { category: categoryName });
  };

  const closeCategoryMenu = () => {
    setCategorySheet(current => ({ ...current, open: false }));
  };

  const getCategoryCartQuantity = (itemId) => {
    if (!cart || !cart.items) return 0;
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    const cartItem = itemsArray.find(item => Number(item.itemId) === Number(itemId));
    return cartItem ? cartItem.quantity : 0;
  };

  const redirectToLoginFromCategory = () => {
    closeCategoryMenu();
    navigate('/login?redirect=/');
  };

  const showCategoryCartError = (message) => {
    setCartError(message);
    window.setTimeout(() => setCartError(null), 4000);
  };

  const handleCategoryAddClick = async (item) => {
    if (!user) {
      redirectToLoginFromCategory();
      return;
    }
    if (item.restaurant && item.restaurant.isOpen === false) {
      showCategoryCartError('Restaurant is currently closed');
      return;
    }
    await addToCart(item.menuId, 1);
  };

  const handleCategoryUpdateQuantity = async (item, nextQuantity) => {
    if (!user) {
      redirectToLoginFromCategory();
      return;
    }
    if (item.restaurant && item.restaurant.isOpen === false) {
      showCategoryCartError('Restaurant is currently closed');
      return;
    }
    await updateQuantity(item.menuId, nextQuantity);
  };

  const sortedSections = useMemo(() => {
    const config = sduiConfig || DEFAULT_SDUI_CONFIG;
    if (!Array.isArray(config?.sections)) return [];
    return [...config.sections].sort((a, b) => a.order - b.order);
  }, [sduiConfig]);

  const renderHeroBanner = (props) => {
    return (
      <section className="home-hero" ref={heroRef}>
        <Particles />
        <div className="home-hero-bg" style={{
          transform: `scale(1.05) translateY(${parallaxOffset}px)`
        }} />
        <div className="hero-content">
          <div className="hero-tag"><Flame size={16} /> Fresh meals, fast routes</div>
          <h2 className="hero-title">
            {props.title ? (
              <>
                {props.title.split(',')[0]}
                {props.title.includes(',') && (
                  <>
                    ,<br />
                    <span className="highlight">{props.title.split(',')[1]}</span>
                  </>
                )}
              </>
            ) : (
              <>
                Your food,{' '}
                <span className="highlight">delivered with love</span>
                <br />right on time.
              </>
            )}
          </h2>
          <p className="hero-subtitle">
            {props.subtitle || 'Explore trusted local restaurants, order in a few taps, and track every step from kitchen prep to doorstep delivery.'}
          </p>
          <div className="hero-actions">
            <a href="#restaurants" className="hero-btn primary">
              Explore restaurants <ArrowRight size={17} />
            </a>
            <Link to="/track-order" className="hero-btn secondary">
              <MapPin size={16} /> Track an order
            </Link>
          </div>
          <div className="hero-chips">
            <div className="hero-chip"><Zap size={16} /> Fast checkout</div>
            <div className="hero-chip"><Truck size={16} /> Live delivery updates</div>
            <div className="hero-chip"><UtensilsCrossed size={16} /> Local favorites</div>
            <div className="hero-chip"><ShieldCheck size={16} /> Secure payments</div>
          </div>
        </div>
      </section>
    );
  };

  const renderWeatherSurgeBanner = (props) => {
    return (
      <div style={{
        maxWidth: '1400px',
        width: '92%',
        margin: '24px auto 0',
        padding: '16px 24px',
        background: 'linear-gradient(135deg, rgba(247,55,79,0.06) 0%, rgba(255,184,0,0.06) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(247,55,79,0.15)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        animation: 'premiumFadeIn 0.5s ease both'
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(247,55,79,0.15)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: 'var(--brand-red)', flexShrink: 0
        }}>
          <AlertTriangle size={20} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
            {props.title || 'Weather Alert'}
          </strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {props.subtitle || 'Surge pricing is currently helping incentivize riders.'}
          </span>
        </div>
      </div>
    );
  };

  const renderGroupOrderCta = (props) => {
    return (
      <div style={{
        maxWidth: '1400px',
        width: '92%',
        margin: '24px auto 0',
        padding: '32px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
        color: '#fff',
        borderRadius: '24px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
        animation: 'premiumFadeIn 0.5s ease both'
      }}>
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px',
          background: 'rgba(247,55,79,0.15)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '600px', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.1)', padding: '4px 12px',
            borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px'
          }}>
            <Users size={12} /> Group-friendly
          </div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px' }}>
            {props.title || 'Planning a Group Meal?'}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
            {props.description || 'Browse restaurants and choose a menu everyone can enjoy.'}
          </p>
        </div>
        <a href="#restaurants" className="hero-btn primary" style={{ minWidth: '180px', zIndex: 1, margin: 0 }}>
          {props.ctaText || 'Browse Restaurants'} <ArrowRight size={16} />
        </a>
      </div>
    );
  };

  const renderPromoDeals = (props) => {
    const deals = props.deals || [];
    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Hot Deals & Offers
        </h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }} className="no-scrollbar">
          {deals.map(deal => (
            <div key={deal.id} style={{
              flex: '0 0 300px',
              padding: '24px',
              borderRadius: '20px',
              color: '#fff',
              background: getPromoBackground(deal.bgGradient),
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '140px',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            className="hover-scale"
            onClick={() => alert(`Use code during checkout to redeem: ${deal.title}`)}
            >
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                  PROMO
                </span>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: 800, margin: '8px 0 2px' }}>{deal.title}</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', margin: 0 }}>{deal.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryCarousel = (props) => {
    return (
      <div style={{ marginTop: '32px' }}>
        <div className="section-title-row page-enter" style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.4rem' }}>{props.title || 'In the Mood for...'}</h2>
        </div>
        <div className="category-rail-shell page-enter" style={{ animationDelay: '0.1s', marginBottom: '24px' }}>
          <button
            type="button"
            className="category-rail-btn left"
            onClick={() => scrollCategoryRail('left')}
            aria-label="Scroll food categories left"
          >
            <ChevronLeft size={20} />
          </button>
          <div ref={categoryRailRef} className="cuisine-filters" aria-label="Food category filters">
            {CATEGORIES.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                className={`category-card ${categorySheet.open && categorySheet.category === c.name ? 'active' : ''}`}
                onClick={() => openCategoryMenu(c.name)}
                style={{
                  animation: `premiumFadeIn 0.4s var(--ease-premium) ${idx * 0.06}s both`,
                  padding: 0
                }}
              >
                <img src={c.image} alt={c.name} className="category-card-img" loading="lazy" />
                <div className="category-card-overlay">
                  <h3 className="category-card-name">{c.name}</h3>
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="category-rail-btn right"
            onClick={() => scrollCategoryRail('right')}
            aria-label="Scroll food categories right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  const renderFoodMoods = (props) => {
    const baseMoods = props.moods || [];
    const moods = [...baseMoods];
    if (!moods.some(m => m.tag === 'Cheat Day')) {
      moods.push({ iconName: 'Flame', tag: 'Cheat Day', cuisine: 'burger' });
    }
    if (!moods.some(m => m.tag === 'Sweet Tooth')) {
      moods.push({ iconName: 'Sparkles', tag: 'Sweet Tooth', cuisine: 'dessert' });
    }
    const loopedMoods = [...moods, ...moods];

    const getMoodTheme = (tag) => {
      const themes = {
        'Gym Fuel': { color: '#17a86b', glow: 'rgba(23,168,107,0.34)', bg: 'rgba(23,168,107,0.09)' },
        'Late Night Coding': { color: '#3d5afe', glow: 'rgba(61,90,254,0.34)', bg: 'rgba(61,90,254,0.08)' },
        'Movie Night': { color: '#b44dff', glow: 'rgba(180,77,255,0.34)', bg: 'rgba(180,77,255,0.08)' },
        'Spicy Craving': { color: '#ff4f1f', glow: 'rgba(255,79,31,0.36)', bg: 'rgba(255,79,31,0.09)' },
        'Cheat Day': { color: '#f59e0b', glow: 'rgba(245,158,11,0.34)', bg: 'rgba(245,158,11,0.09)' },
        'Sweet Tooth': { color: '#e94fa3', glow: 'rgba(233,79,163,0.34)', bg: 'rgba(233,79,163,0.09)' }
      };
      return themes[tag] || { color: '#ff4f5a', glow: 'rgba(255,79,90,0.34)', bg: 'rgba(255,79,90,0.09)' };
    };

    const getMoodDetails = (mood) => {
      const details = {
        'Gym Fuel': {
          title: 'Green Power Bowl',
          cuisineLabel: 'Healthy',
          subtitle: 'Clean bowls, wraps, grilled bites',
          signal: 'Protein-ready',
          rating: '4.8',
          eta: '22 min',
          serve: 'Bowl',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop'
        },
        'Late Night Coding': {
          title: 'Red Lantern Noodle',
          cuisineLabel: 'Chinese',
          subtitle: 'Noodles, rolls, quick comfort',
          signal: 'Wok fired combo',
          rating: '4.7',
          eta: '24 min',
          serve: 'Table',
          image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop'
        },
        'Movie Night': {
          title: 'Cinema Slice Box',
          cuisineLabel: 'Pizza',
          subtitle: 'Pizza, sides, shareable snacks',
          signal: 'Watch-party',
          rating: '4.9',
          eta: '28 min',
          serve: 'Share',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop'
        },
        'Spicy Craving': {
          title: 'Fire Pot Biryani',
          cuisineLabel: 'Biryani',
          subtitle: 'Biryani, curries, chilli heat',
          signal: 'Hot pick',
          rating: '4.8',
          eta: '30 min',
          serve: 'Spice',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop'
        },
        'Cheat Day': {
          title: 'Loaded Smash Stack',
          cuisineLabel: 'Burger',
          subtitle: 'Burgers, loaded fries, cheesy bites',
          signal: 'Big appetite',
          rating: '4.6',
          eta: '21 min',
          serve: 'Combo',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop'
        },
        'Sweet Tooth': {
          title: 'Velvet Dessert Cup',
          cuisineLabel: 'Dessert',
          subtitle: 'Cakes, shakes, creamy desserts',
          signal: 'Dessert run',
          rating: '4.9',
          eta: '18 min',
          serve: 'Sweet',
          image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop'
        }
      };
      const cuisineImage = CATEGORIES.find(c => c.name.toLowerCase() === mood.cuisine?.toLowerCase())?.image;
      return {
        title: mood.title || details[mood.tag]?.title || mood.tag || 'ZingBite Pick',
        cuisineLabel: mood.cuisineLabel || details[mood.tag]?.cuisineLabel || mood.cuisine || 'Fresh',
        subtitle: mood.subtitle || details[mood.tag]?.subtitle || 'Fresh picks matched to your craving',
        signal: mood.signal || details[mood.tag]?.signal || 'Live pick',
        rating: mood.rating || details[mood.tag]?.rating || '4.7',
        eta: mood.eta || details[mood.tag]?.eta || '25 min',
        serve: mood.serve || details[mood.tag]?.serve || 'Table',
        image: mood.image || details[mood.tag]?.image || cuisineImage || RESTAURANT_FALLBACK_IMAGE
      };
    };

    return (
      <section
        className={`vibe-section page-enter ${vibeIsPaused ? 'paused' : ''} ${vibeDirection === 'reverse' ? 'reverse' : ''}`}
        onMouseEnter={() => setVibeIsPaused(true)}
        onMouseLeave={() => setVibeIsPaused(false)}
        onFocusCapture={() => setVibeIsPaused(true)}
        onBlurCapture={() => setVibeIsPaused(false)}
      >
        <div className="vibe-header">
          <div>
            <span className="vibe-eyebrow">
              <Sparkles size={14} />
              Live craving board
            </span>
            <h3 className="vibe-title">
              {props.title || "What's your vibe today?"}
            </h3>
          </div>
          <div className="vibe-controls">
            <span className="vibe-live-pill">
              <span className="vibe-live-dot" />
              Live
            </span>
            <button
              type="button"
              onClick={() => setVibeDirection('reverse')}
              className="vibe-nav-btn"
              aria-label="Move carousel right"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setVibeDirection('forward')}
              className="vibe-nav-btn"
              aria-label="Move carousel left"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="vibe-carousel-wrapper">
          <div
            className="vibe-carousel no-scrollbar"
            aria-label="Food moods"
          >
            {loopedMoods.map((mood, loopIdx) => {
              const idx = loopIdx % moods.length;
              const isClone = loopIdx >= moods.length;
              const theme = getMoodTheme(mood.tag);
              const moodCuisine = mood.cuisine || 'All';
              const isActive = selectedCuisine.toLowerCase() === moodCuisine.toLowerCase();
              const details = getMoodDetails(mood);
              return (
                <button
                  key={`${mood.tag}-${loopIdx}`}
                  type="button"
                  tabIndex={isClone ? -1 : 0}
                  onClick={() => {
                    setSelectedCuisine(isActive ? 'All' : moodCuisine);
                    setSearchQuery('');
                  }}
                  className={`vibe-card ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                  aria-hidden={isClone ? 'true' : undefined}
                  aria-label={`${mood.tag} vibe${isActive ? ', selected' : ''}`}
                  style={{
                    '--vibe-neon-color': theme.color,
                    '--vibe-neon-glow': theme.glow,
                    '--vibe-neon-bg': theme.bg,
                    animationDelay: `${idx * 0.05}s`
                  }}
                >
                  <span className="vibe-card-sheen" />
                  <span className="vibe-card-aura" />
                  <span className="vibe-card-pattern" />
                  <span className="vibe-card-topline">
                    <span className="vibe-craving-pill">
                      <Flame size={15} />
                      {details.signal}
                    </span>
                  </span>
                  <div className="vibe-plate-stage" aria-hidden="true">
                    <span className="vibe-plate-shadow" />
                    <span
                      className="vibe-food-art"
                      style={{ backgroundImage: `url(${details.image})` }}
                    />
                  </div>
                  <div className="vibe-copy">
                    <span className="vibe-cuisine-label">{details.cuisineLabel}</span>
                    <span className="vibe-subtitle">{details.subtitle}</span>
                  </div>
                  <div className="vibe-card-stats">
                    <span><Star size={15} /> {details.rating}</span>
                    <span><Clock size={15} /> {details.eta}</span>
                    <span><UtensilsCrossed size={15} /> {isActive ? 'Selected' : details.serve}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  };


  const renderTrendingCombos = (props) => {
    const maxCombos = props.maxCombos || 3;
    const readNumber = (value) => {
      if (value === null || value === undefined || value === '') return null;
      const direct = Number(value);
      if (Number.isFinite(direct)) return direct;
      const match = String(value).match(/\d+(\.\d+)?/);
      return match ? Number(match[0]) : null;
    };
    const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(value || 0)));
    const normalizeComboItems = (items) => (Array.isArray(items) ? items : [])
      .map((item, itemIndex) => {
        if (typeof item === 'string') return { id: `item-${itemIndex}`, label: item };
        const label = item?.label || item?.name || item?.title || '';
        return label ? { id: item.id || `item-${itemIndex}`, label } : null;
      })
      .filter(Boolean);
    const getEtaParts = (value) => {
      const text = String(value || '').trim();
      const valueMatch = text.match(/\d+\s*-\s*\d+|\d+/);
      const unit = /\b(hour|hr)\b/i.test(text) ? 'hr' : 'min';
      return {
        value: valueMatch ? valueMatch[0].replace(/\s+/g, '') : text,
        unit: text ? unit : ''
      };
    };
    const comboSource = Array.isArray(props.combos) ? props.combos : [];
    const combos = comboSource.slice(0, maxCombos).map((combo, index) => {
      const merged = { ...combo };
      const price = readNumber(merged.price);
      const originalPrice = readNumber(merged.originalPrice ?? merged.mrp ?? merged.strikePrice ?? merged.compareAtPrice);
      const computedDiscount = originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;
      const discountPercent = readNumber(merged.discountPercent ?? merged.discount) || computedDiscount;
      const claimedPercent = clampPercent(readNumber(merged.claimedPercent ?? merged.claimed ?? merged.match));
      const remainingPacks = readNumber(merged.remainingPacks ?? merged.stockLeft ?? merged.leftCount ?? merged.remainingLabel);
      const eta = getEtaParts(merged.eta ?? merged.deliveryTime);

      return {
        ...merged,
        id: merged.id || `combo-${index}`,
        price,
        originalPrice,
        discountLabel: merged.discountLabel || (discountPercent ? `Save ${Math.round(discountPercent)}%` : ''),
        badge: merged.badge || '',
        categoryLabel: merged.categoryLabel || merged.tag || '',
        items: normalizeComboItems(merged.includedItems || merged.items),
        searchQuery: merged.searchQuery || merged.name || '',
        rating: merged.rating || '',
        ratingLabel: merged.ratingLabel || '',
        etaValue: eta.value,
        etaUnit: eta.unit,
        serves: readNumber(merged.serves ?? merged.servesCount ?? merged.serving),
        includedTitle: merged.includedTitle || '',
        remainingLabel: merged.remainingLabel || (
          remainingPacks ? `Only ${Math.round(remainingPacks)} packs left today` : ''
        ),
        remainingShortLabel: merged.remainingShortLabel || (
          remainingPacks ? `Only ${Math.round(remainingPacks)} left` : ''
        ),
        claimedPercent,
        claimedLabel: merged.claimedLabel || (claimedPercent ? `${claimedPercent}% claimed` : ''),
        claimedShortLabel: merged.claimedShortLabel || (claimedPercent ? `${claimedPercent}% claimed` : ''),
        ctaText: merged.ctaText || props.ctaText || '',
        accent: merged.accent || 'var(--brand-red)'
      };
    }).filter(combo => combo.name && combo.image && combo.price && combo.items.length > 0);
    if (combos.length === 0) return null;
    const getComboQuantity = (comboId) => comboQuantities[comboId] || 1;
    const setComboQuantity = (comboId, nextQuantity) => {
      setComboQuantities(current => ({
        ...current,
        [comboId]: Math.max(1, Math.min(9, nextQuantity))
      }));
    };
    const toggleComboFavorite = (comboId) => {
      setFavoriteComboIds(current => {
        const next = new Set(current);
        if (next.has(comboId)) {
          next.delete(comboId);
        } else {
          next.add(comboId);
        }
        return next;
      });
    };
    const exploreCombo = (combo) => {
      const quantity = getComboQuantity(combo.id);
      setSelectedCuisine('All');
      setSearchQuery(combo.searchQuery);
      document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
      trackEvent('COMBO_SEARCH', { combo: combo.name, query: combo.searchQuery, quantity });
    };

    return (
      <section className="ai-combos-section page-enter">
        <div className="ai-combos-header">
          <div>
            <span className="ai-combos-eyebrow">
              <Sparkles size={14} />
              Taste engine
            </span>
            <h3 className="ai-combos-title">
              {props.title || 'Popular AI Combos'}
            </h3>
            <p className="ai-combos-subtitle">
              {props.subtitle || 'Perfect food pairings calculated by our AI engine'}
            </p>
          </div>
          <span className="ai-combos-live">
            <Zap size={14} />
            Live picks
          </span>
        </div>
        <div className="ai-combos-grid">
          {combos.map((combo, idx) => {
            const quantity = getComboQuantity(combo.id);
            const isFavorite = favoriteComboIds.has(combo.id);
            const comboBackgroundImage = `url("${String(combo.image).replace(/"/g, '\\"')}")`;

            return (
              <article
                key={combo.id}
                className="ai-combo-card"
                style={{
                  '--combo-accent': combo.accent,
                  '--combo-claimed': `${combo.claimedPercent}%`,
                  '--combo-image': comboBackgroundImage,
                  animationDelay: `${idx * 0.08}s`
                }}
              >
                <div className="ai-combo-visual">
                  {combo.discountLabel && (
                    <span className="ai-combo-discount">
                      <BadgePercent size={13} />
                      {combo.discountLabel}
                    </span>
                  )}
                  <button
                    type="button"
                    className={`ai-combo-favorite ${isFavorite ? 'active' : ''}`}
                    aria-label={`${isFavorite ? 'Remove' : 'Save'} ${combo.name}`}
                    aria-pressed={isFavorite}
                    onClick={() => toggleComboFavorite(combo.id)}
                  >
                    <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  {combo.badge && (
                    <span className="ai-combo-badge">
                      <Sparkles size={13} />
                      {combo.badge}
                    </span>
                  )}
                </div>
                <div className="ai-combo-body">
                  <div className="ai-combo-heading-row">
                    <div className="ai-combo-title-block">
                      {combo.categoryLabel && <span>{combo.categoryLabel}</span>}
                      <h4>{combo.name}</h4>
                    </div>
                    <div className="ai-combo-price">
                      <strong>Rs. {combo.price}</strong>
                      {combo.originalPrice && <span>Rs. {combo.originalPrice}</span>}
                    </div>
                  </div>
                  {(combo.rating || combo.etaValue || combo.serves) && (
                    <div className="ai-combo-stat-grid">
                      {combo.rating && (
                        <span>
                          <Star size={15} fill="none" />
                          <strong>{combo.rating}</strong>
                          {combo.ratingLabel && <small>{combo.ratingLabel}</small>}
                        </span>
                      )}
                      {combo.etaValue && (
                        <span>
                          <Clock size={15} />
                          <strong>{combo.etaValue}</strong>
                          {combo.etaUnit && <small>{combo.etaUnit}</small>}
                        </span>
                      )}
                      {combo.serves && (
                        <span>
                          <Users size={15} />
                          <strong>Serves</strong>
                          <small>{combo.serves}</small>
                        </span>
                      )}
                    </div>
                  )}
                  {combo.includedTitle && (
                    <div className="ai-combo-pack-title">
                      <Flame size={14} />
                      {combo.includedTitle}
                    </div>
                  )}
                  <ul className="ai-combo-pack-list">
                    {combo.items.map(item => (
                      <li key={`${combo.id}-${item.id}`}>
                        <Check size={14} />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                  {(combo.remainingShortLabel || combo.claimedShortLabel) && (
                    <div className="ai-combo-claim-row">
                      {combo.remainingShortLabel && <span>{combo.remainingShortLabel}</span>}
                      {combo.claimedShortLabel && <span>{combo.claimedShortLabel}</span>}
                    </div>
                  )}
                  <div className="ai-combo-footer">
                    <div className="ai-combo-stepper" aria-label={`${combo.name} quantity`}>
                      <button
                        type="button"
                        aria-label={`Decrease ${combo.name} quantity`}
                        onClick={() => setComboQuantity(combo.id, quantity - 1)}
                      >
                        <Minus size={15} />
                      </button>
                      <strong>{quantity}</strong>
                      <button
                        type="button"
                        aria-label={`Increase ${combo.name} quantity`}
                        onClick={() => setComboQuantity(combo.id, quantity + 1)}
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => exploreCombo(combo)}
                      className="ai-combo-action"
                    >
                      <ShoppingBag size={16} />
                      <span>{combo.ctaText}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  };

  const renderRestaurantRailSection = ({ railKey, title, subtitle, items, badge }) => {
    const restaurantsToShow = Array.isArray(items) ? items : [];
    const BadgeIcon = badge?.icon || Flame;

    return (
      <section className="restaurant-showcase-section page-enter">
        <div className="section-title-row restaurant-section-title">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <span className="section-count">
            {restaurantsToShow.length} {restaurantsToShow.length === 1 ? 'restaurant' : 'restaurants'}
          </span>
        </div>

        <div className="restaurant-rail-shell restaurant-section-shell">
          <button
            type="button"
            className="restaurant-rail-btn left"
            onClick={() => scrollRestaurantRail('left', railKey)}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={22} />
          </button>
          <section
            ref={(node) => { restaurantSectionRailRefs.current[railKey] = node; }}
            className="restaurant-grid restaurant-section-rail"
            aria-label={`${title} restaurant list`}
          >
            {restaurantsToShow.length > 0 ? (
              restaurantsToShow.map((restaurant, idx) => (
                <div key={`${railKey}-${restaurant.restaurantId}`} className="restaurant-section-card-wrap">
                  {badge && (
                    <div className={`restaurant-section-badge ${badge.tone || ''}`}>
                      <BadgeIcon size={12} fill="currentColor" />
                      {badge.label}
                    </div>
                  )}
                  <RestaurantCard restaurant={restaurant} index={idx} customerCoords={homeCustomerCoords} />
                </div>
              ))
            ) : (
              <div className="home-status-card">
                <strong>No restaurants to show yet</strong>
                <span>Check back shortly for new recommendations.</span>
              </div>
            )}
          </section>
          <button
            type="button"
            className="restaurant-rail-btn right"
            onClick={() => scrollRestaurantRail('right', railKey)}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </section>
    );
  };

  const renderRecentlyOpened = (props) => {
    const limit = props.limit || 4;
    const newRestaurants = restaurants
      .filter(r => formatRating(r.rating) === 'New' || r.restaurantId > 5)
      .slice(0, limit);

    return renderRestaurantRailSection({
      railKey: 'fresh',
      title: props.title || 'Fresh on the Block',
      subtitle: props.subtitle || 'Discover newly onboarded dining spots in your neighborhood',
      items: newRestaurants,
      badge: { label: 'NEW', tone: 'new', icon: Sparkles }
    });
  };

  const renderFeaturedRestaurants = (props) => {
    const minRating = props.minRating || 4.5;
    const featured = restaurants
      .filter(r => Number(r.rating) >= minRating)
      .slice(0, 4);

    return renderRestaurantRailSection({
      railKey: 'featured',
      title: props.title || 'Top Curated Picks',
      subtitle: props.subtitle || 'Highest-rated culinary spots in your area',
      items: featured,
      badge: { label: 'TOP PICK', tone: 'top', icon: Award }
    });
  };

  const renderNeighborhoodTrends = (props) => {
    const trending = [...restaurants]
      .sort((a, b) => (b.totalOrders || 0) - (a.totalOrders || 0))
      .slice(0, 4);

    return renderRestaurantRailSection({
      railKey: 'trending',
      title: props.title || 'Trending Near You',
      items: trending,
      badge: { label: 'POPULAR', tone: 'popular', icon: Flame }
    });
  };

  const renderRestaurantGrid = (props) => {
    return (
      <div style={{ marginTop: '32px' }}>
        {props.showFilters !== false && (
          <div className="control-bar page-enter">
            <div className="search-container">
              <div className="search-box">
                <Search size={18} color="var(--text-secondary)" />
                <input
                  type="text"
                  placeholder="Search for restaurants or cuisines..."
                  aria-label="Search restaurants or cuisines"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              {suggestion && (
                <div className="suggestion-box">
                  Did you mean:{' '}
                  <button type="button" className="suggestion-btn" onClick={() => setSearchQuery(suggestion)}>
                    {suggestion}
                  </button>
                </div>
              )}
            </div>
            <div className="sort-box">
              <label>Sort By:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="default">Relevance</option>
                <option value="rating">Rating: High to Low</option>
                <option value="time">Delivery Time: Fastest</option>
              </select>
            </div>
          </div>
        )}

        <div id="restaurants" className="section-title-row page-enter" style={{animationDelay: '0.15s', marginTop: '24px'}}>
          <h2>
            {isSearch && debouncedSearchQuery.trim()
              ? `Search Results for "${debouncedSearchQuery}"`
              : 'Restaurants near you'}
          </h2>
          {!loading && !error && (
            <span className="section-count">
              {filteredAndSortedRestaurants.length} {filteredAndSortedRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
            </span>
          )}
        </div>

        <div className="restaurant-rail-shell">
          <button
            type="button"
            className="restaurant-rail-btn left"
            onClick={() => scrollRestaurantRail('left')}
            aria-label="Scroll restaurants left"
          >
            <ChevronLeft size={22} />
          </button>
          <section ref={restaurantRailRef} className="restaurant-grid" aria-label="Scrollable restaurant list">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rest-card-skeleton">
                  <div className="skeleton-image-placeholder shimmer-bg" />
                  <div className="skeleton-details-placeholder">
                    <div className="skeleton-line short shimmer-bg" />
                    <div className="skeleton-line shimmer-bg" />
                    <div className="skeleton-line shimmer-bg" />
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="home-status-card">
                <strong>Restaurants are taking a little longer to load.</strong>
                <span>{error}</span>
                <br />
                <button type="button" className="retry-btn" onClick={retryRestaurants}>Retry</button>
              </div>
            ) : filteredAndSortedRestaurants.length > 0 ? (
              <>
                {visibleRestaurants.map((r, idx) => (
                  <RestaurantCard key={r.restaurantId} restaurant={r} index={idx} customerCoords={homeCustomerCoords} />
                ))}
                {hasMoreRestaurants && (
                  <Link
                    to="/restaurants"
                    className="restaurant-load-card"
                    aria-label={`Load more restaurants, ${remainingRestaurants} left`}
                  >
                    <span className="restaurant-load-kicker">More nearby picks</span>
                    <strong>Load more</strong>
                    <span>{remainingRestaurants} restaurants left</span>
                    <ArrowRight className="restaurant-load-icon" size={22} />
                  </Link>
                )}
              </>
            ) : (
              <div className="home-status-card">
                <strong>No restaurants found</strong>
                <span>Try a different search term, cuisine, or sort option.</span>
              </div>
            )}
          </section>
          <button
            type="button"
            className="restaurant-rail-btn right"
            onClick={() => scrollRestaurantRail('right')}
            aria-label="Scroll restaurants right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    );
  };

  const renderCustomerReviews = (props) => {
    const reviews = props.reviews || [];
    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '40px auto 0' }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
          {props.title || "Spotlight Review Feed"}
        </h3>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }} className="no-scrollbar">
          {reviews.map(review => (
            <div key={review.id} style={{
              flex: '0 0 320px',
              padding: '24px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.96)',
              border: '1px solid rgba(247,55,79,0.06)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '160px'
            }} className="hover-scale">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>{review.username}</strong>
                  <div style={{ display: 'flex', color: '#FFB800', gap: '2px' }}>
                    {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={12} fill="#FFB800" color="#FFB800" />)}
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '8px 0 0', fontStyle: 'italic' }}>
                  "{review.comment}"
                </p>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--brand-red)', fontWeight: 700 }}>
                on {review.restaurantName}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAppDownload = (props) => {
    return (
      <div style={{
        maxWidth: '1400px',
        width: '92%',
        margin: '40px auto 0',
        padding: '48px 32px',
        background: 'linear-gradient(135deg, rgba(247,55,79,0.04) 0%, rgba(255,184,0,0.04) 100%)',
        border: '1px solid rgba(247,55,79,0.06)',
        borderRadius: '24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'premiumFadeIn 0.5s ease both'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(247,55,79,0.08)',
            color: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
          }}>
            <Smartphone size={24} />
          </div>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text-primary)' }}>
            {props.title || "Get the ZingBite App"}
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 24px' }}>
            {props.subtitle || "Order faster, track routes live, and get exclusive rewards."}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href={props.playStoreLink || "https://play.google.com"} target="_blank" rel="noopener noreferrer" className="hero-btn primary" style={{ margin: 0 }}>
              Google Play
            </a>
            <a href={props.appStoreLink || "https://apple.com"} target="_blank" rel="noopener noreferrer" className="hero-btn secondary" style={{ margin: 0 }}>
              App Store
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderStatsCounter = (props) => {
    return (
      <ScrollReveal>
        <div className="stats-bar" style={{ marginTop: '32px', marginBottom: '32px' }}>
          <div className="stat-item">
            <div className="stat-icon"><Award size={22} /></div>
            <div className="stat-info">
              <span className="stat-number">
                <AnimatedCounter target={props.restaurantsCount || 200} suffix="+" />
              </span>
              <span className="stat-label">Restaurant Partners</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Users size={22} /></div>
            <div className="stat-info">
              <span className="stat-number">
                <AnimatedCounter target={(props.customersCount || 10000) / 1000} suffix="K+" />
              </span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><MapPin size={22} /></div>
            <div className="stat-info">
              <span className="stat-number">
                <AnimatedCounter target={25} suffix="+" />
              </span>
              <span className="stat-label">Cities Covered</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon"><Clock size={22} /></div>
            <div className="stat-info">
              <span className="stat-number">
                <AnimatedCounter target={28} suffix=" min" />
              </span>
              <span className="stat-label">Avg. Delivery Time</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  };

  const renderSection = (section) => {
    if (!section.visible) return null;
    const { id, props = {} } = section;

    switch (id) {
      case 'hero_banner':
        return renderHeroBanner(props);
      case 'weather_surge_banner':
        return renderWeatherSurgeBanner(props);
      case 'group_order_cta':
        return renderGroupOrderCta(props);
      case 'promo_deals':
        return renderPromoDeals(props);
      case 'category_carousel':
        return renderCategoryCarousel(props);
      case 'food_moods':
        return renderFoodMoods(props);
      case 'trending_combos':
        return renderTrendingCombos(props);
      case 'recently_opened':
        return renderRecentlyOpened(props);
      case 'featured_restaurants':
        return renderFeaturedRestaurants(props);
      case 'neighborhood_trends':
        return renderNeighborhoodTrends(props);
      case 'restaurant_grid':
        return renderRestaurantGrid(props);
      case 'customer_reviews':
        return renderCustomerReviews(props);
      case 'app_download':
        return renderAppDownload(props);
      case 'stats_counter':
        return renderStatsCounter(props);
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        /* ===== HERO SECTION ===== */
        .home-hero {
          position: relative;
          min-height: min(75vh, 660px);
          padding: 80px 20px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #0d0d0d;
          color: #fff;
        }
        .home-hero-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 100%),
            url('${HERO_IMAGE}');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 0.1s linear, opacity 0.8s ease;
          opacity: ${heroLoaded ? 1 : 0};
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(247,55,79,0.12) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .home-hero::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.2), transparent);
          z-index: 2;
        }
        .hero-content {
          max-width: 700px;
          width: min(92%, 1400px);
          margin: 0 auto;
          position: relative;
          z-index: 3;
          text-align: left;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          animation: premiumFadeIn 0.6s var(--ease-premium) both;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.08;
          margin-bottom: 16px;
          color: #fff;
          animation: premiumFadeIn 0.6s var(--ease-premium) 0.1s both;
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, var(--brand-red), #ff8a9e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          max-width: 560px;
          margin: 0;
          animation: premiumFadeIn 0.6s var(--ease-premium) 0.2s both;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.3s both;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.35s var(--ease-premium);
          position: relative;
          overflow: hidden;
        }
        .hero-btn.primary {
          background: linear-gradient(135deg, var(--brand-red), #ff6b7a);
          color: #fff;
          box-shadow: 0 12px 30px rgba(247,55,79,0.35);
        }
        .hero-btn.primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .hero-btn.primary:hover::after {
          transform: translateX(100%);
        }
        .hero-btn.primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 40px rgba(247,55,79,0.45);
        }
        .hero-btn.secondary {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .hero-btn.secondary:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          color: #fff;
        }
        .hero-chips {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 28px;
          animation: premiumSlideUp 0.5s var(--ease-premium) 0.4s both;
        }
        .hero-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          transition: all 0.35s var(--ease-premium);
          cursor: default;
        }
        .hero-chip:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        /* ===== STATS BAR ===== */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 40px;
          max-width: 1400px;
          width: 92%;
          margin: -32px auto 32px;
          padding: 24px 32px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(247,55,79,0.08);
          border-radius: var(--radius-lg);
          box-shadow: 0 8px 30px rgba(28,28,28,0.06);
          position: relative;
          z-index: 5;
          flex-wrap: wrap;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
        }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(247,55,79,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-red);
          flex-shrink: 0;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .stat-label {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ===== HOME STATUS CARD ===== */
        .home-status-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 56px 24px;
          color: var(--text-secondary);
          border: 1px dashed rgba(247,55,79,0.18);
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.96);
        }
        .home-status-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .retry-btn {
          margin-top: 18px;
          border: none;
          background: var(--brand-red);
          color: #fff;
          border-radius: 999px;
          padding: 10px 18px;
          font-weight: 800;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .retry-btn:hover {
          background: var(--brand-red-hover);
          transform: translateY(-1px);
        }

        /* ===== SECTION TITLE ===== */
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
        }
        .section-title-row h2 {
          font-size: 1.45rem;
          color: var(--text-primary);
        }
        .section-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        .restaurant-showcase-section {
          margin-top: 32px;
        }
        .restaurant-section-title {
          align-items: flex-end;
          margin-bottom: 12px;
        }
        .restaurant-section-title > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .restaurant-section-title p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .restaurant-section-shell {
          margin-bottom: 34px;
        }
        .restaurant-section-rail {
          padding-bottom: 24px;
        }
        .restaurant-section-card-wrap {
          position: relative;
          flex: 0 0 clamp(300px, 29vw, 360px);
          scroll-snap-align: start;
        }
        .restaurant-section-card-wrap .rest-card {
          width: 100%;
          height: 100%;
          flex: 1 1 auto;
          scroll-snap-align: none;
        }
        .restaurant-section-card-wrap .rest-card-offer {
          display: none;
        }
        .restaurant-section-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 6;
          min-height: 28px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0 10px;
          border-radius: 999px;
          color: #fff;
          background: rgba(26,26,26,0.92);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 10px 20px rgba(0,0,0,0.18);
          backdrop-filter: blur(10px);
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .restaurant-section-badge.new {
          background: rgba(23,168,107,0.92);
        }
        .restaurant-section-badge.top {
          background: rgba(245,158,11,0.94);
        }
        .restaurant-section-badge.popular {
          background: rgba(247,55,79,0.94);
        }

        /* ===== RESTAURANT RAIL ===== */
        .restaurant-rail-shell {
          position: relative;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 48px;
        }
        .restaurant-grid {
          display: flex;
          gap: 20px;
          width: 100%;
          margin: 0;
          overflow-x: auto;
          overflow-y: visible;
          padding: 6px 54px 30px;
          scroll-snap-type: x proximity;
          scroll-padding-left: 54px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        .restaurant-grid::-webkit-scrollbar {
          display: none;
        }
        .restaurant-grid > .home-status-card {
          flex: 1 0 100%;
        }
        .restaurant-rail-btn {
          position: absolute;
          top: 50%;
          z-index: 5;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 50%;
          background: rgba(255,255,255,0.94);
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 16px 34px rgba(28,28,28,0.14);
          transform: translateY(-50%);
          transition: transform 0.25s var(--ease-premium), background 0.25s var(--ease-premium), color 0.25s var(--ease-premium), border-color 0.25s var(--ease-premium);
        }
        [data-theme="dark"] .restaurant-rail-btn {
          background: rgba(30,30,35,0.94);
          border-color: rgba(255,255,255,0.1);
          color: #fff;
        }
        .restaurant-rail-btn.left {
          left: 10px;
        }
        .restaurant-rail-btn.right {
          right: 10px;
        }
        .restaurant-rail-btn:hover {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: #fff;
          transform: translateY(-50%) scale(1.07);
        }
        .restaurant-rail-btn:focus-visible {
          outline: 3px solid rgba(247,55,79,0.25);
          outline-offset: 3px;
        }
        .rest-card {
          flex: 0 0 clamp(300px, 29vw, 360px);
          scroll-snap-align: start;
          border-radius: 20px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94));
          border: 1px solid var(--card-border);
          text-decoration: none;
          color: inherit;
          transition: transform 0.5s var(--ease-premium), box-shadow 0.5s var(--ease-premium), border-color 0.5s var(--ease-premium);
          position: relative;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
          box-shadow: 0 14px 34px rgba(28,28,28,0.08);
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        [data-theme="dark"] .rest-card {
          background: linear-gradient(180deg, rgba(30,30,35,0.98), rgba(24,24,28,0.94));
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 18px 42px rgba(0,0,0,0.28);
        }
        .rest-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .rest-card:hover {
          transform: translateY(-7px) scale(1.01);
          box-shadow: 0 18px 40px rgba(247, 55, 79, 0.1), 0 28px 56px rgba(0, 0, 0, 0.12);
          border-color: rgba(247, 55, 79, 0.25);
        }
        .rest-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 64%;
          overflow: hidden;
          border-radius: 0;
        }
        .rest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-premium);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.08) translateY(-2px);
        }
        .rest-card-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 78%;
          background:
            linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.44) 58%, transparent 100%),
            linear-gradient(135deg, rgba(247,55,79,0.22), transparent 36%);
          pointer-events: none;
          z-index: 1;
        }
        .closed-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          color: #fff;
          font-weight: 800;
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .rest-card-offer {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(247, 55, 79, 0.9);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.72rem;
          font-weight: 800;
          border-radius: 20px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(247, 55, 79, 0.25);
        }
        .rest-card-rating {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          padding: 4px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 800;
          font-size: 0.8rem;
          color: #fff;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .rest-card-rating.excellent {
          background: rgba(46, 125, 50, 0.85);
          border: 1px solid rgba(46, 125, 50, 0.5);
        }
        .rest-card-rating.good {
          background: rgba(239, 108, 0, 0.85);
          border: 1px solid rgba(239, 108, 0, 0.5);
        }
        .rest-card-rating.average {
          background: rgba(198, 40, 40, 0.85);
          border: 1px solid rgba(198, 40, 40, 0.5);
        }
        .rest-card-overlay-info {
          position: absolute;
          bottom: 12px;
          left: 16px;
          right: 16px;
          z-index: 2;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .rest-card-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.22rem;
          font-weight: 800;
          margin: 0;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rest-card-cuisine {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rest-card-details {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 11px;
          background: transparent;
        }
        .rest-card-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 7px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .rest-card-meta-pill {
          min-height: 30px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(247,55,79,0.06);
          border: 1px solid rgba(247,55,79,0.08);
          color: var(--text-secondary);
          white-space: nowrap;
        }
        .rest-card-meta-pill svg {
          color: var(--brand-red);
        }
        .rest-card-price {
          color: var(--text-primary);
          font-weight: 800;
        }
        .rest-card-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          border-top: 1px solid var(--border-light);
          padding-top: 10px;
        }
        .rest-card-status {
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 20px;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }
        .rest-card-status.open {
          background: rgba(96,178,70,0.12);
          color: var(--success);
        }
        .rest-card-status.closed {
          background: rgba(226,55,68,0.12);
          color: var(--danger);
        }
        .rest-card-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          display: inline-block;
        }
        .rest-card-menu-cue {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          color: var(--brand-red);
          font-size: 0.76rem;
          font-weight: 900;
          white-space: nowrap;
        }
        .rest-card-menu-cue svg {
          transition: transform 0.25s var(--ease-premium);
        }
        .rest-card:hover .rest-card-menu-cue svg {
          transform: translateX(3px);
        }
        .restaurant-load-card {
          flex: 0 0 244px;
          min-height: 322px;
          scroll-snap-align: start;
          border: 1px solid rgba(247,55,79,0.2);
          border-radius: 24px;
          background:
            radial-gradient(circle at 82% 18%, rgba(23,168,107,0.16), transparent 30%),
            linear-gradient(145deg, rgba(247,55,79,0.1), rgba(255,255,255,0.96));
          color: var(--text-primary);
          box-shadow: var(--card-shadow);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 10px;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s var(--ease-premium), border-color 0.3s var(--ease-premium), box-shadow 0.3s var(--ease-premium);
        }
        [data-theme="dark"] .restaurant-load-card {
          background:
            radial-gradient(circle at 82% 18%, rgba(23,168,107,0.18), transparent 30%),
            linear-gradient(145deg, rgba(247,55,79,0.16), rgba(30,30,35,0.96));
          border-color: rgba(255,255,255,0.1);
        }
        .restaurant-load-card:hover {
          border-color: rgba(247,55,79,0.38);
          box-shadow: 0 22px 44px rgba(247,55,79,0.14);
          transform: translateY(-6px);
        }
        .restaurant-load-card:focus-visible {
          outline: 3px solid rgba(247,55,79,0.24);
          outline-offset: 3px;
        }
        .restaurant-load-kicker {
          color: var(--brand-red);
          font-size: 0.78rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .restaurant-load-card strong {
          font-family: 'Outfit', sans-serif;
          font-size: 1.45rem;
          line-height: 1.05;
        }
        .restaurant-load-card span:not(.restaurant-load-kicker) {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 700;
        }
        .restaurant-load-icon {
          margin-top: 8px;
          color: var(--brand-red);
          transition: transform 0.25s var(--ease-premium);
        }
        .restaurant-load-card:hover .restaurant-load-icon {
          transform: translateX(5px);
        }

        /* ===== SKELETON PREVIEW ===== */
        .rest-card-skeleton {
          flex: 0 0 clamp(286px, 28vw, 342px);
          scroll-snap-align: start;
          border-radius: 24px;
          overflow: hidden;
          background: var(--surface-card);
          border: 1px solid var(--card-border);
          display: flex;
          flex-direction: column;
          height: 320px;
          box-shadow: var(--card-shadow);
        }
        .skeleton-image-placeholder {
          width: 100%;
          height: 68%;
          background: var(--border-light);
        }
        .skeleton-details-placeholder {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .skeleton-line {
          height: 12px;
          background: var(--border-light);
          border-radius: 6px;
          width: 100%;
        }
        .skeleton-line.short {
          width: 60%;
          height: 16px;
        }
        .shimmer-bg {
          background: linear-gradient(90deg, 
            var(--border-light) 25%, 
            var(--border-medium) 37%, 
            var(--border-light) 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }

        /* ===== AI COMBOS ===== */
        .ai-combos-section {
          max-width: 1320px;
          width: 92%;
          margin: 38px auto 0;
        }
        .ai-combos-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 14px;
        }
        .ai-combos-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 7px;
          color: var(--brand-red);
          font-size: 0.78rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .ai-combos-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.65rem);
          font-weight: 900;
          line-height: 1.12;
          color: var(--text-primary);
          margin: 0;
        }
        .ai-combos-subtitle {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.5;
          max-width: 520px;
        }
        .ai-combos-live {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          color: #15875a;
          background: rgba(23,168,107,0.1);
          border: 1px solid rgba(23,168,107,0.18);
          font-size: 0.78rem;
          font-weight: 900;
          white-space: nowrap;
        }
        .ai-combos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 22px;
          align-items: stretch;
        }
        .ai-combo-card {
          --combo-accent: var(--brand-red);
          position: relative;
          overflow: hidden;
          min-height: 456px;
          padding: 14px;
          border-radius: 8px;
          background:
            linear-gradient(180deg, rgba(9,7,6,0.22) 0%, rgba(13,9,7,0.58) 34%, rgba(18,11,9,0.9) 70%, rgba(14,9,8,0.98) 100%),
            radial-gradient(circle at 50% 18%, rgba(255,209,102,0.14), transparent 36%),
            var(--combo-image);
          background-size: cover, cover, cover;
          background-position: center, center, center;
          border: 1px solid rgba(255,198,134,0.22);
          box-shadow:
            0 28px 70px rgba(28,16,10,0.22),
            inset 0 1px 0 rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          isolation: isolate;
          animation: premiumFadeIn 0.5s var(--ease-premium) both;
          transition: transform 0.28s var(--ease-premium), box-shadow 0.28s var(--ease-premium), border-color 0.28s var(--ease-premium);
        }
        .ai-combo-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.48) 0%, transparent 32%, transparent 68%, rgba(0,0,0,0.44) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.12), transparent 28%, rgba(0,0,0,0.32) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .ai-combo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(112deg, transparent 0%, rgba(255,236,196,0.12) 42%, rgba(255,255,255,0.2) 50%, rgba(255,236,196,0.08) 58%, transparent 72%);
          transform: translateX(-130%);
          animation: aiComboShimmer 4.8s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        .ai-combo-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,202,139,0.42);
          box-shadow:
            0 34px 82px rgba(28,16,10,0.3),
            0 0 34px color-mix(in srgb, var(--combo-accent) 12%, transparent);
        }
        [data-theme="dark"] .ai-combo-card {
          border-color: rgba(255,198,134,0.26);
          box-shadow:
            0 34px 88px rgba(0,0,0,0.36),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .ai-combo-visual {
          position: relative;
          z-index: 2;
          min-height: 38px;
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 8px;
          padding-right: 50px;
          margin-bottom: 14px;
          overflow: visible;
          background: transparent;
        }
        .ai-combo-discount,
        .ai-combo-badge {
          position: static;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 900;
          backdrop-filter: blur(14px);
          box-shadow: 0 10px 26px rgba(0,0,0,0.18);
        }
        .ai-combo-discount {
          left: 0;
          top: 0;
          gap: 7px;
          padding: 0 13px;
          color: #fff7e8;
          background: rgba(13,10,9,0.7);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .ai-combo-favorite {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.12);
          color: #fff7e8;
          backdrop-filter: blur(12px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.22s var(--ease-premium), background 0.22s var(--ease-premium), color 0.22s var(--ease-premium);
        }
        .ai-combo-favorite:hover,
        .ai-combo-favorite:focus-visible,
        .ai-combo-favorite.active {
          transform: translateY(-1px);
          color: #ffd37e;
          background: rgba(255,255,255,0.18);
          outline: none;
        }
        .ai-combo-badge {
          left: 0;
          bottom: 0;
          gap: 7px;
          max-width: calc(100% - 54px);
          padding: 0 13px;
          color: #fff7e8;
          background: rgba(13,10,9,0.68);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .ai-combo-body {
          position: relative;
          z-index: 2;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,226,185,0.14);
          background:
            linear-gradient(180deg, rgba(22,15,12,0.72), rgba(15,10,9,0.86));
          backdrop-filter: blur(8px);
          color: #fff9ed;
          text-shadow: 0 1px 16px rgba(0,0,0,0.32);
        }
        .ai-combo-heading-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .ai-combo-title-block {
          min-width: 0;
        }
        .ai-combo-title-block > span {
          display: block;
          margin-bottom: 3px;
          color: #ffd166;
          font-size: 0.7rem;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .ai-combo-title-block h4 {
          margin: 0;
          color: #fffaf3;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(1.12rem, 1.8vw, 1.38rem);
          font-weight: 900;
          line-height: 1.06;
          overflow-wrap: anywhere;
        }
        .ai-combo-price {
          flex: 0 0 auto;
          min-width: 84px;
          text-align: right;
        }
        .ai-combo-price strong {
          display: block;
          color: #ffd77c;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(1rem, 1.5vw, 1.18rem);
          font-weight: 900;
          line-height: 1;
          white-space: nowrap;
        }
        .ai-combo-price span {
          display: block;
          margin-top: 4px;
          color: rgba(255,250,243,0.44);
          font-size: 0.72rem;
          font-weight: 900;
          text-decoration: line-through;
          white-space: nowrap;
        }
        .ai-combo-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
        }
        .ai-combo-stat-grid span {
          min-height: 42px;
          padding: 5px 7px;
          border-radius: 6px;
          border: 1px solid rgba(255,226,185,0.16);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          text-align: center;
        }
        .ai-combo-stat-grid svg {
          color: #ffc145;
        }
        .ai-combo-stat-grid strong {
          color: #fffaf3;
          font-size: 0.78rem;
          font-weight: 950;
          line-height: 1.05;
        }
        .ai-combo-stat-grid small {
          color: rgba(255,250,243,0.68);
          font-size: 0.64rem;
          font-weight: 800;
          line-height: 1.1;
        }
        .ai-combo-pack-title {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #fffaf3;
          font-size: 0.76rem;
          font-weight: 900;
        }
        .ai-combo-pack-title svg {
          color: var(--combo-accent);
        }
        .ai-combo-pack-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 4px 10px;
          margin: -2px 0 0;
          padding: 0;
          list-style: none;
        }
        .ai-combo-pack-list li {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          min-width: 0;
          color: rgba(255,250,243,0.84);
          font-size: 0.72rem;
          font-weight: 850;
          line-height: 1.22;
        }
        .ai-combo-pack-list svg {
          flex: 0 0 auto;
          margin-top: 1px;
          color: #8fd16c;
        }
        .ai-combo-pack-list span {
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .ai-combo-claim-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          color: rgba(255,250,243,0.78);
          font-size: 0.68rem;
          font-weight: 900;
          margin-top: -1px;
        }
        .ai-combo-claim-row span {
          display: inline-flex;
          align-items: center;
          min-height: 23px;
          padding: 0 7px;
          border-radius: 999px;
          background: rgba(0,0,0,0.22);
          border: 1px solid rgba(255,226,185,0.16);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .ai-combo-claim-row span:first-child {
          color: #ffd77c;
        }
        .ai-combo-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 9px;
          padding-top: 2px;
          margin-top: 0;
        }
        .ai-combo-stepper {
          flex: 0 0 auto;
          height: 40px;
          min-width: 100px;
          padding: 0 5px;
          border-radius: 999px;
          border: 1px solid rgba(255,226,185,0.16);
          background: rgba(255,255,255,0.06);
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
        }
        .ai-combo-stepper button {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #fffaf3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s var(--ease-premium), background 0.2s var(--ease-premium);
        }
        .ai-combo-stepper button:hover,
        .ai-combo-stepper button:focus-visible {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.14);
          outline: none;
        }
        .ai-combo-stepper strong {
          color: #fffaf3;
          font-size: 1rem;
          font-weight: 950;
          min-width: 18px;
          text-align: center;
        }
        .ai-combo-action {
          flex: 1 1 auto;
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 17px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border: none;
          border-radius: 999px;
          color: #1b1104;
          background:
            radial-gradient(circle at 18% 18%, rgba(255,238,174,0.36), transparent 22%),
            linear-gradient(135deg, #e6b84e 0%, #c4871a 36%, #8d5a0b 64%, #d59a24 100%);
          box-shadow:
            0 14px 28px rgba(105,65,8,0.34),
            inset 0 1px 0 rgba(255,235,178,0.45),
            inset 0 -1px 0 rgba(129,79,12,0.2);
          font-size: 0.86rem;
          font-weight: 950;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.22s var(--ease-premium), box-shadow 0.22s var(--ease-premium);
        }
        .ai-combo-action::before {
          content: '';
          position: absolute;
          inset: -55% -34%;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(circle, rgba(255,232,156,0.42) 0 1px, transparent 2px),
            radial-gradient(circle, rgba(196,135,26,0.36) 0 1px, transparent 2px),
            linear-gradient(112deg, transparent 0%, rgba(255,226,145,0.36) 44%, rgba(255,255,255,0.08) 52%, transparent 62%);
          background-size: 22px 22px, 34px 34px, 100% 100%;
          transform: translateX(-120%) rotate(8deg);
          animation: aiGoldGlitter 3.8s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
        .ai-combo-action span,
        .ai-combo-action svg {
          position: relative;
          z-index: 1;
        }
        .ai-combo-action:hover,
        .ai-combo-action:focus-visible {
          transform: translateY(-2px);
          box-shadow:
            0 18px 34px rgba(112,70,10,0.42),
            0 0 16px rgba(185,126,24,0.22),
            inset 0 1px 0 rgba(255,238,180,0.5);
          outline: none;
        }
        .ai-combo-action svg:last-child {
          transition: transform 0.22s var(--ease-premium);
        }
        .ai-combo-action:hover svg:last-child,
        .ai-combo-action:focus-visible svg:last-child {
          transform: translateX(3px);
        }
        @media (max-width: 768px) {
          .ai-combos-section { width: 100%; margin-top: 34px; }
          .ai-combos-header { width: 92%; margin: 0 auto 16px; flex-direction: column; align-items: flex-start; }
          .ai-combos-grid {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            padding: 2px 4% 18px;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
          }
          .ai-combos-grid::-webkit-scrollbar { display: none; }
          .ai-combo-card {
            flex: 0 0 min(88vw, 430px);
            min-height: 456px;
            padding: 14px;
            scroll-snap-align: start;
          }
          .ai-combo-visual { min-height: 38px; }
          .ai-combo-action { width: 100%; }
        }
        @media (max-width: 420px) {
          .ai-combo-card {
            flex-basis: 90vw;
            min-height: 0;
          }
          .ai-combo-visual { min-height: 38px; }
          .ai-combo-body { padding: 11px; }
          .ai-combo-heading-row { flex-direction: column; gap: 8px; }
          .ai-combo-price { text-align: left; }
          .ai-combo-footer { flex-direction: column; align-items: stretch; }
          .ai-combo-stepper { width: 100%; }
        }

        /* ===== VIBE CAROUSEL ===== */
        .vibe-section {
          max-width: 1400px;
          width: 92%;
          margin: 40px auto 0;
          padding: 22px;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(247,55,79,0.1);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(247,55,79,0.04) 56%, rgba(23,168,107,0.04) 100%);
          box-shadow: 0 18px 50px rgba(28,28,28,0.06);
        }
        [data-theme="dark"] .vibe-section {
          border-color: rgba(255,255,255,0.08);
          background:
            linear-gradient(135deg, rgba(26,26,30,0.96) 0%, rgba(247,55,79,0.08) 55%, rgba(23,168,107,0.06) 100%);
          box-shadow: 0 22px 60px rgba(0,0,0,0.24);
        }
        .vibe-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 18px;
          right: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(247,55,79,0.28), rgba(23,168,107,0.22), transparent);
        }
        .vibe-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 18px;
          position: relative;
          z-index: 2;
        }
        .vibe-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
          color: var(--brand-red);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .vibe-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.65rem);
          font-weight: 800;
          line-height: 1.15;
          margin: 0;
          color: var(--text-primary);
        }
        .vibe-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .vibe-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 36px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(23,168,107,0.1);
          color: #15875a;
          border: 1px solid rgba(23,168,107,0.18);
          font-size: 0.78rem;
          font-weight: 800;
        }
        [data-theme="dark"] .vibe-live-pill {
          color: #55d69c;
          background: rgba(23,168,107,0.14);
          border-color: rgba(85,214,156,0.2);
        }
        .vibe-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 0 0 rgba(23,168,107,0.34);
          animation: vibePulse 1.8s ease-out infinite;
        }
        .vibe-carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-bottom: 10px;
          z-index: 1;
        }
        .vibe-carousel-wrapper::before,
        .vibe-carousel-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 48px;
          z-index: 3;
          pointer-events: none;
        }
        .vibe-carousel-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), transparent);
        }
        .vibe-carousel-wrapper::after {
          right: 0;
          background: linear-gradient(270deg, rgba(255,255,255,0.95), transparent);
        }
        [data-theme="dark"] .vibe-carousel-wrapper::before {
          background: linear-gradient(90deg, rgba(26,26,30,0.94), transparent);
        }
        [data-theme="dark"] .vibe-carousel-wrapper::after {
          background: linear-gradient(270deg, rgba(26,26,30,0.94), transparent);
        }
        .vibe-carousel {
          display: flex;
          gap: 16px;
          width: max-content;
          overflow: visible;
          padding: 8px 0 18px;
          animation: vibeMarquee 36s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .vibe-section.paused .vibe-carousel {
          animation-play-state: paused;
        }
        .vibe-section.reverse .vibe-carousel {
          animation-direction: reverse;
        }
        .vibe-carousel::-webkit-scrollbar {
          display: none;
        }
        .vibe-card {
          flex: 0 0 360px;
          min-height: 374px;
          border-radius: 10px;
          background:
            radial-gradient(circle at 22% 14%, rgba(255,118,45,0.18), transparent 24%),
            radial-gradient(circle at 78% 42%, rgba(255,79,31,0.14), transparent 28%),
            linear-gradient(145deg, #8c1514 0%, #3a0708 48%, #060303 100%);
          border: 1px solid rgba(255,98,58,0.34);
          color: #fff8ee;
          cursor: pointer;
          transition: transform 0.36s var(--ease-premium), border-color 0.36s var(--ease-premium), box-shadow 0.36s var(--ease-premium), background 0.36s var(--ease-premium);
          padding: 24px 24px 22px;
          outline: none;
          position: relative;
          overflow: hidden;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0;
          box-shadow:
            0 30px 70px rgba(87,25,18,0.34),
            0 12px 26px rgba(0,0,0,0.2);
          isolation: isolate;
        }
        [data-theme="dark"] .vibe-card {
          border-color: rgba(255,98,58,0.4);
          box-shadow:
            0 34px 78px rgba(0,0,0,0.42),
            0 0 42px rgba(247,55,79,0.13);
        }
        .vibe-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.08), transparent 24%),
            linear-gradient(0deg, rgba(0,0,0,0.7), transparent 46%);
          opacity: 0.92;
          transition: opacity 0.36s var(--ease-premium);
          pointer-events: none;
          z-index: 1;
        }
        .vibe-card-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(118deg, transparent 0%, rgba(255,236,210,0.18) 45%, transparent 58%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
          z-index: 5;
        }
        .vibe-card-aura {
          position: absolute;
          inset: -30px;
          background:
            radial-gradient(circle at 50% 48%, var(--vibe-neon-glow), transparent 34%),
            radial-gradient(circle at 18% 10%, rgba(255,115,41,0.24), transparent 28%);
          opacity: 0.58;
          pointer-events: none;
          z-index: 0;
        }
        .vibe-card-pattern {
          position: absolute;
          left: 46px;
          right: 22px;
          top: 74px;
          height: 152px;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 50% 50% 38% 38%;
          background:
            repeating-linear-gradient(104deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 16px);
          opacity: 0.78;
          transform: rotate(-3deg);
          pointer-events: none;
          z-index: 1;
        }
        .vibe-card-topline {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 16px;
          position: relative;
          z-index: 4;
        }
        .vibe-craving-pill {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          max-width: 190px;
          padding: 0 17px;
          border-radius: 999px;
          color: #fff2de;
          background: rgba(76,20,18,0.72);
          border: 1px solid rgba(255,146,87,0.34);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05), 0 12px 26px rgba(0,0,0,0.22);
          font-size: 0.9rem;
          font-weight: 900;
          white-space: nowrap;
        }
        .vibe-craving-pill svg {
          color: #ff935f;
        }
        .vibe-plate-stage {
          position: absolute;
          left: 50%;
          top: 45%;
          width: 220px;
          height: 220px;
          transform: translate(-35%, -48%);
          pointer-events: none;
          z-index: 2;
        }
        .vibe-plate-shadow {
          position: absolute;
          inset: 10px 0 0 14px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 50% 48%, rgba(16,10,10,0.94) 0 42%, rgba(10,7,7,0.98) 43% 70%, rgba(0,0,0,0.72) 71%);
          box-shadow:
            -18px 22px 32px rgba(0,0,0,0.34),
            inset -24px -20px 34px rgba(0,0,0,0.55),
            inset 24px 16px 26px rgba(255,255,255,0.03);
        }
        .vibe-food-art {
          position: absolute;
          inset: 36px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          opacity: 0.95;
          filter: saturate(1.22) contrast(1.08);
          transform: rotate(-6deg) scale(1);
          transition: opacity 0.36s var(--ease-premium), transform 0.36s var(--ease-premium), filter 0.36s var(--ease-premium);
          box-shadow:
            0 0 0 10px rgba(255,171,75,0.08),
            0 0 26px rgba(255,144,48,0.32);
          z-index: 2;
        }
        .vibe-food-art::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 28% 22%, rgba(255,255,255,0.22), transparent 24%);
          pointer-events: none;
        }
        .vibe-copy {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 136px;
          max-width: 245px;
          position: relative;
          z-index: 4;
        }
        .vibe-cuisine-label {
          color: #ff8b36;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
          line-height: 1;
          margin-bottom: 8px;
        }
        .vibe-subtitle {
          color: #fff9ed;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 1.42rem;
          font-weight: 900;
          line-height: 1.04;
          text-shadow: 0 8px 24px rgba(0,0,0,0.42);
          max-width: 230px;
          overflow-wrap: anywhere;
        }
        .vibe-card-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 4;
        }
        .vibe-card-stats span {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0 12px;
          border-radius: 999px;
          color: #fff7e8;
          background: rgba(0,0,0,0.38);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          font-weight: 900;
          white-space: nowrap;
        }
        .vibe-card-stats svg {
          color: #fff2da;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.24));
        }
        .vibe-card:hover,
        .vibe-card.active {
          border-color: rgba(255,133,73,0.72);
          box-shadow:
            0 34px 78px rgba(102,25,14,0.4),
            0 0 44px var(--vibe-neon-glow);
          transform: translateY(-7px);
        }
        .vibe-card:hover .vibe-card-sheen,
        .vibe-card.active .vibe-card-sheen {
          transform: translateX(120%);
        }
        .vibe-card:hover .vibe-food-art,
        .vibe-card.active .vibe-food-art {
          filter: saturate(1.34) contrast(1.1);
          transform: rotate(-3deg) scale(1.08);
        }
        .vibe-card:focus-visible {
          box-shadow:
            0 0 0 4px rgba(255,126,72,0.2),
            0 34px 78px rgba(102,25,14,0.4),
            0 0 44px var(--vibe-neon-glow);
          border-color: rgba(255,133,73,0.86);
        }
        .vibe-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.86);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        [data-theme="dark"] .vibe-nav-btn {
          background: rgba(30,30,35,0.9);
          border-color: rgba(255,255,255,0.08);
          color: #fff;
        }
        .vibe-nav-btn:hover {
          background: var(--brand-red);
          color: #fff;
          border-color: var(--brand-red);
          transform: scale(1.08);
        }
        .vibe-nav-btn:focus-visible {
          outline: 3px solid rgba(247,55,79,0.24);
          outline-offset: 2px;
        }
        @keyframes vibePulse {
          0% { box-shadow: 0 0 0 0 rgba(23,168,107,0.36); }
          70% { box-shadow: 0 0 0 8px rgba(23,168,107,0); }
          100% { box-shadow: 0 0 0 0 rgba(23,168,107,0); }
        }
        @keyframes vibeMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-50% - 8px), 0, 0); }
        }
        @keyframes aiComboShimmer {
          0%, 58% { transform: translateX(-130%); opacity: 0; }
          66% { opacity: 0.9; }
          88%, 100% { transform: translateX(130%); opacity: 0; }
        }
        @keyframes aiGoldGlitter {
          0%, 46% { transform: translateX(-120%) rotate(8deg); opacity: 0; }
          56% { opacity: 0.46; }
          78%, 100% { transform: translateX(120%) rotate(8deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-combo-action::before,
          .ai-combo-card::after,
          .category-sheet-backdrop,
          .category-menu-sheet,
          .category-menu-item,
          .vibe-carousel,
          .vibe-live-dot {
            animation: none;
          }
          .category-menu-sheet,
          .category-menu-item {
            transform: none;
            opacity: 1;
          }
          .vibe-card,
          .vibe-plate-stage,
          .vibe-card-sheen,
          .vibe-food-art {
            transition: none;
          }
        }

        /* ===== CONTROL BAR ===== */
        .control-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 24px auto 12px;
          gap: 16px;
        }
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          max-width: 400px;
        }
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid rgba(247,55,79,0.12);
          padding: 8px 16px;
          border-radius: 30px;
          width: 100%;
          transition: all 0.3s var(--ease-premium);
        }
        .search-box:focus-within {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(247,55,79,0.08);
          transform: scale(1.01);
        }
        .search-box input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .suggestion-box {
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding-left: 12px;
          animation: slideUp 0.3s var(--ease-premium) both;
        }
        .suggestion-btn {
          background: none;
          border: none;
          color: var(--brand-red);
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          transition: color var(--transition-fast);
        }
        .suggestion-btn:hover {
          color: var(--brand-red-hover);
        }
        .sort-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sort-box label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .sort-box select {
          padding: 8px 36px 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(247,55,79,0.12);
          background: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
        }
        .sort-box select:hover {
          border-color: var(--brand-red);
        }
        .sort-box select:focus {
          border-color: var(--brand-red);
          box-shadow: 0 0 0 3px rgba(247,55,79,0.1);
        }

        /* ===== REDESIGNED CUISINE CATEGORIES ===== */
        .category-rail-shell {
          position: relative;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 32px;
        }
        .cuisine-filters {
          display: flex;
          justify-content: center;
          gap: 16px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 32px;
          overflow-x: auto;
          padding: 8px 4px 16px;
          scrollbar-width: none; /* Hide scrollbar Firefox */
        }
        .category-rail-shell .cuisine-filters {
          width: 100%;
          max-width: none;
          margin: 0;
          justify-content: flex-start;
          padding: 8px 58px 16px;
          scroll-padding-left: 58px;
          scroll-snap-type: x proximity;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        .cuisine-filters::-webkit-scrollbar {
          display: none; /* Hide scrollbar Chrome/Safari */
        }
        .category-rail-btn {
          position: absolute;
          top: 50%;
          z-index: 3;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(247,55,79,0.18);
          background: rgba(255,255,255,0.94);
          color: var(--brand-red);
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 14px 34px rgba(28,28,28,0.14);
          backdrop-filter: blur(14px);
          transform: translateY(-50%);
          transition: transform 0.22s var(--ease-premium), box-shadow 0.22s var(--ease-premium), background 0.22s var(--ease-premium);
        }
        .category-rail-btn:hover,
        .category-rail-btn:focus-visible {
          background: #fff;
          box-shadow: 0 18px 40px rgba(247,55,79,0.22);
          transform: translateY(-50%) scale(1.06);
          outline: none;
        }
        .category-rail-btn.left {
          left: 8px;
        }
        .category-rail-btn.right {
          right: 8px;
        }
        .category-card {
          width: 130px;
          height: 130px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 2px solid transparent;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: all 0.4s var(--ease-premium);
          flex-shrink: 0;
          outline: none;
          scroll-snap-align: start;
        }
        .category-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-premium);
        }
        .category-card:hover .category-card-img {
          transform: scale(1.12);
        }
        .category-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 12px;
          transition: background 0.3s;
          z-index: 1;
        }
        .category-card:hover .category-card-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
        }
        .category-card-name {
          font-family: 'Outfit', sans-serif;
          color: #fff;
          font-weight: 800;
          font-size: 0.95rem;
          text-align: center;
          margin: 0;
          letter-spacing: -0.2px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
          z-index: 2;
          transition: transform 0.3s var(--ease-premium);
        }
        .category-card:hover .category-card-name {
          transform: translateY(-2px);
        }
        .category-card.active {
          border-color: var(--brand-red);
          box-shadow: 0 8px 24px rgba(247,55,79,0.3);
          transform: translateY(-2px);
        }
        .category-card.active .category-card-overlay {
          background: linear-gradient(180deg, rgba(247,55,79,0.15) 0%, rgba(247,55,79,0.75) 100%);
        }
        .category-sheet-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2600;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 24px 18px 0;
          background: rgba(17,17,18,0.22);
          animation: categorySheetBackdropIn 0.24s ease both;
        }
        .category-menu-sheet {
          width: min(1120px, 100%);
          max-height: min(82vh, 760px);
          background: var(--bg-card);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 24px 24px 0 0;
          box-shadow: 0 -24px 70px rgba(28,28,28,0.24);
          overflow: hidden;
          transform-origin: bottom center;
          animation: categorySheetSlideUp 0.34s var(--ease-premium) both;
        }
        [data-theme="dark"] .category-menu-sheet {
          background: var(--bg-card);
          border-color: var(--card-border);
          box-shadow: 0 -28px 78px rgba(0,0,0,0.42);
        }
        .category-sheet-handle {
          width: 48px;
          height: 5px;
          margin: 12px auto 8px;
          border-radius: 999px;
          background: rgba(117,117,117,0.28);
        }
        .category-sheet-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          padding: 4px 28px 18px;
          border-bottom: 1px solid var(--border-light);
        }
        .category-sheet-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 28px;
          padding: 0 11px;
          border-radius: 999px;
          color: var(--brand-red);
          background: rgba(247,55,79,0.08);
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .category-sheet-header h3 {
          margin: 9px 0 4px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 900;
          line-height: 1.05;
        }
        .category-sheet-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .category-sheet-close {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid var(--border-light);
          background: var(--bg-surface);
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.22s var(--ease-premium), background 0.22s var(--ease-premium), color 0.22s var(--ease-premium);
        }
        .category-sheet-close:hover,
        .category-sheet-close:focus-visible {
          transform: translateY(-1px);
          color: var(--brand-red);
          background: rgba(247,55,79,0.08);
          outline: none;
        }
        .category-menu-content {
          max-height: calc(min(82vh, 760px) - 126px);
          overflow-y: auto;
          padding: 22px 28px 30px;
        }
        .category-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
          gap: 18px;
        }
        .category-menu-item {
          min-height: 196px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 20px;
          border-radius: 8px;
          background: var(--bg-card);
          border: 1px solid var(--card-border);
          box-shadow: var(--shadow-md);
          opacity: 0;
          transform: translateY(16px);
          position: relative;
          overflow: visible;
          animation: categoryItemIn 0.34s var(--ease-premium) both;
        }
        [data-theme="dark"] .category-menu-item {
          background: var(--surface-card);
          border-color: var(--card-border);
          box-shadow: 0 14px 34px rgba(0,0,0,0.28);
        }
        .category-menu-item-copy {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .category-menu-item-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .category-menu-item-tags span {
          min-height: 28px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0;
        }
        .category-menu-item-tags .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          padding: 0;
          min-height: 0;
          border: none;
          background: currentColor;
        }
        .category-menu-item-tags .veg {
          color: #66d66d;
          background: rgba(96,178,70,0.14);
          border: 1px solid rgba(96,178,70,0.28);
        }
        .category-menu-item-tags .nonveg {
          color: #ff6975;
          background: rgba(226,55,68,0.13);
          border: 1px solid rgba(226,55,68,0.28);
        }
        .category-menu-item h4 {
          margin: 0 0 10px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          line-height: 1.18;
          overflow-wrap: anywhere;
        }
        .category-menu-price {
          display: flex;
          align-items: baseline;
          gap: 1px;
          margin-bottom: 14px;
          color: var(--brand-red);
          font-size: 1.55rem;
          font-weight: 900;
          line-height: 1;
        }
        .category-menu-price span {
          font-size: 1.12rem;
          font-weight: 900;
        }
        .category-menu-item p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.45;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .category-menu-source {
          margin-top: auto;
          padding-top: 14px;
          color: var(--text-primary);
          font-size: 0.92rem;
          font-weight: 900;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .category-menu-item-media {
          position: relative;
          flex: 0 0 130px;
          width: 130px;
          height: 130px;
          align-self: flex-start;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .category-menu-img-container {
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-surface);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }
        .category-menu-img-container img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s var(--ease-premium);
        }
        .category-menu-item:hover .category-menu-img-container img {
          transform: scale(1.08);
        }
        .category-dish-action {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .category-add-btn {
          min-width: 90px;
          min-height: 42px;
          padding: 0 22px;
          border-radius: 12px;
          border: 1.5px solid var(--success);
          background: var(--bg-card);
          color: var(--success);
          font-size: 0.9rem;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(96,178,70,0.18);
          transition: transform 0.22s var(--ease-premium), background 0.22s var(--ease-premium), color 0.22s var(--ease-premium), box-shadow 0.22s var(--ease-premium);
        }
        .category-add-btn:hover:not(:disabled),
        .category-add-btn:focus-visible:not(:disabled) {
          transform: scale(1.04);
          background: var(--success);
          color: #fff;
          box-shadow: 0 10px 24px rgba(96,178,70,0.28);
          outline: none;
        }
        .category-add-btn:disabled {
          border-color: var(--border-medium);
          color: var(--text-muted);
          background: var(--bg-surface);
          cursor: not-allowed;
          box-shadow: none;
        }
        .category-qty-stepper {
          width: 96px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          border-radius: 12px;
          border: 1.5px solid var(--success);
          background: var(--bg-card);
          box-shadow: 0 8px 18px rgba(96,178,70,0.16);
        }
        .category-qty-stepper button {
          width: 30px;
          height: 100%;
          border: none;
          background: transparent;
          color: var(--success);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .category-qty-stepper button:hover:not(:disabled),
        .category-qty-stepper button:focus-visible:not(:disabled) {
          background: rgba(96,178,70,0.08);
          outline: none;
        }
        .category-qty-stepper button:disabled {
          color: var(--text-muted);
          cursor: not-allowed;
        }
        .category-qty-stepper span {
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 900;
        }
        .category-menu-loading,
        .category-menu-empty {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: var(--text-secondary);
          text-align: center;
          border: 1.5px dashed var(--border-medium);
          border-radius: 18px;
          background: var(--bg-surface);
        }
        .category-menu-loading svg {
          color: var(--brand-red);
          animation: spin 0.9s linear infinite;
        }
        .category-menu-empty svg {
          color: var(--brand-red);
        }
        .category-menu-empty strong {
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 900;
        }
        .category-menu-empty span,
        .category-menu-loading span {
          max-width: 320px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .category-cart-toast {
          position: fixed;
          left: 50%;
          bottom: 22px;
          z-index: 3100;
          transform: translateX(-50%);
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          max-width: min(92vw, 460px);
          padding: 0 18px;
          border-radius: 999px;
          color: #fff;
          background: rgba(16,16,18,0.96);
          border: 1px solid rgba(247,55,79,0.28);
          box-shadow: 0 16px 34px rgba(0,0,0,0.28);
          font-weight: 800;
        }
        .category-cart-toast svg {
          color: var(--brand-red);
          flex: 0 0 auto;
        }
        .category-conflict-overlay {
          position: fixed;
          inset: 0;
          z-index: 3200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0.48);
          backdrop-filter: blur(8px);
        }
        .category-conflict-modal {
          width: min(92vw, 420px);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          box-shadow: 0 24px 60px rgba(0,0,0,0.28);
        }
        .category-conflict-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 16px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--brand-red);
          background: rgba(247,55,79,0.08);
        }
        .category-conflict-modal h3 {
          margin: 0 0 8px;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
        }
        .category-conflict-modal p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.55;
        }
        .category-conflict-actions {
          display: flex;
          gap: 12px;
          margin-top: 22px;
        }
        .category-conflict-actions button {
          flex: 1;
          min-height: 44px;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.22s var(--ease-premium), box-shadow 0.22s var(--ease-premium), border-color 0.22s var(--ease-premium);
        }
        .category-conflict-secondary {
          color: var(--text-primary);
          background: transparent;
          border: 1.5px solid var(--border-medium);
        }
        .category-conflict-primary {
          color: #fff;
          background: var(--brand-red);
          border: 1.5px solid var(--brand-red);
          box-shadow: 0 10px 22px rgba(247,55,79,0.22);
        }
        .category-conflict-actions button:hover,
        .category-conflict-actions button:focus-visible {
          transform: translateY(-1px);
          outline: none;
        }
        @keyframes categorySheetBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes categorySheetSlideUp {
          from { transform: translateY(100%); opacity: 0.82; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes categoryItemIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .category-sheet-backdrop,
          .category-menu-sheet,
          .category-menu-item {
            animation: none;
          }
          .category-menu-sheet,
          .category-menu-item {
            transform: none;
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .home-hero { padding: 40px 16px 32px; min-height: 70vh; }
          .hero-title { font-size: 2rem; }
          .hero-content { text-align: center; }
          .hero-subtitle { margin: 0 auto; }
          .hero-actions, .hero-chips { justify-content: center; }
          .stats-bar { flex-direction: column; gap: 16px; margin-top: -24px; padding: 20px; }
          .stat-item { justify-content: center; }
          .restaurant-showcase-section { margin-top: 28px; }
          .restaurant-section-title { align-items: flex-start; flex-direction: column; gap: 8px; }
          .restaurant-rail-shell { width: 100%; margin-bottom: 32px; }
          .restaurant-grid { gap: 16px; padding: 6px 52px 28px; scroll-padding-left: 52px; }
          .restaurant-rail-btn { width: 38px; height: 38px; box-shadow: 0 12px 24px rgba(28,28,28,0.16); }
          .restaurant-rail-btn.left { left: 8px; }
          .restaurant-rail-btn.right { right: 8px; }
          .rest-card,
          .rest-card-skeleton { flex-basis: min(78vw, 330px); }
          .rest-card-status-row { align-items: flex-start; flex-direction: column; }
          .rest-card-menu-cue { justify-content: flex-start; }
          .restaurant-load-card { flex-basis: min(70vw, 250px); min-height: 300px; }
          .control-bar { flex-direction: column; align-items: stretch; gap: 12px; }
          .search-container { max-width: 100%; }
          .sort-box { justify-content: space-between; }
          .sort-box select { flex: 1; max-width: 200px; }
          .category-rail-shell { width: 100%; margin-bottom: 24px; }
          .category-rail-shell .cuisine-filters { padding: 8px 50px 12px; scroll-padding-left: 50px; }
          .category-rail-btn { width: 38px; height: 38px; box-shadow: 0 12px 24px rgba(28,28,28,0.16); }
          .category-rail-btn.left { left: 8px; }
          .category-rail-btn.right { right: 8px; }
          .category-card { width: 118px; height: 118px; border-radius: 18px; }
          .category-sheet-backdrop { padding: 12px 0 0; }
          .category-menu-sheet { width: 100%; max-height: 86vh; border-radius: 22px 22px 0 0; }
          .category-sheet-header { padding: 4px 18px 16px; }
          .category-menu-content { max-height: calc(86vh - 122px); padding: 18px 16px 24px; }
          .category-menu-grid { grid-template-columns: 1fr; gap: 12px; }
          .category-menu-item { min-height: 178px; padding: 16px; gap: 12px; border-radius: 8px; }
          .category-menu-item h4 { font-size: 1.18rem; }
          .category-menu-price { font-size: 1.38rem; margin-bottom: 10px; }
          .category-menu-item p { font-size: 0.9rem; }
          .category-menu-source { font-size: 0.84rem; }
          .category-menu-item-media { flex-basis: 112px; width: 112px; height: 112px; }
          .category-add-btn { min-width: 82px; min-height: 38px; padding: 0 18px; }
          .vibe-section { padding: 18px 14px; margin-top: 28px; border-radius: 20px; }
          .vibe-header { flex-direction: column; align-items: stretch; gap: 12px; }
          .vibe-controls { justify-content: space-between; }
          .vibe-carousel-wrapper::before,
          .vibe-carousel-wrapper::after { width: 24px; }
          .vibe-card { flex-basis: min(84vw, 330px); width: min(84vw, 330px); min-height: 344px; padding: 20px 18px; }
          .vibe-craving-pill { min-height: 40px; max-width: 170px; padding: 0 13px; font-size: 0.8rem; }
          .vibe-plate-stage { width: 188px; height: 188px; top: 43%; transform: translate(-33%, -48%); }
          .vibe-copy { min-height: 126px; max-width: 224px; }
          .vibe-subtitle { font-size: 1.2rem; }
          .vibe-card-stats { gap: 6px; flex-wrap: wrap; }
          .vibe-card-stats span { min-height: 32px; padding: 0 10px; font-size: 0.78rem; }
        }
        @media (max-width: 460px) {
          .category-sheet-header { gap: 12px; }
          .category-sheet-close { width: 38px; height: 38px; }
          .category-menu-item { min-height: 168px; padding: 14px; gap: 10px; }
          .category-menu-item-tags span { min-height: 24px; padding: 0 8px; font-size: 0.68rem; }
          .category-menu-item-media { flex-basis: 96px; width: 96px; height: 96px; }
          .category-menu-img-container { border-radius: 14px; }
          .category-add-btn { min-width: 74px; min-height: 34px; padding: 0 14px; font-size: 0.78rem; }
          .category-qty-stepper { width: 82px; height: 34px; }
        }
      `}</style>

      <div>
        {sortedSections.map(section => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
      </div>
      <CategoryMenuSheet
        categorySheet={categorySheet}
        categoryMenuItems={categoryMenuItems}
        categoryMenuLoading={categoryMenuLoading}
        categoryMenuError={categoryMenuError}
        fallbackImage={CATEGORY_DISH_FALLBACK_IMAGE}
        closeCategoryMenu={closeCategoryMenu}
        getCategoryCartQuantity={getCategoryCartQuantity}
        handleCategoryAddClick={handleCategoryAddClick}
        handleCategoryUpdateQuantity={handleCategoryUpdateQuantity}
      />
      <CategoryCartOverlays
        cartError={cartError}
        conflictPopup={conflictPopup}
        setConflictPopup={setConflictPopup}
        clearAndAdd={clearAndAdd}
      />
    </>
  );
};

// Individual restaurant card with IntersectionObserver reveal
function RestaurantCard({ restaurant: r, index, customerCoords }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const priceLabel = formatRestaurantPrice(r);
  const distanceLabel = getRestaurantDistanceLabel(r, customerCoords);

  const ratingText = formatRating(r.rating);
  const ratingVal = parseFloat(ratingText);
  const ratingClass = isNaN(ratingVal) ? 'excellent' : ratingVal >= 4.0 ? 'excellent' : ratingVal >= 3.0 ? 'good' : 'average';

  // Determine if this is a "popular" pick based on rating
  const isPopular = ratingText === 'New' || ratingVal >= 4.3;

  return (
    <Link
      ref={ref}
      to={`/menu?restaurantId=${r.restaurantId}&restaurantName=${encodeURIComponent(r.restaurantName)}`}
      className={`rest-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: visible ? `${index * 0.05}s` : '0s' }}
    >
      <div className="rest-card-img-wrap">
        <img
          src={r.imagePath || RESTAURANT_FALLBACK_IMAGE}
          alt={`${r.restaurantName || 'Restaurant'} dishes`}
          className="rest-card-img"
          loading="lazy"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = RESTAURANT_FALLBACK_IMAGE; }}
          style={{ filter: r.isOpen === false ? 'grayscale(100%)' : 'none' }}
        />
        <div className="rest-card-img-overlay" />
        {r.isOpen === false && (
          <div className="closed-overlay">
            Closed
          </div>
        )}
        {isPopular && (
          <div className="rest-card-offer">
            <Flame size={12} fill="#fff" style={{ marginRight: '4px' }} /> POPULAR
          </div>
        )}
        <div className={`rest-card-rating ${ratingClass}`}>
          <Star size={12} fill="#fff" color="#fff" />
          <span>{ratingText}</span>
        </div>
        <div className="rest-card-overlay-info">
          <h3 className="rest-card-name">{r.restaurantName}</h3>
          <div className="rest-card-cuisine">{r.cusineType}</div>
        </div>
      </div>
      <div className="rest-card-details" style={{ opacity: r.isOpen === false ? 0.6 : 1 }}>
        <div className="rest-card-meta-row">
          <span className="rest-card-meta-pill">
            <Clock size={12} />
            <span>{formatDeliveryTime(r.deliveryTime)}</span>
          </span>
          {priceLabel && <span className="rest-card-meta-pill rest-card-price">{priceLabel}</span>}
          {distanceLabel && (
            <span className="rest-card-meta-pill rest-card-distance">
              <MapPin size={11} />
              {distanceLabel}
            </span>
          )}
        </div>
        <div className="rest-card-status-row">
          <span className={`rest-card-status ${r.isOpen !== false ? 'open' : 'closed'}`}>
            <span className="rest-card-status-dot"></span>
            {r.isOpen !== false ? 'Open Now' : 'Closed'}
          </span>
          <span className="rest-card-menu-cue">
            View menu <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Home;
