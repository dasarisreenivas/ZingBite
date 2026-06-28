const GENERIC_MENU_LABELS = new Set([
  'biryani',
  'burger',
  'pizza',
  'chinese',
  'indian',
  'dessert',
  'desserts',
  'healthy',
  'pasta',
  'sandwich',
  'sushi',
  'cafe',
  'breakfast',
  'mexican',
  'thai',
  'drink',
  'drinks',
  'beverage',
  'beverages',
  'coffee',
  'tea',
  'starter',
  'starters',
  'appetizer',
  'appetizers',
  'main course',
  'main courses',
  'mains',
  'entree',
  'entrees',
  'side',
  'sides',
  'snack',
  'snacks',
  'sweet',
  'sweets',
  'salad',
  'salads',
  'bread',
  'breads',
  'rice',
  'noodles',
  'soup',
  'soups',
  'curry',
  'curries',
  'roll',
  'rolls',
  'wrap',
  'wraps',
  'tiffin',
  'tiffins',
  'meal',
  'meals',
  'platter',
  'platters'
]);

const normalizeText = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

const sameText = (first, second) => (
  normalizeText(first).toLowerCase() === normalizeText(second).toLowerCase()
);

const isGenericMenuLabel = (value) => GENERIC_MENU_LABELS.has(normalizeText(value).toLowerCase());

export const isVegDish = (item = {}) => {
  const nonVegKeywords = [
    'chicken',
    'mutton',
    'egg',
    'fish',
    'pork',
    'beef',
    'shrimp',
    'prawn',
    'meat',
    'kebab',
    'tikka',
    'biryani'
  ];
  const nameLower = (item.menuName || item.name || '').toLowerCase();
  const descLower = (item.description || item.itemDescription || '').toLowerCase();
  return !nonVegKeywords.some(keyword => nameLower.includes(keyword) || descLower.includes(keyword));
};

export const getMenuItemDisplayText = (item = {}) => {
  const menuName = normalizeText(item?.menuName ?? item?.name);
  const description = normalizeText(item?.description ?? item?.itemDescription);
  const restaurantName = normalizeText(item?.restaurant?.restaurantName ?? item?.restaurantName);
  const nameLooksLikeRestaurant = restaurantName && sameText(menuName, restaurantName);

  if (description && (!menuName || isGenericMenuLabel(menuName) || nameLooksLikeRestaurant)) {
    return {
      title: description,
      subtitle: menuName && !sameText(menuName, description) ? menuName : ''
    };
  }

  const title = menuName || description || 'Dish';

  return {
    title,
    subtitle: description && !sameText(description, title) ? description : ''
  };
};
