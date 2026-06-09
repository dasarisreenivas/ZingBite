import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  CheckCircle2, Clock, MapPin, Bike, ShoppingBag, 
  ChevronRight, Phone, MessageSquare, AlertCircle, ArrowLeft,
  Settings, Loader, Search, Sparkles
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import ChatWidget from '../components/ChatWidget';

const TRACKING_ORDER_PAGE_SIZE = 5;

const ActiveOrderMap = ({ orderDetail, leafletLoaded, currentLat, currentLng, isRealGPS }) => {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const riderMarkerRef = React.useRef(null);
  const restaurantMarkerRef = React.useRef(null);
  const customerMarkerRef = React.useRef(null);
  const routePolylineRef = React.useRef(null);
  const polylineFMRef = React.useRef(null);
  const polylineLMRef = React.useRef(null);

  // Initialize Map Structure
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    const L = window.L;
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
  }, [leafletLoaded, orderDetail?.id]);

  // Handle Markers & Path rendering dynamically
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const L = window.L;
    if (!L) return;

    // 1. Setup Icons
    const restaurantIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">🍳</div>`,
      className: 'custom-map-marker-restaurant',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const customerIcon = L.divIcon({
      html: `<div style="font-size: 24px; text-align: center; line-height: 24px;">🏠</div>`,
      className: 'custom-map-marker-customer',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const riderIcon = L.divIcon({
      html: `<div style="font-size: 28px; text-align: center; line-height: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">🛵</div>`,
      className: 'custom-map-marker-rider',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
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
      polylineFMRef.current = L.polyline(latlngsFM, { color: '#06b6d4', weight: 4, opacity: 0.8 }).addTo(map);
      drawn = true;
    }
    if (orderDetail?.pathLM1 && orderDetail.pathLM1.length > 0) {
      const latlngsLM = orderDetail.pathLM1.map(n => [n.latitude, n.longitude]);
      polylineLMRef.current = L.polyline(latlngsLM, { color: '#8b5cf6', weight: 4, opacity: 0.8, dashArray: '6, 6' }).addTo(map);
      drawn = true;
    }

    // Fallback static path if VRP paths are not available
    if (!drawn) {
      const fallbackPoints = [
        [currentLat, currentLng],
        restCoords,
        custCoords
      ];
      routePolylineRef.current = L.polyline(fallbackPoints, { color: '#8b5cf6', weight: 4, opacity: 0.7, dashArray: '8, 8' }).addTo(map);
    }

    // 6. Fit map bounds to cover all points
    const bounds = L.latLngBounds([
      [currentLat, currentLng],
      restCoords,
      custCoords
    ]);
    map.fitBounds(bounds, { padding: [40, 40] });

  }, [leafletLoaded, orderDetail?.pathFM, orderDetail?.pathLM1, currentLat, currentLng]);

  return (
    <div className="map-wrapper" style={{ height: '320px', position: 'relative' }}>
      <div className="map-overlay-text" style={{ zIndex: 10 }}>
        {isRealGPS ? '🔴 LIVE REAL-TIME MAP' : '📍 PROJECTED ROUTE MAP'}
      </div>
      
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: 'inherit', 
          zIndex: 1, 
          visibility: leafletLoaded ? 'visible' : 'hidden' 
        }} 
      />

      {!leafletLoaded && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f4f6f8', gap: '12px', zIndex: 5, borderRadius: 'inherit' }}>
          <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: '#8b5cf6' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Loading Leaflet Interactive Map...
          </span>
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
  const [mounted, setMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stages = ['PLACED', 'ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const getNormalizedStatus = (status) => {
    let s = String(status || '').trim().toUpperCase().replace(/[\s-]/g, '_');
    if (s === 'ORDER_PLACED') return 'PLACED';
    if (s === 'ORDER_ACCEPTED') return 'ACCEPTED';
    if (s === 'PREPARING_FOOD') return 'PREPARING';
    if (s === 'WAITING_TO_DISPATCH' || s === 'FOOD_READY') return 'READY_FOR_PICKUP';
    return s;
  };
  const currentIdx = orderDetail ? stages.indexOf(getNormalizedStatus(orderDetail.status) || 'PLACED') : 0;
  const linePercent = orderDetail ? (Math.max(0, currentIdx) / (stages.length - 1)) * 100 : 0;

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/profile?action=orders');
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

  // Establish SSE EventSource stream connection for the active tracked order
  useEffect(() => {
    if (!orderIdParam) return;
    
    const cleanId = String(orderIdParam).replace(/^ZB-/, '').trim();
    const ssePath = window.location.pathname.startsWith('/zingbite')
      ? `/zingbite/api/order/stream?orderId=${cleanId}`
      : `/api/order/stream?orderId=${cleanId}`;
    const eventSource = new EventSource(ssePath);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && String(data.orderId) === cleanId) {
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
                pathLM1: data.pathLM1
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
                return updatedOrder;
              }
              return o;
            });
          });
        }
      } catch (err) {
        console.error("Failed to parse SSE update data:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [orderIdParam]);

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
        const cleanOrderId = String(o.id || '').replace(/^ZB-/, '').trim();
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
        color: ['#f7374f', '#4bc0c0', '#ff9f40', '#9966ff', '#ffcd56'][Math.floor(Math.random() * 5)],
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

  // Leaflet Interactive Maps Integration
  const [leafletLoaded, setLeafletLoaded] = useState(typeof window !== 'undefined' && !!window.L);

  // Coordinates mapping
  const getRiderPosition = (p) => {
    if (p <= 0) return { x: 80, y: 140 };
    if (p >= 100) return { x: 300, y: 110 };
    
    const currentDist = (p / 100) * 350;

    if (currentDist <= 80) {
      return { x: 80 + currentDist, y: 140 };
    } else if (currentDist <= 160) {
      return { x: 160, y: 140 - (currentDist - 80) };
    } else if (currentDist <= 300) {
      return { x: 160 + (currentDist - 160), y: 60 };
    } else {
      return { x: 300, y: 60 + (currentDist - 300) };
    }
  };

  const riderPos = getRiderPosition(animationProgress);
  const totalPathLength = 350;
  const trailOffset = totalPathLength - ((animationProgress / 100) * totalPathLength);

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
        pathPoints = orderDetail.pathLM1.map(n => [n.latitude, n.longitude]);
      }
    } else {
      if (orderDetail.pathFM && orderDetail.pathFM.length > 0) {
        pathPoints = orderDetail.pathFM.map(n => [n.latitude, n.longitude]);
      }
    }

    if (pathPoints.length > 0) {
      const pos = interpolatePolyline(pathPoints, animationProgress);
      if (pos) {
        currentLat = pos[0];
        currentLng = pos[1];
      }
    } else {
      currentLat = (12.9716 + 0.0105 * (animationProgress / 100));
      currentLng = (77.5946 + 0.0139 * (animationProgress / 100));
    }
  }

  // Load Leaflet dynamically
  useEffect(() => {
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    let link = document.querySelector('link[href*="leaflet.css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);
    }

    let script = document.querySelector('script[src*="leaflet.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      script.onload = () => {
        const interval = setInterval(() => {
          if (window.L) {
            setLeafletLoaded(true);
            clearInterval(interval);
          }
        }, 50);
      };
      document.body.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if (window.L) {
          setLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  // Map helper hooks and telemetry triggers are encapsulated in the ActiveOrderMap component below

  // Dynamic status details
  let etaVal = 25;
  let distanceLeftVal = "3.5 km";
  let displayHeading = "Order Placed";
  let displaySubtitle = "Your food is being processed.";
  
  if (orderDetail) {
    const status = (orderDetail.status || '').toUpperCase();
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
      const remaining = 1 - (animationProgress / 100);
      etaVal = Math.max(1, Math.round(10 * remaining));
      distanceLeftVal = (3.2 * remaining).toFixed(1) + " km";
      
      displayHeading = `Arriving in ${etaVal} mins`;
      displaySubtitle = `Rider is on the way! Distance left: ${distanceLeftVal} (${isRealGPS ? 'Live GPS' : 'Projected'}: ${currentLat.toFixed(5)}° N, ${currentLng.toFixed(5)}° E)`;
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
    const found = orders.find(o => String(o.id) === cleanId || String(o.orderId) === cleanId);
    if (found) {
      setSearchError('');
      navigate(`/track-order?orderId=${found.id}`);
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

  return (
    <>
      <style>{`
        .tracking-layout {
          max-width: 1000px;
          margin: 24px auto 48px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          align-items: start;
        }
        
        .tracking-main-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          background: #fff;
          transition: all 0.5s ease;
        }
        
        .tracking-header.placed { background: rgba(54, 162, 235, 0.03); border-color: rgba(54, 162, 235, 0.15); }
        .tracking-header.accepted { background: rgba(54, 162, 235, 0.03); border-color: rgba(54, 162, 235, 0.15); }
        .tracking-header.preparing { background: rgba(255, 159, 64, 0.03); border-color: rgba(255, 159, 64, 0.15); }
        .tracking-header.waiting-to-dispatch { background: rgba(255, 206, 86, 0.03); border-color: rgba(255, 206, 86, 0.15); }
        .tracking-header.out-for-delivery { background: rgba(153, 102, 255, 0.03); border-color: rgba(153, 102, 255, 0.15); }
        .tracking-header.delivered { background: rgba(75, 192, 192, 0.03); border-color: rgba(75, 192, 192, 0.15); }
        
        .eta-display h3 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
          transition: color 0.3s;
        }
        
        .tracking-header.placed .eta-display h3 { color: #36a2eb; }
        .tracking-header.accepted .eta-display h3 { color: #36a2eb; }
        .tracking-header.preparing .eta-display h3 { color: #ff9f40; }
        .tracking-header.waiting-to-dispatch .eta-display h3 { color: #e09f00; }
        .tracking-header.out-for-delivery .eta-display h3 { color: #9966ff; }
        .tracking-header.delivered .eta-display h3 { color: #4bc0c0; }
        
        .eta-display p {
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
        }
        
        .order-info-pill {
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        
        /* Map Simulator */
        .map-wrapper {
          background: #f4f6f8;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-medium);
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
          height: 240px;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .map-overlay-text {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.9);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          border: 1px solid var(--border-medium);
          z-index: 10;
        }
        
        .tracking-map-svg {
          width: 100%;
          height: 100%;
        }
        
        .map-point {
          transition: all 0.3s;
        }
        
        @keyframes mapGlowGreen {
          0% { filter: drop-shadow(0 0 2px rgba(96,178,70,0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(96,178,70,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(96,178,70,0.4)); }
        }
        @keyframes mapGlowRed {
          0% { filter: drop-shadow(0 0 2px rgba(247,55,79,0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(247,55,79,0.8)); }
          100% { filter: drop-shadow(0 0 2px rgba(247,55,79,0.4)); }
        }
        .map-point.glow {
          animation-duration: 2s;
          animation-iteration-count: infinite;
        }
        .map-point.glow[transform*="80,"] {
          animation-name: mapGlowGreen;
        }
        .map-point.glow[transform*="300,"] {
          animation-name: mapGlowRed;
        }
        
        .map-rider-marker {
          transition: all 0.1s linear;
          animation: riderPulse 2s infinite ease-in-out;
        }
        @keyframes riderPulse {
          0%, 100% { filter: drop-shadow(0 0 1px rgba(23,26,41,0.2)); }
          50% { filter: drop-shadow(0 0 4px rgba(23,26,41,0.6)); }
        }
        
        .map-label {
          font-size: 8px;
          font-weight: bold;
          font-family: sans-serif;
          fill: var(--text-secondary);
        }
        
        /* Timeline Spacing */
        .status-timeline {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 8px;
        }

        .timeline-step {
          display: flex;
          gap: 16px;
          position: relative;
          padding-bottom: 24px;
        }

        .timeline-step:last-child {
          padding-bottom: 0;
        }

        .step-left-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 20px;
        }

        .step-line-segment {
          position: absolute;
          width: 2px;
          left: 50%;
          transform: translateX(-50%);
          top: 10px;
          bottom: -14px;
          background: var(--border-medium);
          transition: background-color 0.5s ease;
          z-index: 1;
        }

        .timeline-step.completed .step-line-segment {
          background: var(--success);
        }
        
        .step-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
          position: relative;
        }
        
        .timeline-step.completed .step-icon-circle {
          background: var(--success);
          border-color: var(--success);
          transform: scale(1.05);
        }
        
        @keyframes activePulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.35); }
          50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(247, 55, 79, 0.15); }
          100% { transform: scale(1); box-shadow: 0 0 0 0px rgba(247, 55, 79, 0.35); }
        }

        .timeline-step.active .step-icon-circle {
          background: white;
          border-color: var(--brand-red);
          animation: activePulse 2s infinite ease-in-out;
        }
        
        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--border-medium);
        }
        
        .timeline-step.completed .step-dot {
          background: #fff;
          width: 8px;
          height: 8px;
        }
        
        .timeline-step.active .step-dot {
          background: var(--brand-red);
          animation: pulse 1.2s infinite;
        }
        
        .step-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
          color: var(--text-muted);
        }
        
        .timeline-step.active .step-details h4,
        .timeline-step.completed .step-details h4 {
          color: var(--text-primary);
          font-weight: 700;
        }
        
        .step-details p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        
        /* Rider Panel */
        .rider-panel-box {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        
        .rider-card-header {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .rider-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 20px;
        }
        
        .rider-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #fff;
          border: 1px solid var(--border-medium);
        }
        
        .rider-info h4 {
          font-size: 1rem;
          margin-bottom: 2px;
        }
        
        .rider-info p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        .rider-contact-row {
          display: flex;
          gap: 10px;
        }
        
        .rider-contact-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .rider-contact-btn.call {
          background: var(--success);
          color: #fff;
          border: none;
        }
        
        .rider-contact-btn.call:hover {
          background: #50a037;
        }
        
        .rider-contact-btn.chat {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
        }
        
        .rider-contact-btn.chat:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }

        .rider-waiting-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          text-align: center;
          background: var(--bg-surface);
          border-radius: var(--radius-sm);
          border: 1px dashed var(--border-medium);
        }
        
        .rider-waiting-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-medium);
          border-top-color: var(--brand-red);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .receipt-summary {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-light);
        }
        
        .receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }
        
        .receipt-total {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.95rem;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px dashed var(--border-medium);
        }
        
        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: var(--brand-red);
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 16px;
          font-size: 0.9rem;
        }
        
        .back-home-btn:hover {
          color: var(--brand-red-hover);
        }
 
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
 
        @media (max-width: 900px) {
          .tracking-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Simulator Panel */
        .simulator-trigger-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--brand-red);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(247,55,79,0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .simulator-trigger-btn:hover {
          transform: scale(1.1) rotate(15deg);
        }
        .simulator-panel {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 320px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: var(--radius-md);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          padding: 20px;
          z-index: 998;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform: translateY(20px);
          opacity: 0;
          pointer-events: none;
        }
        .simulator-panel.show {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .simulator-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-medium);
          padding-bottom: 8px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .simulator-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .simulator-btn {
          width: 100%;
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.8rem;
          border: 1px solid var(--border-medium);
          background: white;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .simulator-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
          background: rgba(247,55,79,0.02);
        }
        .simulator-btn.active {
          background: var(--brand-red);
          border-color: var(--brand-red);
          color: white;
          box-shadow: 0 2px 6px rgba(247,55,79,0.3);
        }

        .confetti-particle {
          position: fixed;
          z-index: 10000;
          pointer-events: none;
          animation: confettiFall linear forwards;
          border-radius: 2px;
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }

        /* General Tracking Portal Dashboard styles */
        .tracking-portal-empty {
          max-width: 500px;
          margin: 80px auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px;
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        
        .tracking-portal-empty h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 800;
        }
        
        .tracking-portal-empty p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .portal-container {
          max-width: 800px;
          margin: 32px auto 60px;
          padding: 0 20px;
        }

        .portal-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .portal-header h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .portal-header p {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .tracking-search-form {
          margin-bottom: 40px;
          position: relative;
        }

        .tracking-search-form .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .tracking-search-form input {
          width: 100%;
          padding: 16px 120px 16px 44px;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-size: 1rem;
          outline: none;
          background: #fff;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s;
        }

        .tracking-search-form input:focus {
          border-color: var(--brand-red);
          box-shadow: 0 4px 18px rgba(247,55,79,0.1);
        }

        .tracking-search-form .search-icon-inside {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-submit-btn {
          position: absolute;
          right: 8px;
          top: 8px;
          bottom: 8px;
          background: var(--brand-red);
          color: white;
          border: none;
          padding: 0 24px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .search-submit-btn:hover {
          background: var(--brand-red-hover);
        }

        .search-error-text {
          color: var(--danger);
          font-size: 0.85rem;
          margin-top: 10px;
          font-weight: 600;
          padding-left: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .portal-section-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 10px;
        }

        .active-orders-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .active-order-card {
          background: #fff;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          box-shadow: var(--shadow-sm);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .active-order-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .active-order-info h3 {
          font-size: 1.25rem;
          margin-bottom: 4px;
          color: var(--text-primary);
        }

        .active-order-meta {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .active-order-status-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .active-order-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          animation: pulse 1.5s infinite;
        }

        .active-order-status-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--success);
        }

        .track-button-link {
          background: var(--brand-red);
          color: white;
          padding: 10px 24px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.85rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(247,55,79,0.25);
        }

        .track-button-link:hover {
          background: var(--brand-red-hover);
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(247,55,79,0.35);
        }

        .empty-active-orders {
          text-align: center;
          padding: 40px 20px;
          border: 1px dashed var(--border-medium);
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          color: var(--text-secondary);
        }

        .recent-orders-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recent-order-item {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .recent-order-details h4 {
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .recent-order-details p {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .view-track-history-btn {
          background: transparent;
          border: 1px solid var(--border-medium);
          color: var(--text-secondary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-track-history-btn:hover {
          border-color: var(--brand-red);
          color: var(--brand-red);
        }
      `}</style>
      
      {!user ? (
        // Login Required View
        <div className="tracking-portal-empty fade-in">
          <MapPin size={64} color="var(--brand-red)" style={{ marginBottom: '16px' }} />
          <h2>Track Your Order</h2>
          <p>Please log in to track your active deliveries and view your order history.</p>
          <button onClick={() => navigate('/login?redirect=/track-order')} className="btn-primary" style={{ width: 'auto', padding: '12px 32px', borderRadius: '30px' }}>
            LOG IN TO TRACK
          </button>
        </div>
      ) : !orderIdParam ? (
        // General Dashboard View
        <div className="portal-container fade-in">
          <div className="portal-header">
            <h2>Order Tracking Portal</h2>
            <p>Track your active food deliveries and search order histories in real time.</p>
          </div>

          <form onSubmit={handleSearchSubmit} className="tracking-search-form">
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={18} />
              <input 
                type="text" 
                placeholder="Enter Order ID (e.g. ZB-2)" 
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">TRACK</button>
            </div>
            {searchError && (
              <p className="search-error-text">
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} /> {searchError}
              </p>
            )}
          </form>

          <div>
            <h3 className="portal-section-title">
              <Clock size={18} color="var(--brand-red)" /> Active Deliveries
            </h3>
            
            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
              </div>
            ) : activeOrders.length === 0 ? (
              <div className="empty-active-orders">
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>No Active Deliveries</p>
                <p style={{ fontSize: '0.85rem' }}>You don't have any orders in progress right now.</p>
              </div>
            ) : (
              <div className="active-orders-grid">
                {visibleActiveOrders.map(o => (
                  <div key={o.id} className="active-order-card">
                    <div className="active-order-info">
                      <h3>{o.restaurantName || 'ZingBite Kitchen'}</h3>
                      <p className="active-order-meta">Order ID: ZB-{o.id} &bull; {o.items ? o.items.length : 0} items</p>
                      <div className="active-order-status-wrapper">
                        <div className="active-order-status-dot" />
                        <span className="active-order-status-text">{o.status}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/track-order?orderId=${o.id}`)}
                      className="track-button-link"
                    >
                      <MapPin size={16} /> Track Live
                    </button>
                  </div>
                ))}
                {hasMoreActiveOrders && (
                  <div className="load-more-wrap" style={{ margin: '0 auto 4px' }}>
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleActiveOrderCount(count => count + TRACKING_ORDER_PAGE_SIZE)}
                    >
                      Load more active orders ({activeOrders.length - visibleActiveOrderCount} left) <ChevronRight className="load-more-icon" size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 className="portal-section-title">
              <CheckCircle2 size={18} color="var(--success)" /> Recently Delivered
            </h3>

            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <Loader size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--success)' }} />
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="empty-active-orders" style={{ background: 'transparent' }}>
                <p style={{ fontSize: '0.85rem' }}>No recently delivered orders found.</p>
              </div>
            ) : (
              <div className="recent-orders-list">
                {visibleRecentOrders.map(o => (
                  <div key={o.id} className="recent-order-item">
                    <div className="recent-order-details">
                      <h4>{o.restaurantName || 'ZingBite Kitchen'}</h4>
                      <p>Order ID: ZB-{o.id} &bull; Delivered successfully on {o.date || 'today'}</p>
                    </div>
                    <button 
                      onClick={() => navigate(`/track-order?orderId=${o.id}`)}
                      className="view-track-history-btn"
                    >
                      View History
                    </button>
                  </div>
                ))}
                {hasMoreRecentOrders && (
                  <div className="load-more-wrap" style={{ margin: '4px auto 0' }}>
                    <button
                      type="button"
                      className="load-more-btn"
                      onClick={() => setVisibleRecentOrderCount(count => count + TRACKING_ORDER_PAGE_SIZE)}
                    >
                      Load more history ({recentOrders.length - visibleRecentOrderCount} left) <ChevronRight className="load-more-icon" size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : ordersLoading && !orderDetail ? (
        // Loading Specific Order View
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: '400px', gap: '12px' }}>
          <Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-red)' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Locating your order run...</p>
        </div>
      ) : !orderDetail ? (
        // Order Not Found View
        <div className="tracking-portal-empty fade-in">
          <AlertCircle size={64} color="var(--brand-red)" style={{ marginBottom: '16px' }} />
          <h2>Order Not Found</h2>
          <p>We couldn't find any active or past order matching ID "ZB-{orderIdParam}".</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => navigate('/track-order')} className="btn-primary" style={{ width: 'auto', padding: '12px 24px', borderRadius: '30px' }}>
              BACK TO PORTAL
            </button>
            <button onClick={() => navigate('/')} className="btn-primary" style={{ width: 'auto', padding: '12px 24px', borderRadius: '30px', background: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
              GO HOME
            </button>
          </div>
        </div>
      ) : getNormalizedStatus(orderDetail.status) === 'PENDING_PAYMENT' ? (
        // Verifying Payment view
        <div className="tracking-portal-empty fade-in" style={{ maxWidth: '500px', margin: '80px auto', padding: '40px 32px' }}>
          <div className="spin" style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(247, 55, 79, 0.1)',
            borderTopColor: '#f7374f',
            borderRadius: '50%',
            margin: '0 auto 24px'
          }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>Verifying Your Payment</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            We are confirming your transaction with your bank. This page will update automatically as soon as payment is confirmed. Please do not close or refresh this page.
          </p>
          <div style={{ background: 'rgba(247, 55, 79, 0.035)', border: '1px solid rgba(247, 55, 79, 0.1)', borderRadius: '8px', padding: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', width: '100%', boxSizing: 'border-box' }}>
            Order ID: <strong>ZB-{orderDetail.id || orderDetail.orderId}</strong> &bull; Total Amount: <strong>&#8377;{(orderDetail.total || orderDetail.totalAmount || 0).toFixed(2)}</strong>
          </div>
        </div>
      ) : (
        // Live Order Tracking View
        <div className="tracking-layout fade-in">
          <div>
            <button onClick={() => navigate('/track-order')} className="back-home-btn">
              <ArrowLeft size={16} /> Back to Tracker Portal
            </button>
    
            <main className="tracking-main-box">
              <div className={`tracking-header ${(orderDetail?.status || 'Placed').toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="eta-display">
                  <h3>{displayHeading}</h3>
                  <p>{displaySubtitle}</p>
                </div>
                <div className="order-info-pill">
                  ID: {orderDetail ? orderDetail.id : orderIdParam}
                </div>
              </div>
    
              {/* Interactive Leaflet Map */}
              <ActiveOrderMap 
                orderDetail={orderDetail}
                leafletLoaded={leafletLoaded}
                currentLat={currentLat}
                currentLng={currentLng}
                isRealGPS={isRealGPS}
              />
    
              {/* Timeline progress steps */}
              <div className="status-timeline">
                <div className={`timeline-step ${getStepClass('PLACED')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Order Placed</h4>
                    <p>Your order has been received and sent to the restaurant.</p>
                  </div>
                </div>
  
                <div className={`timeline-step ${getStepClass('ACCEPTED')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Order Confirmed</h4>
                    <p>The restaurant has accepted your order.</p>
                  </div>
                </div>
  
                <div className={`timeline-step ${getStepClass('PREPARING')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Preparing Food</h4>
                    <p>Our kitchen partners are preparing your meal using fresh ingredients.</p>
                  </div>
                </div>
  
                <div className={`timeline-step ${getStepClass('READY_FOR_PICKUP')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Ready for Pickup</h4>
                    <p>Food is packed and ready! Awaiting delivery partner pickup.</p>
                  </div>
                </div>

                <div className={`timeline-step ${getStepClass('PICKED_UP')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Picked Up</h4>
                    <p>Our delivery partner has collected your package from the kitchen.</p>
                  </div>
                </div>
  
                <div className={`timeline-step ${getStepClass('OUT_FOR_DELIVERY')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                    <div className="step-line-segment" />
                  </div>
                  <div className="step-details">
                    <h4>Out for Delivery</h4>
                    <p>Our delivery partner is riding swiftly on the route to your home.</p>
                  </div>
                </div>
  
                <div className={`timeline-step ${getStepClass('DELIVERED')}`}>
                  <div className="step-left-column">
                    <div className="step-icon-circle">
                      <div className="step-dot" />
                    </div>
                  </div>
                  <div className="step-details">
                    <h4>Order Arrived</h4>
                    <p>Rider has arrived at your address. Grab your meal and enjoy!</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
    
          {/* Delivery Partner Details Side */}
          <aside>
            <div className="rider-panel-box">
              <h3 className="rider-card-header"><Bike size={18} color="var(--brand-red)" /> Delivery Partner</h3>
              
              {orderDetail && orderDetail.riderName ? (
                <>
                  <div className="rider-profile">
                    <div className="rider-avatar">
                      {orderDetail.riderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="rider-info">
                      <h4>{orderDetail.riderName}</h4>
                      <p>Splendor (KA-03-EX-9921)</p>
                    </div>
                  </div>
                  
                  <div className="rider-contact-row">
                    <button onClick={() => showAlert(`Calling rider ${orderDetail.riderName} at ${orderDetail.riderPhone}...`, 'info')} className="rider-contact-btn call">
                      <Phone size={14} /> Call Rider
                    </button>
                    <button onClick={() => setIsChatOpen(prev => !prev)} className="rider-contact-btn chat">
                      <MessageSquare size={14} /> Chat
                    </button>
                  </div>
                </>
              ) : (
                <div className="rider-waiting-box">
                  <div className="rider-waiting-spinner"></div>
                  <h4>Assigning Rider...</h4>
                  <p>We are matching your order with a nearby delivery partner.</p>
                </div>
              )}
    
              <div className="receipt-summary">
                <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Order Receipt</h4>
                <div className="receipt-row">
                  <span>Payment Mode</span>
                  <span>Razorpay (Online)</span>
                </div>
                <div className="receipt-row">
                  <span>Restaurant Name</span>
                  <span>{orderDetail ? orderDetail.restaurantName : 'ZingBite Hotspot'}</span>
                </div>
                {orderDetail && orderDetail.items && (
                  <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-medium)', paddingTop: '12px', marginBottom: '12px' }}>
                    <h5 style={{ fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-secondary)' }}>Items:</h5>
                    {orderDetail.items.map((item, idx) => (
                      <div key={idx} className="receipt-row" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>{item.name} &times; {item.qty}</span>
                        <span>&#8377;{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="receipt-total receipt-row" style={{ borderTop: orderDetail ? 'none' : '1px dashed var(--border-medium)', marginTop: orderDetail ? 0 : '12px' }}>
                  <strong>Amount Paid</strong>
                  <strong>&#8377;{orderDetail ? orderDetail.total.toFixed(2) : '0.00'}</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Floating Status Simulator Control Panel */}
      {orderDetail && (
        <>
          <button 
            className="simulator-trigger-btn"
            onClick={() => setShowSimulator(prev => !prev)}
            title="Toggle Order Status Simulator"
          >
            <Settings size={22} className={showSimulator ? 'spin' : ''} />
          </button>
          
          <div className={`simulator-panel ${showSimulator ? 'show' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-medium)', paddingBottom: '8px', marginBottom: '8px' }}>
              <h4 className="simulator-title" style={{ border: 'none', margin: 0, padding: 0 }}>
                <Settings size={16} /> Simulator
              </h4>
              <button 
                onClick={() => setIsAutoSimulating(prev => !prev)}
                className={`simulator-btn ${isAutoSimulating ? 'active' : ''}`}
                style={{ width: 'auto', padding: '4px 8px', fontSize: '0.7rem', margin: 0 }}
              >
                {isAutoSimulating ? 'Stop Auto' : 'Auto Play'}
              </button>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
              Simulate restaurant and rider actions on the active order (<strong>{orderDetail.id}</strong>) to test animations.
            </p>
            <div className="simulator-grid">
              {stages.map((stage) => {
                const isActive = orderDetail.status === stage;
                const isPending = simulatingStatus === stage;
                return (
                  <button
                    key={stage}
                    disabled={simulatingStatus !== null}
                    onClick={() => simulateStatusChange(stage)}
                    className={`simulator-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{stage}</span>
                    {isPending ? (
                      <span className="rider-waiting-spinner" style={{ width: '12px', height: '12px', margin: 0 }}></span>
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
