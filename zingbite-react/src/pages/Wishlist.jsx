import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  AlertCircle,
  ArrowUpDown,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Search,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Utensils,
  X
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getMenuItemDisplayText, isVegDish } from '../utils/menuDisplay';
import '../styles/wishlist.css';

const DEFAULT_DISH_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop';

const getItemId = (item = {}) => item.menuId ?? item.itemId ?? item.id;

const getItemPrice = (item = {}) => {
  const price = Number(item.price ?? item.offerPrice ?? 0);
  return Number.isFinite(price) ? price : 0;
};

const formatPrice = (value) => (
  Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
);

const getRestaurantName = (item = {}) => (
  item.restaurant?.restaurantName || item.restaurantName || item.kitchenName || 'ZingBite kitchen'
);

const isItemAvailable = (item = {}) => item.isAvailable !== false && item.available !== false;

const Wishlist = () => {
  const { wishlist, toggleWishlist, loading, wishlistError, fetchWishlist } = useWishlist();
  const { cart, addToCart, updateQuantity, conflictPopup, clearAndAdd, setConflictPopup } = useCart();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('recent');

  const cartItems = useMemo(() => {
    if (!cart?.items) return [];
    return Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
  }, [cart]);

  const cartQuantityById = useMemo(() => {
    const quantities = new Map();
    cartItems.forEach((item) => {
      const itemId = getItemId(item);
      if (itemId == null) return;
      quantities.set(String(itemId), Number(item.quantity ?? item.qty ?? 0));
    });
    return quantities;
  }, [cartItems]);

  const enrichedItems = useMemo(() => (
    wishlist.map((item, index) => {
      const itemId = getItemId(item);
      const display = getMenuItemDisplayText(item);
      const restaurantName = getRestaurantName(item);
      const quantity = itemId == null ? 0 : cartQuantityById.get(String(itemId)) || 0;

      return {
        item,
        itemId,
        index,
        title: display.title,
        subtitle: display.subtitle,
        restaurantName,
        price: getItemPrice(item),
        isVeg: isVegDish(item),
        isAvailable: isItemAvailable(item),
        quantity
      };
    })
  ), [cartQuantityById, wishlist]);

  const availableCount = enrichedItems.filter(item => item.isAvailable).length;
  const vegCount = enrichedItems.filter(item => item.isVeg).length;
  const cartSavedCount = enrichedItems.filter(item => item.quantity > 0).length;
  const savedValue = enrichedItems.reduce((sum, item) => sum + item.price, 0);
  const restaurantCount = new Set(enrichedItems.map(item => item.restaurantName)).size;

  const filterOptions = [
    { id: 'all', label: 'All', count: enrichedItems.length },
    { id: 'available', label: 'Available', count: availableCount },
    { id: 'veg', label: 'Veg', count: vegCount },
    { id: 'nonVeg', label: 'Non-veg', count: enrichedItems.length - vegCount },
    { id: 'cart', label: 'In cart', count: cartSavedCount }
  ];

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const nextItems = enrichedItems.filter((entry) => {
      if (filter === 'available' && !entry.isAvailable) return false;
      if (filter === 'veg' && !entry.isVeg) return false;
      if (filter === 'nonVeg' && entry.isVeg) return false;
      if (filter === 'cart' && entry.quantity === 0) return false;
      if (!needle) return true;

      return [entry.title, entry.subtitle, entry.restaurantName]
        .some(value => String(value || '').toLowerCase().includes(needle));
    });

    return [...nextItems].sort((first, second) => {
      if (sort === 'priceAsc') return first.price - second.price;
      if (sort === 'priceDesc') return second.price - first.price;
      if (sort === 'name') return first.title.localeCompare(second.title);
      return first.index - second.index;
    });
  }, [enrichedItems, filter, query, sort]);

  const hasActiveFilters = query.trim() || filter !== 'all' || sort !== 'recent';

  const resetFilters = () => {
    setQuery('');
    setFilter('all');
    setSort('recent');
  };

  const handleAddToCart = (itemId) => {
    if (itemId == null) return;
    addToCart(itemId, 1);
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (itemId == null) return;
    updateQuantity(itemId, quantity);
  };

  const renderHeader = () => (
    <section className="wishlist-toolbar-band">
      <div className="wishlist-title-block">
        <span className="wishlist-kicker">
          <Heart size={16} fill="currentColor" />
          Saved tastes
        </span>
        <h1>Wishlist</h1>
        <p>Keep your favorite dishes close, compare them quickly, and send cravings straight to cart.</p>
      </div>
      <div className="wishlist-toolbar-actions">
        <Link className="wishlist-link-btn secondary" to="/">
          <ShoppingBag size={18} />
          Browse menu
        </Link>
        <Link className="wishlist-link-btn primary" to="/cart">
          <ShoppingCart size={18} />
          Cart
          <span>{cart?.itemCount || cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0)}</span>
        </Link>
      </div>
    </section>
  );

  const renderError = () => wishlistError && (
    <div className="wishlist-alert" role="status">
      <AlertCircle size={18} />
      <span>{wishlistError}</span>
      <button type="button" onClick={() => fetchWishlist?.(true)}>
        <RefreshCw size={15} />
        Retry
      </button>
    </div>
  );

  const renderLoading = () => (
    <section className="wishlist-loading" aria-label="Loading wishlist">
      <div className="wishlist-loading-panel">
        <span className="wishlist-skeleton line wide" />
        <span className="wishlist-skeleton line" />
        <span className="wishlist-skeleton field" />
      </div>
      <div className="wishlist-loading-grid">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div className="wishlist-skeleton-card" key={item}>
            <span className="wishlist-skeleton image" />
            <span className="wishlist-skeleton line" />
            <span className="wishlist-skeleton line short" />
          </div>
        ))}
      </div>
    </section>
  );

  const renderEmpty = () => (
    <section className="wishlist-empty-state">
      <div className="wishlist-empty-visual">
        <img src={DEFAULT_DISH_IMAGE} alt="Fresh meal bowl" />
        <span><Heart size={28} fill="currentColor" /></span>
      </div>
      <div className="wishlist-empty-copy">
        <span className="wishlist-kicker compact">
          <Sparkles size={15} />
          Ready for your first save
        </span>
        <h2>Your wishlist is empty</h2>
        <p>Save dishes from the menu and they will appear here with quick cart controls.</p>
        <Link className="wishlist-link-btn primary" to="/">
          <ShoppingBag size={18} />
          Explore menu
          <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );

  const renderNoMatches = () => (
    <div className="wishlist-no-matches">
      <Search size={30} />
      <h3>No saved dishes match</h3>
      <p>Try a different search, filter, or sort option.</p>
      <button type="button" className="wishlist-ghost-btn" onClick={resetFilters}>
        <X size={16} />
        Clear filters
      </button>
    </div>
  );

  const renderCard = (entry) => (
    <article className="wishlist-item-card" key={entry.itemId ?? `${entry.title}-${entry.index}`}>
      <div className="wishlist-item-media">
        <img
          src={entry.item.imagePath || DEFAULT_DISH_IMAGE}
          alt={entry.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = DEFAULT_DISH_IMAGE;
          }}
        />
        <button
          type="button"
          className="wishlist-remove-btn"
          onClick={() => toggleWishlist(entry.item)}
          aria-label={`Remove ${entry.title} from wishlist`}
        >
          <Trash2 size={17} />
        </button>
        {!entry.isAvailable && <span className="wishlist-soldout-badge">Sold out</span>}
      </div>

      <div className="wishlist-item-body">
        <div className="wishlist-item-tags">
          <span className={`wishlist-food-type ${entry.isVeg ? 'veg' : 'nonveg'}`}>
            <span />
            {entry.isVeg ? 'Veg' : 'Non-veg'}
          </span>
          {entry.item.itemType === 'COMBO' && (
            <span className="wishlist-combo-tag">
              <Utensils size={13} />
              Combo
            </span>
          )}
        </div>

        <div className="wishlist-item-copy">
          <h3>{entry.title}</h3>
          <p className="wishlist-restaurant-name">{entry.restaurantName}</p>
          {entry.subtitle && <p className="wishlist-item-desc">{entry.subtitle}</p>}
        </div>

        <div className="wishlist-item-footer">
          <strong><span>&#8377;</span>{formatPrice(entry.price)}</strong>
          {entry.quantity === 0 ? (
            <button
              type="button"
              className="wishlist-add-btn"
              disabled={!entry.isAvailable}
              onClick={() => handleAddToCart(entry.itemId)}
            >
              <Plus size={16} />
              {entry.isAvailable ? 'Add' : 'Unavailable'}
            </button>
          ) : (
            <div className="wishlist-qty-control" aria-label={`${entry.title} quantity`}>
              <button type="button" onClick={() => handleQuantityChange(entry.itemId, entry.quantity - 1)} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span>{entry.quantity}</span>
              <button type="button" onClick={() => handleQuantityChange(entry.itemId, entry.quantity + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <main className="wishlist-page page-enter">
      <div className="wishlist-shell">
        {renderHeader()}
        {renderError()}

        {loading ? renderLoading() : wishlist.length === 0 ? renderEmpty() : (
          <>
            <section className="wishlist-insight-strip" aria-label="Wishlist summary">
              <div>
                <span>Saved dishes</span>
                <strong>{wishlist.length}</strong>
              </div>
              <div>
                <span>Available now</span>
                <strong>{availableCount}</strong>
              </div>
              <div>
                <span>Kitchens</span>
                <strong>{restaurantCount}</strong>
              </div>
              <div>
                <span>Saved value</span>
                <strong><small>&#8377;</small>{formatPrice(savedValue)}</strong>
              </div>
            </section>

            <section className="wishlist-workspace">
              <aside className="wishlist-controls" aria-label="Wishlist controls">
                <label className="wishlist-search-field">
                  <Search size={18} />
                  <input
                    type="search"
                    placeholder="Search saved dishes"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                  />
                  {query && (
                    <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                      <X size={15} />
                    </button>
                  )}
                </label>

                <div className="wishlist-control-group">
                  <div className="wishlist-control-heading">
                    <SlidersHorizontal size={16} />
                    Filter
                  </div>
                  <div className="wishlist-filter-list">
                    {filterOptions.map(option => (
                      <button
                        key={option.id}
                        type="button"
                        className={filter === option.id ? 'active' : ''}
                        onClick={() => setFilter(option.id)}
                      >
                        <span>{option.label}</span>
                        <small>{option.count}</small>
                      </button>
                    ))}
                  </div>
                </div>

                <label className="wishlist-sort-field">
                  <span>
                    <ArrowUpDown size={16} />
                    Sort
                  </span>
                  <select value={sort} onChange={event => setSort(event.target.value)}>
                    <option value="recent">Recently saved</option>
                    <option value="name">Dish name</option>
                    <option value="priceAsc">Price: low to high</option>
                    <option value="priceDesc">Price: high to low</option>
                  </select>
                </label>
              </aside>

              <section className="wishlist-results">
                <div className="wishlist-results-head">
                  <div>
                    <span>{filteredItems.length} of {wishlist.length} saved</span>
                    <h2>{filterOptions.find(option => option.id === filter)?.label || 'Saved dishes'}</h2>
                  </div>
                  {hasActiveFilters && (
                    <button type="button" className="wishlist-ghost-btn" onClick={resetFilters}>
                      <X size={16} />
                      Clear
                    </button>
                  )}
                </div>

                {filteredItems.length === 0 ? renderNoMatches() : (
                  <div className="wishlist-grid">
                    {filteredItems.map(renderCard)}
                  </div>
                )}
              </section>
            </section>
          </>
        )}
      </div>

      {conflictPopup && createPortal(
        <div className="wishlist-modal-overlay" onClick={() => setConflictPopup(null)}>
          <div className="wishlist-modal" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="wishlist-conflict-title">
            <div className="wishlist-modal-icon">
              <AlertCircle size={30} />
            </div>
            <h3 id="wishlist-conflict-title">Cart has another kitchen</h3>
            <p>Your cart already contains items from a different restaurant. Start fresh to add this wishlist item.</p>
            <div className="wishlist-modal-actions">
              <button type="button" className="wishlist-ghost-btn" onClick={() => setConflictPopup(null)}>
                Cancel
              </button>
              <button type="button" className="wishlist-add-btn solid" onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}>
                <ShoppingCart size={16} />
                Start fresh
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </main>
  );
};

export default Wishlist;
