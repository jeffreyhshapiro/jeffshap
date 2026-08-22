import * as THREE from 'three';
import { BACKDROP_FRAG, BACKDROP_VERT, FIELD_FRAG, FIELD_VERT } from './shaders';

export interface FieldOptions {
  /** Number of career chapters the field is divided into. */
  chapters: number;
  /** Lower budgets for phones / low-power GPUs. */
  tier: 'high' | 'low';
}

const PALETTE = {
  base: new THREE.Color('#3f7f5f'),
  active: new THREE.Color('#c8873f'),
  top: new THREE.Color('#12171a'),
  bottom: new THREE.Color('#080a0b'),
  glow: new THREE.Color('#1d3b30'),
};

const RADIUS = 46;

/**
 * Owns every GPU resource for the point field. Kept deliberately outside
 * React so that re-renders never touch the render loop.
 */
export class FieldScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;

  private backdropScene = new THREE.Scene();
  private backdropCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  private points!: THREE.Points;
  private fieldGeo!: THREE.BufferGeometry;
  private fieldMat!: THREE.ShaderMaterial;
  private backdropGeo!: THREE.BufferGeometry;
  private backdropMat!: THREE.ShaderMaterial;

  private raf = 0;
  private running = false;
  private disposed = false;
  private clock = new THREE.Clock();

  private scroll = 0;
  private scrollTarget = 0;
  private active = 0;
  private activeTarget = 0;
  private intro = 0;
  private pointer = new THREE.Vector2();
  private pointerTarget = new THREE.Vector2();

  private readonly maxPixelRatio: number;
  private opts: FieldOptions;

  constructor(canvas: HTMLCanvasElement, opts: FieldOptions) {
    this.opts = opts;
    this.maxPixelRatio = opts.tier === 'high' ? 2 : 1.5;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // points are already soft-edged; MSAA buys nothing
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    this.renderer.setClearColor(PALETTE.bottom, 1);
    this.renderer.autoClear = false;

    this.camera = new THREE.PerspectiveCamera(52, 1, 0.1, RADIUS * 4);
    this.camera.position.set(0, 0, RADIUS * 1.15);

    this.buildBackdrop();
    this.buildField();
    this.resize();
  }

  // ── construction ───────────────────────────────────────────────

  private buildBackdrop() {
    this.backdropGeo = new THREE.BufferGeometry();
    this.backdropGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
    );
    this.backdropGeo.setAttribute(
      'uv',
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2)
    );

    this.backdropMat = new THREE.ShaderMaterial({
      vertexShader: BACKDROP_VERT,
      fragmentShader: BACKDROP_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTop: { value: PALETTE.top },
        uBottom: { value: PALETTE.bottom },
        uGlowColor: { value: PALETTE.glow },
        uTime: { value: 0 },
        uActiveGlow: { value: 0 },
      },
    });

    this.backdropScene.add(new THREE.Mesh(this.backdropGeo, this.backdropMat));
  }

  private buildField() {
    const count = this.opts.tier === 'high' ? 26000 : 7000;
    const { chapters } = this.opts;

    const position = new Float32Array(count * 3);
    const seed = new Float32Array(count * 3);
    const chapter = new Float32Array(count);
    const scale = new Float32Array(count);

    // Points are laid out as a stack of parametric sheets: (u, v) index a
    // position on a sheet, w selects the sheet. The vertex shader turns these
    // lattice coordinates into world space, which is what lets neighbouring
    // points share a surface instead of scattering independently.
    const sheets = this.opts.tier === 'high' ? 26 : 14;
    const perSheet = Math.floor(count / sheets);
    const cols = Math.ceil(Math.sqrt(perSheet * 1.8));
    const rows = Math.ceil(perSheet / cols);

    for (let i = 0; i < count; i++) {
      const sheet = Math.floor(i / perSheet) % sheets;
      const within = i % perSheet;
      const cx = within % cols;
      const cy = Math.floor(within / cols);

      // Jitter breaks up the grid so it never reads as a screen door, while
      // staying small enough that the surface stays coherent.
      const jx = (Math.random() - 0.5) * 1.4;
      const jy = (Math.random() - 0.5) * 1.4;

      position[i * 3 + 0] = (cx + 0.5 + jx) / cols - 0.5;
      position[i * 3 + 1] = (cy + 0.5 + jy) / rows - 0.5;
      position[i * 3 + 2] = (sheet + Math.random() * 0.35) / sheets - 0.5;

      seed[i * 3 + 0] = Math.random() * 2 - 1;
      seed[i * 3 + 1] = Math.random() * 2 - 1;
      seed[i * 3 + 2] = Math.random() * 2 - 1;

      chapter[i] = (sheet / sheets) * chapters;
      scale[i] = Math.random() < 0.05 ? 1.8 + Math.random() * 1.2 : 0.7 + Math.random() * 0.6;
    }

    this.fieldGeo = new THREE.BufferGeometry();
    this.fieldGeo.setAttribute('position', new THREE.BufferAttribute(position, 3));
    this.fieldGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    this.fieldGeo.setAttribute('aChapter', new THREE.BufferAttribute(chapter, 1));
    this.fieldGeo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    this.fieldGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), RADIUS * 4);

    this.fieldMat = new THREE.ShaderMaterial({
      vertexShader: FIELD_VERT,
      fragmentShader: FIELD_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uActive: { value: 0 },
        uRadius: { value: RADIUS },
        uDensity: { value: this.opts.tier === 'high' ? 1 : 1.35 },
        uPixelRatio: { value: 1 },
        uIntro: { value: 0 },
        uColorBase: { value: PALETTE.base },
        uColorActive: { value: PALETTE.active },
      },
    });

    this.points = new THREE.Points(this.fieldGeo, this.fieldMat);
    this.points.frustumCulled = false;
    this.scene.add(this.points);
  }

  // ── external inputs ────────────────────────────────────────────

  setScroll(progress01: number) {
    this.scrollTarget = progress01;
  }

  setActiveChapter(index: number) {
    this.activeTarget = index;
  }

  setPointer(nx: number, ny: number) {
    this.pointerTarget.set(nx, ny);
  }

  resize() {
    if (this.disposed) return;
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxPixelRatio);

    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.fieldMat.uniforms.uPixelRatio.value = dpr;

    this.camera.aspect = w / Math.max(h, 1);
    // Pull the camera back on narrow viewports so the field still reads as
    // a field rather than a wall of points.
    this.camera.fov = w < 720 ? 68 : 52;
    this.camera.updateProjectionMatrix();
  }

  // ── loop ───────────────────────────────────────────────────────

  start() {
    if (this.running || this.disposed) return;
    this.running = true;
    this.clock.start();
    const tick = () => {
      if (!this.running || this.disposed) return;
      this.raf = requestAnimationFrame(tick);
      this.frame();
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.clock.stop();
  }

  /** Draw exactly one frame — used for the reduced-motion still. */
  renderStill() {
    if (this.disposed) return;
    this.intro = 1;
    this.scroll = this.scrollTarget;
    this.active = this.activeTarget;
    this.fieldMat.uniforms.uTime.value = 12;
    this.backdropMat.uniforms.uTime.value = 12;
    this.draw();
  }

  private frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.getElapsedTime();

    // Critically-damped-ish easing; frame-rate independent.
    const ease = (cur: number, target: number, rate: number) =>
      cur + (target - cur) * (1 - Math.exp(-rate * dt));

    this.scroll = ease(this.scroll, this.scrollTarget, 4);
    this.active = ease(this.active, this.activeTarget, 3);
    this.intro = Math.min(1, this.intro + dt * 0.5);
    this.pointer.x = ease(this.pointer.x, this.pointerTarget.x, 2.5);
    this.pointer.y = ease(this.pointer.y, this.pointerTarget.y, 2.5);

    const u = this.fieldMat.uniforms;
    u.uTime.value = elapsed;
    u.uScroll.value = this.scroll;
    u.uActive.value = this.active;
    u.uIntro.value = this.easeOutCubic(this.intro);

    this.backdropMat.uniforms.uTime.value = elapsed;
    this.backdropMat.uniforms.uActiveGlow.value = this.easeOutCubic(this.intro);

    // Camera drifts on a slow Lissajous path, nudged by the pointer. The
    // motion is small on purpose — it should read as parallax, not a ride.
    const drift = RADIUS * 0.06;
    this.camera.position.x = Math.sin(elapsed * 0.11) * drift + this.pointer.x * RADIUS * 0.05;
    this.camera.position.y = Math.cos(elapsed * 0.083) * drift * 0.7 + this.pointer.y * RADIUS * 0.04;
    this.camera.lookAt(0, 0, -RADIUS * 0.9);

    this.draw();
  }

  private easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }

  private draw() {
    this.renderer.clear();
    this.renderer.render(this.backdropScene, this.backdropCamera);
    this.renderer.render(this.scene, this.camera);
  }

  // ── teardown ───────────────────────────────────────────────────

  dispose() {
    if (this.disposed) return;
    this.stop();
    this.disposed = true;

    this.scene.remove(this.points);
    this.fieldGeo.dispose();
    this.fieldMat.dispose();
    this.backdropGeo.dispose();
    this.backdropMat.dispose();
    this.backdropScene.clear();
    this.scene.clear();

    this.renderer.dispose();
    // Drop the GL context outright so a re-mount does not accumulate
    // contexts — browsers cap them at ~16.
    this.renderer.forceContextLoss();
  }
}
