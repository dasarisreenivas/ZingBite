import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Flame, Search, ShieldCheck, Star, Truck, UtensilsCrossed, Zap } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2200&auto=format&fit=crop';
const RESTAURANT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';

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

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const heroRef = useRef(null);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('/api/home');
      setRestaurants(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('We could not load restaurants right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const retryRestaurants = () => {
    fetchRestaurants();
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadInitialRestaurants = async () => {
      try {
        const response = await axios.get('/api/home');
        if (!isMounted) return;
        setRestaurants(Array.isArray(response.data) ? response.data : []);
        setError('');
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('We could not load restaurants right now. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadInitialRestaurants();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredAndSortedRestaurants = restaurants
    .filter(r => {
      const name = r.restaurantName ? r.restaurantName.toLowerCase() : '';
      const cuisine = r.cusineType ? r.cusineType.toLowerCase() : '';
      
      const matchesSearch = name.includes(debouncedSearchQuery.toLowerCase()) || 
                            cuisine.includes(debouncedSearchQuery.toLowerCase());
                            
      const matchesCuisine = selectedCuisine === 'All' || 
                             cuisine.includes(selectedCuisine.toLowerCase());
                             
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }
      if (sortBy === 'time') {
        return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime);
      }
      return 0; // default
    });

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
          background: linear-gradient(180deg, rgba(0,0,0,0) 65%, rgba(255,255,255,0.96) 100%);
          pointer-events: none;
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
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-lg);
          background: #fff;
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
          background: #fff;
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
        .search-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 16px;
          border-radius: 30px;
          width: 100%;
          max-width: 400px;
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
          border: 1px solid var(--border-medium);
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
          background: #fff;
          border: 1px solid var(--border-medium);
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
          .search-box {
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
          <h2>Restaurants near you</h2>
          {!loading && !error && <span className="section-count">{filteredAndSortedRestaurants.length} restaurants</span>}
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
            filteredAndSortedRestaurants.map((r) => (
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
      </div>
    </>
  );
};

export default Home;
