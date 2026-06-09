import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Flame, Search, ShieldCheck, Star, Truck, UtensilsCrossed, Zap } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop';
const RESTAURANT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';
const RESTAURANT_PAGE_SIZE = 8;

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

// Simple client-side cache for Stale-While-Revalidate
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
  const heroRef = useRef(null);
  const lastLoggedSearchQueryRef = useRef('');

  const fetchRestaurants = async () => {
    const cacheKey = JSON.stringify({ q: debouncedSearchQuery.trim(), lat: coords?.lat, lng: coords?.lng });
    const hasCache = homeCache.restaurants !== null && homeCache.key === cacheKey;
    const isStale = hasCache && (Date.now() - homeCache.timestamp > 15000); // 15 seconds TTL

    if (hasCache) {
      setRestaurants(homeCache.restaurants);
      setSuggestion(homeCache.suggestion);
      setResultCount(homeCache.resultCount);
      setIsSearch(homeCache.isSearch);
      setLoading(false);
      setError('');
      if (!isStale) {
        // Cache is fresh, skip background revalidation
        return;
      }
    } else {
      setLoading(true);
      setError('');
    }

    try {
      const params = new URLSearchParams();
      if (debouncedSearchQuery.trim()) {
        params.append('q', debouncedSearchQuery.trim());
      }
      if (coords) {
        params.append('lat', coords.lat);
        params.append('lng', coords.lng);
      }
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

      // Update cache
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
      if (!hasCache) {
        setError('We could not load restaurants right now. Please try again.');
      }
    } finally {
      if (!hasCache) {
        setLoading(false);
      }
    }
  };

  const retryRestaurants = () => {
    fetchRestaurants();
  };

  // Get user geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation permission denied or failed, falling back.", error);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
      );
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [debouncedSearchQuery, coords]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);
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
    setVisibleRestaurantCount(RESTAURANT_PAGE_SIZE);
  }, [debouncedSearchQuery, selectedCuisine, sortBy, coords]);

  const filteredAndSortedRestaurants = restaurants
    .filter(r => {
      const cuisine = r.cusineType ? r.cusineType.toLowerCase() : '';
      const matchesCuisine = selectedCuisine === 'All' || 
                             cuisine.includes(selectedCuisine.toLowerCase());
      return matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }
      if (sortBy === 'time') {
        return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime);
      }
      return 0; // default (server relevance / DB order)
    });
  const visibleRestaurants = filteredAndSortedRestaurants.slice(0, visibleRestaurantCount);
  const hasMoreRestaurants = visibleRestaurantCount < filteredAndSortedRestaurants.length;
  const remainingRestaurants = filteredAndSortedRestaurants.length - visibleRestaurantCount;
  return (
    <>
      <style>{`
        .home-hero {
          position: relative;
          min-height: min(72vh, 640px);
          padding: 72px 20px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-image:
            linear-gradient(90deg, rgba(16, 16, 16, 0.82) 0%, rgba(16, 16, 16, 0.56) 48%, rgba(16, 16, 16, 0.22) 100%),
            url('${HERO_IMAGE}');
          background-size: cover;
          background-position: center;
          color: #fff;
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 64%, rgba(247,55,79,0.1) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-content {
          max-width: 680px;
          width: min(92%, 1400px);
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: left;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 16px;
          animation: fadeIn 0.6s ease-out both;
        }
        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: 0;
          line-height: 1.1;
          margin-bottom: 16px;
          color: #fff;
          animation: fadeIn 0.6s ease-out 0.1s both;
        }
        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.6;
          max-width: 560px;
          margin: 0;
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
          animation: fadeIn 0.6s ease-out 0.3s both;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 800;
          text-decoration: none;
          transition: transform var(--transition-fast), background var(--transition-fast), color var(--transition-fast);
        }
        .hero-btn.primary {
          background: var(--brand-red);
          color: #fff;
          box-shadow: 0 12px 28px rgba(247, 55, 79, 0.32);
        }
        .hero-btn.secondary {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.28);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
          color: #fff;
        }
        .hero-chips {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 24px;
          animation: fadeIn 0.6s ease-out 0.4s both;
        }
        .hero-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #fff;
          transition: all 0.3s ease;
          cursor: default;
        }
        .hero-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
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
        .section-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-light);
          animation: fadeIn 0.5s ease-out both;
        }
        .section-title-row h2 {
          font-size: 1.45rem;
          color: var(--text-primary);
        }
        .section-count {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
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
          transition: all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .rest-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(28, 28, 28, 0.12);
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
          transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .rest-card:hover .rest-card-img {
          transform: scale(1.06);
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
          font-size: 0.85rem;
          display: flex;
          align-items: center;
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
          transition: all 0.3s;
        }
        .search-box:focus-within {
          border-color: var(--brand-red);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(247, 55, 79, 0.08);
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
          animation: fadeIn 0.3s ease-out;
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
          padding: 8px 16px;
          border-radius: 30px;
          border: 1px solid rgba(247,55,79,0.12);
          background: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
        }
        .cuisine-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 1400px;
          width: 92%;
          margin: 0 auto 20px;
          overflow-x: auto;
          padding: 4px 0;
        }
        .cuisine-chip {
          padding: 8px 18px;
          background: rgba(255,255,255,0.94);
          border: 1px solid rgba(247,55,79,0.12);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cuisine-chip:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }
        .cuisine-chip.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: #fff;
        }
        @media (max-width: 768px) {
          .home-hero { padding: 32px 16px 24px; }
          .hero-title { font-size: 2rem; }
          .hero-content { text-align: center; }
          .hero-subtitle { margin: 0 auto; }
          .hero-actions, .hero-chips { justify-content: center; }
          .restaurant-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 32px; }
          .control-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .search-container {
            max-width: 100%;
          }
          .sort-box {
            justify-content: space-between;
          }
          .sort-box select {
            flex: 1;
            max-width: 200px;
          }
          .cuisine-filters {
            justify-content: flex-start;
            padding-bottom: 8px;
          }
        }
      `}</style>

      <div>
        <section className="home-hero" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-tag"><Flame size={16} /> Fresh meals, fast routes</div>
            <h2 className="hero-title">Food that reaches you hot, fast, and right on time.</h2>
            <p className="hero-subtitle">Explore trusted local restaurants, order in a few taps, and track every step from kitchen prep to doorstep delivery.</p>
            <div className="hero-actions">
              <a href="#restaurants" className="hero-btn primary">
                Explore restaurants <ArrowRight size={17} />
              </a>
              <Link to="/track-order" className="hero-btn secondary">
                Track an order
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
        <div className="control-bar">
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
                <button 
                  type="button" 
                  className="suggestion-btn"
                  onClick={() => setSearchQuery(suggestion)}
                >
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

        <div className="cuisine-filters">
          {['All', 'Biryani', 'Burger', 'Pizza', 'Chinese', 'Indian', 'Desserts'].map(c => (
            <button 
              key={c} 
              className={`cuisine-chip ${selectedCuisine === c ? 'active' : ''}`}
              onClick={() => setSelectedCuisine(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div id="restaurants" className="section-title-row">
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

        <section className="restaurant-grid stagger-children">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: '300px', borderRadius: 'var(--radius-lg)' }} className="skeleton"></div>
            ))
          ) : error ? (
            <div className="home-status-card">
              <strong>Restaurants are taking a little longer to load.</strong>
              <span>{error}</span>
              <br />
              <button type="button" className="retry-btn" onClick={retryRestaurants}>Retry</button>
            </div>
          ) : filteredAndSortedRestaurants.length > 0 ? (
            visibleRestaurants.map((r) => (
              <Link
                to={`/menu?restaurantId=${r.restaurantId}&restaurantName=${encodeURIComponent(r.restaurantName)}`}
                key={r.restaurantId}
                className="rest-card"
              >
                <div className="rest-card-img-wrap">
                  <img
                    src={r.imagePath || RESTAURANT_FALLBACK_IMAGE}
                    alt={`${r.restaurantName || 'Restaurant'} dishes`}
                    className="rest-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = RESTAURANT_FALLBACK_IMAGE;
                    }}
                  />
                  <div className="rest-card-img-overlay" />
                  <div className="rest-card-offer">Free Delivery</div>
                  <div className="rest-card-rating">
                    <span className="star"><Star size={14} fill="#FFB800" color="#FFB800" /></span> {formatRating(r.rating)}
                  </div>
                </div>
                <div className="rest-card-details">
                  <h3 className="rest-card-name">{r.restaurantName}</h3>
                  <div className="rest-card-meta">
                    <span>{r.cusineType}</span>
                    <span className="dot" />
                    <span>{formatDeliveryTime(r.deliveryTime)}</span>
                  </div>
                </div>
              </Link>
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
              onClick={() => setVisibleRestaurantCount(count => count + RESTAURANT_PAGE_SIZE)}
            >
              Load more restaurants ({remainingRestaurants} left) <ArrowRight className="load-more-icon" size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
