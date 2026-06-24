import { useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSSE from '../hooks/useSSE';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { 
  Minus, Plus, ArrowRight, AlertCircle,
  Search, MapPin, Clock, Star, ShoppingBag, Flame, AlertTriangle, Heart
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ReviewsSection from '../components/ReviewsSection';

const DEFAULT_RESTAURANT_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop';
const DEFAULT_DISH_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop';
const MENU_PAGE_SIZE = 8;
const RECOMMENDATION_PAGE_SIZE = 4;

const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');
  const restaurantNameParam = searchParams.get('restaurantName') || 'Restaurant Menu';
  
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [visibleMenuCount, setVisibleMenuCount] = useState(MENU_PAGE_SIZE);
  const [visibleRecommendationCount, setVisibleRecommendationCount] = useState(RECOMMENDATION_PAGE_SIZE);
  
  const { user } = useContext(AuthContext);
  const { cart, addToCart, updateQuantity, conflictPopup, clearAndAdd, setConflictPopup, cartError, setCartError } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();

  const isFetchingMenuRef = useRef(false);

  const [groupRoom, setGroupRoom] = useState(null); // { roomId, roomCode, restaurantId, hostId, participants: [] }
  const [groupCartItems, setGroupCartItems] = useState([]); // [{ menuId, itemId, itemName, price, quantity, userId, userName }]
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [groupError, setGroupError] = useState(null);
  const groupWsRef = useRef(null);

  const groupCartTotal = useMemo(() => {
    return groupCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [groupCartItems]);

  const connectGroupWs = useCallback((roomId) => {
    if (groupWsRef.current) {
      groupWsRef.current.close();
    }
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.port === '5173' ? 'localhost:8080' : window.location.host;
    const wsUrl = `${wsProtocol}//${host}/zingbite/api/ws/group-order/${roomId}/${user?.userID}`;
    console.log("[ZingBite GroupWS] Connecting to:", wsUrl);
    const ws = new WebSocket(wsUrl);
    groupWsRef.current = ws;
    ws.onopen = () => {
      console.log("[ZingBite GroupWS] Connected successfully.");
      setGroupError(null);
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'cart_update') {
          console.log("[ZingBite GroupWS] Cart update:", data.items);
          setGroupCartItems(data.items || []);
        }
      } catch (err) {
        console.error("[ZingBite GroupWS] Parse error:", err);
      }
    };
    ws.onclose = (event) => {
      console.log("[ZingBite GroupWS] Closed:", event.code, event.reason);
      groupWsRef.current = null;
    };
    ws.onerror = (err) => {
      console.error("[ZingBite GroupWS] Error:", err);
    };
  }, [user]);

  const fetchGroupRoomDetails = useCallback(async (roomId) => {
    try {
      const res = await axios.get(`/api/group-order/details?roomId=${roomId}`);
      if (res.data) {
        setGroupRoom(prev => ({
          ...prev,
          roomId: res.data.roomId,
          roomCode: res.data.roomCode,
          restaurantId: res.data.restaurantId,
          hostId: res.data.hostId,
          participants: res.data.participants || []
        }));
      }
    } catch (err) {
      console.error("[ZingBite GroupDetails] Failed to fetch room details:", err);
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (groupRoom && groupRoom.roomId) {
      fetchGroupRoomDetails(groupRoom.roomId);
      intervalId = setInterval(() => {
        fetchGroupRoomDetails(groupRoom.roomId);
      }, 5000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [groupRoom?.roomId, fetchGroupRoomDetails]);

  useEffect(() => {
    return () => {
      if (groupWsRef.current) {
        groupWsRef.current.close();
      }
    };
  }, []);

  const handleCreateGroupRoom = async () => {
    if (!user) { 
      navigate(`/login?redirect=/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`); 
      return; 
    }
    setGroupError(null);
    try {
      const res = await axios.post('/api/group-order/create', { restaurantId: Number(restaurantId) });
      if (res.data && res.data.success) {
        const { roomId, roomCode } = res.data;
        setGroupRoom({
          roomId,
          roomCode,
          restaurantId: Number(restaurantId),
          hostId: user.userID,
          participants: []
        });
        connectGroupWs(roomId);
      }
    } catch (err) {
      console.error("[ZingBite GroupRoom] Error creating room:", err);
      setGroupError(err.response?.data?.error || "Failed to create group order room.");
    }
  };

  const handleJoinGroupRoom = async () => {
    if (!user) { 
      navigate(`/login?redirect=/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`); 
      return; 
    }
    if (!roomCodeInput.trim()) {
      setGroupError("Please enter a room code.");
      return;
    }
    setGroupError(null);
    try {
      const res = await axios.post('/api/group-order/join', { roomCode: roomCodeInput.trim() });
      if (res.data && res.data.success) {
        const { roomId, restaurantId: roomRestId } = res.data;
        if (Number(roomRestId) !== Number(restaurantId)) {
          setGroupError("This group order is for a different restaurant.");
          return;
        }
        setGroupRoom({
          roomId,
          roomCode: roomCodeInput.trim(),
          restaurantId: Number(roomRestId),
          participants: []
        });
        connectGroupWs(roomId);
        setRoomCodeInput('');
      }
    } catch (err) {
      console.error("[ZingBite GroupRoom] Error joining room:", err);
      setGroupError(err.response?.data?.error || "Room not found or inactive.");
    }
  };

  const handleLeaveGroupRoom = () => {
    if (groupWsRef.current) {
      groupWsRef.current.close();
      groupWsRef.current = null;
    }
    setGroupRoom(null);
    setGroupCartItems([]);
    setGroupError(null);
  };

  const handleCheckoutGroupRoom = async () => {
    if (!groupRoom) return;
    setGroupError(null);
    try {
      const res = await axios.post('/api/group-order/checkout', { roomId: groupRoom.roomId });
      if (res.data && res.data.success) {
        const orderId = res.data.orderId;
        handleLeaveGroupRoom();
        navigate(`/track-order?orderId=${orderId}`);
      }
    } catch (err) {
      console.error("[ZingBite GroupRoom] Error checking out:", err);
      setGroupError(err.response?.data?.error || "Failed to checkout group order.");
    }
  };

  const handleUpdateQuantity = async (itemId, newQty) => {
    if (groupRoom) {
      if (groupWsRef.current && groupWsRef.current.readyState === WebSocket.OPEN) {
        groupWsRef.current.send(JSON.stringify({
          action: 'updateQuantity',
          menuId: itemId,
          quantity: newQty
        }));
      } else {
        setGroupError("WebSocket connection is not active.");
      }
      return;
    }
    await updateQuantity(itemId, newQty);
  };

  const fetchMenu = useCallback(async (isBackground = false) => {
    if (isFetchingMenuRef.current) return;
    isFetchingMenuRef.current = true;
    if (!isBackground) setLoading(true);
    try {
      const res = await axios.get(`/api/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`);
      setMenuList(res.data.menuList || []);
    } catch (err) {
      console.error(err);
    } finally {
      if (!isBackground) setLoading(false);
      isFetchingMenuRef.current = false;
    }
  }, [restaurantId, restaurantNameParam]);

  useEffect(() => {
    if (restaurantId) {
      fetchMenu(false);
    }
  }, [restaurantId, fetchMenu]);

  const menuSsePath = window.location.pathname.startsWith('/zingbite')
    ? `/zingbite/api/stream?topic=menu&restaurantId=${restaurantId}`
    : `/api/stream?topic=menu&restaurantId=${restaurantId}`;

  useSSE(restaurantId ? menuSsePath : null, (event) => {
    try {
      console.log("[ZingBite SSE] Real-time menu update", event?.data);
      if (event && event.data) {
        const data = JSON.parse(event.data);
        if (data.event === "restaurant_status_update" && Number(data.restaurantId) === Number(restaurantId)) {
          setMenuList(prev => prev.map(item => {
            if (item.restaurant) {
              return {
                ...item,
                restaurant: {
                  ...item.restaurant,
                  isOpen: data.isOpen
                }
              };
            }
            return item;
          }));
          return;
        }
      }
      fetchMenu(true);
    } catch (err) {
      console.error(err);
      fetchMenu(true);
    }
  }, { enabled: !!restaurantId });

  const cartItemIds = useMemo(() => {
    if (!cart || !cart.items) return '';
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    return itemsArray.map(item => item.itemId).join(',');
  }, [cart]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!restaurantId) return;
      try {
        setRecommendationsLoading(true);
        const res = await axios.get(`/api/recommendations?restaurantId=${restaurantId}&cartItems=${cartItemIds}`);
        setRecommendations(Array.isArray(res.data) ? res.data : (res.data.recommendations || []));
      } catch (err) {
        console.error("[ZingBite] Error fetching recommendations:", err);
      } finally { setRecommendationsLoading(false); }
    };
    fetchRecommendations();
  }, [restaurantId, cartItemIds]);

  const getCartQuantity = (itemId) => {
    if (groupRoom) {
      const item = groupCartItems.find(i => Number(i.itemId) === Number(itemId) && Number(i.userId) === Number(user?.userID));
      return item ? item.quantity : 0;
    }
    if (!cart || !cart.items) return 0;
    const itemsArray = Array.isArray(cart.items) ? cart.items : Object.values(cart.items);
    const item = itemsArray.find(i => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const handleAddClick = async (itemId) => {
    if (!user) { navigate(`/login?redirect=/menu?restaurantId=${restaurantId}&restaurantName=${encodeURIComponent(restaurantNameParam)}`); return; }
    if (dynRestaurant && !dynRestaurant.isOpen) {
      setCartError("Restaurant is currently closed");
      return;
    }
    setCartError(null);
    if (groupRoom) {
      if (groupWsRef.current && groupWsRef.current.readyState === WebSocket.OPEN) {
        groupWsRef.current.send(JSON.stringify({
          action: 'addItem',
          menuId: itemId,
          quantity: 1
        }));
      } else {
        setGroupError("WebSocket connection is not active.");
      }
      return;
    }
    await addToCart(itemId, 1);
  };

  const isVegDish = (item) => {
    const nonVegKeywords = ['chicken', 'mutton', 'egg', 'fish', 'pork', 'beef', 'shrimp', 'prawn', 'meat', 'kebab', 'tikka', 'biryani'];
    const nameLower = (item.menuName || '').toLowerCase();
    const descLower = (item.description || '').toLowerCase();
    return !nonVegKeywords.some(keyword => nameLower.includes(keyword) || descLower.includes(keyword));
  };

  const hasItems = menuList.length > 0;
  const dynRestaurant = hasItems && menuList[0].restaurant ? menuList[0].restaurant : null;
  const restName = dynRestaurant ? dynRestaurant.restaurantName : restaurantNameParam;
  const restCuisine = dynRestaurant ? (dynRestaurant.cusineType || dynRestaurant.cuisineType || 'Cuisine details') : 'Cuisine details';
  const restAddress = dynRestaurant ? (dynRestaurant.address || 'Address details') : 'Address details';
  const restDelivery = dynRestaurant ? (dynRestaurant.deliveryTime || '30 mins') : '30 mins';
  const restBanner = dynRestaurant?.imagePath || DEFAULT_RESTAURANT_IMAGE;

  const slides = useMemo(() => [
    restBanner,
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2035&auto=format&fit=crop"
  ], [restBanner]);

  useEffect(() => {
    if (slides.length === 0) return;
    const slideInterval = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => { setVisibleMenuCount(MENU_PAGE_SIZE); }, [restaurantId, searchTerm, filterType, sortBy]);
  useEffect(() => { setVisibleRecommendationCount(RECOMMENDATION_PAGE_SIZE); }, [restaurantId, cartItemIds]);

  const visibleMenuList = restaurantId ? menuList : [];
  const isMenuLoading = Boolean(restaurantId) && loading;

  const filteredList = visibleMenuList.filter(item => {
    const matchesSearch = (item.menuName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'Veg') return isVegDish(item);
    if (filterType === 'NonVeg') return !isVegDish(item);
    return true;
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'PriceLowHigh') return a.price - b.price;
    if (sortBy === 'PriceHighLow') return b.price - a.price;
    return 0;
  });
  const visibleMenuItems = sortedList.slice(0, visibleMenuCount);
  const visibleRecommendations = recommendations.slice(0, visibleRecommendationCount);
  const hasMoreMenuItems = visibleMenuCount < sortedList.length;
  const hasMoreRecommendations = visibleRecommendationCount < recommendations.length;

  return (
    <>
      <style>{`
        .menu-page-container { max-width: 1400px; width: 92%; margin: 0 auto 64px; padding: 0; }
        .restaurant-hero { position: relative; height: 340px; border-radius: 24px; overflow: hidden; margin-top: 24px; margin-bottom: 24px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
        .slideshow-container { width: 100%; height: 100%; position: relative; }
        .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease-in-out; z-index: 1; }
        .hero-slide.active { opacity: 1; z-index: 2; }
        .hero-bg { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.35) 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 32px; color: white; z-index: 3; text-align: center; }
        .hero-overlay::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 80%, rgba(247,55,79,0.12) 0%, transparent 60%); }
        .hero-glass-card { position: relative; max-width: 720px; width: 100%; }
        .hero-glass-card h1 { font-family: 'Outfit', sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 8px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.5); letter-spacing: -0.5px; }
        .hero-info-row { display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 0.9rem; color: rgba(255,255,255,0.95); flex-wrap: wrap; margin-bottom: 12px; }
        .hero-info-item { display: flex; align-items: center; gap: 5px; }
        .hero-separator { color: rgba(255,255,255,0.45); }
        .cuisine-tag { font-size: 0.88rem; color: rgba(255,255,255,0.7); margin-bottom: 14px; }
        .promo-tag { display: inline-flex; align-items: center; gap: 6px; background: rgba(247,55,79,0.2); border: 1px solid rgba(247,55,79,0.35); padding: 6px 18px; border-radius: 20px; font-size: 0.82rem; font-weight: 700; color: #ffcbd1; backdrop-filter: blur(4px); }
        .slideshow-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; }
        .slideshow-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: all 0.3s ease; }
        .slideshow-dot.active { background: #fff; transform: scale(1.3); box-shadow: 0 0 8px rgba(255,255,255,0.5); }
        .menu-controls-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
        .search-menu-wrapper { position: relative; flex: 1; min-width: 280px; }
        .search-menu-wrapper input { width: 100%; padding: 14px 16px 14px 46px; border: 1.5px solid var(--border-medium); border-radius: 14px; font-size: 0.95rem; outline: none; box-shadow: 0 2px 12px rgba(0,0,0,0.03); transition: all 0.25s var(--ease-premium); }
        .search-menu-wrapper input:focus { border-color: var(--brand-red); box-shadow: 0 0 0 4px rgba(247,55,79,0.08); }
        .search-icon-pos { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
        .filter-sort-wrapper { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .filter-pills { display: flex; background: var(--bg-surface); border-radius: 30px; padding: 4px; border: 1px solid var(--border-light); }
        .filter-pill { background: transparent; border: none; padding: 7px 16px; font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); cursor: pointer; border-radius: 26px; transition: all 0.25s var(--ease-premium); display: flex; align-items: center; gap: 4px; }
        .filter-pill.active { background: #fff; color: var(--brand-red); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .sort-select { padding: 10px 36px 10px 14px; border-radius: 12px; border: 1.5px solid var(--border-medium); font-size: 0.85rem; font-weight: 600; color: var(--text-primary); outline: none; cursor: pointer; background: #fff; transition: all 0.25s var(--ease-premium); appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9e9e' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 14px; }
        .sort-select:hover { border-color: var(--brand-red); background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F7374F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); }
        .sort-select:focus { border-color: var(--brand-red); box-shadow: 0 0 0 3px rgba(247,55,79,0.1); }
        .menu-items-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(480px, 1fr)); gap: 24px; }
        .menu-dish-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; gap: 20px; box-shadow: 0 2px 16px rgba(0,0,0,0.02); transition: all 0.35s var(--ease-premium); opacity: 0; transform: translateY(20px); position: relative; overflow: visible; }
        .menu-dish-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(247,55,79,0.06); border-color: rgba(247,55,79,0.12); }
        .dish-card-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
        .dish-card-header-tags { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .dish-type-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
        .dish-type-badge.veg { background: rgba(96,178,70,0.08); color: var(--success); border: 1px solid rgba(96,178,70,0.15); }
        .dish-type-badge.veg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
        .dish-type-badge.nonveg { background: rgba(226,55,68,0.08); color: var(--danger); border: 1px solid rgba(226,55,68,0.15); }
        .dish-type-badge.nonveg .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--danger); }
        .dish-featured-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 700; color: #ff9f40; background: rgba(255,159,64,0.08); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(255,159,64,0.15); text-transform: uppercase; }
        .dish-card-title { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin: 0 0 6px; line-height: 1.3; }
        .dish-card-price-row { display: flex; align-items: baseline; gap: 2px; margin-bottom: 10px; color: var(--brand-red); font-weight: 800; }
        .dish-card-price-row .price-symbol { font-size: 1rem; }
        .dish-card-price-row .price-value { font-size: 1.3rem; font-family: 'Outfit', sans-serif; }
        .dish-card-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .dish-card-media { position: relative; width: 130px; height: 130px; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; }
        .dish-card-img-container { width: 100%; height: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.04); border: 1px solid var(--border-light); background: var(--bg-surface); }
        .dish-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s var(--ease-premium); }
        .menu-dish-card:hover .dish-card-img { transform: scale(1.08); }
        .dish-card-action { position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); z-index: 10; }
        .add-btn { background: #fff; color: var(--success); border: 1.5px solid var(--success); font-weight: 800; font-size: 0.85rem; padding: 6px 20px; border-radius: 12px; cursor: pointer; transition: all 0.25s var(--ease-premium); box-shadow: 0 4px 12px rgba(96,178,70,0.12); white-space: nowrap; }
        .add-btn:hover:not(:disabled) { background: var(--success); color: #fff; box-shadow: 0 6px 18px rgba(96,178,70,0.25); transform: scale(1.03); }
        .add-btn:disabled { background: var(--bg-surface); border-color: var(--border-medium); color: var(--text-muted); box-shadow: none; cursor: not-allowed; }
        .qty-stepper { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 1.5px solid var(--success); border-radius: 12px; width: 90px; height: 32px; box-shadow: 0 4px 12px rgba(96,178,70,0.1); overflow: hidden; }
        .step-btn { width: 28px; height: 100%; background: transparent; border: none; color: var(--success); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .step-btn:hover { background: rgba(96,178,70,0.08); }
        .step-val { font-weight: 800; font-size: 0.9rem; color: var(--text-primary); }
        .cart-bar-popup { position: fixed; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, var(--success), #4a9a32); color: #fff; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; z-index: 1000; box-shadow: 0 -4px 24px rgba(0,0,0,0.12); }
        .cart-bar-link { color: #fff; font-weight: 700; display: flex; align-items: center; gap: 6px; text-decoration: none; }
        .no-data-dish { grid-column: 1 / -1; text-align: center; padding: 64px 24px; color: var(--text-secondary); border: 1.5px dashed var(--border-medium); border-radius: 20px; background: #fff; }
        .zingbite-promise-section { margin-top: 64px; border-top: 1px solid var(--border-light); padding-top: 48px; }
        .promise-header { text-align: center; margin-bottom: 36px; }
        .promise-subtitle { font-size: 0.8rem; font-weight: 800; color: var(--brand-red); text-transform: uppercase; letter-spacing: 1px; }
        .promise-title { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 0; letter-spacing: -0.5px; }
        .promise-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 20px; }
        .promise-card { background: #fff; border: 1px solid var(--border-light); border-radius: 20px; padding: 32px 24px; text-align: center; transition: all 0.3s var(--ease-premium); box-shadow: 0 2px 16px rgba(0,0,0,0.02); }
        .promise-card:hover { transform: translateY(-6px); box-shadow: 0 12px 36px rgba(247,55,79,0.05); border-color: rgba(247,55,79,0.12); }
        .promise-icon-wrapper { width: 56px; height: 56px; border-radius: 16px; background: rgba(247,55,79,0.08); color: var(--brand-red); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; transition: transform 0.3s ease; }
        .promise-card:hover .promise-icon-wrapper { transform: scale(1.1) rotate(-4deg); }
        .promise-card h3 { font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin: 0 0 10px; }
        .promise-card p { font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }
        @keyframes cardFadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        .animate-card { animation: cardFadeInUp 0.55s var(--ease-premium) both; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 2000; animation: fadeIn 0.25s ease-out both; }
        .modal-content { background: #fff; padding: 36px; border-radius: 24px; max-width: 420px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.2); text-align: center; }
        .modal-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(247,55,79,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .modal-title { font-size: 1.3rem; font-family: 'Outfit', sans-serif; font-weight: 700; margin: 0 0 10px; color: var(--text-primary); }
        .modal-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin: 0; }
        .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
        .modal-btn-outline { flex: 1; padding: 13px; background: transparent; border: 2px solid var(--border-medium); color: var(--text-primary); font-weight: 600; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; transition: all 0.25s var(--ease-premium); }
        .modal-btn-outline:hover { border-color: var(--brand-red); color: var(--brand-red); }
        .modal-btn-primary { flex: 2; padding: 13px; background: linear-gradient(135deg, var(--brand-red), #d42d42); color: #fff; border: none; font-weight: 700; font-family: inherit; font-size: 0.9rem; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 14px rgba(247,55,79,0.25); transition: all 0.25s var(--ease-premium); }
        .modal-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(247,55,79,0.35); }

        /* Collaborative Dining Styles */
        .menu-content-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
          margin-top: 8px;
        }
        .menu-main-column {
          flex: 1;
          min-width: 0;
        }
        .menu-sidebar-column {
          width: 360px;
          flex-shrink: 0;
          position: sticky;
          top: 100px;
          z-index: 100;
        }
        @media (max-width: 992px) {
          .menu-content-layout {
            flex-direction: column;
            gap: 24px;
          }
          .menu-sidebar-column {
            width: 100%;
            position: static;
          }
        }

        .group-order-card {
          background: linear-gradient(135deg, #1e1e2f 0%, #11111d 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          color: #fff;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          margin-bottom: 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .group-order-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(247, 55, 79, 0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .group-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 12px;
        }
        .group-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.3px;
          background: linear-gradient(90deg, #ff8a9a, #f7374f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .group-badge {
          background: rgba(247, 55, 79, 0.15);
          color: #ffcbd1;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }
        .group-action-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .group-input-group {
          display: flex;
          gap: 8px;
        }
        .group-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 10px 14px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
        }
        .group-input:focus {
          border-color: var(--brand-red);
          background: rgba(255, 255, 255, 0.1);
        }
        .group-btn {
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s var(--ease-premium);
          border: none;
        }
        .group-btn-primary {
          background: linear-gradient(135deg, var(--brand-red), #d42d42);
          color: #fff;
          box-shadow: 0 4px 14px rgba(247, 55, 79, 0.25);
        }
        .group-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(247, 55, 79, 0.35);
        }
        .group-btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .group-btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }
        .group-btn-danger {
          background: rgba(220, 53, 69, 0.15);
          color: #ff9da6;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }
        .group-btn-danger:hover:not(:disabled) {
          background: rgba(220, 53, 69, 0.25);
        }
        .group-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        .room-code-display {
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px;
          text-align: center;
          margin-bottom: 16px;
        }
        .room-code-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        .room-code-value {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 2px;
          color: #ffcbd1;
        }
        .participants-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .participant-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(255, 255, 255, 0.03);
          padding: 6px 12px;
          border-radius: 8px;
        }
        .participant-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4bcf56;
          box-shadow: 0 0 8px #4bcf56;
        }
        .participant-host-tag {
          font-size: 0.65rem;
          font-weight: 800;
          background: #ffb703;
          color: #000;
          padding: 2px 5px;
          border-radius: 4px;
          margin-left: auto;
          text-transform: uppercase;
        }
        .group-cart-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 16px;
          margin-bottom: 20px;
        }
        .group-cart-title {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .group-cart-empty {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          padding: 16px 0;
        }
        .group-cart-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
          margin-bottom: 10px;
          background: rgba(255, 255, 255, 0.02);
          padding: 8px 12px;
          border-radius: 8px;
        }
        .group-cart-item-name {
          font-weight: 600;
          color: #fff;
        }
        .group-cart-item-meta {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }
        .group-cart-item-price {
          font-weight: 700;
          color: #ffcbd1;
          text-align: right;
          flex-shrink: 0;
        }
        .group-cart-total {
          display: flex;
          justify-content: space-between;
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
          margin-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 12px;
        }
        .group-error-msg {
          color: #ff9da6;
          font-size: 0.8rem;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 992px) { .menu-items-grid { grid-template-columns: 1fr; gap: 20px; } }
        @media (max-width: 768px) {
          .restaurant-hero { height: auto; min-height: 280px; }
          .hero-glass-card h1 { font-size: 1.8rem; }
          .menu-controls-bar { flex-direction: column; align-items: stretch; }
          .search-menu-wrapper { width: 100%; }
          .filter-sort-wrapper { justify-content: space-between; width: 100%; }
          .filter-pills { flex: 1; justify-content: center; }
          .filter-pill { flex: 1; justify-content: center; padding: 6px 10px; font-size: 0.8rem; }
        }
        @media (max-width: 576px) {
          .menu-dish-card { padding: 16px; gap: 16px; border-radius: 16px; }
          .dish-card-media { width: 105px; height: 105px; }
          .dish-card-title { font-size: 1.1rem; }
          .hero-glass-card h1 { font-size: 1.5rem; }
        }

        .heart-toggle-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 15;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: all 0.25s var(--ease-premium);
        }
        .heart-toggle-btn:hover {
          transform: scale(1.1);
          background: #fff;
          border-color: rgba(247, 55, 79, 0.3);
        }
        .heart-toggle-btn:active {
          transform: scale(0.9);
        }
        .heart-toggle-btn svg {
          transition: all 0.25s var(--ease-premium);
        }
      `}</style>

      <div className="menu-page-container page-enter">
        <div className="restaurant-hero">
          <div className="slideshow-container">
            {slides.map((slide, idx) => (
              <div key={idx} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
                <img src={slide} alt={restName} className="hero-bg" />
              </div>
            ))}
          </div>
          <div className="hero-overlay">
            <div className="hero-glass-card">
              <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {restName}
                {dynRestaurant && !dynRestaurant.isOpen && (
                  <span className="closed-badge-header" style={{
                    fontSize: '1rem',
                    background: 'var(--danger)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Closed
                  </span>
                )}
              </h1>
              <div className="hero-info-row">
                <span className="hero-info-item"><Star size={14} fill="#ffb703" color="#ffb703" /> <strong>4.2</strong> (100+)</span>
                <span className="hero-separator">|</span>
                <span className="hero-info-item"><Clock size={14} /> {restDelivery}</span>
                <span className="hero-separator">|</span>
                <span className="hero-info-item"><MapPin size={14} /> {restAddress}</span>
              </div>
              <p className="cuisine-tag">Cuisines: <strong>{restCuisine}</strong></p>
              <div className="promo-tag"><Flame size={14} /> ZINGBITE50: 50% OFF up to &#8377;100</div>
            </div>
          </div>
          <div className="slideshow-dots">
            {slides.map((_, idx) => (
              <button key={idx} className={`slideshow-dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)} />
            ))}
          </div>
        </div>

        <div className="menu-controls-bar">
          <div className="search-menu-wrapper">
            <Search size={18} className="search-icon-pos" />
            <input type="text" placeholder="Search dishes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-sort-wrapper">
            <div className="filter-pills">
              <button className={`filter-pill ${filterType === 'All' ? 'active' : ''}`} onClick={() => setFilterType('All')}>All</button>
              <button className={`filter-pill ${filterType === 'Veg' ? 'active' : ''}`} onClick={() => setFilterType('Veg')}>Veg</button>
              <button className={`filter-pill ${filterType === 'NonVeg' ? 'active' : ''}`} onClick={() => setFilterType('NonVeg')}>Non-Veg</button>
            </div>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="Default">Sort: Default</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="menu-content-layout">
          <div className="menu-main-column">
            <div className="menu-items-grid">
              {isMenuLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ height: '360px', borderRadius: '20px' }} className="skeleton animate-card" />
                ))
              ) : sortedList.length > 0 ? (
                visibleMenuItems.map((item, idx) => {
                  const qty = getCartQuantity(item.menuId);
                  const isVeg = isVegDish(item);
                  return (
                    <div key={item.menuId} className="menu-dish-card animate-card" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <div className="dish-card-info">
                        <div>
                          <div className="dish-card-header-tags">
                            <div className={isVeg ? "dish-type-badge veg" : "dish-type-badge nonveg"}>
                              <span className="dot"></span><span>{isVeg ? 'VEG' : 'NON-VEG'}</span>
                            </div>
                            {item.itemType === 'COMBO' ? (
                              <span className="dish-featured-tag" style={{ color: 'var(--brand-red)', background: 'rgba(247,55,79,0.08)', borderColor: 'rgba(247,55,79,0.15)' }}>
                                <Flame size={12} fill="var(--brand-red)" /> Combo Bundle
                              </span>
                            ) : idx % 3 === 0 ? (
                              <span className="dish-featured-tag"><Star size={12} fill="#ff9f40" color="#ff9f40" /> Bestseller</span>
                            ) : null}
                          </div>
                          <h3 className="dish-card-title">{item.menuName}</h3>
                          <div className="dish-card-price-row">
                            <span className="price-symbol">&#8377;</span>
                            <span className="price-value">{item.price}</span>
                          </div>
                          <p className="dish-card-desc">{item.description}</p>
                        </div>
                      </div>
                      <div className="dish-card-media">
                        <div className="dish-card-img-container">
                          <img src={item.imagePath || DEFAULT_DISH_IMAGE} alt={item.menuName} className="dish-card-img" loading="lazy"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_DISH_IMAGE; }}
                          />
                          {user && user.role === 'customer' && (
                            <button 
                              type="button"
                              className={`heart-toggle-btn ${wishlistIds.has(item.menuId) ? 'active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleWishlist(item);
                              }}
                              aria-label={wishlistIds.has(item.menuId) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart 
                                size={18} 
                                fill={wishlistIds.has(item.menuId) ? "var(--brand-red)" : "transparent"} 
                                color={wishlistIds.has(item.menuId) ? "var(--brand-red)" : "rgba(0,0,0,0.45)"}
                              />
                            </button>
                          )}
                        </div>
                        <div className="dish-card-action">
                          {qty === 0 ? (
                            <button className="add-btn" disabled={!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)} onClick={() => handleAddClick(item.menuId)}>
                              {(!item.isAvailable) ? 'SOLD OUT' : (dynRestaurant && !dynRestaurant.isOpen) ? 'CLOSED' : 'ADD'}
                            </button>
                          ) : (
                            <div className="qty-stepper" style={{ opacity: (dynRestaurant && !dynRestaurant.isOpen) ? 0.6 : 1, borderColor: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--border-medium)' : 'var(--success)' }}>
                              <button 
                                className="step-btn" 
                                disabled={dynRestaurant && !dynRestaurant.isOpen} 
                                onClick={() => handleUpdateQuantity(item.menuId, qty - 1)}
                                style={{ cursor: (dynRestaurant && !dynRestaurant.isOpen) ? 'not-allowed' : 'pointer', color: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--text-muted)' : 'var(--success)' }}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="step-val">{qty}</span>
                              <button 
                                className="step-btn" 
                                disabled={!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)} 
                                onClick={() => handleUpdateQuantity(item.menuId, qty + 1)}
                                style={{ cursor: (!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)) ? 'not-allowed' : 'pointer', opacity: (!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)) ? 0.5 : 1, color: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--text-muted)' : 'var(--success)' }}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-data-dish">
                  <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>No dishes found</p>
                  <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Try adjusting your search or filter.</p>
                </div>
              )}
            </div>

            {hasMoreMenuItems && (
              <div className="load-more-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button type="button" className="load-more-btn" onClick={() => setVisibleMenuCount(count => count + MENU_PAGE_SIZE)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.25s var(--ease-premium)' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--brand-red)'; e.target.style.color = 'var(--brand-red)'; e.target.style.background = 'rgba(247,55,79,0.03)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = ''; e.target.style.color = ''; e.target.style.background = ''; }}
                >
                  Load more dishes ({sortedList.length - visibleMenuCount} left) <ArrowRight size={14} />
                </button>
              </div>
            )}

            {!recommendationsLoading && recommendations.length > 0 && (
              <div className="animate-card" style={{ marginTop: '56px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <span className="promise-subtitle">PAIRED PERFECTION</span>
                  <h2 className="promise-title" style={{ fontSize: '1.8rem', marginTop: '4px' }}>Frequently Ordered Together</h2>
                </div>
                <div className="menu-items-grid">
                  {visibleRecommendations.map((item, idx) => {
                    const qty = getCartQuantity(item.menuId);
                    const isVeg = isVegDish(item);
                    return (
                      <div key={`rec-${item.menuId}`} className="menu-dish-card" style={{ animationDelay: `${idx * 0.05}s`, borderLeft: '4px solid var(--brand-red)' }}>
                        <div className="dish-card-info">
                          <div>
                            <div className="dish-card-header-tags">
                              <div className={isVeg ? "dish-type-badge veg" : "dish-type-badge nonveg"}><span className="dot"></span><span>{isVeg ? 'VEG' : 'NON-VEG'}</span></div>
                              <span className="dish-featured-tag" style={{ color: 'var(--brand-red)', background: 'rgba(247,55,79,0.05)', borderColor: 'rgba(247,55,79,0.1)' }}><ShoppingBag size={12} /> Recommended</span>
                            </div>
                            <h3 className="dish-card-title">{item.menuName}</h3>
                            <div className="dish-card-price-row"><span className="price-symbol">&#8377;</span><span className="price-value">{item.price}</span></div>
                            <p className="dish-card-desc">{item.description}</p>
                          </div>
                        </div>
                        <div className="dish-card-media">
                          <div className="dish-card-img-container">
                            <img src={item.imagePath || DEFAULT_DISH_IMAGE} alt={item.menuName} className="dish-card-img" loading="lazy"
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_DISH_IMAGE; }}
                            />
                          </div>
                          <div className="dish-card-action">
                            {qty === 0 ? (
                              <button className="add-btn" disabled={!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)} onClick={() => handleAddClick(item.menuId)}>{(!item.isAvailable) ? 'SOLD OUT' : (dynRestaurant && !dynRestaurant.isOpen) ? 'CLOSED' : 'ADD'}</button>
                            ) : (
                              <div className="qty-stepper" style={{ opacity: (dynRestaurant && !dynRestaurant.isOpen) ? 0.6 : 1, borderColor: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--border-medium)' : 'var(--success)' }}>
                                <button 
                                  className="step-btn" 
                                  disabled={dynRestaurant && !dynRestaurant.isOpen} 
                                  onClick={() => handleUpdateQuantity(item.menuId, qty - 1)}
                                  style={{ cursor: (dynRestaurant && !dynRestaurant.isOpen) ? 'not-allowed' : 'pointer', color: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--text-muted)' : 'var(--success)' }}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="step-val">{qty}</span>
                                <button 
                                  className="step-btn" 
                                  disabled={!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)} 
                                  onClick={() => handleUpdateQuantity(item.menuId, qty + 1)}
                                  style={{ cursor: (!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)) ? 'not-allowed' : 'pointer', opacity: (!item.isAvailable || (dynRestaurant && !dynRestaurant.isOpen)) ? 0.5 : 1, color: (dynRestaurant && !dynRestaurant.isOpen) ? 'var(--text-muted)' : 'var(--success)' }}
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {hasMoreRecommendations && (
                    <div className="load-more-wrap" style={{ gridColumn: '1 / -1', margin: '4px auto 0' }}>
                      <button type="button" className="load-more-btn" onClick={() => setVisibleRecommendationCount(count => count + RECOMMENDATION_PAGE_SIZE)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.25s var(--ease-premium)' }}
                        onMouseEnter={e => { e.target.style.borderColor = 'var(--brand-red)'; e.target.style.color = 'var(--brand-red)'; e.target.style.background = 'rgba(247,55,79,0.03)'; }}
                        onMouseLeave={e => { e.target.style.borderColor = ''; e.target.style.color = ''; e.target.style.background = ''; }}
                      >
                        More recommendations ({recommendations.length - visibleRecommendationCount} left) <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {restaurantId && <ReviewsSection restaurantId={restaurantId} />}
          </div>

          <div className="menu-sidebar-column">
            <div className="group-order-card">
              <div className="group-header">
                <span className="group-title">Collaborative Dining</span>
                <span className="group-badge">Real-Time</span>
              </div>
              
              {!groupRoom ? (
                <div className="group-action-section">
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 12px', lineHeight: 1.5 }}>
                    Order with friends or family! Create a room, share the code, and build a combined cart in real-time.
                  </p>
                  <button className="group-btn group-btn-primary" onClick={handleCreateGroupRoom}>
                    Create Group Order
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>or</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                  </div>
                  <div className="group-input-group">
                    <input 
                      type="text" 
                      placeholder="Enter Room Code" 
                      className="group-input" 
                      value={roomCodeInput}
                      onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                    />
                    <button className="group-btn group-btn-secondary" onClick={handleJoinGroupRoom}>
                      Join
                    </button>
                  </div>
                  {groupError && (
                    <div className="group-error-msg">
                      <AlertCircle size={14} />
                      <span>{groupError}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="room-code-display">
                    <div className="room-code-label">Room Access Code</div>
                    <div className="room-code-value">{groupRoom.roomCode}</div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 600 }}>
                      Participants ({groupRoom.participants?.length || 0})
                    </div>
                    <div className="participants-list">
                      {groupRoom.participants?.map((p, idx) => (
                        <div key={idx} className="participant-item">
                          <span className="participant-dot"></span>
                          <span>{p.username || 'User'}</span>
                          {p.userId === groupRoom.hostId && (
                            <span className="participant-host-tag">Host</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="group-cart-section">
                    <div className="group-cart-title">
                      <span>Shared Cart</span>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                        {groupCartItems.reduce((acc, item) => acc + item.quantity, 0)} item(s)
                      </span>
                    </div>
                    
                    {groupCartItems.length === 0 ? (
                      <div className="group-cart-empty">
                        No items added yet. Start adding items from the menu!
                      </div>
                    ) : (
                      <>
                        <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
                          {groupCartItems.map((item, idx) => (
                            <div key={idx} className="group-cart-item">
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="group-cart-item-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {item.itemName}
                                </div>
                                <div className="group-cart-item-meta">
                                  Qty: {item.quantity} • {item.userName}
                                </div>
                              </div>
                              <div className="group-cart-item-price">
                                &#8377;{item.price * item.quantity}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="group-cart-total">
                          <span>Subtotal</span>
                          <span>&#8377;{groupCartTotal}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {user?.userID === groupRoom.hostId ? (
                      <button 
                        className="group-btn group-btn-primary" 
                        onClick={handleCheckoutGroupRoom}
                        disabled={groupCartItems.length === 0}
                      >
                        Checkout Group Order
                      </button>
                    ) : (
                      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', paddingBottom: '6px' }}>
                        Waiting for host to checkout...
                      </div>
                    )}
                    <button className="group-btn group-btn-danger" onClick={handleLeaveGroupRoom}>
                      Leave Room
                    </button>
                  </div>
                  {groupError && (
                    <div className="group-error-msg">
                      <AlertCircle size={14} />
                      <span>{groupError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="zingbite-promise-section">
          <div className="promise-header">
            <span className="promise-subtitle">WHY ORDER FROM US?</span>
            <h2 className="promise-title">The ZingBite Promise</h2>
          </div>
          <div className="promise-grid">
            <div className="promise-card">
              <div className="promise-icon-wrapper"><Flame size={24} /></div>
              <h3>Gourmet Selection</h3>
              <p>We partner only with top-rated local kitchens to bring you handpicked culinary creations.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon-wrapper"><Clock size={24} /></div>
              <h3>Superfast Delivery</h3>
              <p>Smart route optimization and live telemetry tracking ensure your food arrives hot and fresh.</p>
            </div>
            <div className="promise-card">
              <div className="promise-icon-wrapper"><MapPin size={24} /></div>
              <h3>Live Telemetry Tracking</h3>
              <p>Follow your rider live on an interactive map from our kitchen to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>

      {cartError && ReactDOM.createPortal(
        <div style={{
          position: 'fixed', top: '80px', right: '24px', zIndex: 3000,
          background: '#fff', border: '1.5px solid var(--danger)',
          borderRadius: '12px', padding: '14px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'slideIn 0.3s ease-out',
          maxWidth: '380px'
        }}>
          <AlertTriangle size={18} color="var(--danger)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cartError}</span>
          <button onClick={() => setCartError(null)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', marginLeft: '4px', padding: '2px'
          }}>✕</button>
        </div>,
        document.body
      )}

      {!groupRoom && cart && cart.itemCount > 0 && ReactDOM.createPortal(
        <div className="cart-bar-popup slide-up">
          <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} /> {cart.itemCount} item{cart.itemCount > 1 ? 's' : ''} in cart
          </span>
          <Link to="/cart" className="cart-bar-link">VIEW CART <ArrowRight size={18} /></Link>
        </div>,
        document.body
      )}

      {conflictPopup && ReactDOM.createPortal(
        <div className="modal-overlay" onClick={() => setConflictPopup(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon"><AlertCircle size={32} color="var(--brand-red)" /></div>
            <h3 className="modal-title">Items from another restaurant</h3>
            <p className="modal-desc">Your cart contains items from a different restaurant. Start fresh to add items from this one?</p>
            <div className="modal-actions">
              <button className="modal-btn-outline" onClick={() => setConflictPopup(null)}>Cancel</button>
              <button className="modal-btn-primary" onClick={() => clearAndAdd(conflictPopup.itemId, conflictPopup.quantity)}>Start Fresh</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Menu;
