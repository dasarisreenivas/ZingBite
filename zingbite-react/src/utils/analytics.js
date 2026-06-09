import axios from 'axios';

export const trackEvent = async (eventType, eventData = {}) => {
  try {
    await axios.post('/api/analytics', {
      eventType,
      eventData: JSON.stringify(eventData)
    });
  } catch (err) {
    console.warn('[Analytics] Log failure:', eventType, err.message);
  }
};

export const trackPageView = (pageName) => {
  trackEvent('PAGE_VIEW', { page: pageName });
};
