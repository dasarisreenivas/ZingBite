import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for premium 3D tilt effect on mouse hover.
 * Applies CSS custom properties --rotateX, --rotateY, --scale for GPU transforms.
 * @param {Object} options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 8)
 * @param {number} options.perspective - CSS perspective value (default: 800)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {boolean} options.disabled - Disable the effect
 * @returns {React.RefObject} Ref to attach to the tiltable element
 */
export default function useParallaxTilt({
  maxTilt = 8,
  perspective = 800,
  scale = 1.02,
  disabled = false,
} = {}) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (disabled || reducedMotion.current) return;
    const el = ref.current;
    if (!el) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxTilt;
      const rotateY = (x - 0.5) * maxTilt;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    });
  }, [maxTilt, perspective, scale, disabled]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, [perspective]);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled || reducedMotion.current) return;

    el.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleMouseMove, handleMouseLeave, disabled]);

  return ref;
}
