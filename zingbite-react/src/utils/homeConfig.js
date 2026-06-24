const DEFAULT_PROMO_BACKGROUND = 'linear-gradient(135deg, #f97316, #ec4899)';

const LEGACY_PROMO_GRADIENTS = {
  'from-orange-500 to-pink-500': DEFAULT_PROMO_BACKGROUND,
  'from-blue-500 to-indigo-600': 'linear-gradient(135deg, #3b82f6, #4f46e5)'
};

export const getRestaurantPageSize = (config, fallback = 8) => {
  const sections = Array.isArray(config?.sections) ? config.sections : [];
  const rawPageSize = sections.find(section => section?.id === 'restaurant_grid')?.props?.pageSize;
  const pageSize = Number(rawPageSize);

  return Number.isInteger(pageSize) && pageSize > 0 && pageSize <= 100
    ? pageSize
    : fallback;
};

export const getPromoBackground = (configuredBackground) => {
  const value = typeof configuredBackground === 'string' ? configuredBackground.trim() : '';
  if (!value) return DEFAULT_PROMO_BACKGROUND;

  return LEGACY_PROMO_GRADIENTS[value] || value;
};
