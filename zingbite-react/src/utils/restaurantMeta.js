const EARTH_RADIUS_KM = 6371;

const PRICE_FIELD_KEYS = [
  'averageCostForTwo',
  'avgCostForTwo',
  'costForTwo',
  'priceForTwo',
  'averagePriceForTwo',
  'priceRange'
];

const toFiniteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const isValidCoordinatePair = (lat, lng) => (
  lat !== null
  && lng !== null
  && lat >= -90
  && lat <= 90
  && lng >= -180
  && lng <= 180
);

/**
 * Extracts a latitude/longitude pair from API payloads or browser geolocation state.
 *
 * Supported shapes:
 * - { lat, lng }
 * - { lat, lon }
 * - { latitude, longitude }
 * - { userLatitude, userLongitude }
 * - { customerLatitude, customerLongitude }
 *
 * @param {object | null | undefined} source
 * @returns {{ lat: number, lng: number } | null}
 */
export const getCoordinatePair = (source) => {
  if (!source || typeof source !== 'object') return null;

  const lat = toFiniteNumber(source.lat ?? source.latitude ?? source.userLatitude ?? source.customerLatitude);
  const lng = toFiniteNumber(source.lng ?? source.lon ?? source.longitude ?? source.userLongitude ?? source.customerLongitude);

  return isValidCoordinatePair(lat, lng) ? { lat, lng } : null;
};

/**
 * Chooses the customer location for home/restaurant listings. Newer responses should
 * rely on fallbackCoords from the browser; payload aliases are kept for compatibility
 * with older API responses.
 *
 * @param {object | null | undefined} payload
 * @param {object | null | undefined} fallbackCoords
 * @returns {{ lat: number, lng: number } | null}
 */
export const getHomeCustomerCoordinates = (payload, fallbackCoords = null) => {
  const payloadCoords = getCoordinatePair(payload?.customerLocation)
    || getCoordinatePair(payload?.userLocation)
    || getCoordinatePair(payload?.sessionLocation)
    || getCoordinatePair(payload);

  return payloadCoords || getCoordinatePair(fallbackCoords);
};

export const calculateDistanceKm = (from, to) => {
  const fromCoords = getCoordinatePair(from);
  const toCoords = getCoordinatePair(to);

  if (!fromCoords || !toCoords) return null;

  const dLat = (toCoords.lat - fromCoords.lat) * (Math.PI / 180);
  const dLng = (toCoords.lng - fromCoords.lng) * (Math.PI / 180);
  const fromLat = fromCoords.lat * (Math.PI / 180);
  const toLat = toCoords.lat * (Math.PI / 180);

  const a = Math.sin(dLat / 2) ** 2
    + Math.sin(dLng / 2) ** 2 * Math.cos(fromLat) * Math.cos(toLat);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};

export const formatDistanceLabel = (distanceKm) => {
  if (!Number.isFinite(distanceKm) || distanceKm < 0) return null;
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000)} m`;
  if (distanceKm < 10) return `${distanceKm.toFixed(1)} km`;
  return `${Math.round(distanceKm)} km`;
};

export const getRestaurantDistanceLabel = (restaurant, customerCoords) => {
  const distanceKm = calculateDistanceKm(customerCoords, restaurant);
  return formatDistanceLabel(distanceKm);
};

export const getDeliveryMinutes = (value) => {
  const match = String(value ?? '').match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
};

export const formatDeliveryTime = (value) => {
  const text = String(value ?? '').trim();
  if (!text) return '30-40 min';
  return /\b(min|mins|minutes)\b/i.test(text) ? text : `${text} min`;
};

export const formatRating = (value) => {
  const rating = Number(value);
  return Number.isFinite(rating) && rating > 0 ? rating.toFixed(1) : 'New';
};

export const formatRestaurantPrice = (restaurant) => {
  if (!restaurant || typeof restaurant !== 'object') return null;

  for (const key of PRICE_FIELD_KEYS) {
    const rawValue = restaurant[key];
    if (rawValue === null || rawValue === undefined || rawValue === '') continue;

    const numericValue = toFiniteNumber(rawValue);
    if (numericValue !== null && numericValue > 0) {
      return key === 'priceRange'
        ? String(rawValue).trim()
        : `₹${Math.round(numericValue)} for two`;
    }

    const textValue = String(rawValue).trim();
    if (textValue) return textValue;
  }

  return null;
};
