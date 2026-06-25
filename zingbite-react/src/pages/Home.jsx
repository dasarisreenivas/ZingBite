import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowRight, Flame, Search, ShieldCheck, Star, Truck, UtensilsCrossed, Zap,
  MapPin, Clock, Award, Users, Dumbbell, Code2, Film, Sparkles, Smartphone, AlertTriangle
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { getPromoBackground, getRestaurantPageSize } from '../utils/homeConfig';
import ScrollReveal from '../components/ScrollReveal';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop';
const RESTAURANT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';
const RESTAURANT_PAGE_SIZE = 8;

const CATEGORIES = [
  { name: 'All', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop' },
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop' },
  { name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop' },
  { name: 'Chinese', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Indian', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop' }
];

const getDeliveryMinutes = (value) => {
  const match = String(value ?? '').match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
};

const formatDeliveryTime = (value) => {
  const text = String(value ?? '').trim();
  if (!text) return '30-40 min';
  return /\b(min|mins|minutes)\b/i.test(text) ? text : `${text} min`;
};

const formatRating = (value) => {
  const rating = Number(value);
  return Number.isFinite(rating) && rating > 0 ? rating.toFixed(1) : 'New';
};

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

let homeCache = {
  restaurants: null,
  suggestion: null,
  resultCount: 0,
  isSearch: false,
  timestamp: 0,
  key: ''
};

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [visibleRestaurantCount, setVisibleRestaurantCount] = useState(RESTAURANT_PAGE_SIZE);
  const [suggestion, setSuggestion] = useState(null);
  const [resultCount, setResultCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [coords, setCoords] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const heroRef = useRef(null);
  const lastLoggedSearchQueryRef = useRef('');

  const [sduiConfig, setSduiConfig] = useState(null);
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

  const fetchRestaurants = async () => {
    const cacheKey = JSON.stringify({ q: debouncedSearchQuery.trim(), lat: coords?.lat, lng: coords?.lng });
    const hasCache = homeCache.restaurants !== null && homeCache.key === cacheKey;
    const isStale = hasCache && (Date.now() - homeCache.timestamp > 15000);

    if (hasCache) {
      setRestaurants(homeCache.restaurants);
      setSuggestion(homeCache.suggestion);
      setResultCount(homeCache.resultCount);
      setIsSearch(homeCache.isSearch);
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

      let resData, sugData, countData, searchData;
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        resData = response.data.restaurants || [];
        sugData = response.data.suggestion || null;
        countData = response.data.resultCount || 0;
        searchData = response.data.isSearch || false;
      } else {
        resData = Array.isArray(response.data) ? response.data : [];
        sugData = null;
        countData = response.data ? response.data.length : 0;
        searchData = false;
      }

      setRestaurants(resData);
      setSuggestion(sugData);
      setResultCount(countData);
      setIsSearch(searchData);

      homeCache = {
        restaurants: resData,
        suggestion: sugData,
        resultCount: countData,
        isSearch: searchData,
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
  };

  const retryRestaurants = () => fetchRestaurants();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.warn("Geolocation permission denied or failed, falling back.", error),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  useEffect(() => { fetchRestaurants(); }, [debouncedSearchQuery, coords]);

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

  const restaurantPageSize = useMemo(
    () => getRestaurantPageSize(sduiConfig || DEFAULT_SDUI_CONFIG, RESTAURANT_PAGE_SIZE),
    [sduiConfig]
  );

  useEffect(() => {
    setVisibleRestaurantCount(restaurantPageSize);
  }, [debouncedSearchQuery, selectedCuisine, sortBy, coords, restaurantPageSize]);

  const filteredAndSortedRestaurants = restaurants
    .filter(r => {
      const cuisine = r.cusineType ? r.cusineType.toLowerCase() : '';
      const matchesCuisine = selectedCuisine === 'All' || cuisine.includes(selectedCuisine.toLowerCase());
      return matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === 'time') return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime);
      return 0;
    });
  const visibleRestaurants = filteredAndSortedRestaurants.slice(0, visibleRestaurantCount);
  const hasMoreRestaurants = visibleRestaurantCount < filteredAndSortedRestaurants.length;
  const remainingRestaurants = filteredAndSortedRestaurants.length - visibleRestaurantCount;

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
        <div className="cuisine-filters page-enter" style={{ animationDelay: '0.1s', marginBottom: '24px' }}>
          {CATEGORIES.map((c, idx) => (
            <button
              key={c.name}
              type="button"
              className={`category-card ${selectedCuisine === c.name ? 'active' : ''}`}
              onClick={() => setSelectedCuisine(c.name)}
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
      </div>
    );
  };

  const renderFoodMoods = (props) => {
    const moods = props.moods || [];
    const getIconComponent = (name) => {
      switch (name) {
        case 'Dumbbell': return <Dumbbell size={18} />;
        case 'Code2': return <Code2 size={18} />;
        case 'Film': return <Film size={18} />;
        case 'Flame': return <Flame size={18} />;
        default: return <Sparkles size={18} />;
      }
    };

    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
          {props.title || "What's your vibe today?"}
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {moods.map((mood, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedCuisine(mood.cuisine);
                setSearchQuery('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid rgba(247,55,79,0.12)',
                background: selectedCuisine.toLowerCase() === mood.cuisine.toLowerCase() ? 'var(--brand-red)' : '#fff',
                color: selectedCuisine.toLowerCase() === mood.cuisine.toLowerCase() ? '#fff' : 'var(--text-primary)',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
              className="hover-scale"
            >
              {getIconComponent(mood.iconName)}
              {mood.tag}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTrendingCombos = (props) => {
    const maxCombos = props.maxCombos || 3;
    const mockCombos = [
      { id: 101, name: "Coding Fuel Bundle", items: ["Spicy Noodles", "Spring Rolls", "Thums Up"], price: 249, searchQuery: 'noodles' },
      { id: 102, name: "Fitness Booster Combo", items: ["Grilled Chicken Salad", "Protein Shake"], price: 349, searchQuery: 'salad' },
      { id: 103, name: "Weekend Movie Feast", items: ["Large Pepperoni Pizza", "Garlic Bread", "Coke"], price: 499, searchQuery: 'pizza' }
    ].slice(0, maxCombos);

    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            {props.title || "Popular AI Combos"}
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {props.subtitle || "Perfect food pairings calculated by our AI engine"}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {mockCombos.map(combo => (
            <div key={combo.id} style={{
              background: '#fff', border: '1px solid rgba(247,55,79,0.08)',
              borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }} className="hover-scale">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--text-primary)' }}>
                    {combo.name}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--brand-red)', fontWeight: 800, background: 'rgba(247,55,79,0.06)', padding: '2px 8px', borderRadius: '10px' }}>
                    AI Recommended
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '12px 0' }}>
                  {combo.items.map((it, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', background: 'var(--bg-light)', padding: '4px 10px', borderRadius: '12px', color: 'var(--text-secondary)' }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹{combo.price}</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCuisine('All');
                    setSearchQuery(combo.searchQuery);
                    document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
                    trackEvent('COMBO_SEARCH', { combo: combo.name, query: combo.searchQuery });
                  }}
                  style={{
                    background: 'var(--brand-red)', color: '#fff', border: 'none',
                    padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  className="hover-scale"
                >
                  Find Dishes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecentlyOpened = (props) => {
    const limit = props.limit || 4;
    const newRestaurants = restaurants
      .filter(r => formatRating(r.rating) === 'New' || r.restaurantId > 5)
      .slice(0, limit);

    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            {props.title || "Fresh on the Block"}
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {props.subtitle || "Discover newly onboarded dining spots in your neighborhood"}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {newRestaurants.map((r, idx) => (
            <RestaurantCard key={`new-${r.restaurantId}`} restaurant={r} index={idx} />
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturedRestaurants = (props) => {
    const minRating = props.minRating || 4.5;
    const featured = restaurants
      .filter(r => Number(r.rating) >= minRating)
      .slice(0, 4);

    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            {props.title || "Top Curated Picks"}
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {props.subtitle || "Highest-rated culinary spots in your area"}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {featured.map((r, idx) => (
            <RestaurantCard key={`feat-${r.restaurantId}`} restaurant={r} index={idx} />
          ))}
        </div>
      </div>
    );
  };

  const renderNeighborhoodTrends = (props) => {
    const trending = [...restaurants]
      .sort((a, b) => (b.totalOrders || 0) - (a.totalOrders || 0))
      .slice(0, 4);

    return (
      <div style={{ maxWidth: '1400px', width: '92%', margin: '32px auto 0' }}>
        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
          {props.title || "Trending Near You"}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {trending.map((r, idx) => (
            <div key={`trend-${r.restaurantId}`} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: '12px', left: '12px', zIndex: 4,
                background: 'rgba(26,26,26,0.95)', color: '#fff', fontSize: '0.75rem',
                fontWeight: 800, padding: '4px 10px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                <Flame size={12} fill="var(--brand-red)" color="var(--brand-red)" /> POPULAR
              </div>
              <RestaurantCard restaurant={r} index={idx} />
            </div>
          ))}
        </div>
      </div>
    );
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

        <section className="restaurant-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} className="skeleton-premium" />
            ))
          ) : error ? (
            <div className="home-status-card">
              <strong>Restaurants are taking a little longer to load.</strong>
              <span>{error}</span>
              <br />
              <button type="button" className="retry-btn" onClick={retryRestaurants}>Retry</button>
            </div>
          ) : filteredAndSortedRestaurants.length > 0 ? (
            visibleRestaurants.map((r, idx) => (
              <RestaurantCard key={r.restaurantId} restaurant={r} index={idx} />
            ))
          ) : (
            <div className="home-status-card">
              <strong>No restaurants found</strong>
              <span>Try a different search term, cuisine, or sort option.</span>
            </div>
          )}
        </section>

        {hasMoreRestaurants && (
          <div className="load-more-wrap">
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setVisibleRestaurantCount(count => count + restaurantPageSize)}
            >
              Load more restaurants ({remainingRestaurants} left) <ArrowRight className="load-more-icon" size={16} />
            </button>
          </div>
        )}
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

        /* ===== RESTAURANT GRID ===== */
        .restaurant-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 48px;
        }
        .rest-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(247,55,79,0.08);
          text-decoration: none;
          color: inherit;
          transition: all 0.4s var(--ease-premium);
          position: relative;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(20px);
        }
        .rest-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .rest-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 48px rgba(28,28,28,0.12);
          border-color: rgba(247,55,79,0.2);
        }
        .rest-card-img-wrap {
          position: relative;
          width: 100%;
          padding-top: 60%;
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .rest-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-premium);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.08);
        }
        .rest-card-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }
        .rest-card-offer {
          position: absolute;
          bottom: 10px;
          left: 12px;
          z-index: 2;
          background: linear-gradient(135deg, #171a29 0%, #2d3143 100%);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 6px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .rest-card-rating {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          padding: 4px 8px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 3px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .rest-card-rating .star {
          color: #FFB800;
        }
        .rest-card-details {
          padding: 12px 4px 8px;
        }
        .rest-card-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }
        .rest-card-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 0.85rem;
        }
        .rest-card-meta .dot {
          width: 3px;
          height: 3px;
          background: var(--text-muted);
          border-radius: 50%;
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
        .cuisine-filters::-webkit-scrollbar {
          display: none; /* Hide scrollbar Chrome/Safari */
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

        @media (max-width: 768px) {
          .home-hero { padding: 40px 16px 32px; min-height: 70vh; }
          .hero-title { font-size: 2rem; }
          .hero-content { text-align: center; }
          .hero-subtitle { margin: 0 auto; }
          .hero-actions, .hero-chips { justify-content: center; }
          .stats-bar { flex-direction: column; gap: 16px; margin-top: -24px; padding: 20px; }
          .stat-item { justify-content: center; }
          .restaurant-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .control-bar { flex-direction: column; align-items: stretch; gap: 12px; }
          .search-container { max-width: 100%; }
          .sort-box { justify-content: space-between; }
          .sort-box select { flex: 1; max-width: 200px; }
          .cuisine-filters { justify-content: flex-start; padding-bottom: 8px; }
        }
      `}</style>

      <div>
        {sortedSections.map(section => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
      </div>
    </>
  );
};

// Individual restaurant card with IntersectionObserver reveal
function RestaurantCard({ restaurant: r, index }) {
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
          <div className="closed-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Closed
          </div>
        )}
        <div className="rest-card-offer">Free Delivery</div>
        <div className="rest-card-rating">
          <span className="star"><Star size={14} fill="#FFB800" color="#FFB800" /></span> {formatRating(r.rating)}
        </div>
      </div>
      <div className="rest-card-details" style={{ opacity: r.isOpen === false ? 0.6 : 1 }}>
        <h3 className="rest-card-name">{r.restaurantName}</h3>
        <div className="rest-card-meta">
          <span>{r.cusineType}</span>
          <span className="dot" />
          <span>{formatDeliveryTime(r.deliveryTime)}</span>
        </div>
      </div>
    </Link>
  );
}

export default Home;
