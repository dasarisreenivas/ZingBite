import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-based depth/parallax effects.
 * Returns scroll progress (0 to 1) for the element or window.
 * @param {Object} options
 * @param {React.RefObject} options.elementRef - Ref to track (null = window)
 * @param {boolean} options.clamp - Clamp between 0-1 (default: true)
 * @returns {{ progress: number, scrollY: number }}
 */
export default function useScrollDepth({ elementRef = null, clamp = true } = {}) {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        if (elementRef?.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const viewH = window.innerHeight;
          const rawProgress = 1 - (rect.top / viewH);
          setProgress(clamp ? Math.max(0, Math.min(1, rawProgress)) : rawProgress);
          setScrollY(window.scrollY);
        } else {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const rawProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
          setProgress(clamp ? Math.max(0, Math.min(1, rawProgress)) : rawProgress);
          setScrollY(window.scrollY);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [elementRef, clamp]);

  return { progress, scrollY };
}
