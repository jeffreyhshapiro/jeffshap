export type Tier = 'high' | 'low' | 'none';

let cached: Tier | null = null;

/**
 * Decides how much scene the visitor's device should get. Runs once and is
 * cached — creating probe contexts repeatedly is wasteful and some browsers
 * cap total contexts.
 */
export function detectTier(): Tier {
  if (cached) return cached;

  if (typeof window === 'undefined') return (cached = 'none');

  const canvas = document.createElement('canvas');
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  } catch {
    gl = null;
  }

  if (!gl) return (cached = 'none');

  // Point size is the whole rendering strategy here; a driver that caps it
  // at 1px would render an invisible field.
  const maxPoint = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE) as Float32Array | null;
  if (maxPoint && maxPoint[1] < 8) {
    loseContext(gl);
    return (cached = 'none');
  }

  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const narrow = window.innerWidth < 820;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

  loseContext(gl);

  cached = coarse || narrow || lowCores || lowMemory ? 'low' : 'high';
  return cached;
}

function loseContext(gl: WebGLRenderingContext) {
  const ext = gl.getExtension('WEBGL_lose_context');
  ext?.loseContext();
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
