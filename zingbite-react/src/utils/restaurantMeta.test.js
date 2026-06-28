import { describe, expect, test } from 'vitest';
import {
  formatDeliveryTime,
  formatRating,
  formatRestaurantPrice,
  getDeliveryMinutes,
  getHomeCustomerCoordinates,
  getRestaurantDistanceLabel
} from './restaurantMeta';

describe('restaurant metadata helpers', () => {
  test('does not invent restaurant pricing without a backend field', () => {
    expect(formatRestaurantPrice({ restaurantId: 7 })).toBeNull();
  });

  test('formats a real cost-for-two backend field', () => {
    expect(formatRestaurantPrice({ averageCostForTwo: 450 })).toBe('₹450 for two');
  });

  test('uses explicit customer coordinates from the home payload before fallback coordinates', () => {
    const payload = { customerLocation: { latitude: 12.9716, longitude: 77.5946, source: 'session' } };
    const fallback = { lat: 13, lng: 78 };

    expect(getHomeCustomerCoordinates(payload, fallback)).toEqual({ lat: 12.9716, lng: 77.5946 });
  });

  test('computes restaurant distance from customer and restaurant coordinates', () => {
    const customer = { lat: 12.9716, lng: 77.5946 };
    const restaurant = { latitude: 12.9816, longitude: 77.5946 };

    expect(getRestaurantDistanceLabel(restaurant, customer)).toBe('1.1 km');
  });

  test('hides distance when either coordinate pair is missing', () => {
    expect(getRestaurantDistanceLabel({ latitude: 12.9816 }, { lat: 12.9716, lng: 77.5946 })).toBeNull();
  });

  test('formats delivery and rating labels defensively', () => {
    expect(getDeliveryMinutes('25 mins')).toBe(25);
    expect(formatDeliveryTime('35')).toBe('35 min');
    expect(formatRating(0)).toBe('New');
  });
});
