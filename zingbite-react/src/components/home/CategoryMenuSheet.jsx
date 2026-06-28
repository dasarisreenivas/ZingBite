import { createPortal } from 'react-dom';
import {
  AlertTriangle,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  UtensilsCrossed,
  X
} from 'lucide-react';
import { getMenuItemDisplayText, isVegDish } from '../../utils/menuDisplay';

export function CategoryCartOverlays({ cartError, conflictPopup, setConflictPopup, clearAndAdd }) {
  return (
    <>
      {cartError && createPortal(
        <div className="category-cart-toast" role="status">
          <AlertTriangle size={18} />
          <span>{cartError}</span>
        </div>,
        document.body
      )}
      {conflictPopup && createPortal(
        <div className="category-conflict-overlay" role="presentation">
          <div className="category-conflict-modal" role="dialog" aria-modal="true" aria-labelledby="category-conflict-title">
            <div className="category-conflict-icon">
              <ShoppingBag size={24} />
            </div>
            <h3 id="category-conflict-title">Start a new cart?</h3>
            <p>Your cart has items from another restaurant. Start fresh to add this dish.</p>
            <div className="category-conflict-actions">
              <button type="button" className="category-conflict-secondary" onClick={() => setConflictPopup(null)}>
                Cancel
              </button>
              <button type="button" className="category-conflict-primary" onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}>
                Start fresh
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function CategoryMenuSheet({
  categorySheet,
  categoryMenuItems,
  categoryMenuLoading,
  categoryMenuError,
  fallbackImage,
  closeCategoryMenu,
  getCategoryCartQuantity,
  handleCategoryAddClick,
  handleCategoryUpdateQuantity
}) {
  if (!categorySheet.open) return null;

  const categoryName = categorySheet.category || 'Category';

  const sheetMarkup = (
    <div
      className="category-sheet-backdrop"
      role="presentation"
      onClick={closeCategoryMenu}
    >
      <section
        className="category-menu-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-menu-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="category-sheet-handle" aria-hidden="true" />
        <div className="category-sheet-header">
          <div>
            <span className="category-sheet-kicker">
              <UtensilsCrossed size={15} />
              Category menu
            </span>
            <h3 id="category-menu-title">{categoryName}</h3>
            <p>
              {categoryMenuLoading
                ? 'Finding matching dishes across restaurants'
                : `${categoryMenuItems.length} ${categoryMenuItems.length === 1 ? 'dish' : 'dishes'} found`}
            </p>
          </div>
          <button
            type="button"
            className="category-sheet-close"
            onClick={closeCategoryMenu}
            aria-label="Close category menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="category-menu-content">
          {categoryMenuLoading ? (
            <div className="category-menu-loading">
              <Loader2 size={22} />
              <span>Loading dishes...</span>
            </div>
          ) : categoryMenuError ? (
            <div className="category-menu-empty">
              <AlertTriangle size={24} />
              <strong>Could not load dishes</strong>
              <span>{categoryMenuError}</span>
            </div>
          ) : categoryMenuItems.length > 0 ? (
            <div className="category-menu-grid">
              {categoryMenuItems.map((item, index) => {
                const restaurant = item.restaurant || {};
                const restaurantName = restaurant.restaurantName || item.restaurantName || 'Restaurant';
                const restaurantId = restaurant.restaurantId || item.restaurantId;
                const itemPrice = Number(item.price || 0);
                const qty = getCategoryCartQuantity(item.menuId);
                const isVeg = isVegDish(item);
                const isAvailable = item.isAvailable !== false;
                const isRestaurantOpen = restaurant.isOpen !== false;
                const dishDisplay = getMenuItemDisplayText(item);

                return (
                  <article
                    key={`${item.menuId}-${restaurantId || index}`}
                    className="category-menu-item"
                    style={{ animationDelay: `${Math.min(index, 12) * 0.04}s` }}
                  >
                    <div className="category-menu-item-copy">
                      <div className="category-menu-item-tags">
                        <span className={isVeg ? 'veg' : 'nonveg'}>
                          <span className="dot" />
                          {isVeg ? 'VEG' : 'NON-VEG'}
                        </span>
                      </div>
                      <h4>{dishDisplay.title}</h4>
                      {itemPrice > 0 && (
                        <strong className="category-menu-price">
                          <span>&#8377;</span>
                          {itemPrice}
                        </strong>
                      )}
                      {dishDisplay.subtitle && <p>{dishDisplay.subtitle}</p>}
                      <span className="category-menu-source" title={restaurantName}>
                        {restaurantName}
                      </span>
                    </div>
                    <div className="category-menu-item-media">
                      <div className="category-menu-img-container">
                        <img
                          src={item.imagePath || fallbackImage}
                          alt={dishDisplay.title || categoryName}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackImage;
                          }}
                        />
                      </div>
                      <div className="category-dish-action">
                        {qty === 0 ? (
                          <button
                            type="button"
                            className="category-add-btn"
                            disabled={!isAvailable || !isRestaurantOpen}
                            onClick={() => handleCategoryAddClick(item)}
                          >
                            {!isAvailable ? 'SOLD OUT' : !isRestaurantOpen ? 'CLOSED' : 'ADD'}
                          </button>
                        ) : (
                          <div className="category-qty-stepper">
                            <button
                              type="button"
                              aria-label={`Decrease ${dishDisplay.title} quantity`}
                              onClick={() => handleCategoryUpdateQuantity(item, qty - 1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span>{qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${dishDisplay.title} quantity`}
                              disabled={!isAvailable || !isRestaurantOpen}
                              onClick={() => handleCategoryUpdateQuantity(item, qty + 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="category-menu-empty">
              <UtensilsCrossed size={24} />
              <strong>No dishes found</strong>
              <span>Try another category from the menu rail.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  return createPortal(sheetMarkup, document.body);
}
