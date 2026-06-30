import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CategoryRail({
  title = 'In the Mood for...',
  categories,
  activeCategory,
  railRef,
  onScroll,
  onOpenCategory
}) {
  return (
    <div style={{ marginTop: '32px' }}>
      <div className="section-title-row page-enter" style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.4rem' }}>{title}</h2>
      </div>
      <div className="category-rail-shell page-enter" style={{ animationDelay: '0.1s', marginBottom: '24px' }}>
        <button
          type="button"
          className="category-rail-btn left"
          onClick={() => onScroll('left')}
          aria-label="Scroll food categories left"
        >
          <ChevronLeft size={20} />
        </button>
        <div ref={railRef} className="cuisine-filters" aria-label="Food category filters">
          {categories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              className={`category-card ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => onOpenCategory(category.name)}
              style={{
                animation: `premiumFadeIn 0.4s var(--ease-premium) ${index * 0.06}s both`,
                padding: 0
              }}
            >
              <img src={category.image} alt={category.name} className="category-card-img" loading="lazy" />
              <div className="category-card-overlay">
                <h3 className="category-card-name">{category.name}</h3>
              </div>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="category-rail-btn right"
          onClick={() => onScroll('right')}
          aria-label="Scroll food categories right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
