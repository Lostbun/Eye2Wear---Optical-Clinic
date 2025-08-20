import { useRef, useCallback } from 'react';

const useDataCache = () => {
  const cacheRef = useRef({
    // Patient data caches
    patientDetails: { data: null, timestamp: 0 },
    patientDemographics: { data: null, timestamp: 0 },
    
    // Product/Inventory caches
    ambherCategories: { data: null, timestamp: 0 },
    bautistaCategories: { data: null, timestamp: 0 },
    ambherProducts: { data: null, timestamp: 0 },
    bautistaProducts: { data: null, timestamp: 0 },
    
    // Appointment caches
    patientAppointments: { data: null, timestamp: 0 },
    
    // Order caches
    ambherOrders: { data: null, timestamp: 0 },
    bautistaOrders: { data: null, timestamp: 0 },
    
    // Wishlist caches
    ambherWishlist: { data: null, timestamp: 0 },
    bautistaWishlist: { data: null, timestamp: 0 }
  });

  // Cache durations in milliseconds
  const CACHE_DURATIONS = {
    patientDetails: 5 * 60 * 1000, // 5 minutes
    patientDemographics: 5 * 60 * 1000, // 5 minutes
    categories: 10 * 60 * 1000, // 10 minutes (categories change less frequently)
    products: 3 * 60 * 1000, // 3 minutes
    appointments: 2 * 60 * 1000, // 2 minutes
    orders: 2 * 60 * 1000, // 2 minutes
    wishlist: 1 * 60 * 1000 // 1 minute (wishlist changes more frequently)
  };

  const isCacheValid = useCallback((cacheKey, duration) => {
    const cache = cacheRef.current[cacheKey];
    if (!cache || !cache.data) return false;
    
    const now = Date.now();
    return (now - cache.timestamp) < duration;
  }, []);

  const setCache = useCallback((cacheKey, data) => {
    // Initialize cache entry if it doesn't exist
    if (!cacheRef.current[cacheKey]) {
      cacheRef.current[cacheKey] = { data: null, timestamp: 0 };
    }
    
    cacheRef.current[cacheKey] = {
      data: data,
      timestamp: Date.now()
    };
  }, []);

  const getCache = useCallback((cacheKey) => {
    return cacheRef.current[cacheKey]?.data || null;
  }, []);

  const clearCache = useCallback((cacheKey) => {
    if (cacheKey) {
      cacheRef.current[cacheKey] = { data: null, timestamp: 0 };
    } else {
      // Clear all caches
      Object.keys(cacheRef.current).forEach(key => {
        cacheRef.current[key] = { data: null, timestamp: 0 };
      });
    }
  }, []);

  const invalidateCache = useCallback((cacheKeys) => {
    if (Array.isArray(cacheKeys)) {
      cacheKeys.forEach(key => clearCache(key));
    } else {
      clearCache(cacheKeys);
    }
  }, [clearCache]);

  // Cached fetch functions
  const cachedFetch = useCallback(async (cacheKey, fetchFunction, duration) => {
    // Check if cache is still valid
    if (isCacheValid(cacheKey, duration)) {
      console.log(`Cache hit for ${cacheKey}`);
      return getCache(cacheKey);
    }

    console.log(`Cache miss for ${cacheKey}, fetching new data`);
    try {
      const data = await fetchFunction();
      setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${cacheKey}:`, error);
      // Return cached data if available, even if expired
      return getCache(cacheKey);
    }
  }, [isCacheValid, getCache, setCache]);

  return {
    // Cache management
    isCacheValid,
    setCache,
    getCache,
    clearCache,
    invalidateCache,
    cachedFetch,
    CACHE_DURATIONS,
    
    // Direct cache access
    cache: cacheRef.current
  };
};

export default useDataCache;
