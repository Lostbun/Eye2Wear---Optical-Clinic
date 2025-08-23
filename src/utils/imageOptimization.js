// Image optimization utilities with caching and performance improvements
import { useState, useEffect, useCallback, useRef } from 'react';

// Image cache to store optimized images
const imageCache = new Map();
const loadingImages = new Set();

// Optimized image loading with caching
export const useImageOptimization = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const abortController = useRef(null);

  // Preload images with caching and abortion support
  const preloadAllImages = useCallback(async (imageUrls, progressCallback) => {
    if (!imageUrls || imageUrls.length === 0) return;

    // Create new abort controller for this batch
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    const uniqueUrls = [...new Set(imageUrls.filter(url => url && !imageCache.has(url)))];
    
    if (uniqueUrls.length === 0) {
      progressCallback?.(100);
      return;
    }

    let loadedCount = 0;
    const totalImages = uniqueUrls.length;

    const loadPromises = uniqueUrls.map(async (url) => {
      if (loadingImages.has(url) || imageCache.has(url)) {
        return Promise.resolve();
      }

      loadingImages.add(url);

      try {
        if (signal.aborted) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        const loadPromise = new Promise((resolve, reject) => {
          const cleanup = () => {
            loadingImages.delete(url);
          };

          img.onload = () => {
            if (!signal.aborted) {
              imageCache.set(url, img);
              setLoadedImages(prev => new Set([...prev, url]));
              loadedCount++;
              const progress = Math.round((loadedCount / totalImages) * 100);
              setLoadingProgress(progress);
              progressCallback?.(progress);
            }
            cleanup();
            resolve();
          };

          img.onerror = () => {
            console.warn(`Failed to load image: ${url}`);
            cleanup();
            loadedCount++;
            const progress = Math.round((loadedCount / totalImages) * 100);
            setLoadingProgress(progress);
            progressCallback?.(progress);
            resolve(); // Don't reject, just continue
          };

          if (signal.aborted) {
            cleanup();
            reject(new Error('Aborted'));
            return;
          }
        });

        img.src = url;
        return loadPromise;
      } catch (error) {
        loadingImages.delete(url);
        if (!signal.aborted) {
          console.warn(`Error preloading image: ${url}`, error);
        }
      }
    });

    try {
      await Promise.allSettled(loadPromises);
    } catch (error) {
      if (!signal.aborted) {
        console.warn('Some images failed to preload:', error);
      }
    }
  }, []);

  // Cancel current preloading operation
  const cancelPreloading = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);

  // Get optimized image props with error handling
  const getImageProps = useCallback((src, alt = '') => {
    if (!src) {
      return {
        src: '/src/assets/images/defaultimageplaceholder.png',
        alt,
        loading: 'lazy',
        onError: (e) => {
          e.target.src = '/src/assets/images/defaultimageplaceholder.png';
        }
      };
    }

    return {
      src,
      alt,
      loading: 'lazy',
      onError: (e) => {
        console.warn(`Image failed to load: ${src}`);
        e.target.src = '/src/assets/images/defaultimageplaceholder.png';
      },
      onLoad: () => {
        if (!imageCache.has(src)) {
          const img = new Image();
          img.src = src;
          imageCache.set(src, img);
        }
      }
    };
  }, []);

  // Manage cache size to prevent memory issues
  const manageCacheSize = useCallback((maxSize = 100) => {
    if (imageCache.size > maxSize) {
      const entries = Array.from(imageCache.entries());
      const toDelete = entries.slice(0, imageCache.size - maxSize);
      toDelete.forEach(([key]) => imageCache.delete(key));
      console.log(`🗑️ Cleaned up ${toDelete.length} cached images`);
    }
  }, []);

  // Check if image is loaded
  const isImageLoaded = useCallback((url) => {
    return loadedImages.has(url) || imageCache.has(url);
  }, [loadedImages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelPreloading();
    };
  }, [cancelPreloading]);

  return {
    preloadAllImages,
    cancelPreloading,
    getImageProps,
    manageCacheSize,
    isImageLoaded,
    loadingProgress,
    loadedImages
  };
};

// Utility function to clear all image cache
export const clearImageCache = () => {
  imageCache.clear();
  loadingImages.clear();
  console.log('🗑️ Cleared all image cache');
};

// Get cache statistics
export const getImageCacheStats = () => {
  return {
    cacheSize: imageCache.size,
    loadingCount: loadingImages.size,
    cacheKeys: Array.from(imageCache.keys())
  };
};
