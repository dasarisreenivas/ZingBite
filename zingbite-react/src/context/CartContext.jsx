import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { trackEvent } from '../utils/analytics';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0, subtotal: 0, itemCount: 0, shipping: 0, tax: 0 });
  const [loading, setLoading] = useState(true);
  const [conflictPopup, setConflictPopup] = useState(null);
  const [cartError, setCartError] = useState(null);

  const [coupon, setCoupon] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      if(res.data) setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Reset coupon if cart becomes empty
  useEffect(() => {
    const items = cart?.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
    if (items.length === 0) {
      setCoupon(null);
    }
  }, [cart]);

  const applyCoupon = (code) => {
    const uppercaseCode = code.toUpperCase().trim();
    if (uppercaseCode === 'ZING50') {
      setCoupon({ code: 'ZING50', type: 'percent', value: 50, cap: 150, description: '50% OFF up to ₹150' });
      return { success: true, message: 'Coupon ZING50 applied!' };
    } else if (uppercaseCode === 'FREEDEL') {
      setCoupon({ code: 'FREEDEL', type: 'free_delivery', value: cart.shipping, description: 'Free Delivery Applied' });
      return { success: true, message: 'Free Delivery coupon applied!' };
    } else if (uppercaseCode === 'WELCOME20') {
      setCoupon({ code: 'WELCOME20', type: 'flat', value: 20, description: 'Flat ₹20 OFF' });
      return { success: true, message: 'Flat ₹20 discount applied!' };
    }
    return { success: false, message: 'Invalid Coupon Code' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const getDiscountedCart = () => {
    if (!cart) return { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0, discount: 0 };
    
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
        discount = shipping;
        shipping = 0; // zero out the shipping cost
      }
    }

    const total = Math.max(0, subtotal + shipping + tax - discount);
    
    return {
      ...cart,
      subtotal,
      shipping,
      tax,
      discount,
      total
    };
  };

  const addToCart = async (itemId, quantity) => {
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
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) return removeFromCart(itemId);
    
    const items = cart?.items ? (Array.isArray(cart.items) ? cart.items : Object.values(cart.items)) : [];
    const existing = items.find(i => i.itemId === itemId || i.menuId === itemId);
    const currentQty = existing ? existing.quantity : 0;
    const isAdd = quantity > currentQty;

    try {
      const res = await axios.post('/api/cart', { action: 'updateQuantity', itemId, quantity });
      setCart(res.data);
      setCartError(null);
      if (isAdd) {
        trackEvent('ADD_TO_CART', { itemId, quantity: quantity - currentQty });
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to update cart';
      setCartError(msg);
      console.error(err);
      setTimeout(() => setCartError(null), 4000);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.post('/api/cart', { action: 'remove', itemId });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearAndAdd = async (itemId, quantity) => {
    try {
      const res = await axios.post('/api/cart', { action: 'clearAndAdd', itemId, quantity });
      setCart(res.data);
      setConflictPopup(null);
      trackEvent('ADD_TO_CART', { itemId, quantity });
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.post('/api/cart', { action: 'clear' });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart: getDiscountedCart(), loading, addToCart, updateQuantity, removeFromCart, 
      conflictPopup, setConflictPopup, clearAndAdd, clearCart,
      coupon, applyCoupon, removeCoupon,
      cartError, setCartError
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
