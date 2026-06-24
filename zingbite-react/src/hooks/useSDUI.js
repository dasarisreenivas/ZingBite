import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getDeviceType = (width) => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Hook to retrieve SDUI page configuration and track responsive viewports.
 * @param {string} pageId - Unique page configuration path key (e.g. "homepage", "restaurant_dashboard")
 * @param {Object} fallbackConfig - Pre-configured layout fallback schema
 */
export const useSDUI = (pageId, fallbackConfig = null) => {
  const [sduiConfig, setSduiConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track viewport device width
  const [viewport, setViewport] = useState(() => getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setViewport(getDeviceType(window.innerWidth));
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchLayout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/sdui/${pageId}`);
      if (response.data && response.data.sections) {
        setSduiConfig(response.data);
      } else {
        throw new Error('Invalid layout specification received.');
      }
    } catch (err) {
      console.warn(`Failed to fetch dynamic layout config for "${pageId}":`, err);
      if (fallbackConfig) {
        setSduiConfig(fallbackConfig);
      } else {
        setError(err.message || 'Failed to retrieve screen layout configurations.');
      }
    } finally {
      setLoading(false);
    }
  }, [pageId, fallbackConfig]);

  useEffect(() => {
    fetchLayout();
  }, [fetchLayout]);

  return {
    sduiConfig,
    loading,
    error,
    viewport,
    refreshLayout: fetchLayout
  };
};

export default useSDUI;
