import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for magnetic hover effect.
 * Element subtly shifts toward the cursor when hovered.
 * @param {Object} options
 * @param {number} options.strength - Pull strength (default: 0.3)
 * @param {boolean} options.disabled - Disable the effect
 * @returns {React.RefObject} Ref to attach to the magnetic element
 */
export default function useMagneticHover({ strength = 0.3, disabled = false } = {}) {
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
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    });
  }, [strength, disabled]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transform = 'translate3d(0, 0, 0)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled || reducedMotion.current) return;

    el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
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
