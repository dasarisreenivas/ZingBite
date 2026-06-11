import { useEffect, useRef, useState, useCallback } from 'react';

export default function useSSE(url, onMessage, options = {}) {
  const { enabled = true, maxRetries = 10, baseDelay = 1000 } = options;
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const esRef = useRef(null);
  const retriesRef = useRef(0);
  const timerRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const cleanup = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    if (esRef.current) { esRef.current.close(); esRef.current = null; }
    setConnected(false);
    setReconnecting(false);
  }, []);

  useEffect(() => {
    if (!url || !enabled) { cleanup(); return; }

    let mounted = true;

    function connect() {
      if (!mounted) return;
      const es = new EventSource(url);
      esRef.current = es;

      es.onopen = () => {
        if (!mounted) return;
        retriesRef.current = 0;
        setConnected(true);
        setReconnecting(false);
      };

      es.onmessage = (event) => {
        if (!mounted) return;
        try { onMessageRef.current(event); } catch (err) { console.error('[useSSE] Handler error:', err); }
      };

      es.onerror = () => {
        if (!mounted) return;
        es.close();
        esRef.current = null;
        setConnected(false);

        if (retriesRef.current < maxRetries) {
          setReconnecting(true);
          const delay = Math.min(baseDelay * Math.pow(2, retriesRef.current), 30000);
          retriesRef.current++;
          timerRef.current = setTimeout(connect, delay);
        } else {
          setReconnecting(false);
        }
      };
    }

    connect();
    return () => { mounted = false; cleanup(); };
  }, [url, enabled, cleanup, maxRetries, baseDelay]);

  return { connected, reconnecting };
}
