import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view.
 *
 * Content must never be trapped behind an animation that cannot fire: anyone
 * who asked for reduced motion, browsers without IntersectionObserver, and
 * anything already at or above the viewport (a #hash jump or a restored scroll
 * position skips past those, so they would otherwise stay invisible forever)
 * all start revealed.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    // Already scrolled past (or level with) this element — show it immediately.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown } as const;
}
