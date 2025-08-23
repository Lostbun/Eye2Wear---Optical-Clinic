import { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

const useSmartCache = () => {
  const cache = useRef(new Map());
  const timestamps = useRef(new Map());
  const socket = useRef(null);
  const [realtimeUpdates, setRealtimeUpdates] = useState(new Map());

  // Cache durations in milliseconds - increased for better performance
  const CACHE_DURATIONS = useRef({
    products: 30 * 60 * 1000,      // 30 minutes (increased from 10)
    categories: 60 * 60 * 1000,    // 60 minutes (increased from 15)
    orders: 15 * 60 * 1000,        // 15 minutes (increased from 5)
    appointments: 10 * 60 * 1000,  // 10 minutes (increased from 3)
    wishlist: 15 * 60 * 1000,      // 15 minutes (increased from 5)
    patients: 30 * 60 * 1000,      // 30 minutes (increased from 10)
    realtime: 5 * 60 * 1000        // 5 minutes (increased from 30 seconds)
  });

  // Invalidate specific cache keys
  const invalidateCache = useCallback((keys) => {
    if (Array.isArray(keys)) {
      keys.forEach(key => {
        cache.current.delete(key);
        timestamps.current.delete(key);
        console.log(`🗑️ Invalidated cache for ${key}`);
      });
    } else {
      cache.current.delete(keys);
      timestamps.current.delete(keys);
      console.log(`🗑️ Invalidated cache for ${keys}`);
    }
  }, []);

  // Initialize WebSocket for real-time updates - with connection throttling
  useEffect(() => {
    // Don't initialize socket for admin dashboard to prevent excessive connections
    const isAdminDashboard = window.location.pathname.includes('admin');
    if (isAdminDashboard) {
      console.log('🚫 Skipping WebSocket initialization for admin dashboard');
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('patienttoken');
    
    if (token && !socket.current) {
      console.log('🔌 Initializing WebSocket connection...');
      socket.current = io(apiUrl, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 5000
      });

      // Listen for real-time data updates
      socket.current.on('orderUpdate', (data) => {
        console.log('📦 Real-time order update received:', data);
        // Use local invalidateCache instead of dependency
        const localInvalidateCache = (keys) => {
          if (Array.isArray(keys)) {
            keys.forEach(key => {
              cache.current.delete(key);
              timestamps.current.delete(key);
            });
          } else {
            cache.current.delete(keys);
            timestamps.current.delete(keys);
          }
        };
        localInvalidateCache(['ambherOrders', 'bautistaOrders']);
        setRealtimeUpdates(prev => new Map(prev.set('orders', Date.now())));
      });

      socket.current.on('appointmentUpdate', (data) => {
        console.log('📅 Real-time appointment update received:', data);
        const localInvalidateCache = (keys) => {
          if (Array.isArray(keys)) {
            keys.forEach(key => {
              cache.current.delete(key);
              timestamps.current.delete(key);
            });
          } else {
            cache.current.delete(keys);
            timestamps.current.delete(keys);
          }
        };
        localInvalidateCache(['patientAppointments']);
        setRealtimeUpdates(prev => new Map(prev.set('appointments', Date.now())));
      });

      socket.current.on('wishlistUpdate', (data) => {
        console.log('❤️ Real-time wishlist update received:', data);
        const localInvalidateCache = (keys) => {
          if (Array.isArray(keys)) {
            keys.forEach(key => {
              cache.current.delete(key);
              timestamps.current.delete(key);
            });
          } else {
            cache.current.delete(keys);
            timestamps.current.delete(keys);
          }
        };
        localInvalidateCache(['wishlist']);
        setRealtimeUpdates(prev => new Map(prev.set('wishlist', Date.now())));
      });

      socket.current.on('productUpdate', (data) => {
        console.log('🛍️ Real-time product update received:', data);
        const localInvalidateCache = (keys) => {
          if (Array.isArray(keys)) {
            keys.forEach(key => {
              cache.current.delete(key);
              timestamps.current.delete(key);
            });
          } else {
            cache.current.delete(keys);
            timestamps.current.delete(keys);
          }
        };
        localInvalidateCache(['ambherProducts', 'bautistaProducts']);
        setRealtimeUpdates(prev => new Map(prev.set('products', Date.now())));
      });

      socket.current.on('connect', () => {
        console.log('🔌 Smart cache WebSocket connected');
      });

      socket.current.on('disconnect', () => {
        console.log('🔌 Smart cache WebSocket disconnected');
      });

      socket.current.on('connect_error', (error) => {
        console.warn('🔌 WebSocket connection error:', error);
      });
    }

    return () => {
      if (socket.current) {
        console.log('🔌 Cleaning up WebSocket connection');
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  // Check if cache is valid
  const isCacheValid = useCallback((key, duration) => {
    const timestamp = timestamps.current.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < duration;
  }, []);

  // Smart fetch with caching and real-time awareness
  const smartFetch = useCallback(async (key, fetchFunction, duration = CACHE_DURATIONS.current.realtime, forceRefresh = false) => {
    try {
      // Check if we have valid cached data and no force refresh
      if (!forceRefresh && cache.current.has(key) && isCacheValid(key, duration)) {
        console.log(`📋 Cache HIT for ${key} - returning cached data`);
        return cache.current.get(key);
      }

      console.log(`🔄 Cache MISS for ${key} - fetching fresh data`);
      
      // Fetch fresh data
      const data = await fetchFunction();
      
      // Store in cache with timestamp
      cache.current.set(key, data);
      timestamps.current.set(key, Date.now());
      
      console.log(`✅ Cached fresh data for ${key}`);
      return data;
      
    } catch (error) {
      console.error(`❌ Error fetching ${key}:`, error);
      
      // If we have stale cache data, return it as fallback
      if (cache.current.has(key)) {
        console.log(`🔄 Returning stale cache data for ${key} due to error`);
        return cache.current.get(key);
      }
      
      throw error;
    }
  }, [isCacheValid]);

  // Clear all cache
  const clearAllCache = useCallback(() => {
    cache.current.clear();
    timestamps.current.clear();
    console.log('🗑️ Cleared all cache');
  }, []);

  // Get cache stats for debugging
  const getCacheStats = useCallback(() => {
    const stats = {};
    for (const [key, timestamp] of timestamps.current.entries()) {
      stats[key] = {
        age: Date.now() - timestamp,
        hasData: cache.current.has(key),
        dataSize: cache.current.get(key)?.length || 'N/A'
      };
    }
    return stats;
  }, []);

  // Preload data for better UX
  const preloadData = useCallback(async (key, fetchFunction, duration) => {
    try {
      if (!cache.current.has(key) || !isCacheValid(key, duration)) {
        console.log(`⚡ Preloading ${key}`);
        await smartFetch(key, fetchFunction, duration);
      }
    } catch (error) {
      console.warn(`⚠️ Preload failed for ${key}:`, error);
    }
  }, [smartFetch, isCacheValid]);

  // Manual trigger for real-time updates (useful after local operations)
  const triggerRealtimeUpdate = useCallback((updateType) => {
    console.log(`🔄 Manually triggering real-time update for: ${updateType}`);
    setRealtimeUpdates(prev => new Map(prev.set(updateType, Date.now())));
  }, []);

  return {
    smartFetch,
    invalidateCache,
    clearAllCache,
    getCacheStats,
    preloadData,
    triggerRealtimeUpdate,
    realtimeUpdates,
    CACHE_DURATIONS: CACHE_DURATIONS.current
  };
};

export default useSmartCache;
