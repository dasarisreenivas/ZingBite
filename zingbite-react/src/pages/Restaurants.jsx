import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flame,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  UtensilsCrossed
} from 'lucide-react';
import {
  formatDeliveryTime,
  formatRating,
  formatRestaurantPrice,
  getDeliveryMinutes,
  getHomeCustomerCoordinates,
  getRestaurantDistanceLabel
} from '../utils/restaurantMeta';

const RESTAURANT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop';

const CUISINES = [
  'All',
  'Biryani',
  'Burger',
  'Pizza',
  'Chinese',
  'Indian',
  'Desserts',
  'Healthy',
  'Pasta',
  'Sandwich',
  'Sushi',
  'Cafe',
  'Breakfast',
  'Mexican',
  'Thai'
];

const normalizeRestaurants = (payload) => {
  if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
    return {
      restaurants: payload.restaurants || [],
      suggestion: payload.suggestion || null
    };
  }
  return {
    restaurants: Array.isArray(payload) ? payload : [],
    suggestion: null
  };
};

function RestaurantBrowseCard({ restaurant, index, customerCoords }) {
  const ratingText = formatRating(restaurant.rating);
  const ratingVal = parseFloat(ratingText);
  const ratingClass = Number.isNaN(ratingVal) ? 'excellent' : ratingVal >= 4 ? 'excellent' : ratingVal >= 3 ? 'good' : 'average';
  const isPopular = ratingText === 'New' || ratingVal >= 4.3;
  const priceLabel = formatRestaurantPrice(restaurant);
  const distanceLabel = getRestaurantDistanceLabel(restaurant, customerCoords);

  return (
    <Link
      to={`/menu?restaurantId=${restaurant.restaurantId}&restaurantName=${encodeURIComponent(restaurant.restaurantName || 'Restaurant')}`}
      className="restaurants-card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.04}s` }}
    >
      <div className="restaurants-card-media">
        <img
          src={restaurant.imagePath || RESTAURANT_FALLBACK_IMAGE}
          alt={`${restaurant.restaurantName || 'Restaurant'} dishes`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = RESTAURANT_FALLBACK_IMAGE;
          }}
          style={{ filter: restaurant.isOpen === false ? 'grayscale(100%)' : 'none' }}
        />
        <span className="restaurants-card-gradient" />
        {isPopular && (
          <span className="restaurants-popular">
            <Flame size={12} fill="currentColor" /> Popular
          </span>
        )}
        <span className={`restaurants-rating ${ratingClass}`}>
          <Star size={12} fill="currentColor" /> {ratingText}
        </span>
        <div className="restaurants-card-title">
          <h3>{restaurant.restaurantName || 'Restaurant'}</h3>
          <span>{restaurant.cusineType || 'Fresh food'}</span>
        </div>
      </div>
      <div className="restaurants-card-body">
        <div className="restaurants-meta-row">
          <span><Clock size={13} /> {formatDeliveryTime(restaurant.deliveryTime)}</span>
          {priceLabel && <span>{priceLabel}</span>}
          {distanceLabel && <span><MapPin size={12} /> {distanceLabel}</span>}
        </div>
        <div className="restaurants-card-footer">
          <span className={`restaurants-open ${restaurant.isOpen !== false ? 'open' : 'closed'}`}>
            <span /> {restaurant.isOpen !== false ? 'Open now' : 'Closed'}
          </span>
          <strong>
            View menu <ArrowRight size={14} />
          </strong>
        </div>
      </div>
    </Link>
  );
}

export default function Restaurants() {
  const [searchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [coords, setCoords] = useState(null);
  const [homeCustomerCoords, setHomeCustomerCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return undefined;
    navigator.geolocation.getCurrentPosition(
      (position) => setCoords({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => undefined,
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
    return undefined;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearchQuery(searchQuery), 350);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (debouncedSearchQuery.trim()) params.append('q', debouncedSearchQuery.trim());
      if (coords) {
        params.append('lat', coords.lat);
        params.append('lng', coords.lng);
      }
      const queryString = params.toString();
      const response = await axios.get(queryString ? `/api/home?${queryString}` : '/api/home');
      const normalized = normalizeRestaurants(response.data);
      setRestaurants(normalized.restaurants);
      setSuggestion(normalized.suggestion);
      setHomeCustomerCoords(getHomeCustomerCoordinates(response.data, coords));
    } catch (fetchError) {
      console.error(fetchError);
      setError('We could not load restaurants right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [coords, debouncedSearchQuery]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants = useMemo(() => {
    const query = debouncedSearchQuery.trim().toLowerCase();
    return restaurants
      .filter((restaurant) => {
        const cuisine = (restaurant.cusineType || '').toLowerCase();
        const name = (restaurant.restaurantName || '').toLowerCase();
        const matchesCuisine = selectedCuisine === 'All' || cuisine.includes(selectedCuisine.toLowerCase());
        const matchesQuery = !query || cuisine.includes(query) || name.includes(query);
        return matchesCuisine && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
        if (sortBy === 'time') return getDeliveryMinutes(a.deliveryTime) - getDeliveryMinutes(b.deliveryTime);
        return 0;
      });
  }, [restaurants, selectedCuisine, sortBy, debouncedSearchQuery]);

  return (
    <div className="restaurants-page">
      <style>{`
        .restaurants-page {
          width: min(92%, 1400px);
          margin: 0 auto;
          padding: 42px 0 72px;
        }
        .restaurants-hero {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid rgba(247,55,79,0.12);
          background:
            radial-gradient(circle at 78% 18%, rgba(23,168,107,0.14), transparent 26%),
            linear-gradient(135deg, rgba(255,255,255,0.98), rgba(247,55,79,0.06));
          box-shadow: 0 20px 55px rgba(28,28,28,0.08);
        }
        [data-theme="dark"] .restaurants-hero {
          background:
            radial-gradient(circle at 78% 18%, rgba(23,168,107,0.18), transparent 28%),
            linear-gradient(135deg, rgba(30,30,35,0.98), rgba(247,55,79,0.12));
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .restaurants-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--brand-red);
          font-weight: 900;
          font-size: 0.86rem;
          text-decoration: none;
          margin-bottom: 16px;
        }
        .restaurants-hero h1 {
          margin: 0;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 1.05;
          color: var(--text-primary);
        }
        .restaurants-hero p {
          max-width: 660px;
          margin: 12px 0 0;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .restaurants-toolbar {
          display: grid;
          grid-template-columns: minmax(260px, 1fr) auto;
          gap: 14px;
          align-items: center;
          margin-top: 24px;
        }
        .restaurants-search {
          min-height: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 999px;
          border: 1px solid rgba(247,55,79,0.12);
          background: var(--surface-card);
          padding: 0 16px;
          box-shadow: 0 10px 26px rgba(28,28,28,0.05);
        }
        .restaurants-search svg {
          color: var(--brand-red);
          flex: 0 0 auto;
        }
        .restaurants-search input {
          min-width: 0;
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
        }
        .restaurants-sort {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 0 14px;
          border-radius: 999px;
          background: var(--surface-card);
          border: 1px solid rgba(247,55,79,0.12);
          color: var(--text-secondary);
          font-weight: 800;
        }
        .restaurants-sort select {
          border: none;
          outline: none;
          background: transparent;
          color: var(--text-primary);
          font-family: inherit;
          font-weight: 800;
          cursor: pointer;
        }
        .restaurants-suggestion {
          margin-top: 10px;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .restaurants-suggestion button {
          border: none;
          background: none;
          color: var(--brand-red);
          font: inherit;
          font-weight: 900;
          cursor: pointer;
          padding: 0;
        }
        .restaurants-cuisines {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin: 20px 0 0;
        }
        .restaurants-cuisines button {
          min-height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(247,55,79,0.12);
          background: var(--surface-card);
          color: var(--text-secondary);
          padding: 0 14px;
          font-family: inherit;
          font-weight: 900;
          cursor: pointer;
          transition: background 0.25s var(--ease-premium), color 0.25s var(--ease-premium), transform 0.25s var(--ease-premium);
        }
        .restaurants-cuisines button.active,
        .restaurants-cuisines button:hover {
          background: var(--brand-red);
          color: #fff;
          transform: translateY(-1px);
        }
        .restaurants-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin: 30px 0 16px;
        }
        .restaurants-summary h2 {
          margin: 0;
          font-family: 'Outfit', sans-serif;
          color: var(--text-primary);
        }
        .restaurants-summary span {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 700;
        }
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 20px;
        }
        .restaurants-card {
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94));
          border: 1px solid var(--card-border);
          color: inherit;
          text-decoration: none;
          box-shadow: 0 14px 34px rgba(28,28,28,0.08);
          animation: restaurantsFadeUp 0.46s var(--ease-premium) both;
          transition: transform 0.35s var(--ease-premium), box-shadow 0.35s var(--ease-premium), border-color 0.35s var(--ease-premium);
        }
        [data-theme="dark"] .restaurants-card {
          background: linear-gradient(180deg, rgba(30,30,35,0.98), rgba(24,24,28,0.94));
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 18px 42px rgba(0,0,0,0.28);
        }
        .restaurants-card:hover {
          transform: translateY(-7px);
          border-color: rgba(247,55,79,0.25);
          box-shadow: 0 18px 40px rgba(247,55,79,0.1), 0 28px 56px rgba(0,0,0,0.12);
        }
        .restaurants-card-media {
          position: relative;
          aspect-ratio: 1.54;
          overflow: hidden;
        }
        .restaurants-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s var(--ease-premium);
        }
        .restaurants-card:hover img {
          transform: scale(1.08);
        }
        .restaurants-card-gradient {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4) 58%, transparent),
            linear-gradient(135deg, rgba(247,55,79,0.22), transparent 38%);
        }
        .restaurants-popular,
        .restaurants-rating {
          position: absolute;
          top: 12px;
          z-index: 2;
          min-height: 27px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 999px;
          color: #fff;
          padding: 0 10px;
          font-size: 0.74rem;
          font-weight: 900;
          backdrop-filter: blur(8px);
        }
        .restaurants-popular {
          left: 12px;
          background: rgba(247,55,79,0.92);
        }
        .restaurants-rating {
          right: 12px;
        }
        .restaurants-rating.excellent { background: rgba(46,125,50,0.88); }
        .restaurants-rating.good { background: rgba(239,108,0,0.88); }
        .restaurants-rating.average { background: rgba(198,40,40,0.88); }
        .restaurants-card-title {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          color: #fff;
        }
        .restaurants-card-title h3 {
          margin: 0;
          font-family: 'Outfit', sans-serif;
          font-size: 1.18rem;
          line-height: 1.12;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .restaurants-card-title span {
          display: block;
          margin-top: 3px;
          color: rgba(255,255,255,0.82);
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .restaurants-card-body {
          padding: 14px 16px 16px;
        }
        .restaurants-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }
        .restaurants-meta-row span {
          min-height: 30px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 999px;
          padding: 0 10px;
          background: rgba(247,55,79,0.06);
          border: 1px solid rgba(247,55,79,0.08);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 800;
          white-space: nowrap;
        }
        .restaurants-meta-row svg {
          color: var(--brand-red);
        }
        .restaurants-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: 11px;
          padding-top: 10px;
          border-top: 1px solid var(--border-light);
        }
        .restaurants-open {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 999px;
          padding: 3px 9px;
          font-size: 0.72rem;
          font-weight: 900;
          text-transform: uppercase;
        }
        .restaurants-open span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }
        .restaurants-open.open {
          color: var(--success);
          background: rgba(96,178,70,0.12);
        }
        .restaurants-open.closed {
          color: var(--danger);
          background: rgba(226,55,68,0.12);
        }
        .restaurants-card-footer strong {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--brand-red);
          font-size: 0.78rem;
          white-space: nowrap;
        }
        .restaurants-status-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-radius: 20px;
          border: 1px dashed rgba(247,55,79,0.2);
          background: var(--surface-card);
          color: var(--text-secondary);
          text-align: center;
          padding: 28px;
        }
        .restaurants-status-card button {
          border: none;
          border-radius: 999px;
          background: var(--brand-red);
          color: #fff;
          min-height: 40px;
          padding: 0 18px;
          font-weight: 900;
          cursor: pointer;
        }
        @keyframes restaurantsFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .restaurants-page { width: 100%; padding: 24px 14px 54px; }
          .restaurants-hero { border-radius: 20px; padding: 22px 18px; }
          .restaurants-toolbar { grid-template-columns: 1fr; }
          .restaurants-sort { justify-content: space-between; }
          .restaurants-summary { align-items: flex-start; flex-direction: column; gap: 4px; }
          .restaurants-grid { grid-template-columns: 1fr; }
          .restaurants-card-footer { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <section className="restaurants-hero">
        <Link to="/" className="restaurants-back">
          <ArrowLeft size={16} /> Back home
        </Link>
        <h1>Restaurants near you</h1>
        <p>Browse every nearby restaurant in one place, compare ratings and delivery times, then jump straight into the menu you want.</p>

        <div className="restaurants-toolbar">
          <label className="restaurants-search">
            <Search size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search restaurants or cuisines"
              aria-label="Search restaurants or cuisines"
            />
          </label>
          <label className="restaurants-sort">
            <SlidersHorizontal size={16} />
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="default">Relevance</option>
              <option value="rating">Rating</option>
              <option value="time">Fastest</option>
            </select>
          </label>
        </div>

        {suggestion && (
          <div className="restaurants-suggestion">
            Did you mean:{' '}
            <button type="button" onClick={() => setSearchQuery(suggestion)}>{suggestion}</button>
          </div>
        )}

        <div className="restaurants-cuisines" aria-label="Cuisine filters">
          {CUISINES.map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              className={selectedCuisine === cuisine ? 'active' : ''}
              onClick={() => setSelectedCuisine(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </section>

      <div className="restaurants-summary">
        <h2>All restaurants</h2>
        {!loading && !error && (
          <span>{filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}</span>
        )}
      </div>

      {loading ? (
        <div className="restaurants-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="restaurants-status-card">Loading restaurant...</div>
          ))}
        </div>
      ) : error ? (
        <div className="restaurants-status-card">
          <strong>Restaurants are taking a little longer to load.</strong>
          <span>{error}</span>
          <button type="button" onClick={fetchRestaurants}>Retry</button>
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="restaurants-grid">
          {filteredRestaurants.map((restaurant, index) => (
            <RestaurantBrowseCard
              key={restaurant.restaurantId || `${restaurant.restaurantName}-${index}`}
              restaurant={restaurant}
              index={index}
              customerCoords={homeCustomerCoords}
            />
          ))}
        </div>
      ) : (
        <div className="restaurants-status-card">
          <UtensilsCrossed size={28} color="var(--brand-red)" />
          <strong>No restaurants found</strong>
          <span>Try another search term or cuisine filter.</span>
        </div>
      )}
    </div>
  );
}
