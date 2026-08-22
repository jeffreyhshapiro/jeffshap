// Curl-noise driven point field. The noise is a cheap 3D simplex variant;
// curl of the noise gives a divergence-free flow, which keeps the field from
// collapsing into clumps the way plain gradient advection does.

export const FIELD_VERT = /* glsl */ `
precision highp float;

attribute vec3 aSeed;     // stable per-point randomness
attribute float aChapter; // which career chapter this point belongs to
attribute float aScale;

uniform float uTime;
uniform float uScroll;      // 0..1 through the document
uniform float uActive;      // index of active chapter (fractional, eased)
uniform float uRadius;
uniform float uDensity;     // scales point size on low-power devices
uniform float uPixelRatio;
uniform float uIntro;       // 0..1 settle-in on first load

varying float vGlow;
varying float vDepth;
varying float vChapterMix;

// ── simplex-ish 3D noise ────────────────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Curl of the noise field — divergence free, so the flow swirls without
// draining into sinks.
vec3 curl(vec3 p) {
  const float e = 0.35;
  float n1 = snoise(vec3(p.x, p.y + e, p.z));
  float n2 = snoise(vec3(p.x, p.y - e, p.z));
  float n3 = snoise(vec3(p.x, p.y, p.z + e));
  float n4 = snoise(vec3(p.x, p.y, p.z - e));
  float n5 = snoise(vec3(p.x + e, p.y, p.z));
  float n6 = snoise(vec3(p.x - e, p.y, p.z));
  // Deliberately NOT normalized: the curl's varying magnitude is what makes
  // some regions stream hard and others stay calm. Normalizing flattens the
  // field into uniform noise.
  return vec3(
    (n1 - n2) - (n3 - n4),
    (n3 - n4) - (n5 - n6),
    (n5 - n6) - (n1 - n2)
  ) / (2.0 * e);
}

void main() {
  // The position attribute carries lattice coordinates in [-0.5, 0.5]: u and v
  // index a parametric sheet, w selects which stacked sheet this point is on.
  float u = position.x;
  float v = position.y;
  float w = position.z;

  float t = uTime * 0.05;

  // The corridor is a stack of thin sheets the reader travels through.
  // Giving the points a surface to live on is what makes the field read as
  // structure rather than as a cloud of dust.
  float span = uRadius * 2.2;
  float depth = fract(w + 0.5 + uScroll * 1.6) - 0.5;   // wraps as you scroll
  float z = depth * span;

  vec3 pos = vec3(u * uRadius * 2.4, v * uRadius * 1.5, z);

  // Displace the sheet along its normal with layered noise. Neighbouring
  // points share the field, so the displacement is coherent — ridges and
  // valleys instead of speckle.
  float n1 = snoise(vec3(pos.xy * 0.022, z * 0.02 + t));
  float n2 = snoise(vec3(pos.xy * 0.055, z * 0.02 - t * 0.7));
  pos.y += (n1 * 0.65 + n2 * 0.25) * uRadius * 0.42;
  pos.x += curl(pos * 0.02 + vec3(t)).x * uRadius * 0.12;

  // Ridge lines: points near a crest of the noise brighten, which is what
  // draws the visible contour through the sheet.
  float ridge = 1.0 - abs(n1);
  ridge = pow(clamp(ridge, 0.0, 1.0), 3.0);

  // Intro: the sheets settle in from a flatter state.
  pos.y *= mix(0.25, 1.0, uIntro);

  float d = abs(aChapter - uActive);
  vChapterMix = 1.0 - smoothstep(0.0, 0.65, d);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mv.z;

  float fade = smoothstep(0.0, uRadius * 0.35, vDepth) *
               (1.0 - smoothstep(uRadius * 0.9, uRadius * 2.4, vDepth));

  vGlow = fade * (0.62 + ridge * 3.0 + vChapterMix * 0.6) * uIntro;

  gl_Position = projectionMatrix * mv;
  float size = aScale * uDensity * (uRadius * 4.5 / max(vDepth, 1.0)) * (0.6 + ridge * 1.2);
  gl_PointSize = clamp(size, 1.0, 7.0) * uPixelRatio;
}
`;

export const FIELD_FRAG = /* glsl */ `
precision highp float;

uniform vec3 uColorBase;
uniform vec3 uColorActive;

varying float vGlow;
varying float vDepth;
varying float vChapterMix;

void main() {
  // Round, soft-edged point. Discarding early is cheaper than blending a
  // full quad of near-zero alpha.
  vec2 uv = gl_PointCoord - 0.5;
  float r2 = dot(uv, uv);
  if (r2 > 0.25) discard;

  // Tight core, thin halo — keeps points reading as points, not bokeh.
  float r = sqrt(r2) * 2.0;
  float core = 1.0 - smoothstep(0.0, 0.55, r);
  float halo = (1.0 - smoothstep(0.35, 1.0, r)) * 0.35;
  float alpha = (core + halo) * vGlow;
  if (alpha < 0.004) discard;

  vec3 color = mix(uColorBase, uColorActive, vChapterMix * vChapterMix * 0.75);
  gl_FragColor = vec4(color, alpha);
}
`;

// Full-screen gradient backdrop. Cheap, and it stops the field from floating
// on flat black.
export const BACKDROP_VERT = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const BACKDROP_FRAG = /* glsl */ `
precision highp float;

uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uGlowColor;
uniform float uTime;
uniform float uActiveGlow;

varying vec2 vUv;

void main() {
  vec3 base = mix(uBottom, uTop, smoothstep(0.0, 1.0, vUv.y));

  // A slow off-centre bloom, drifting so the backdrop is never static.
  vec2 c = vec2(0.5 + sin(uTime * 0.06) * 0.16, 0.42 + cos(uTime * 0.045) * 0.12);
  float d = distance(vUv * vec2(1.6, 1.0), c * vec2(1.6, 1.0));
  float bloom = smoothstep(0.85, 0.0, d) * 0.5 * uActiveGlow;

  vec3 color = base + uGlowColor * bloom;

  // Ordered dither: 8-bit gradients band badly on wide dark ramps.
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (dither - 0.5) / 255.0;

  gl_FragColor = vec4(color, 1.0);
}
`;
