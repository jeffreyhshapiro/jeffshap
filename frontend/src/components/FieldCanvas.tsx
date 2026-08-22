import { useEffect, useRef } from 'react';
import type { FieldScene } from '../webgl/FieldScene';
import { prefersReducedMotion, type Tier } from '../webgl/capability';

interface Props {
  tier: Exclude<Tier, 'none'>;
  chapters: number;
  /** Live 0..1 document scroll progress. */
  scrollRef: React.RefObject<number>;
  /** Index of the resume section currently in view. */
  activeChapter: number;
}

export function FieldCanvas({ tier, chapters, scrollRef, activeChapter }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(activeChapter);

  activeRef.current = activeChapter;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let scene: FieldScene | null = null;
    let cancelled = false;
    let sync = 0;
    const teardown: Array<() => void> = [];

    // three.js is loaded on its own chunk so the hero text paints without
    // waiting on ~200kB of gzipped renderer.
    import('../webgl/FieldScene')
      .then(({ FieldScene: Scene }) => {
        if (cancelled || !canvasRef.current) return;

        try {
          scene = new Scene(canvas, { chapters, tier });
        } catch (err) {
          // Context creation can still fail after detection succeeded
          // (driver resets, too many live contexts). The DOM stays readable.
          console.warn('Field scene unavailable:', err);
          canvas.dataset.failed = 'true';
          return;
        }

        const reduced = prefersReducedMotion();
        const active = scene;

        canvas.dataset.ready = 'true';

        if (reduced) {
          // One frame, then nothing moves.
          active.renderStill();
        } else {
          active.start();

          // Scroll + chapter are pulled on the render clock so React never
          // re-renders for animation state.
          const pump = () => {
            sync = requestAnimationFrame(pump);
            active.setScroll(scrollRef.current ?? 0);
            active.setActiveChapter(activeRef.current);
          };
          sync = requestAnimationFrame(pump);
        }

        const onResize = () => {
          active.resize();
          if (reduced) active.renderStill();
        };
        window.addEventListener('resize', onResize);
        teardown.push(() => window.removeEventListener('resize', onResize));

        if (!reduced && tier === 'high') {
          const onPointer = (e: PointerEvent) => {
            active.setPointer(
              (e.clientX / window.innerWidth) * 2 - 1,
              -((e.clientY / window.innerHeight) * 2 - 1)
            );
          };
          window.addEventListener('pointermove', onPointer, { passive: true });
          teardown.push(() => window.removeEventListener('pointermove', onPointer));
        }

        if (!reduced) {
          // Stop burning GPU while the tab is in the background.
          const onVisibility = () => {
            if (document.hidden) active.stop();
            else active.start();
          };
          document.addEventListener('visibilitychange', onVisibility);
          teardown.push(() => document.removeEventListener('visibilitychange', onVisibility));
        }

        // A lost context would otherwise leave a frozen or black canvas.
        const onLost = (e: Event) => {
          e.preventDefault();
          active.stop();
          canvas.dataset.failed = 'true';
        };
        canvas.addEventListener('webglcontextlost', onLost);
        teardown.push(() => canvas.removeEventListener('webglcontextlost', onLost));
      })
      .catch((err) => {
        console.warn('Field scene failed to load:', err);
        canvas.dataset.failed = 'true';
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(sync);
      teardown.forEach((fn) => fn());
      scene?.dispose();
      scene = null;
    };
  }, [tier, chapters, scrollRef]);

  return <canvas ref={canvasRef} className="field-canvas" aria-hidden="true" />;
}
