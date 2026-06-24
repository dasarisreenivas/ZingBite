import { describe, expect, test } from 'vitest';
import { getPromoBackground, getRestaurantPageSize } from './homeConfig';

describe('homepage SDUI helpers', () => {
  test('uses the restaurant grid page size from SDUI config', () => {
    const config = {
      sections: [{ id: 'restaurant_grid', props: { pageSize: 4 } }]
    };

    expect(getRestaurantPageSize(config)).toBe(4);
  });

  test.each([0, -1, 101, 'invalid', undefined])(
    'falls back for an invalid page size: %s',
    pageSize => {
      const config = {
        sections: [{ id: 'restaurant_grid', props: { pageSize } }]
      };

      expect(getRestaurantPageSize(config)).toBe(8);
    }
  );

  test('converts legacy Tailwind gradient tokens into valid CSS', () => {
    expect(getPromoBackground('from-blue-500 to-indigo-600'))
      .toBe('linear-gradient(135deg, #3b82f6, #4f46e5)');
  });

  test('preserves a configured CSS gradient', () => {
    const gradient = 'linear-gradient(135deg, #111827, #ef4444)';
    expect(getPromoBackground(gradient)).toBe(gradient);
  });
});
