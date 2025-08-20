import useDataCache from './useDataCache';

const useApiService = () => {
  const { cachedFetch, CACHE_DURATIONS, invalidateCache } = useDataCache();

  // Get token from localStorage
  const getToken = () => localStorage.getItem("patienttoken");

  const fetchPatientDetails = async () => {
    return cachedFetch('patientDetails', async () => {
      const token = getToken();
      const response = await fetch("/api/patientaccounts/me", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch patient details");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.patients);
  };

  const fetchPatientDemographics = async (email) => {
    return cachedFetch('patientDemographics', async () => {
      const token = getToken();
      const response = await fetch(`/api/patientdemographics/patientemail/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch patient demographics");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.patients);
  };

  const fetchAmbherCategories = async () => {
    return cachedFetch('ambherCategories', async () => {
      const token = getToken();
      const response = await fetch('/api/ambherinventorycategory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Ambher categories");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.products);
  };

  const fetchBautistaCategories = async () => {
    return cachedFetch('bautistaCategories', async () => {
      const token = getToken();
      const response = await fetch('/api/bautistainventorycategory', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Bautista categories");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.products);
  };

  const fetchAmbherProducts = async () => {
    return cachedFetch('ambherProducts', async () => {
      const token = getToken();
      const response = await fetch('/api/ambherinventoryproduct', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Ambher products");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.products);
  };

  const fetchBautistaProducts = async () => {
    return cachedFetch('bautistaProducts', async () => {
      const token = getToken();
      const response = await fetch('/api/bautistainventoryproduct', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Bautista products");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.products);
  };

  const fetchPatientAppointments = async (email) => {
    return cachedFetch(`patientAppointments_${email}`, async () => {
      const token = getToken();
      const response = await fetch(`/api/patientappointments/appointments/email/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.appointments);
  };

  const fetchAmbherOrders = async (email) => {
    return cachedFetch('ambherOrders', async () => {
      const token = getToken();
      const response = await fetch(`/api/patientorderambher/email/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Ambher orders");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.orders);
  };

  const fetchBautistaOrders = async (email) => {
    return cachedFetch('bautistaOrders', async () => {
      const token = getToken();
      const response = await fetch(`/api/patientorderbautista/email/${email}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch Bautista orders");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.orders);
  };

  const fetchWishlist = async () => {
    return cachedFetch('wishlist', async () => {
      const token = getToken();
      const response = await fetch(`/api/patientwishlistinventoryproduct/email`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      return data;
    }, CACHE_DURATIONS.wishlist);
  };

  // Cache invalidation functions
  const invalidatePatientData = () => {
    invalidateCache(['patientDetails', 'patientDemographics']);
  };

  const invalidateProductData = () => {
    invalidateCache(['ambherCategories', 'bautistaCategories', 'ambherProducts', 'bautistaProducts']);
  };

  const invalidateOrderData = () => {
    invalidateCache(['ambherOrders', 'bautistaOrders']);
  };

  const invalidateWishlistData = () => {
    invalidateCache(['wishlist']);
  };

  const invalidateAppointmentData = () => {
    invalidateCache(['patientAppointments']);
  };

  return {
    // Fetch functions
    fetchPatientDetails,
    fetchPatientDemographics,
    fetchAmbherCategories,
    fetchBautistaCategories,
    fetchAmbherProducts,
    fetchBautistaProducts,
    fetchPatientAppointments,
    fetchAmbherOrders,
    fetchBautistaOrders,
    fetchWishlist,
    
    // Cache invalidation
    invalidatePatientData,
    invalidateProductData,
    invalidateOrderData,
    invalidateWishlistData,
    invalidateAppointmentData
  };
};

export default useApiService;