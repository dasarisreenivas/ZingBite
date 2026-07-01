import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  CheckCircle2, Clock, MapPin, Bike, ShoppingBag, 
  ChevronRight, Phone, MessageSquare, AlertCircle, ArrowLeft,
  Settings, Loader, Search, Sparkles, Radio, ShieldCheck,
  Route, ReceiptText, Navigation, PackageCheck, WalletCards
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import ChatWidget from '../components/ChatWidget';
import useSSE from '../hooks/useSSE';
import useLeaflet from '../hooks/useLeaflet';
import '../styles/order-tracking.css';

const TRACKING_ORDER_PAGE_SIZE = 5;

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

const ActiveOrderMap = ({ orderDetail, currentLat, currentLng, isRealGPS }) => {
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

  // Initialize Map Structure
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    if (!L) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([12.977, 77.601], 14);
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

    return () => {
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
    };
  }, [leafletLoaded, orderDetail?.id, L]);

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

    // 2. Resolve coordinates
    let restCoords = [12.9716, 77.5946];
    let custCoords = [12.9821, 77.6085];

    if (orderDetail?.pathFM && orderDetail.pathFM.length > 0) {
      const lastNode = orderDetail.pathFM[orderDetail.pathFM.length - 1];
      restCoords = [lastNode.latitude, lastNode.longitude];
    }
    if (orderDetail?.pathLM1 && orderDetail.pathLM1.length > 0) {
      const lastNode = orderDetail.pathLM1[orderDetail.pathLM1.length - 1];
      custCoords = [lastNode.latitude, lastNode.longitude];
    }

    // 3. Create or Update Markers
    if (!restaurantMarkerRef.current) {
      restaurantMarkerRef.current = L.marker(restCoords, { icon: restaurantIcon }).addTo(map).bindPopup('<b>ZingBite Kitchen (Restaurant)</b>');
    } else {
      restaurantMarkerRef.current.setLatLng(restCoords);
    }

    if (!customerMarkerRef.current) {
      customerMarkerRef.current = L.marker(custCoords, { icon: customerIcon }).addTo(map).bindPopup('<b>Delivery Address (Home)</b>');
    } else {
      customerMarkerRef.current.setLatLng(custCoords);
    }

    if (!riderMarkerRef.current) {
      riderMarkerRef.current = L.marker([currentLat, currentLng], { icon: riderIcon }).addTo(map).bindPopup('<b>Rider (Live Location)</b>');
    } else {
      riderMarkerRef.current.setLatLng([currentLat, currentLng]);
    }

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

    // 5. Draw VRP Paths if available
    let drawn = false;
    if (orderDetail?.pathFM && orderDetail.pathFM.length > 0) {
      const latlngsFM = orderDetail.pathFM.map(n => [n.latitude, n.longitude]);
      polylineFMRef.current = L.polyline(latlngsFM, { color: '#f7374f', weight: 4, opacity: 0.86 }).addTo(map);
      drawn = true;
    }
    if (orderDetail?.pathLM1 && orderDetail.pathLM1.length > 0) {
      const latlngsLM = orderDetail.pathLM1.map(n => [n.latitude, n.longitude]);
      polylineLMRef.current = L.polyline(latlngsLM, { color: '#b91c1c', weight: 4, opacity: 0.82, dashArray: '6, 6' }).addTo(map);
      drawn = true;
    }

    // Fallback static path if VRP paths are not available
    if (!drawn) {
      const fallbackPoints = [
        [currentLat, currentLng],
        restCoords,
        custCoords
      ];
      routePolylineRef.current = L.polyline(fallbackPoints, { color: '#f7374f', weight: 4, opacity: 0.78, dashArray: '8, 8' }).addTo(map);
    }

    // 6. Fit map bounds to cover all points only once on initial load
    if (!hasCenteredRef.current) {
      const bounds = L.latLngBounds([
        [currentLat, currentLng],
        restCoords,
        custCoords
      ]);
      map.fitBounds(bounds, { padding: [40, 40] });
      hasCenteredRef.current = true;
    }

  }, [leafletLoaded, orderDetail?.pathFM, orderDetail?.pathLM1, currentLat, currentLng, recenterCount, L]);

  const handleRecenter = () => {
    hasCenteredRef.current = false;
    setRecenterCount(prev => prev + 1);
  };

  return (
    <div className="tracking-map-shell">
      <div className="map-overlay-text" style={{ zIndex: 10 }}>
        {isRealGPS ? 'Live GPS map' : 'Projected route map'}
      </div>

      <div className="map-route-legend" aria-hidden="true">
        <span><i className="legend-dot restaurant" /> Kitchen</span>
        <span><i className="legend-dot rider" /> Rider</span>
        <span><i className="legend-dot customer" /> You</span>
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

  const stages = ['PLACED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const getNormalizedStatus = (status) => {
    let s = String(status || '').trim().toUpperCase().replace(/[\s-]/g, '_');
    if (s === 'ORDER_PLACED') return 'PLACED';
    if (s === 'ORDER_ACCEPTED') return 'ACCEPTED';
    if (s === 'PREPARING_FOOD') return 'PREPARING';
    if (s === 'WAITING_TO_DISPATCH' || s === 'FOOD_READY') return 'READY_FOR_PICKUP';
    return s;
  };
  const getOrderStageIndex = (status) => {
    const idx = stages.indexOf(getNormalizedStatus(status));
    return idx >= 0 ? idx : 0;
  };
  const getOrderProgressPercent = (status) => Math.round((getOrderStageIndex(status) / (stages.length - 1)) * 100);
  const getEstimatedEta = (status, progress = 0) => {
    const normalized = getNormalizedStatus(status);
    const deliveryProgress = typeof progress === 'number' && !isNaN(progress) ? progress : 0;
    if (normalized === 'DELIVERED') return 0;
    if (normalized === 'OUT_FOR_DELIVERY') return Math.max(1, Math.round(10 * (1 - deliveryProgress / 100)));
    if (normalized === 'PICKED_UP') return 12;
    if (normalized === 'READY_FOR_PICKUP') return 15;
    if (normalized === 'PREPARING') return 18;
    if (normalized === 'ACCEPTED') return 22;
    return 25;
  };
  const getStatusToneClass = (status) => getNormalizedStatus(status).toLowerCase().replace(/_/g, '-');
  const getOrderItemCount = (order) => {
    if (!Array.isArray(order?.items)) return 0;
    return order.items.reduce((total, item) => total + Number(item.qty || item.quantity || 1), 0);
  };
  const currentIdx = orderDetail ? stages.indexOf(getNormalizedStatus(orderDetail.status) || 'PLACED') : 0;
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
      if (data && String(data.orderId) === cleanId) {
        // Play sound on status change
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav');
          audio.volume = 0.4;
          audio.play();
        } catch {
          // Browser autoplay policies can block this cue; tracking continues silently.
        }

        setOrders(prevOrders => {
          const cleanNewOId = String(data.orderId).trim();
          const exists = prevOrders.some(o => String(o.id || o.orderId || '').replace(/^ZB-/, '').trim() === cleanNewOId);
          if (!exists) {
            const newO = {
              id: "ZB-" + data.orderId,
              status: data.status,
              gpsProgress: data.gpsProgress,
              gpsCoordinates: data.gpsCoordinates,
              pathFM: data.pathFM,
              pathLM1: data.pathLM1,
              riderName: data.riderName,
              riderId: data.riderId
            };
            return [...prevOrders, newO];
          }
          return prevOrders.map(o => {
            const cleanOId = String(o.id || o.orderId || '').replace(/^ZB-/, '').trim();
            if (cleanOId === cleanId) {
              const updatedOrder = { ...o };
              if (data.status) updatedOrder.status = data.status;
              if (data.gpsProgress !== undefined) updatedOrder.gpsProgress = data.gpsProgress;
              if (data.gpsCoordinates !== undefined) updatedOrder.gpsCoordinates = data.gpsCoordinates;
              if (data.pathFM !== undefined) updatedOrder.pathFM = data.pathFM;
              if (data.pathLM1 !== undefined) updatedOrder.pathLM1 = data.pathLM1;
              if (data.riderName !== undefined) updatedOrder.riderName = data.riderName;
              if (data.riderId !== undefined) updatedOrder.riderId = data.riderId;
              return updatedOrder;
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

  // Resolve active telemetry latitude and longitude
  let currentLat = 12.9716;
  let currentLng = 77.5946;
  let isRealGPS = false;

  if (orderDetail && orderDetail.gpsCoordinates) {
    const parts = orderDetail.gpsCoordinates.split(',');
    if (parts.length === 2) {
      const plat = parseFloat(parts[0]);
      const plng = parseFloat(parts[1]);
      if (!isNaN(plat) && !isNaN(plng)) {
        currentLat = plat;
        currentLng = plng;
        isRealGPS = true;
      }
    }
  }

  if (!isRealGPS && orderDetail) {
    let pathPoints = [];
    const normalized = getNormalizedStatus(orderDetail.status);
    if (normalized === 'OUT_FOR_DELIVERY') {
      if (orderDetail.pathLM1 && orderDetail.pathLM1.length > 0) {
        pathPoints = orderDetail.pathLM1.map(n => [n ? n.latitude : undefined, n ? n.longitude : undefined]).filter(p => p[0] !== undefined && p[1] !== undefined);
      }
    } else {
      if (orderDetail.pathFM && orderDetail.pathFM.length > 0) {
        pathPoints = orderDetail.pathFM.map(n => [n ? n.latitude : undefined, n ? n.longitude : undefined]).filter(p => p[0] !== undefined && p[1] !== undefined);
      }
    }

    if (pathPoints.length > 0) {
      const pos = interpolatePolyline(pathPoints, animationProgress);
      if (pos && typeof pos[0] === 'number' && !isNaN(pos[0]) && typeof pos[1] === 'number' && !isNaN(pos[1])) {
        currentLat = pos[0];
        currentLng = pos[1];
      }
    } else {
      const progress = typeof animationProgress === 'number' && !isNaN(animationProgress) ? animationProgress : 0;
      currentLat = (12.9716 + 0.0105 * (progress / 100));
      currentLng = (77.5946 + 0.0139 * (progress / 100));
    }
  }

  // Map helper hooks and telemetry triggers are encapsulated in the ActiveOrderMap component below

  // Dynamic status details
  let etaVal = 25;
  let distanceLeftVal = "3.5 km";
  let displayHeading = "Order Placed";
  let displaySubtitle = "Your food is being processed.";
  
  if (orderDetail) {
    const status = getNormalizedStatus(orderDetail.status);
    if (status === 'PLACED') {
      etaVal = 25;
      distanceLeftVal = "3.5 km";
      displayHeading = "Order Placed";
      displaySubtitle = "The restaurant is reviewing your order.";
    } else if (status === 'ACCEPTED') {
      etaVal = 22;
      distanceLeftVal = "3.5 km";
      displayHeading = "Order Confirmed";
      displaySubtitle = "The restaurant has accepted and will start preparing shortly.";
    } else if (status === 'PREPARING') {
      etaVal = 18;
      distanceLeftVal = "3.5 km";
      displayHeading = "Preparing Food";
      displaySubtitle = "Our kitchen partners are cooking your hot fresh meal.";
    } else if (status === 'READY_FOR_PICKUP' || status === 'WAITING_TO_DISPATCH') {
      etaVal = 15;
      distanceLeftVal = "3.5 km";
      displayHeading = "Food Ready";
      displaySubtitle = "Your food is ready and waiting for rider pickup.";
    } else if (status === 'PICKED_UP') {
      etaVal = 12;
      distanceLeftVal = "3.5 km";
      displayHeading = "Picked Up";
      displaySubtitle = "Rider has collected your order and is departing restaurant.";
    } else if (status === 'OUT_FOR_DELIVERY') {
      const progress = typeof animationProgress === 'number' && !isNaN(animationProgress) ? animationProgress : 0;
      const remaining = 1 - (progress / 100);
      etaVal = Math.max(1, Math.round(10 * remaining));
      distanceLeftVal = (3.2 * remaining).toFixed(1) + " km";
      
      displayHeading = `Arriving in ${etaVal} mins`;
      const latStr = (typeof currentLat === 'number' && !isNaN(currentLat)) ? currentLat.toFixed(5) : '12.97160';
      const lngStr = (typeof currentLng === 'number' && !isNaN(currentLng)) ? currentLng.toFixed(5) : '77.59460';
      displaySubtitle = `Rider is on the way! Distance left: ${distanceLeftVal} (${isRealGPS ? 'Live GPS' : 'Projected'}: ${latStr} deg N, ${lngStr} deg E)`;
    } else if (status === 'DELIVERED') {
      etaVal = 0;
      distanceLeftVal = "0 km";
      displayHeading = "Order Delivered!";
      displaySubtitle = "Enjoy your delicious hot meal!";
    }
  }

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
  const currentStatus = orderDetail ? getNormalizedStatus(orderDetail.status) : 'PLACED';
  const currentStatusClass = currentStatus.toLowerCase().replace(/_/g, '-');
  const orderDisplayId = formatTrackOrderId(orderDetail) || orderIdParam || '';
  const isSimulatorVisible = import.meta.env.DEV && orderDetail;
  const spotlightOrder = activeOrders[0] || recentOrders[0] || null;
  const spotlightStatus = spotlightOrder ? getNormalizedStatus(spotlightOrder.status) : null;
  const spotlightProgress = spotlightOrder ? getOrderProgressPercent(spotlightOrder.status) : 0;
  const fastestEta = activeOrders.length
    ? Math.min(...activeOrders.map(o => getEstimatedEta(o.status, o.gpsProgress)))
    : 0;
  const liveOrderItems = activeOrders.reduce((sum, order) => sum + getOrderItemCount(order), 0);
  const channelStatusClass = sseConnected ? 'synced' : sseReconnecting ? 'reconnecting' : 'idle';
  const channelStatusLabel = sseConnected ? 'Live channel synced' : sseReconnecting ? 'Reconnecting live channel' : 'Live channel standing by';
  const currentTelemetryProgress = Math.round(currentStatus === 'OUT_FOR_DELIVERY' ? animationProgress : linePercent);
  const portalStats = [
    { label: 'Active runs', value: activeOrders.length, helper: `${liveOrderItems} items moving`, Icon: Radio, tone: 'live' },
    { label: 'Best ETA', value: activeOrders.length ? `${fastestEta} min` : 'Idle', helper: 'Fastest live order', Icon: Clock, tone: 'eta' },
    { label: 'Completed', value: recentOrders.length, helper: 'Recent deliveries', Icon: PackageCheck, tone: 'done' }
  ];

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
                        <span>{spotlightOrder.restaurantName || 'ZingBite Kitchen'}</span>
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
                  const eta = getEstimatedEta(o.status, o.gpsProgress);
                  return (
                    <article key={formatTrackOrderId(o)} className="active-order-card" style={{ '--order-progress': `${progress}%` }}>
                      <div className="active-order-info">
                        <div className="active-card-topline">
                          <span className="tracking-id-pill">{formatTrackOrderId(o)}</span>
                          <span className={`status-chip status-${getStatusToneClass(o.status)}`}>{status.replace(/_/g, ' ')}</span>
                        </div>
                        <h3>{o.restaurantName || 'ZingBite Kitchen'}</h3>
                        <p className="active-order-meta">
                          {getOrderItemCount(o)} items prepared for this delivery run
                        </p>
                        <div className="active-order-progress" aria-hidden="true">
                          <span />
                        </div>
                        <div className="active-order-metrics">
                          <span><Clock size={14} /> {eta} min ETA</span>
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
                {visibleRecentOrders.map(o => (
                  <article key={formatTrackOrderId(o)} className="recent-order-item">
                    <div className="recent-order-details">
                      <div className="active-card-topline">
                        <span className="tracking-id-pill">{formatTrackOrderId(o)}</span>
                        <span className={`status-chip status-${getStatusToneClass(o.status)}`}>
                          {getNormalizedStatus(o.status).replace(/_/g, ' ')}
                        </span>
                      </div>
                      <h4>{o.restaurantName || 'ZingBite Kitchen'}</h4>
                      <p>{o.date || 'Recently'} - &#8377;{Number(o.total || o.totalAmount || 0).toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/track-order?orderId=${formatTrackOrderId(o)}`)}
                      className="view-track-history-btn"
                    >
                      <ReceiptText size={15} /> View history
                    </button>
                  </article>
                ))}
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
            <div className="track-mini-value">Total: &#8377;{Number(orderDetail.total || orderDetail.totalAmount || 0).toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className={`track-live-shell track-status-${currentStatusClass} fade-in page-enter`}>
          <div className="track-live-toolbar">
            <button onClick={() => navigate('/track-order')} className="back-home-btn" type="button">
              <ArrowLeft size={16} /> Back to tracker portal
            </button>
            <div className={`track-live-channel ${channelStatusClass}`}>
              <Radio size={16} />
              <span>{channelStatusLabel}</span>
            </div>
          </div>

          <div className="track-live-grid">
            <section className="track-map-panel" aria-label="Live delivery map">
              <div className="track-status-card">
                <div className="track-status-topline">
                  <div>
                    <div className="track-status-kicker">{currentStatus.replace(/_/g, ' ')}</div>
                    <span className="track-order-id">{orderDisplayId}</span>
                  </div>
                  <div className="track-status-orbit" aria-hidden="true">
                    <Navigation size={20} />
                  </div>
                </div>
                <h1 className="track-status-heading">{displayHeading}</h1>
                <p className="track-status-subtitle">{displaySubtitle}</p>

                {currentStatus === 'OUT_FOR_DELIVERY' && (
                  <div className="track-delay-chip">
                    <Sparkles size={14} /> AI delay forecast: Heavy monsoon rain on route. ETA adjusted (+3 mins).
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
                    <div className="track-mini-value">{etaVal > 0 ? `${etaVal} min` : 'Arrived'}</div>
                  </div>
                  <div className="track-mini-stat">
                    <div className="track-mini-label">Distance</div>
                    <div className="track-mini-value">{distanceLeftVal}</div>
                  </div>
                  <div className="track-mini-stat">
                    <div className="track-mini-label">Progress</div>
                    <div className="track-mini-value">{currentTelemetryProgress}%</div>
                  </div>
                </div>
              </div>

              <ActiveOrderMap
                orderDetail={orderDetail}
                currentLat={currentLat}
                currentLng={currentLng}
                isRealGPS={isRealGPS}
              />
            </section>

            <aside className="track-side-panel" aria-label="Tracking details">
              <section className="track-side-card">
                <h2 className="track-side-card-header"><Clock size={18} color="var(--brand-red)" /> Delivery journey</h2>
                <div className="journey-summary">
                  <span>{currentStatus.replace(/_/g, ' ')}</span>
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
              </section>

              <section className="track-side-card rider-panel-box">
                <h2 className="rider-card-header"><Bike size={18} color="var(--brand-red)" /> Delivery partner</h2>
                {orderDetail.riderName ? (
                  <>
                    <div className="rider-profile">
                      <div className="rider-avatar">
                        {orderDetail.riderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="rider-info">
                        <h4>{orderDetail.riderName}</h4>
                        <p>Splendor (KA-03-EX-9921)</p>
                      </div>
                      <span className="rider-rating">4.9</span>
                    </div>
                    <div className="rider-contact-row">
                      <button
                        type="button"
                        onClick={() => showAlert(`Calling rider ${orderDetail.riderName} at ${orderDetail.riderPhone || 'registered number'}...`, 'info')}
                        className="rider-contact-btn call"
                      >
                        <Phone size={14} /> Call
                      </button>
                      <button type="button" onClick={() => setIsChatOpen(prev => !prev)} className="rider-contact-btn chat">
                        <MessageSquare size={14} /> Chat
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rider-waiting-box">
                    <div className="rider-waiting-spinner" />
                    <h4>Assigning rider</h4>
                    <p>We are matching your order with a nearby delivery partner.</p>
                  </div>
                )}
              </section>

              <section className="track-side-card receipt-summary">
                <h2 className="track-side-card-header"><ShoppingBag size={18} color="var(--brand-red)" /> Order receipt</h2>
                <div className="receipt-row">
                  <span><WalletCards size={14} /> Payment mode</span>
                  <span>{orderDetail.paymentMethod || 'Online'}</span>
                </div>
                <div className="receipt-row">
                  <span><MapPin size={14} /> Restaurant</span>
                  <span>{orderDetail.restaurantName || 'ZingBite Kitchen'}</span>
                </div>
                {orderDetail.items && orderDetail.items.length > 0 && (
                  <div className="receipt-items">
                    <h5>Items</h5>
                    {orderDetail.items.map((item, idx) => (
                      <div key={`${item.name || item.id}-${item.qty}-${idx}`} className="receipt-row">
                        <span>{item.name || 'Menu item'} x {item.qty || item.quantity || 1}</span>
                        <span>&#8377;{(Number(item.price || 0) * Number(item.qty || item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="receipt-total receipt-row">
                  <strong>Amount paid</strong>
                  <strong>&#8377;{Number(orderDetail.total || orderDetail.totalAmount || 0).toFixed(2)}</strong>
                </div>
              </section>
            </aside>
          </div>
        </div>
      )}

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

      {isChatOpen && orderDetail && orderDetail.riderId && (
        <ChatWidget
          key={orderDetail.id}
          type="order"
          targetId={parseInt(String(orderDetail.id).replace(/^ZB-/, ''), 10)}
          userId={user?.userID || user?.userId}
          userName={user?.userName || user?.username}
          receiverId={orderDetail.riderId}
          initialOpen={true}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
};

export default OrderTracking;
