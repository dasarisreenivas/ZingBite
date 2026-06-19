import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  // Fetch wishlist items from backend API
  const fetchWishlist = useCallback(async (showLoading = true) => {
    if (!user) {
      setWishlist([]);
      return;
    }
    if (showLoading) setLoading(true);
    try {
      const res = await axios.get('/api/wishlist');
      setWishlist(res.data || []);
      setWishlistError(null);
    } catch (err) {
      console.error('[ZingBite] Error fetching wishlist:', err);
      setWishlistError('Failed to load wishlist.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [user]);

  // Load wishlist whenever the authenticated user changes
  useEffect(() => {
    fetchWishlist(true);
  }, [fetchWishlist]);

  // Create a memoized Set of favorited menu IDs for fast O(1) lookups in render lists
  const wishlistIds = useMemo(() => {
    return new Set(wishlist.map(item => item.menuId));
  }, [wishlist]);

  // Toggle wishlist state with Optimistic UI updates
  const toggleWishlist = useCallback(async (menuItem) => {
    if (!user) {
      setWishlistError('Please log in to add items to your wishlist.');
      return false;
    }

    const isCurrentlyFavorited = wishlistIds.has(menuItem.menuId);
    const previousWishlist = [...wishlist];

    // --- Optimistic UI Update ---
    if (isCurrentlyFavorited) {
      // Remove item locally
      setWishlist(prev => prev.filter(item => item.menuId !== menuItem.menuId));
    } else {
      // Add item locally
      setWishlist(prev => [...prev, menuItem]);
    }

    try {
      // Post toggle action to backend
      await axios.post('/api/wishlist', { foodItemId: menuItem.menuId });
      return true;
    } catch (err) {
      console.error('[ZingBite] Wishlist toggle failed, rolling back:', err);
      setWishlistError('Failed to update wishlist. Retrying...');
      
      // --- Rollback on Error ---
      setWishlist(previousWishlist);
      
      // Auto-clear error after 4 seconds
      setTimeout(() => setWishlistError(null), 4000);
      return false;
    }
  }, [user, wishlist, wishlistIds]);

  const contextValue = useMemo(() => ({
    wishlist,
    wishlistIds,
    loading,
    wishlistError,
    toggleWishlist,
    fetchWishlist
  }), [wishlist, wishlistIds, loading, wishlistError, toggleWishlist, fetchWishlist]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
