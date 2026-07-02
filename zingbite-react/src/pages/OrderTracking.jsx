import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  CheckCircle2, Clock, MapPin, Bike, ShoppingBag, 
  ChevronRight, Phone, MessageSquare, AlertCircle, ArrowLeft,
  Settings, Loader, Search, Sparkles, Radio, ShieldCheck,
  Route, ReceiptText, Navigation, PackageCheck, WalletCards, X
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import ChatWidget from '../components/ChatWidget';
import useSSE from '../hooks/useSSE';
import useLeaflet from '../hooks/useLeaflet';
import { calculateDistanceKm, formatDistanceLabel } from '../utils/restaurantMeta';
import '../styles/order-tracking.css';

const TRACKING_ORDER_PAGE_SIZE = 5;
const AVERAGE_DELIVERY_SPEED_KMH = 24;

const normalizeTrackingStatus = (status) => {
  let s = String(status || '').trim().toUpperCase().replace(/[\s-]/g, '_');
  if (s === 'ORDER_PLACED') return 'PLACED';
  if (s === 'ORDER_ACCEPTED') return 'ACCEPTED';
  if (s === 'PREPARING_FOOD') return 'PREPARING';
  if (s === 'WAITING_TO_DISPATCH' || s === 'FOOD_READY') return 'READY_FOR_PICKUP';
  return s;
};

const isFirstMileRouteVisible = (status) => {
  const normalized = normalizeTrackingStatus(status);
  return !['PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'PENDING_PAYMENT'].includes(normalized);
};

const isLastMileRouteVisible = (status) => (
  ['PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(normalizeTrackingStatus(status))
);

const hasDrawableRoutePath = (points) => Array.isArray(points) && points.length > 2;

const TRACKING_DETAIL_ACTIONS = [
  { id: 'journey', label: 'Delivery journey', helper: 'Live milestone progress', Icon: Clock },
  { id: 'partner', label: 'Delivery partner', helper: 'Rider profile and contact', Icon: Bike },
  { id: 'receipt', label: 'Order receipt', helper: 'Payment and item details', Icon: ShoppingBag }
];

const TRACKING_STEP_COPY = {
  PLACED: ['Order placed', 'Your order has reached the restaurant.'],
  ACCEPTED: ['Confirmed', 'The restaurant accepted your order.'],
  PREPARING: ['Preparing', 'The kitchen is cooking and packing your meal.'],
  READY_FOR_PICKUP: ['Ready', 'Your food is packed for rider pickup.'],
  PICKED_UP: ['Picked up', 'The rider has collected your package.'],
  OUT_FOR_DELIVERY: ['On the way', 'Your rider is heading to your address.'],
  DELIVERED: ['Delivered', 'Your order has arrived.']
};

function formatTrackOrderId(order) {
  const rawId = order?.id || order?.orderId || '';
  if (!rawId) return '';
  return String(rawId).startsWith('ZB-') ? String(rawId) : `ZB-${rawId}`;
}

const toFiniteNumber = (value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;

  const match = String(value).replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  const number = match ? Number(match[0]) : Number(value);
  return Number.isFinite(number) ? number : null;
};

const clampPercent = (value) => {
  const number = toFiniteNumber(value);
  if (number === null) return 0;
  return Math.min(100, Math.max(0, number));
};

const getTextValue = (value) => {
  const text = String(value ?? '').trim();
  if (!text || ['null', 'undefined', 'n/a', 'na', '-'].includes(text.toLowerCase())) {
    return null;
  }
  return text;
};

const getFirstText = (source, keys) => {
  if (!source) return null;
  for (const key of keys) {
    const value = getTextValue(source[key]);
    if (value) return value;
  }
  return null;
};

const getFirstNumber = (source, keys) => {
  if (!source) return null;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    const value = toFiniteNumber(source[key]);
    if (value !== null) return value;
  }
  return null;
};

const getCoordinatePair = (source) => {
  if (!source) return null;

  if (Array.isArray(source) && source.length >= 2) {
    const lat = toFiniteNumber(source[0]);
    const lng = toFiniteNumber(source[1]);
    return isValidCoordinate(lat, lng) ? { lat, lng } : null;
  }

  if (typeof source === 'string') {
    const parts = source.split(',').map(part => toFiniteNumber(part));
    if (parts.length >= 2 && isValidCoordinate(parts[0], parts[1])) {
      return { lat: parts[0], lng: parts[1] };
    }
    return null;
  }

  if (typeof source !== 'object') return null;

  const lat = toFiniteNumber(source.lat ?? source.latitude);
  const lng = toFiniteNumber(source.lng ?? source.lon ?? source.longitude);
  return isValidCoordinate(lat, lng) ? { lat, lng } : null;
};

const isValidCoordinate = (lat, lng) => (
  Number.isFinite(lat)
  && Number.isFinite(lng)
  && lat >= -90
  && lat <= 90
  && lng >= -180
  && lng <= 180
);

const getCoordinateFromKeys = (source, latKeys, lngKeys) => {
  if (!source) return null;

  for (const latKey of latKeys) {
    for (const lngKey of lngKeys) {
      const lat = toFiniteNumber(source[latKey]);
      const lng = toFiniteNumber(source[lngKey]);
      if (isValidCoordinate(lat, lng)) return { lat, lng };
    }
  }

  return null;
};

const getCoordinateFromPayload = (order, nestedKeys, latKeys, lngKeys) => {
  if (!order) return null;

  for (const key of nestedKeys) {
    const coords = getCoordinatePair(order[key]);
    if (coords) return coords;
  }

  return getCoordinateFromKeys(order, latKeys, lngKeys);
};

const getRoutePoints = (path) => (
  Array.isArray(path)
    ? path.map(point => getCoordinatePair(point)).filter(Boolean).map(({ lat, lng }) => [lat, lng])
    : []
);

const tupleToCoordinate = (point) => {
  const coords = getCoordinatePair(point);
  return coords ? { lat: coords.lat, lng: coords.lng } : null;
};

const getSegmentDistanceKm = (from, to) => {
  const fromCoords = tupleToCoordinate(from);
  const toCoords = tupleToCoordinate(to);
  if (!fromCoords || !toCoords) return null;
  return calculateDistanceKm(fromCoords, toCoords);
};

const getPathDistanceKm = (points) => {
  if (!Array.isArray(points) || points.length < 2) return null;

  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const distance = getSegmentDistanceKm(points[index - 1], points[index]);
    if (distance !== null) total += distance;
  }

  return total > 0 ? total : null;
};

const getPathRemainingDistanceKm = (points, progressPercent = 0) => {
  const total = getPathDistanceKm(points);
  if (total === null) return null;
  return Math.max(0, total * (1 - clampPercent(progressPercent) / 100));
};

const sumKnownDistances = (...distances) => {
  const known = distances.filter(distance => Number.isFinite(distance));
  if (!known.length) return null;
  return known.reduce((sum, distance) => sum + distance, 0);
};

const getDistanceKmFromPayload = (order) => {
  if (!order) return null;

  const distanceKeys = [
    'remainingDistance',
    'distanceLeft',
    'distanceRemaining',
    'routeDistance',
    'deliveryDistance',
    'distance'
  ];

  const distanceKmKeys = [
    'remainingDistanceKm',
    'distanceLeftKm',
    'distanceRemainingKm',
    'routeDistanceKm',
    'deliveryDistanceKm',
    'distanceKm'
  ];

  const distanceMeterKeys = [
    'remainingDistanceMeters',
    'distanceLeftMeters',
    'distanceRemainingMeters',
    'routeDistanceMeters',
    'deliveryDistanceMeters',
    'distanceMeters'
  ];

  for (const key of distanceMeterKeys) {
    const value = getFirstNumber(order, [key]);
    if (value !== null) return value / 1000;
  }

  for (const key of distanceKmKeys) {
    const value = getFirstNumber(order, [key]);
    if (value !== null) return value;
  }

  for (const key of distanceKeys) {
    if (!Object.prototype.hasOwnProperty.call(order, key)) continue;
    const value = toFiniteNumber(order[key]);
    if (value === null) continue;

    const text = String(order[key]).toLowerCase();
    if (/\bm\b/.test(text) && !/\bkm\b/.test(text)) {
      return value / 1000;
    }

    return value;
  }

  return null;
};

const getEtaMinutesFromPayload = (order) => getFirstNumber(order, [
  'estimatedEtaMinutes',
  'estimatedETAMinutes',
  'etaMinutes',
  'remainingEtaMinutes',
  'deliveryEtaMinutes',
  'predictedEtaMinutes',
  'estimatedArrivalMinutes',
  'estimatedDeliveryMinutes',
  'estimatedEta',
  'estimatedETA',
  'remainingEta',
  'deliveryEta',
  'predictedEta',
  'eta',
  'deliveryTime'
]);

const deriveEtaMinutesFromDistance = (distanceKm) => {
  if (!Number.isFinite(distanceKm)) return null;
  if (distanceKm <= 0) return 0;
  return Math.max(1, Math.round((distanceKm / AVERAGE_DELIVERY_SPEED_KMH) * 60));
};

const formatEtaLabel = (minutes) => {
  if (!Number.isFinite(minutes)) return null;
  if (minutes <= 0) return 'Arrived';
  return `${Math.round(minutes)} min`;
};

const getDisplayRestaurantName = (order) => getFirstText(order, [
  'restaurantName',
  'restaurant',
  'merchantName',
  'kitchenName',
  'storeName'
]);

const getOrderTotalAmount = (order) => getFirstNumber(order, [
  'total',
  'totalAmount',
  'amountPaid',
  'paidAmount',
  'grandTotal',
  'payableAmount',
  'amount'
]);

const getReceiptDetails = (order) => {
  const items = Array.isArray(order?.items) ? order.items : [];
  const paymentMethod = getFirstText(order, ['paymentMethod', 'paymentMode', 'paymentType']);
  const restaurantName = getDisplayRestaurantName(order);
  const totalAmount = getOrderTotalAmount(order);

  return {
    items,
    paymentMethod,
    restaurantName,
    totalAmount,
    hasDetails: Boolean(paymentMethod || restaurantName || items.length > 0 || totalAmount !== null)
  };
};

const getRiderProfile = (order) => {
  const name = getFirstText(order, ['riderName', 'deliveryPartnerName', 'driverName']);
  const phone = getFirstText(order, ['riderPhone', 'deliveryPartnerPhone', 'driverPhone']);
  const id = order?.riderId ?? order?.deliveryPartnerId ?? order?.driverId ?? null;
  const vehicleType = getFirstText(order, ['riderVehicleType', 'vehicleType', 'vehicle']);
  const vehicleNumber = getFirstText(order, ['riderVehicleNumber', 'vehicleNumber', 'vehicleNo']);
  const vehicle = [vehicleType, vehicleNumber].filter(Boolean).join(' - ') || null;
  const rating = getFirstNumber(order, ['riderRating', 'deliveryPartnerRating', 'driverRating']);

  return {
    id,
    name,
    phone,
    vehicle,
    rating,
    hasDetails: Boolean(id || name || phone || vehicle || rating !== null)
  };
};

const isTerminalStatus = (status) => ['DELIVERED', 'CANCELLED', 'PENDING_PAYMENT'].includes(status);

const shouldShowRiderPanel = (status, riderProfile) => (
  riderProfile.hasDetails || (status && !isTerminalStatus(status))
);

const buildOrderRouteTelemetry = (order, status, progressPercent = 0) => {
  const safeProgress = clampPercent(progressPercent);
  const firstMilePoints = getRoutePoints(order?.pathFM || order?.firstMilePath || order?.routeToRestaurant);
  const lastMilePoints = getRoutePoints(order?.pathLM1 || order?.lastMilePath || order?.routeToCustomer);
  const liveGpsCoords = getCoordinatePair(order?.gpsCoordinates)
    || getCoordinateFromPayload(
      order,
      ['riderLocation', 'driverLocation', 'deliveryPartnerLocation', 'currentLocation'],
      ['riderLatitude', 'driverLatitude', 'deliveryPartnerLatitude', 'currentLatitude'],
      ['riderLongitude', 'riderLng', 'driverLongitude', 'driverLng', 'deliveryPartnerLongitude', 'currentLongitude', 'currentLng']
    );

  const restaurantCoords = getCoordinateFromPayload(
    order,
    ['restaurantLocation', 'kitchenLocation', 'storeLocation'],
    ['restaurantLatitude', 'restaurantLat', 'kitchenLatitude', 'storeLatitude'],
    ['restaurantLongitude', 'restaurantLng', 'restaurantLon', 'kitchenLongitude', 'storeLongitude']
  ) || tupleToCoordinate(firstMilePoints[firstMilePoints.length - 1]) || tupleToCoordinate(lastMilePoints[0]);

  const customerCoords = getCoordinateFromPayload(
    order,
    ['customerLocation', 'deliveryLocation', 'dropoffLocation', 'userLocation'],
    ['customerLatitude', 'customerLat', 'deliveryLatitude', 'dropoffLatitude', 'userLatitude'],
    ['customerLongitude', 'customerLng', 'customerLon', 'deliveryLongitude', 'dropoffLongitude', 'userLongitude']
  ) || tupleToCoordinate(lastMilePoints[lastMilePoints.length - 1]);

  const projectedPath = (status === 'OUT_FOR_DELIVERY' || status === 'PICKED_UP')
    ? lastMilePoints
    : (firstMilePoints.length > 0 ? firstMilePoints : lastMilePoints);
  const projectedPosition = projectedPath.length > 0
    ? tupleToCoordinate(interpolatePolyline(projectedPath, status === 'OUT_FOR_DELIVERY' ? safeProgress : 0))
    : null;
  const currentCoords = liveGpsCoords || projectedPosition;

  return {
    firstMilePoints,
    lastMilePoints,
    currentCoords,
    restaurantCoords,
    customerCoords,
    isLiveGps: Boolean(liveGpsCoords),
    hasRouteData: firstMilePoints.length > 1 || lastMilePoints.length > 1,
    hasAnyCoordinates: Boolean(currentCoords || restaurantCoords || customerCoords || firstMilePoints.length || lastMilePoints.length)
  };
};

const getRouteDistanceKm = (status, progressPercent, telemetry) => {
  if (!telemetry || !status || isTerminalStatus(status)) {
    return status === 'DELIVERED' ? 0 : null;
  }

  const firstMileDistance = getPathDistanceKm(telemetry.firstMilePoints);
  const lastMileDistance = getPathDistanceKm(telemetry.lastMilePoints);
  const currentToRestaurant = getSegmentDistanceKm(telemetry.currentCoords, telemetry.restaurantCoords);
  const restaurantToCustomer = getSegmentDistanceKm(telemetry.restaurantCoords, telemetry.customerCoords);
  const currentToCustomer = getSegmentDistanceKm(telemetry.currentCoords, telemetry.customerCoords);

  if (status === 'OUT_FOR_DELIVERY') {
    return getPathRemainingDistanceKm(telemetry.lastMilePoints, progressPercent) ?? currentToCustomer;
  }

  if (status === 'PICKED_UP') {
    return lastMileDistance ?? currentToCustomer ?? restaurantToCustomer;
  }

  return sumKnownDistances(
    firstMileDistance ?? currentToRestaurant,
    lastMileDistance ?? restaurantToCustomer
  );
};

const getOrderTrackingMetrics = (order, status, progressPercent = 0, telemetry = null) => {
  if (!order) {
    return { etaMinutes: null, etaLabel: null, distanceKm: null, distanceLabel: null };
  }

  if (status === 'DELIVERED') {
    return { etaMinutes: 0, etaLabel: 'Arrived', distanceKm: 0, distanceLabel: '0 m' };
  }

  if (status === 'CANCELLED' || status === 'PENDING_PAYMENT') {
    return { etaMinutes: null, etaLabel: null, distanceKm: null, distanceLabel: null };
  }

  const routeTelemetry = telemetry || buildOrderRouteTelemetry(order, status, progressPercent);
  const distanceKm = getDistanceKmFromPayload(order) ?? getRouteDistanceKm(status, progressPercent, routeTelemetry);
  const etaMinutes = getEtaMinutesFromPayload(order) ?? deriveEtaMinutesFromDistance(distanceKm);

  return {
    etaMinutes,
    etaLabel: formatEtaLabel(etaMinutes),
    distanceKm,
    distanceLabel: formatDistanceLabel(distanceKm)
  };
};

const getDelayForecastText = (order) => {
  const reason = getFirstText(order, [
    'delayReason',
    'etaDelayReason',
    'routeDelayReason',
    'trafficNote',
    'weatherAlert',
    'weatherDelayReason'
  ]);
  const minutes = getFirstNumber(order, [
    'delayMinutes',
    'etaAdjustmentMinutes',
    'trafficDelayMinutes',
    'weatherDelayMinutes',
    'trafficDelay',
    'weatherDelay'
  ]);

  if (reason && minutes !== null) return `${reason}. ETA adjusted (+${Math.round(minutes)} min).`;
  if (reason) return reason;
  if (minutes !== null && minutes > 0) return `ETA adjusted by ${Math.round(minutes)} min.`;
  return null;
};

const getStatusCopy = (status, metrics, telemetry) => {
  const etaText = metrics.etaLabel;
  const distanceText = metrics.distanceLabel;
  const locationText = telemetry.currentCoords
    ? `${telemetry.currentCoords.lat.toFixed(5)}, ${telemetry.currentCoords.lng.toFixed(5)}`
    : null;
  const locationSource = telemetry.isLiveGps ? 'Live GPS' : 'Route telemetry';

  if (status === 'PLACED') {
    return {
      heading: 'Order placed',
      subtitle: etaText
        ? `The restaurant is reviewing your order. Current ETA is ${etaText}.`
        : 'The restaurant is reviewing your order. ETA will appear once route data is available.'
    };
  }

  if (status === 'ACCEPTED') {
    return {
      heading: 'Order confirmed',
      subtitle: etaText
        ? `The restaurant accepted your order. Current ETA is ${etaText}.`
        : 'The restaurant accepted your order and is preparing the next update.'
    };
  }

  if (status === 'PREPARING') {
    return {
      heading: 'Preparing food',
      subtitle: etaText
        ? `Kitchen prep is underway. Current ETA is ${etaText}.`
        : 'Kitchen prep is underway. Delivery ETA will tighten after route telemetry syncs.'
    };
  }

  if (status === 'READY_FOR_PICKUP') {
    return {
      heading: 'Ready for pickup',
      subtitle: etaText
        ? `Your food is packed for rider pickup. Current ETA is ${etaText}.`
        : 'Your food is packed for rider pickup. Rider details will appear after assignment.'
    };
  }

  if (status === 'PICKED_UP') {
    return {
      heading: 'Picked up',
      subtitle: [
        'The rider has collected your order',
        distanceText ? `${distanceText} remaining` : null,
        etaText ? `${etaText} ETA` : null
      ].filter(Boolean).join('. ') + '.'
    };
  }

  if (status === 'OUT_FOR_DELIVERY') {
    return {
      heading: etaText ? `Arriving in ${etaText}` : 'Out for delivery',
      subtitle: [
        'Your rider is on the way',
        distanceText ? `${distanceText} remaining` : null,
        locationText ? `${locationSource}: ${locationText}` : null
      ].filter(Boolean).join('. ') + '.'
    };
  }

  if (status === 'DELIVERED') {
    return {
      heading: 'Order delivered',
      subtitle: 'Your order has arrived. Enjoy your meal.'
    };
  }

  if (status === 'CANCELLED') {
    return {
      heading: 'Order cancelled',
      subtitle: 'This order is no longer moving through the delivery flow.'
    };
  }

  return {
    heading: status ? status.replace(/_/g, ' ') : 'Status unavailable',
    subtitle: 'We are waiting for the latest backend status update.'
  };
};

const ActiveOrderMap = ({ orderDetail, routeTelemetry }) => {
  const { leafletLoaded, L } = useLeaflet();
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const riderMarkerRef = React.useRef(null);
  const restaurantMarkerRef = React.useRef(null);
  const customerMarkerRef = React.useRef(null);
  const routePolylineRef = React.useRef(null);
  const polylineFMRef = React.useRef(null);
  const polylineLMRef = React.useRef(null);
  const hasCenteredRef = React.useRef(false);
  const [recenterCount, setRecenterCount] = useState(0);
  const normalizedStatus = normalizeTrackingStatus(orderDetail?.status);
  const firstMileRoutePoints = React.useMemo(() => (
    isFirstMileRouteVisible(normalizedStatus) ? (routeTelemetry?.firstMilePoints || []) : []
  ), [normalizedStatus, routeTelemetry]);
  const lastMileRoutePoints = React.useMemo(() => (
    isLastMileRouteVisible(normalizedStatus) ? (routeTelemetry?.lastMilePoints || []) : []
  ), [normalizedStatus, routeTelemetry]);
  const mapPoints = React.useMemo(() => {
    const points = [
      routeTelemetry?.currentCoords,
      routeTelemetry?.restaurantCoords,
      routeTelemetry?.customerCoords,
      ...firstMileRoutePoints.map(tupleToCoordinate),
      ...lastMileRoutePoints.map(tupleToCoordinate)
    ].filter(Boolean);

    return points.filter(({ lat, lng }) => isValidCoordinate(lat, lng));
  }, [routeTelemetry, firstMileRoutePoints, lastMileRoutePoints]);
  const hasMapData = Boolean(routeTelemetry?.hasAnyCoordinates && mapPoints.length > 0);

  // Initialize Map Structure
  useEffect(() => {
    if (!hasMapData) return;
    if (!leafletLoaded || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    if (!L) return;

    const initialPoint = mapPoints[0];
    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([initialPoint.lat, initialPoint.lng], 14);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    // Reset centering ref when map is initialized/recreated
    hasCenteredRef.current = false;

  }, [leafletLoaded, orderDetail?.id, L, hasMapData, mapPoints]);

  useEffect(() => {
    hasCenteredRef.current = false;
  }, [orderDetail?.id]);

  useEffect(() => () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      riderMarkerRef.current = null;
      restaurantMarkerRef.current = null;
      customerMarkerRef.current = null;
      routePolylineRef.current = null;
      polylineFMRef.current = null;
      polylineLMRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (hasMapData || !mapInstanceRef.current) return;
    mapInstanceRef.current.remove();
    mapInstanceRef.current = null;
    riderMarkerRef.current = null;
    restaurantMarkerRef.current = null;
    customerMarkerRef.current = null;
    routePolylineRef.current = null;
    polylineFMRef.current = null;
    polylineLMRef.current = null;
    hasCenteredRef.current = false;
  }, [hasMapData]);

  // Handle window resizing to prevent gray area
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle Markers & Path rendering dynamically
  useEffect(() => {
    if (!hasMapData) return;
    if (!leafletLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (!L) return;

    // 1. Setup Icons
    const restaurantIcon = L.divIcon({
      html: '<div class="tracking-map-pin tracking-map-pin-restaurant">R</div>',
      className: 'custom-map-marker-restaurant',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const customerIcon = L.divIcon({
      html: '<div class="tracking-map-pin tracking-map-pin-customer">H</div>',
      className: 'custom-map-marker-customer',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const riderIcon = L.divIcon({
      html: '<div class="tracking-map-pin tracking-map-pin-rider">B</div>',
      className: 'custom-map-marker-rider',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    // 2. Resolve coordinates from backend telemetry only.
    const toLatLng = (coords) => coords ? [coords.lat, coords.lng] : null;
    const riderCoords = toLatLng(routeTelemetry.currentCoords);
    const restCoords = toLatLng(routeTelemetry.restaurantCoords);
    const custCoords = toLatLng(routeTelemetry.customerCoords);
    const updateMarker = (markerRef, coords, icon, popupHtml) => {
      if (!coords) {
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
        return;
      }

      if (!markerRef.current) {
        markerRef.current = L.marker(coords, { icon }).addTo(map).bindPopup(popupHtml);
      } else {
        markerRef.current.setLatLng(coords);
      }
    };

    // 3. Create or Update Markers
    updateMarker(restaurantMarkerRef, restCoords, restaurantIcon, '<b>Restaurant</b>');
    updateMarker(customerMarkerRef, custCoords, customerIcon, '<b>Delivery address</b>');
    updateMarker(riderMarkerRef, riderCoords, riderIcon, '<b>Rider location</b>');

    // 4. Remove previous polylines
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }
    if (polylineFMRef.current) {
      polylineFMRef.current.remove();
      polylineFMRef.current = null;
    }
    if (polylineLMRef.current) {
      polylineLMRef.current.remove();
      polylineLMRef.current = null;
    }

    // 5. Draw only the active road-geometry leg. Markers remain visible while route data is pending.
    if (hasDrawableRoutePath(firstMileRoutePoints)) {
      polylineFMRef.current = L.polyline(firstMileRoutePoints, { color: '#f7374f', weight: 4, opacity: 0.86 }).addTo(map);
    }
    if (hasDrawableRoutePath(lastMileRoutePoints)) {
      polylineLMRef.current = L.polyline(lastMileRoutePoints, { color: '#b91c1c', weight: 4, opacity: 0.82, dashArray: '6, 6' }).addTo(map);
    }

    // 6. Fit map bounds to cover all points only once on initial load
    if (!hasCenteredRef.current) {
      const boundsPoints = mapPoints.map(({ lat, lng }) => [lat, lng]);
      if (boundsPoints.length === 1) {
        map.setView(boundsPoints[0], 15);
      } else if (boundsPoints.length > 1) {
        const bounds = L.latLngBounds(boundsPoints);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
      hasCenteredRef.current = true;
    }

  }, [leafletLoaded, routeTelemetry, firstMileRoutePoints, lastMileRoutePoints, mapPoints, hasMapData, recenterCount, L]);

  const handleRecenter = () => {
    hasCenteredRef.current = false;
    setRecenterCount(prev => prev + 1);
  };

  if (!hasMapData) {
    return (
      <div className="tracking-map-shell tracking-map-shell-empty">
        <div className="map-unavailable-state">
          <MapPin size={28} color="var(--brand-red)" />
          <h3>Route telemetry pending</h3>
          <p>The live map will appear when the backend sends GPS or route coordinates for this order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-map-shell">
      <div className="map-overlay-text" style={{ zIndex: 10 }}>
        {routeTelemetry.isLiveGps ? 'Live GPS map' : 'Route telemetry map'}
      </div>

      <div className="map-route-legend" aria-hidden="true">
        {routeTelemetry.restaurantCoords && <span><i className="legend-dot restaurant" /> Kitchen</span>}
        {routeTelemetry.currentCoords && <span><i className="legend-dot rider" /> Rider</span>}
        {routeTelemetry.customerCoords && <span><i className="legend-dot customer" /> You</span>}
      </div>

      {leafletLoaded && (
        <button 
          onClick={handleRecenter}
          className="map-recenter-btn"
        >
          Recenter Map
        </button>
      )}
      
      {leafletLoaded && (
        <div 
          ref={mapRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: 'inherit', 
            zIndex: 1
          }} 
        />
      )}

      {!leafletLoaded && (
        <div className="map-loading-state">
          <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
          <span>Loading interactive map...</span>
        </div>
      )}
    </div>
  );
};


const interpolatePolyline = (points, progressPercent) => {
  if (!points || points.length === 0) return null;
  if (points.length === 1) return points[0];
  
  const segments = [];
  let totalLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segments.push({ from: p1, to: p2, length: len });
    totalLength += len;
  }
  
  if (totalLength === 0) return points[0];
  
  const targetDist = (progressPercent / 100) * totalLength;
  
  let accumulated = 0;
  for (const seg of segments) {
    if (accumulated + seg.length >= targetDist) {
      const segmentProgress = seg.length > 0 ? (targetDist - accumulated) / seg.length : 0;
      const lat = seg.from[0] + (seg.to[0] - seg.from[0]) * segmentProgress;
      const lng = seg.from[1] + (seg.to[1] - seg.from[1]) * segmentProgress;
      return [lat, lng];
    }
    accumulated += seg.length;
  }
  
  return points[points.length - 1];
};

const OrderTracking = () => {
  const navigate = useNavigate();
  const { showAlert } = useModal();
  const [searchParams] = useSearchParams();
  const orderIdParam = searchParams.get('orderId');

  const { user, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [visibleActiveOrderCount, setVisibleActiveOrderCount] = useState(TRACKING_ORDER_PAGE_SIZE);
  const [visibleRecentOrderCount, setVisibleRecentOrderCount] = useState(TRACKING_ORDER_PAGE_SIZE);

  const [orderDetail, setOrderDetail] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulatingStatus, setSimulatingStatus] = useState(null);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeDetailSheet, setActiveDetailSheet] = useState(null);

  const stages = ['PLACED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const getNormalizedStatus = normalizeTrackingStatus;
  const getOrderStageIndex = (status) => {
    const idx = stages.indexOf(getNormalizedStatus(status));
    return idx >= 0 ? idx : 0;
  };
  const getOrderProgressPercent = (status) => Math.round((getOrderStageIndex(status) / (stages.length - 1)) * 100);
  const getStatusToneClass = (status) => (getNormalizedStatus(status) || 'pending').toLowerCase().replace(/_/g, '-');
  const getOrderItemCount = (order) => {
    if (!Array.isArray(order?.items)) return 0;
    return order.items.reduce((total, item) => {
      const quantity = Number(item.qty || item.quantity || 1);
      return total + (Number.isFinite(quantity) ? quantity : 1);
    }, 0);
  };
  const getOrderMetricSnapshot = (order, progress = order?.gpsProgress) => {
    const normalized = getNormalizedStatus(order?.status);
    const safeProgress = clampPercent(progress);
    const telemetry = buildOrderRouteTelemetry(order, normalized, safeProgress);
    return getOrderTrackingMetrics(order, normalized, safeProgress, telemetry);
  };
  const currentStatus = orderDetail ? getNormalizedStatus(orderDetail.status) : null;
  const currentIdx = currentStatus ? stages.indexOf(currentStatus) : 0;
  const linePercent = orderDetail ? (Math.max(0, currentIdx) / (stages.length - 1)) * 100 : 0;

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        setOrders(prev => {
          return res.data.map(o => {
            const cleanOId = String(o.id || o.orderId || '').replace(/^ZB-/, '').trim();
            const sseMatch = prev.find(p => String(p.id || p.orderId || '').replace(/^ZB-/, '').trim() === cleanOId);
            if (sseMatch) {
              return { ...o, ...sseMatch };
            }
            return o;
          });
        });
      } catch (err) {
        console.error("Failed to load orders for tracking:", err);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const cleanId = orderIdParam ? String(orderIdParam).replace(/^ZB-/, '').trim() : '';
  const ssePath = orderIdParam
    ? (window.location.pathname.startsWith('/zingbite')
      ? `/zingbite/api/order/stream?orderId=${cleanId}`
      : `/api/order/stream?orderId=${cleanId}`)
    : null;

  const { connected: sseConnected, reconnecting: sseReconnecting } = useSSE(ssePath, (event) => {
    try {
      const data = JSON.parse(event.data);
      const incomingOrderId = String(data?.orderId ?? data?.id ?? '').replace(/^ZB-/, '').trim();
      if (data && incomingOrderId === cleanId) {
        // Play sound on status change
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav');
          audio.volume = 0.4;
          audio.play();
        } catch {
          // Browser autoplay policies can block this cue; tracking continues silently.
        }

        setOrders(prevOrders => {
          const cleanNewOId = incomingOrderId;
          const exists = prevOrders.some(o => String(o.id || o.orderId || '').replace(/^ZB-/, '').trim() === cleanNewOId);
          if (!exists) {
            const newO = {
              id: data.id || `ZB-${incomingOrderId}`,
              ...data
            };
            return [...prevOrders, newO];
          }
          return prevOrders.map(o => {
            const cleanOId = String(o.id || o.orderId || '').replace(/^ZB-/, '').trim();
            if (cleanOId === cleanId) {
              return { ...o, ...data, id: o.id || data.id || `ZB-${incomingOrderId}` };
            }
            return o;
          });
        });
      }
    } catch (err) {
      console.error("Failed to parse SSE update data:", err);
    }
  }, { enabled: !!orderIdParam });

  useEffect(() => {
    setActiveDetailSheet(null);
  }, [orderIdParam]);

  useEffect(() => {
    if (!activeDetailSheet) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDetailSheet(null);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDetailSheet]);

  useEffect(() => {
    if (orders.length === 0) {
      setOrderDetail(null);
      return;
    }
    
    let matching = null;
    if (orderIdParam === 'ZB-latest') {
      matching = orders[0];
    } else if (orderIdParam) {
      const cleanParamId = String(orderIdParam).replace(/^ZB-/, '').trim();
      matching = orders.find(o => {
        const cleanOrderId = String(o.id || o.orderId || '').replace(/^ZB-/, '').trim();
        return cleanOrderId === cleanParamId;
      });
    }
    
    setOrderDetail(matching || null);
  }, [orders, orderIdParam]);

  // Smoothly interpolate animationProgress towards orderDetail.gpsProgress from backend
  useEffect(() => {
    if (!orderDetail) return;
    
    const normalized = getNormalizedStatus(orderDetail.status);
    if (normalized === 'OUT_FOR_DELIVERY') {
      const target = orderDetail.gpsProgress || 0;
      
      let animId;
      const step = () => {
        setAnimationProgress(current => {
          const diff = target - current;
          if (Math.abs(diff) < 0.2) {
            return target;
          }
          const next = current + diff * 0.08;
          animId = requestAnimationFrame(step);
          return next;
        });
      };
      animId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animId);
    } else if (normalized === 'DELIVERED') {
      setAnimationProgress(100);
    } else {
      setAnimationProgress(0);
    }
  }, [orderDetail?.gpsProgress, orderDetail?.status]);

  const simulateStatusChange = async (newStatus) => {
    if (!orderDetail) return;
    setSimulatingStatus(newStatus);
    const numericOrderId = parseInt(String(orderDetail.id).replace(/^ZB-/, ''), 10);
    try {
      await axios.post('/api/delivery', { 
        orderId: numericOrderId, 
        status: newStatus 
      });
      setOrderDetail(prev => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to simulate status change:", err);
    } finally {
      setSimulatingStatus(null);
    }
  };

  // Auto-play status simulation pipeline
  useEffect(() => {
    if (!isAutoSimulating || !orderDetail) return;
    
    const currentStatus = getNormalizedStatus(orderDetail.status) || 'PLACED';
    const nextIdx = (stages.indexOf(currentStatus) + 1) % stages.length;
    
    const timeout = setTimeout(async () => {
      await simulateStatusChange(stages[nextIdx]);
      if (nextIdx === stages.length - 1) {
        setIsAutoSimulating(false); // Stop simulation at Delivered
      }
    }, 3500);
    
    return () => clearTimeout(timeout);
  }, [isAutoSimulating, orderDetail?.status]);

  // Confetti celebration burst on Delivered status
  useEffect(() => {
    if (getNormalizedStatus(orderDetail?.status) === 'DELIVERED') {
      const particles = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + 'vw',
        top: '-10px',
        color: ['#f7374f', '#ff4d6a', '#d91f37', '#b91c1c', '#ffe4e8'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4 + 'px',
        delay: Math.random() * 0.5 + 's',
        duration: Math.random() * 2 + 2 + 's',
        angle: Math.random() * 360 + 'deg'
      }));
      setConfetti(particles);
      const timer = setTimeout(() => setConfetti([]), 6000);
      return () => clearTimeout(timer);
    } else {
      setConfetti([]);
    }
  }, [orderDetail?.status]);

  const liveProgress = currentStatus === 'OUT_FOR_DELIVERY' ? animationProgress : orderDetail?.gpsProgress;
  const routeTelemetry = buildOrderRouteTelemetry(orderDetail, currentStatus, liveProgress);
  const trackingMetrics = getOrderTrackingMetrics(orderDetail, currentStatus, liveProgress, routeTelemetry);
  const statusCopy = getStatusCopy(currentStatus, trackingMetrics, routeTelemetry);
  const delayForecastText = getDelayForecastText(orderDetail);
  const receiptDetails = getReceiptDetails(orderDetail);
  const riderProfile = getRiderProfile(orderDetail);

  const getStepClass = (stepName) => {
    if (!orderDetail) return 'pending';
    const stepIdx = stages.indexOf(stepName);
    
    if (currentIdx > stepIdx) return 'completed';
    if (currentIdx === stepIdx) return 'active';
    return 'pending';
  };

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '400px' }}>
        <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
      </div>
    );
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const cleanId = searchId.trim().replace(/^ZB-/, '');
    const found = orders.find(o => {
      const orderCleanId = String(o.id || o.orderId || '').replace(/^ZB-/, '').trim();
      return orderCleanId === cleanId;
    });
    if (found) {
      setSearchError('');
      navigate(`/track-order?orderId=${formatTrackOrderId(found)}`);
    } else {
      setSearchError(`No order found with ID "ZB-${searchId.trim()}".`);
    }
  };

  const activeOrders = orders.filter(o => {
    const s = getNormalizedStatus(o.status);
    return s !== 'DELIVERED' && s !== 'CANCELLED';
  });
  const recentOrders = orders.filter(o => {
    const s = getNormalizedStatus(o.status);
    return s === 'DELIVERED' || s === 'CANCELLED';
  });
  const visibleActiveOrders = activeOrders.slice(0, visibleActiveOrderCount);
  const visibleRecentOrders = recentOrders.slice(0, visibleRecentOrderCount);
  const hasMoreActiveOrders = visibleActiveOrderCount < activeOrders.length;
  const hasMoreRecentOrders = visibleRecentOrderCount < recentOrders.length;
  const currentStatusClass = (currentStatus || 'unknown').toLowerCase().replace(/_/g, '-');
  const currentStatusLabel = currentStatus ? currentStatus.replace(/_/g, ' ') : 'STATUS PENDING';
  const orderDisplayId = formatTrackOrderId(orderDetail) || orderIdParam || '';
  const isSimulatorVisible = import.meta.env.DEV && orderDetail;
  const spotlightOrder = activeOrders[0] || recentOrders[0] || null;
  const spotlightStatus = spotlightOrder ? getNormalizedStatus(spotlightOrder.status) : null;
  const spotlightProgress = spotlightOrder ? getOrderProgressPercent(spotlightOrder.status) : 0;
  const activeEtaValues = activeOrders
    .map(o => getOrderMetricSnapshot(o).etaMinutes)
    .filter(value => Number.isFinite(value));
  const fastestEta = activeEtaValues.length ? Math.min(...activeEtaValues) : null;
  const liveOrderItems = activeOrders.reduce((sum, order) => sum + getOrderItemCount(order), 0);
  const hasActiveItemDetails = activeOrders.some(order => Array.isArray(order?.items));
  const currentTelemetryProgress = Math.round(currentStatus === 'OUT_FOR_DELIVERY' ? animationProgress : linePercent);
  const portalStats = [
    { label: 'Active runs', value: activeOrders.length, helper: hasActiveItemDetails ? `${liveOrderItems} items moving` : 'Items syncing', Icon: Radio, tone: 'live' },
    { label: 'Best ETA', value: fastestEta !== null ? formatEtaLabel(fastestEta) : 'Pending', helper: 'Backend or route ETA', Icon: Clock, tone: 'eta' },
    { label: 'Completed', value: recentOrders.length, helper: 'Recent deliveries', Icon: PackageCheck, tone: 'done' }
  ];
  const availableDetailActions = TRACKING_DETAIL_ACTIONS.filter(action => {
    if (!orderDetail) return false;
    if (action.id === 'partner') return shouldShowRiderPanel(currentStatus, riderProfile);
    if (action.id === 'receipt') return receiptDetails.hasDetails;
    return true;
  });
  const activeDetailConfig = availableDetailActions.find(action => action.id === activeDetailSheet);
  const closeDetailSheet = () => setActiveDetailSheet(null);

  const renderDetailSheetContent = () => {
    if (activeDetailSheet === 'journey') {
      return (
        <div className="track-detail-sheet-card">
          <div className="journey-summary">
            <span>{currentStatusLabel}</span>
            <strong>{Math.round(linePercent)}% milestone progress</strong>
          </div>
          <div className="journey-rail">
            {stages.map((stage, index) => {
              const [title, description] = TRACKING_STEP_COPY[stage] || [stage, 'Status update'];
              return (
                <div key={stage} className={`journey-step ${getStepClass(stage)}`}>
                  <div className="journey-dot">{index + 1}</div>
                  <div className="journey-copy">
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeDetailSheet === 'partner') {
      return (
        <div className="track-detail-sheet-card rider-panel-box">
          {riderProfile.hasDetails ? (
            <>
              <div className="rider-profile">
                <div className="rider-avatar">
                  {(riderProfile.name || 'Delivery Partner').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="rider-info">
                  <h4>{riderProfile.name || 'Delivery partner assigned'}</h4>
                  {riderProfile.vehicle && <p>{riderProfile.vehicle}</p>}
                </div>
                {riderProfile.rating !== null && (
                  <span className="rider-rating">{Number(riderProfile.rating).toFixed(1)}</span>
                )}
              </div>
              {(riderProfile.phone || riderProfile.id) ? (
                <div className="rider-contact-row">
                  {riderProfile.phone && (
                    <button
                      type="button"
                      onClick={() => showAlert(`Calling ${riderProfile.name || 'delivery partner'} at ${riderProfile.phone}...`, 'info')}
                      className="rider-contact-btn call"
                    >
                      <Phone size={14} /> Call
                    </button>
                  )}
                  {riderProfile.id && (
                    <button type="button" onClick={() => setIsChatOpen(prev => !prev)} className="rider-contact-btn chat">
                      <MessageSquare size={14} /> Chat
                    </button>
                  )}
                </div>
              ) : (
                <p className="rider-contact-note">Contact options will appear when the rider profile syncs.</p>
              )}
            </>
          ) : (
            <div className="rider-waiting-box">
              <div className="rider-waiting-spinner" />
              <h4>Assigning rider</h4>
              <p>We are matching your order with a nearby delivery partner.</p>
            </div>
          )}
        </div>
      );
    }

    if (activeDetailSheet === 'receipt') {
      return (
        <div className="track-detail-sheet-card receipt-summary">
          {receiptDetails.paymentMethod && (
            <div className="receipt-row">
              <span><WalletCards size={14} /> Payment mode</span>
              <span>{receiptDetails.paymentMethod}</span>
            </div>
          )}
          {receiptDetails.restaurantName && (
            <div className="receipt-row">
              <span><MapPin size={14} /> Restaurant</span>
              <span>{receiptDetails.restaurantName}</span>
            </div>
          )}
          {receiptDetails.items.length > 0 && (
            <div className="receipt-items">
              <h5>Items</h5>
              {receiptDetails.items.map((item, idx) => {
                const rawQty = Number(item.qty || item.quantity || 1);
                const qty = Number.isFinite(rawQty) && rawQty > 0 ? rawQty : 1;
                const itemName = getTextValue(item.name || item.menuName || item.title) || `Item ${item.id || idx + 1}`;
                const unitPrice = getFirstNumber(item, ['price', 'unitPrice']);
                const lineAmount = getFirstNumber(item, ['lineTotal', 'subTotal', 'subtotal', 'amount']);
                const itemAmount = lineAmount ?? (unitPrice !== null ? unitPrice * qty : null);
                return (
                  <div key={`${itemName}-${item.id || idx}`} className="receipt-row">
                    <span>{itemName} x {qty}</span>
                    <span>{itemAmount !== null ? `\u20b9${itemAmount.toFixed(2)}` : 'Amount syncing'}</span>
                  </div>
                );
              })}
            </div>
          )}
          {receiptDetails.totalAmount !== null && (
            <div className="receipt-total receipt-row">
              <strong>Order total</strong>
              <strong>&#8377;{receiptDetails.totalAmount.toFixed(2)}</strong>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const ActiveDetailIcon = activeDetailConfig?.Icon;
  const detailSheet = activeDetailConfig && orderDetail ? createPortal(
    <div
      className="track-detail-sheet-backdrop"
      role="presentation"
      onClick={closeDetailSheet}
    >
      <section
        className="track-detail-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="track-detail-sheet-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="track-detail-sheet-handle" aria-hidden="true" />
        <div className="track-detail-sheet-header">
          <div>
            <span className="track-detail-sheet-kicker">
              {ActiveDetailIcon && <ActiveDetailIcon size={15} />}
              Tracking detail
            </span>
            <h3 id="track-detail-sheet-title">{activeDetailConfig.label}</h3>
            <p>{activeDetailConfig.helper}</p>
          </div>
          <button
            type="button"
            className="track-detail-sheet-close"
            onClick={closeDetailSheet}
            aria-label={`Close ${activeDetailConfig.label}`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="track-detail-sheet-content">
          {renderDetailSheetContent()}
        </div>
      </section>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {!user ? (
        <div className="tracking-portal-empty fade-in page-enter">
          <MapPin size={52} color="var(--brand-red)" />
          <h2>Track Your Order</h2>
          <p>Please log in to track active deliveries, open rider chat, and view your order history.</p>
          <button onClick={() => navigate('/login?redirect=/track-order')} className="track-button-link" type="button">
            Log in to track
          </button>
        </div>
      ) : !orderIdParam ? (
        <div className="track-portal fade-in page-enter">
          <section className="track-portal-hero">
            <div className="track-hero-copy">
              <span className="track-portal-eyebrow"><Radio size={16} /> Premium order command</span>
              <h1 className="track-portal-title">Track every delivery with executive clarity</h1>
              <p className="track-portal-subtitle">
                Live kitchen status, rider handoff, route movement, and receipt details stay organized in one polished ZingBite portal.
              </p>
              <div className="track-portal-stat-strip">
                {portalStats.map(({ label, value, helper, Icon, tone }) => (
                  <div key={label} className={`track-portal-stat tone-${tone}`}>
                    <span className="track-portal-stat-icon"><Icon size={18} /></span>
                    <span>
                      <strong>{value}</strong>
                      <small>{label}</small>
                    </span>
                    <em>{helper}</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="track-command-panel">
              <div className="command-panel-top">
                <span><ShieldCheck size={16} /> Customer portal</span>
                <strong>{ordersLoading ? 'Syncing' : `${orders.length} orders`}</strong>
              </div>

              <form onSubmit={handleSearchSubmit} className="tracking-search-form">
                <div className="search-input-wrapper">
                  <Search className="search-icon-inside" size={18} />
                  <input
                    type="text"
                    placeholder="Enter Order ID, for example ZB-2"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                  <button type="submit" className="search-submit-btn">
                    <Navigation size={16} /> Track
                  </button>
                </div>
                {searchError && (
                  <p className="search-error-text">
                    <AlertCircle size={14} /> {searchError}
                  </p>
                )}
              </form>

              <div className="track-spotlight">
                <div className="spotlight-label">
                  <Route size={15} /> Priority watch
                </div>
                {spotlightOrder ? (
                  <>
                    <div className="spotlight-main">
                      <div>
                        <strong>{formatTrackOrderId(spotlightOrder)}</strong>
                        <span>{getDisplayRestaurantName(spotlightOrder) || 'Restaurant details pending'}</span>
                      </div>
                      <span className={`status-chip status-${getStatusToneClass(spotlightOrder.status)}`}>
                        {spotlightStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="spotlight-progress">
                      <span style={{ width: `${spotlightProgress}%` }} />
                    </div>
                  </>
                ) : (
                  <p>No orders are currently queued in your tracking portal.</p>
                )}
              </div>
            </div>
          </section>

          <section className="track-section">
            <h2 className="portal-section-title">
              <Clock size={18} color="var(--brand-red)" /> Active deliveries
            </h2>

            {ordersLoading ? (
              <div className="track-page-loader">
                <Loader size={26} className="spin" color="var(--brand-red)" />
                <p>Loading active deliveries...</p>
              </div>
            ) : activeOrders.length === 0 ? (
              <div className="empty-active-orders">
                <p><strong>No active deliveries</strong></p>
                <p>You do not have any orders in progress right now.</p>
              </div>
            ) : (
              <div className="active-orders-grid">
                {visibleActiveOrders.map(o => {
                  const status = getNormalizedStatus(o.status);
                  const progress = getOrderProgressPercent(o.status);
                  const etaLabel = getOrderMetricSnapshot(o).etaLabel;
                  const itemCount = getOrderItemCount(o);
                  return (
                    <article key={formatTrackOrderId(o)} className="active-order-card" style={{ '--order-progress': `${progress}%` }}>
                      <div className="active-order-info">
                        <div className="active-card-topline">
                          <span className="tracking-id-pill">{formatTrackOrderId(o)}</span>
                          <span className={`status-chip status-${getStatusToneClass(o.status)}`}>{status.replace(/_/g, ' ')}</span>
                        </div>
                        <h3>{getDisplayRestaurantName(o) || 'Restaurant details pending'}</h3>
                        <p className="active-order-meta">
                          {Array.isArray(o.items) ? `${itemCount} items prepared for this delivery run` : 'Item details syncing'}
                        </p>
                        <div className="active-order-progress" aria-hidden="true">
                          <span />
                        </div>
                        <div className="active-order-metrics">
                          <span><Clock size={14} /> {etaLabel || 'ETA pending'}</span>
                          <span><Route size={14} /> {progress}% ready</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/track-order?orderId=${formatTrackOrderId(o)}`)}
                        className="track-button-link"
                      >
                        <MapPin size={16} /> Track live
                      </button>
                    </article>
                  );
                })}
                {hasMoreActiveOrders && (
                  <div className="load-more-wrap">
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleActiveOrderCount(count => count + TRACKING_ORDER_PAGE_SIZE)}
                    >
                      Load more active orders ({activeOrders.length - visibleActiveOrderCount} left) <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="track-section">
            <h2 className="portal-section-title">
              <CheckCircle2 size={18} color="var(--brand-red)" /> Recently delivered
            </h2>

            {ordersLoading ? (
              <div className="track-page-loader">
                <Loader size={26} className="spin" color="var(--brand-red)" />
                <p>Loading order history...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="empty-active-orders">
                <p>No recently delivered orders found.</p>
              </div>
            ) : (
              <div className="recent-orders-list">
                {visibleRecentOrders.map(o => {
                  const amount = getOrderTotalAmount(o);
                  const secondaryDetails = [
                    getTextValue(o.date) || 'Date syncing',
                    amount !== null ? `\u20b9${amount.toFixed(2)}` : null
                  ].filter(Boolean).join(' - ');

                  return (
                    <article key={formatTrackOrderId(o)} className="recent-order-item">
                      <div className="recent-order-details">
                        <div className="active-card-topline">
                          <span className="tracking-id-pill">{formatTrackOrderId(o)}</span>
                          <span className={`status-chip status-${getStatusToneClass(o.status)}`}>
                            {getNormalizedStatus(o.status).replace(/_/g, ' ')}
                          </span>
                        </div>
                        <h4>{getDisplayRestaurantName(o) || 'Restaurant details pending'}</h4>
                        <p>{secondaryDetails || 'Order details syncing'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(`/track-order?orderId=${formatTrackOrderId(o)}`)}
                        className="view-track-history-btn"
                      >
                        <ReceiptText size={15} /> View history
                      </button>
                    </article>
                  );
                })}
                {hasMoreRecentOrders && (
                  <div className="load-more-wrap">
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleRecentOrderCount(count => count + TRACKING_ORDER_PAGE_SIZE)}
                    >
                      Load more history ({recentOrders.length - visibleRecentOrderCount} left) <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      ) : ordersLoading && !orderDetail ? (
        <div className="track-page-loader">
          <Loader size={36} className="spin" color="var(--brand-red)" />
          <p>Locating your order run...</p>
        </div>
      ) : !orderDetail ? (
        <div className="tracking-portal-empty fade-in page-enter">
          <AlertCircle size={52} color="var(--brand-red)" />
          <h2>Order Not Found</h2>
          <p>We could not find any active or past order matching ID "{orderIdParam}".</p>
          <div className="track-empty-actions">
            <button onClick={() => navigate('/track-order')} className="track-button-link" type="button">
              Back to portal
            </button>
            <button onClick={() => navigate('/')} className="view-track-history-btn" type="button">
              Go home
            </button>
          </div>
        </div>
      ) : getNormalizedStatus(orderDetail.status) === 'PENDING_PAYMENT' ? (
        <div className="tracking-portal-empty fade-in page-enter">
          <div className="rider-waiting-spinner" />
          <h2>Verifying Your Payment</h2>
          <p>
            We are confirming your transaction with your bank. This page will update automatically as soon as payment is confirmed.
          </p>
          <div className="track-mini-stat">
            <div className="track-mini-label">{orderDisplayId}</div>
            <div className="track-mini-value">
              {receiptDetails.totalAmount !== null ? `Total: \u20b9${receiptDetails.totalAmount.toFixed(2)}` : 'Total syncing'}
            </div>
          </div>
        </div>
      ) : (
        <div className={`track-live-shell track-status-${currentStatusClass} fade-in page-enter`}>
          <div className="track-live-toolbar">
            <button onClick={() => navigate('/track-order')} className="back-home-btn" type="button">
              <ArrowLeft size={16} /> Back to tracker portal
            </button>
            <div className="track-detail-actions" aria-label="Tracking detail panels">
              {availableDetailActions.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={`track-detail-action ${activeDetailSheet === id ? 'active' : ''}`}
                  aria-pressed={activeDetailSheet === id}
                  onClick={() => setActiveDetailSheet(id)}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {sseReconnecting && (
            <div className="sse-reconnecting-banner">
              <Loader size={14} className="spin" />
              <span>Reconnecting to live updates…</span>
            </div>
          )}
          {!sseConnected && !sseReconnecting && orderIdParam && (
            <div className="sse-disconnected-banner">
              <AlertCircle size={14} />
              <span>Live updates unavailable. Data may be stale.</span>
            </div>
          )}

          <div className="track-live-grid">
            <section className="track-map-panel" aria-label="Live delivery map">
              <div className="track-status-card">
                <div className="track-status-topline">
                  <div>
                    <div className="track-status-kicker">{currentStatusLabel}</div>
                    <span className="track-order-id">{orderDisplayId}</span>
                  </div>
                  <div className="track-status-orbit" aria-hidden="true">
                    <Navigation size={20} />
                  </div>
                </div>
                <h1 className="track-status-heading">{statusCopy.heading}</h1>
                <p className="track-status-subtitle">{statusCopy.subtitle}</p>

                {delayForecastText && (
                  <div className="track-delay-chip">
                    <Sparkles size={14} /> {delayForecastText}
                  </div>
                )}

                <div className="track-status-progress" style={{ '--status-progress': `${currentTelemetryProgress}%` }} aria-hidden="true">
                  <span />
                </div>

                <div className="track-status-meta">
                  <div className="track-mini-stat">
                    <div className="track-mini-label">Order</div>
                    <div className="track-mini-value">{orderDisplayId}</div>
                  </div>
                  <div className="track-mini-stat">
                    <div className="track-mini-label">ETA</div>
                    <div className="track-mini-value">{trackingMetrics.etaLabel || 'Pending'}</div>
                  </div>
                  {trackingMetrics.distanceLabel && (
                    <div className="track-mini-stat">
                      <div className="track-mini-label">Distance</div>
                      <div className="track-mini-value">{trackingMetrics.distanceLabel}</div>
                    </div>
                  )}
                  <div className="track-mini-stat">
                    <div className="track-mini-label">Progress</div>
                    <div className="track-mini-value">{currentTelemetryProgress}%</div>
                  </div>
                </div>
              </div>

              <ActiveOrderMap
                orderDetail={orderDetail}
                routeTelemetry={routeTelemetry}
              />
            </section>

          </div>
        </div>
      )}

      {detailSheet}

      {isSimulatorVisible && (
        <>
          <button
            className="simulator-trigger-btn"
            onClick={() => setShowSimulator(prev => !prev)}
            title="Toggle Order Status Simulator"
            type="button"
          >
            <Settings size={22} className={showSimulator ? 'spin' : ''} />
          </button>

          <div className={`simulator-panel ${showSimulator ? 'show' : ''}`}>
            <div className="simulator-header">
              <h4 className="simulator-title"><Settings size={16} /> Simulator</h4>
              <button
                type="button"
                onClick={() => setIsAutoSimulating(prev => !prev)}
                className={`simulator-btn ${isAutoSimulating ? 'active' : ''}`}
              >
                {isAutoSimulating ? 'Stop auto' : 'Auto play'}
              </button>
            </div>
            <p className="simulator-copy">
              Simulate restaurant and rider actions on the active order (<strong>{orderDisplayId}</strong>) to test animations.
            </p>
            <div className="simulator-grid">
              {stages.map((stage) => {
                const isActive = currentStatus === stage;
                const isPending = simulatingStatus === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    disabled={simulatingStatus !== null}
                    onClick={() => simulateStatusChange(stage)}
                    className={`simulator-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{stage}</span>
                    {isPending ? (
                      <span className="rider-waiting-spinner simulator-mini-spinner" />
                    ) : isActive ? (
                      <CheckCircle2 size={12} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Confetti Celebration Overlay */}
      {confetti.map(p => (
        <div 
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.angle})`
          }}
        />
      ))}

      {isChatOpen && orderDetail && riderProfile.id && (
        <ChatWidget
          key={orderDetail.id}
          type="order"
          targetId={parseInt(String(orderDetail.id).replace(/^ZB-/, ''), 10)}
          userId={user?.userID || user?.userId}
          userName={user?.userName || user?.username}
          receiverId={riderProfile.id}
          initialOpen={true}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
};

export default OrderTracking;
