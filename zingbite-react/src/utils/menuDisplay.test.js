import { describe, expect, test } from 'vitest';
import { getMenuItemDisplayText, isVegDish } from './menuDisplay';

describe('menu item display text', () => {
  test('uses the dish description as the title when menuName is a generic category', () => {
    expect(getMenuItemDisplayText({
      menuName: 'Pizza',
      description: 'Margherita Pizza'
    })).toEqual({
      title: 'Margherita Pizza',
      subtitle: 'Pizza'
    });
  });

  test('keeps specific menu names as the title', () => {
    expect(getMenuItemDisplayText({
      menuName: 'Premium Pizza',
      description: 'Delicious premium pizza'
    })).toEqual({
      title: 'Premium Pizza',
      subtitle: 'Delicious premium pizza'
    });
  });

  test('uses the description when the menuName accidentally matches the restaurant name', () => {
    expect(getMenuItemDisplayText({
      menuName: 'Pizza World',
      description: 'Garlic Bread',
      restaurantName: 'Pizza World'
    })).toEqual({
      title: 'Garlic Bread',
      subtitle: 'Pizza World'
    });
  });

  test('falls back to a safe dish label when no text is present', () => {
    expect(getMenuItemDisplayText({})).toEqual({
      title: 'Dish',
      subtitle: ''
    });
  });

  test('detects common non-veg dish keywords', () => {
    expect(isVegDish({ menuName: 'Chicken Tikka' })).toBe(false);
    expect(isVegDish({ menuName: 'Paneer Roll' })).toBe(true);
  });
});
