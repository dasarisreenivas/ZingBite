import { useState, useEffect, useRef } from 'react';

const LEAFLET_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
const LEAFLET_JS = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';

let loadingPromise = null;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    // Load CSS
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    // Load JS
    if (!document.querySelector(`script[src="${LEAFLET_JS}"]`)) {
      const script = document.createElement('script');
      script.src = LEAFLET_JS;
      script.onload = () => resolve(window.L);
      script.onerror = (e) => { loadingPromise = null; reject(e); };
      document.head.appendChild(script);
    } else {
      // Script tag exists, poll for L
      const check = setInterval(() => {
        if (window.L) { clearInterval(check); resolve(window.L); }
      }, 50);
      // Safety timeout
      setTimeout(() => { clearInterval(check); reject(new Error('Leaflet load timeout')); }, 10000);
    }
  });

  return loadingPromise;
}

export default function useLeaflet() {
  const [leafletLoaded, setLeafletLoaded] = useState(!!window.L);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (!leafletLoaded) {
      loadLeaflet()
        .then(() => { if (mountedRef.current) setLeafletLoaded(true); })
        .catch((err) => console.error('[useLeaflet] Failed to load Leaflet:', err));
    }
    return () => { mountedRef.current = false; };
  }, [leafletLoaded]);

  return { leafletLoaded, L: window.L };
}
