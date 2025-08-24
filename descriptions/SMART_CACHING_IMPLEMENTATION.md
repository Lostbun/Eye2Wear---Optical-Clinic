# Smart Caching with Real-Time Updates Implementation

## Overview
This implementation provides intelligent caching that:
- **Caches data once loaded** - No unnecessary refetching when navigating back
- **Watches for real-time updates** - Uses WebSocket for live data synchronization
- **Provides stale-while-revalidate** - Shows cached data immediately, updates in background
- **Handles cache invalidation** - Smart invalidation on data mutations

## Architecture

### 1. useSmartCache Hook (`/src/hooks/useSmartCache.jsx`)
Core caching functionality with:
- **Memory-based cache** with timestamps
- **WebSocket real-time listeners** for data updates
- **Smart fetch function** that checks cache validity
- **Automatic cache invalidation** on real-time updates

```javascript
const { smartFetch, realtimeUpdates, CACHE_DURATIONS } = useSmartCache();
```

### 2. Cache Durations
```javascript
CACHE_DURATIONS = {
  products: 10 * 60 * 1000,      // 10 minutes
  categories: 15 * 60 * 1000,    // 15 minutes
  orders: 5 * 60 * 1000,         // 5 minutes
  appointments: 3 * 60 * 1000,   // 3 minutes
  wishlist: 5 * 60 * 1000,       // 5 minutes
  patients: 10 * 60 * 1000,      // 10 minutes
}
```

### 3. Real-Time WebSocket Events
- `orderUpdate` - Order status changes, new orders
- `appointmentUpdate` - Appointment bookings/changes
- `wishlistUpdate` - Wishlist additions/removals
- `productUpdate` - Product inventory changes

## Implementation Examples

### PatientOrders.jsx
```javascript
// Smart cached order fetching
const fetchpatientorders = useCallback(async (forceRefresh = false) => {
  try {
    setLoading(true);
    
    if (activeorderstable === 'ambherorderstable') {
      const data = await smartFetch(
        `ambherOrders_${patientemail}`,
        () => fetchAmbherOrders(patientemail),
        CACHE_DURATIONS.orders,
        forceRefresh
      );
      setAmbherOrders(data || []);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    setLoading(false);
  }
}, [activeorderstable, patientemail, smartFetch]);

// Real-time update listener
useEffect(() => {
  if (realtimeUpdates.has('orders')) {
    console.log('📦 Real-time orders update detected, refreshing data...');
    if (patientemail) {
      fetchpatientorders(true); // Force refresh
    }
  }
}, [realtimeUpdates, patientemail, fetchpatientorders]);
```

### PatientProducts.jsx
```javascript
// Smart cached product fetching
const fetchambherproducts = useCallback(async (forceRefresh = false) => {
  try {
    setambherloadingproducts(true);
    const data = await smartFetch(
      'ambherProducts',
      () => fetchAmbherProducts(),
      CACHE_DURATIONS.products,
      forceRefresh
    );
    setambherinventoryproducts(data || []);
  } catch (error) {
    console.error("Failed fetching products: ", error);
  } finally {
    setambherloadingproducts(false);
  }
}, [smartFetch, CACHE_DURATIONS]);

// Real-time update listener
useEffect(() => {
  if (realtimeUpdates.has('products')) {
    console.log('🛍️ Real-time products update detected, refreshing data...');
    fetchambherproducts(true); // Force refresh
  }
}, [realtimeUpdates, fetchambherproducts]);
```

## Benefits

### 1. Performance Optimizations
- ✅ **Instant page loads** - Cached data shown immediately
- ✅ **Reduced API calls** - Data fetched once and cached
- ✅ **Background updates** - Fresh data loaded silently
- ✅ **Network resilience** - Stale data served on network errors

### 2. User Experience Improvements
- ✅ **No loading spinners** on return visits
- ✅ **Real-time data sync** without manual refresh
- ✅ **Smooth navigation** between pages
- ✅ **Offline-like experience** with cached data

### 3. Data Consistency
- ✅ **Auto-invalidation** on real-time updates
- ✅ **Force refresh** capability for critical updates
- ✅ **Stale-while-revalidate** pattern
- ✅ **Cache debugging** with getCacheStats()

## Cache Flow Diagram

```
User Action → smartFetch() → Check Cache → Valid? → Return Cached Data
                                      ↓ No
                              Fetch Fresh Data → Store in Cache → Return Data
                                      ↓
                              WebSocket Update → Invalidate Cache → Trigger Refresh
```

## Usage Patterns

### 1. First Page Load
```
User visits /orders → Cache MISS → API call → Store in cache → Show data
```

### 2. Return Visit (within cache duration)
```
User visits /orders → Cache HIT → Show cached data immediately
```

### 3. Real-time Update
```
Order status changes → WebSocket event → Cache invalidated → Fresh data fetched
```

### 4. Stale Data Fallback
```
API fails → Check cache → Return stale data with warning
```

## Monitoring & Debugging

### Cache Statistics
```javascript
const { getCacheStats } = useSmartCache();
console.log(getCacheStats());
// Output:
// {
//   ambherOrders: { age: 120000, hasData: true, dataSize: 15 },
//   ambherProducts: { age: 300000, hasData: true, dataSize: 45 }
// }
```

### Console Logs
- `📋 Cache HIT for {key}` - Data served from cache
- `🔄 Cache MISS for {key}` - Fresh data being fetched
- `✅ Cached fresh data for {key}` - Data successfully cached
- `🗑️ Invalidated cache for {key}` - Cache cleared due to update
- `📦 Real-time update received` - WebSocket event triggered

## Migration from useApiService

### Before (useApiService)
```javascript
const data = await fetchAmbherOrders(email);
setOrders(data);
```

### After (useSmartCache)
```javascript
const data = await smartFetch(
  `ambherOrders_${email}`,
  () => fetchAmbherOrders(email),
  CACHE_DURATIONS.orders
);
setOrders(data);
```

## Future Enhancements

1. **Persistent Cache** - LocalStorage/IndexedDB for cross-session caching
2. **Background Sync** - Service Worker for offline data sync
3. **Cache Compression** - Reduce memory usage for large datasets
4. **Smart Preloading** - Predictive data fetching based on user behavior
5. **Cache Analytics** - Metrics for hit/miss ratios and performance tracking

## Configuration

Adjust cache durations in `useSmartCache.jsx`:
```javascript
const CACHE_DURATIONS = useRef({
  products: 10 * 60 * 1000,      // Increase for less frequent updates
  orders: 2 * 60 * 1000,         // Decrease for more real-time feel
  // ... other durations
});
```
