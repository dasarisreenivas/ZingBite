import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import { trackEvent } from '../utils/analytics';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const INITIAL_CART = { items: [], total: 0, subtotal: 0, itemCount: 0, shipping: 0, tax: 0, surgeMultiplier: 1.0, surgeFee: 0.0, surgeReason: 'Normal' };

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(INITIAL_CART);
  const [surge, setSurge] = useState({ multiplier: 1.0, reason: 'Normal', fee: 0.0 });
  const [loading, setLoading] = useState(true);
  const [conflictPopup, setConflictPopup] = useState(null);
  const [cartError, setCartError] = useState(null);

  const [coupon, setCoupon] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get('/api/cart');
      if(res.data) setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSurge = useCallback(async (latitude, longitude) => {
    try {
      const res = await axios.get('/api/surge', { params: { latitude, longitude } });
      if (res.data) {
        setSurge({
          multiplier: res.data.surgeMultiplier || res.data.multiplier || 1.0,
          reason: res.data.surgeReason || res.data.reason || 'Normal',
          fee: res.data.surgeFee || res.data.fee || 0.0
        });
      }
    } catch (err) {
      console.error("Failed to fetch surge:", err);
    }
  }, []);

  useEffect(() => {
    const updateSurgeAndCart = async () => {
      if (user && user.latitude && user.longitude) {
        await fetchSurge(user.latitude, user.longitude);
        await fetchCart();
      } else {
        await fetchCart();
      }
    };
    updateSurgeAndCart();
  }, [user?.latitude, user?.longitude, fetchSurge, fetchCart]);

  // Reset coupon if cart becomes empty
  useEffect(() => {
    const items = cart?.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
    if (items.length === 0) {
      setCoupon(null);
    }
  }, [cart]);

  const applyCoupon = useCallback((code) => {
    const uppercaseCode = code.toUpperCase().trim();
    if (uppercaseCode === 'ZING50') {
      setCoupon({ code: 'ZING50', type: 'percent', value: 50, cap: 150, description: '50% OFF up to ₹150' });
      return { success: true, message: 'Coupon ZING50 applied!' };
    } else if (uppercaseCode === 'FREEDEL') {
      setCoupon({ code: 'FREEDEL', type: 'free_delivery', value: 0, description: 'Free Delivery Applied' });
      return { success: true, message: 'Free Delivery coupon applied!' };
    } else if (uppercaseCode === 'WELCOME20') {
      setCoupon({ code: 'WELCOME20', type: 'flat', value: 20, description: 'Flat ₹20 OFF' });
      return { success: true, message: 'Flat ₹20 discount applied!' };
    }
    return { success: false, message: 'Invalid Coupon Code' };
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const getDiscountedCart = useCallback(() => {
    if (!cart) return { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0, discount: 0, surgeMultiplier: 1.0, surgeFee: 0.0, surgeReason: 'Normal' };
    
    let subtotal = cart.subtotal || 0;
    let shipping = cart.shipping || 0;
    let tax = cart.tax || 0;
    let discount = 0;
 
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = (subtotal * coupon.value) / 100;
        if (coupon.cap) {
          discount = Math.min(discount, coupon.cap);
        }
      } else if (coupon.type === 'flat') {
        discount = Math.min(coupon.value, subtotal);
      } else if (coupon.type === 'free_delivery') {
        const surgeFee = cart.surgeFee || 0;
        const baseShipping = Math.max(0, shipping - surgeFee);
        discount = baseShipping;
        shipping = surgeFee;
      }
    }

    const total = Math.max(0, subtotal + shipping + tax - discount);
    
    return {
      ...cart,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      surgeFee: cart.surgeFee || 0,
      surgeMultiplier: cart.surgeMultiplier || 1.0,
      surgeReason: cart.surgeReason || 'Normal'
    };
  }, [cart, coupon]);

  const addToCart = useCallback(async (itemId, quantity) => {
    try {
      const res = await axios.post('/api/cart', { action: 'add', itemId, quantity });
      if (res.data.restaurantConflict) {
        setConflictPopup({ itemId, quantity });
        return false;
      }
      setCart(res.data);
      setCartError(null);
      trackEvent('ADD_TO_CART', { itemId, quantity });
      return true;
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add item to cart';
      setCartError(msg);
      console.error(err);
      setTimeout(() => setCartError(null), 4000);
      return false;
    }
  }, []);

  const removeFromCart = useCallback(async (itemId) => {
    try {
      const res = await axios.post('/api/cart', { action: 'remove', itemId });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    if (quantity <= 0) return removeFromCart(itemId);
    
    try {
      const res = await axios.post('/api/cart', { action: 'updateQuantity', itemId, quantity });
      setCart(res.data);
      setCartError(null);
      trackEvent('ADD_TO_CART', { itemId, quantity });
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update cart';
      setCartError(msg);
      console.error(err);
      setTimeout(() => setCartError(null), 4000);
    }
  }, [removeFromCart]);

  const clearAndAdd = useCallback(async (itemId, quantity) => {
    try {
      const res = await axios.post('/api/cart', { action: 'clearAndAdd', itemId, quantity });
      setCart(res.data);
      setConflictPopup(null);
      trackEvent('ADD_TO_CART', { itemId, quantity });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      const res = await axios.post('/api/cart', { action: 'clear' });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const contextValue = useMemo(() => ({
    cart: getDiscountedCart(), loading, addToCart, updateQuantity, removeFromCart,
    conflictPopup, setConflictPopup, clearAndAdd, clearCart,
    coupon, applyCoupon, removeCoupon,
    cartError, setCartError, fetchSurge, fetchCart
  }), [getDiscountedCart, loading, addToCart, updateQuantity, removeFromCart,
      conflictPopup, clearAndAdd, clearCart, coupon, applyCoupon, removeCoupon, cartError, fetchSurge, fetchCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
