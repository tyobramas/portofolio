import * as THREE from 'three';
import type { KeyItem } from './keyData';

export interface KeyboardSceneOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  rows: [KeyItem[], KeyItem[]];
  enterKey: KeyItem;
  reducedMotion: boolean;
  onPressStart: (id: string) => void;
  onActivate: (id: string) => void;
  onContextLost: () => void;
}

export interface KeyboardSceneHandle {
  press: (id: string) => void;
  setFocused: (id: string | null) => void;
  setReducedMotion: (value: boolean) => void;
  dispose: () => void;
}

/* ── Semua angka yang bisa Anda "tune" ada di sini ── */
const CFG = {
  unit: 1,
  gap: 0.07,
  row1Offset: 0.32,
  enterWidth: 1.12,

  baseHeight: 0.44,
  baseRadius: 0.2,
  baseBevel: 0.045,

  topHeight: 0.15,
  topRadius: 0.17,
  topBevel: 0.04,
  topInsetSide: 0.075,
  topInsetBack: 0.055,
  topInsetFront: 0.2, // dinding depan lebih tebal → kesan keycap asli
  topSink: 0.03,

  outline: 0.032,
  shadowOffsetZ: 0.13,

  travel: 0.17,
  hoverLift: 0.045,
  springK: 900,
  springDamping: 30, // < 60 = sedikit memantul

  tiltX: 0.07,
  tiltY: 0.12,

  ink: '#18181B',
  focus: '#7C3AED',

  legendPx: 300,
  // three r155+ memakai satuan fisik → kalikan PI
  ambient: 0.5 * Math.PI,
  directional: 0.62 * Math.PI,
};

interface KeySpec { item: KeyItem; x: number; z: number; w: number; d: number }

interface KeyRuntime {
  cap: THREE.Group;
  outlineMat: THREE.MeshBasicMaterial;
  focusRing: THREE.Mesh;
  y: number;
  v: number;
  held: boolean;
  flashUntil: number;
  hover: boolean;
  focus: boolean;
}

/* ───────────── Geometri ───────────── */

function roundedRectShape(w: number, d: number, radius: number): THREE.Shape {
  const r = Math.min(radius, w / 2, d / 2);
  const x = -w / 2;
  const y = -d / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + d - r);
  s.absarc(x + w - r, y + d - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + d);
  s.absarc(x + r, y + d - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** Balok bersudut bulat + bevel, alas di y=0, tinggi h */
function slabGeometry(w: number, d: number, h: number, r: number, bevel: number) {
  const b = Math.min(bevel, h / 2 - 0.001);
  const geo = new THREE.ExtrudeGeometry(
    roundedRectShape(w - 2 * b, d - 2 * b, Math.max(r - b, 0.01)),
    {
      depth: Math.max(h - 2 * b, 0.001),
      bevelEnabled: true,
      bevelThickness: b,
      bevelSize: b,
      bevelSegments: 3,
      curveSegments: 12,
    },
  );
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, b, 0);
  return geo;
}

function flatGeometry(w: number, d: number, r: number) {
  const geo = new THREE.ShapeGeometry(roundedRectShape(w, d, r), 12);
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/* ───────────── Tekstur legend (huruf + label) ───────────── */

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function setSpacing(ctx: CanvasRenderingContext2D, value: string) {
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = value;
  }
}

function shade(hex: string, to: string, t: number) {
  return `#${new THREE.Color(hex).lerp(new THREE.Color(to), t).getHexString()}`;
}

function makeLegendTexture(
  item: KeyItem, faceW: number, faceD: number, faceR: number,
  fontFamily: string, anisotropy: number,
) {
  const PX = CFG.legendPx;
  const W = Math.round(faceW * PX);
  const H = Math.round(faceD * PX);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas not supported');

  ctx.save();
  roundRectPath(ctx, 0, 0, W, H, faceR * PX);
  ctx.clip();

  // Permukaan cekung (dish)
  const g = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.72);
  g.addColorStop(0, shade(item.topColor, '#ffffff', 0.28));
  g.addColorStop(0.6, item.topColor);
  g.addColorStop(1, shade(item.topColor, '#000000', 0.1));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Bayangan tepi dalam
  ctx.strokeStyle = 'rgba(0,0,0,0.10)';
  ctx.lineWidth = PX * 0.04;
  roundRectPath(ctx, 0, 0, W, H, faceR * PX);
  ctx.stroke();

  // Kilap tipis di tepi atas
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  roundRectPath(ctx, W * 0.18, PX * 0.04, W * 0.64, PX * 0.025, PX * 0.0125);
  ctx.fill();

  ctx.fillStyle = CFG.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (item.isEnter) {
    const s = (PX * 0.46) / 24;
    ctx.save();
    ctx.translate(W / 2 - 12 * s, PX * 0.12);
    ctx.scale(s, s);
    ctx.strokeStyle = CFG.ink;
    ctx.lineWidth = 3.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(20, 7);
    ctx.lineTo(20, 12);
    ctx.quadraticCurveTo(20, 15, 17, 15);
    ctx.lineTo(5, 15);
    ctx.moveTo(9, 11);
    ctx.lineTo(5, 15);
    ctx.lineTo(9, 19);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(W / 2, H * 0.64);
    ctx.rotate(Math.PI / 2);
    setSpacing(ctx, '0.18em');
    ctx.font = `900 ${PX * 0.115}px ${fontFamily}`;
    ctx.fillText(item.label.toUpperCase(), 0, 0);
    ctx.restore();
  } else {
    setSpacing(ctx, '-0.02em');
    ctx.font = `900 ${PX * 0.4}px ${fontFamily}`;
    ctx.fillText(item.char, W / 2, H * 0.42);

    const label = item.label.toUpperCase();
    let size = PX * 0.09;
    setSpacing(ctx, '0.04em');
    ctx.font = `900 ${size}px ${fontFamily}`;
    const maxW = W * 0.88;
    const measured = ctx.measureText(label).width;
    if (measured > maxW) {
      size *= maxW / measured;
      ctx.font = `900 ${size}px ${fontFamily}`;
    }
    ctx.fillText(label, W / 2, H * 0.82);
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  return tex;
}

/* ───────────── Scene ───────────── */

export async function createKeyboardScene(opts: KeyboardSceneOptions): Promise<KeyboardSceneHandle> {
  const { canvas, container, rows, enterKey } = opts;
  let reducedMotion = opts.reducedMotion;

  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch { /* abaikan */ }
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 60);
  camera.position.set(0, 9, 7.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, CFG.ambient));
  const sun = new THREE.DirectionalLight(0xffffff, CFG.directional);
  sun.position.set(-2.5, 7, 4);
  scene.add(sun);

  // Toon 3 tingkat → tampilan kartun seperti referensi
  const gradientMap = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;
  gradientMap.generateMipmaps = false;
  gradientMap.needsUpdate = true;

  const shadowMat = new THREE.MeshBasicMaterial({ color: CFG.ink });
  const focusMat = new THREE.MeshBasicMaterial({ color: CFG.focus });
  const fontFamily = getComputedStyle(container).fontFamily || 'system-ui, sans-serif';
  const anisotropy = renderer.capabilities.getMaxAnisotropy();

  const board = new THREE.Group();
  scene.add(board);

  /* Layout */
  const step = CFG.unit + CFG.gap;
  const specs: KeySpec[] = [];
  rows[0].forEach((item, i) => specs.push({ item, x: CFG.row1Offset + i * step + CFG.unit / 2, z: CFG.unit / 2, w: CFG.unit, d: CFG.unit }));
  rows[1].forEach((item, i) => specs.push({ item, x: i * step + CFG.unit / 2, z: step + CFG.unit / 2, w: CFG.unit, d: CFG.unit }));
  const row2End = (rows[1].length - 1) * step + CFG.unit;
  const enterD = CFG.unit * 2 + CFG.gap;
  specs.push({ item: enterKey, x: row2End + CFG.gap + CFG.enterWidth / 2, z: enterD / 2, w: CFG.enterWidth, d: enterD });
  const centerX = (row2End + CFG.gap + CFG.enterWidth) / 2;
  const centerZ = enterD / 2;

  const keys = new Map<string, KeyRuntime>();
  const hitMeshes: THREE.Object3D[] = [];
  const o = CFG.outline;

  for (const spec of specs) {
    const { item, w, d } = spec;
    const root = new THREE.Group();
    root.position.set(spec.x - centerX, 0, spec.z - centerZ);
    board.add(root);

    const shadow = new THREE.Mesh(flatGeometry(w + o * 2, d + o * 2, CFG.baseRadius + o), shadowMat);
    shadow.position.set(0, 0.002, CFG.shadowOffsetZ);
    root.add(shadow);

    const focusRing = new THREE.Mesh(flatGeometry(w + 0.24, d + 0.24, CFG.baseRadius + 0.12), focusMat);
    focusRing.position.y = 0.001;
    focusRing.visible = false;
    root.add(focusRing);

    const cap = new THREE.Group();
    root.add(cap);

    const outlineMat = new THREE.MeshBasicMaterial({ color: CFG.ink, side: THREE.BackSide });

    const base = new THREE.Mesh(
      slabGeometry(w, d, CFG.baseHeight, CFG.baseRadius, CFG.baseBevel),
      new THREE.MeshToonMaterial({ color: item.frontColor, gradientMap }),
    );
    const baseOutline = new THREE.Mesh(
      slabGeometry(w + 2 * o, d + 2 * o, CFG.baseHeight + 2 * o, CFG.baseRadius + o, CFG.baseBevel + o),
      outlineMat,
    );
    baseOutline.position.y = -o;

    const topW = w - 2 * CFG.topInsetSide;
    const topD = d - CFG.topInsetBack - CFG.topInsetFront;
    const topZ = (CFG.topInsetBack - CFG.topInsetFront) / 2;
    const topY = CFG.baseHeight - CFG.topSink;

    const top = new THREE.Mesh(
      slabGeometry(topW, topD, CFG.topHeight, CFG.topRadius, CFG.topBevel),
      new THREE.MeshToonMaterial({ color: item.topColor, gradientMap }),
    );
    top.position.set(0, topY, topZ);
    const topOutline = new THREE.Mesh(
      slabGeometry(topW + 2 * o, topD + 2 * o, CFG.topHeight + 2 * o, CFG.topRadius + o, CFG.topBevel + o),
      outlineMat,
    );
    topOutline.position.set(0, topY - o, topZ);

    const faceW = topW - 2 * CFG.topBevel;
    const faceD = topD - 2 * CFG.topBevel;
    const faceR = Math.max(CFG.topRadius - CFG.topBevel, 0.02);
    const legend = new THREE.Mesh(
      new THREE.PlaneGeometry(faceW, faceD).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        map: makeLegendTexture(item, faceW, faceD, faceR, fontFamily, anisotropy),
        transparent: true,
        toneMapped: false,
      }),
    );
    legend.position.set(0, topY + CFG.topHeight + 0.003, topZ);

    cap.add(baseOutline, base, topOutline, top, legend);
    base.userData.keyId = item.id;
    top.userData.keyId = item.id;
    legend.userData.keyId = item.id;
    hitMeshes.push(base, top, legend);

    keys.set(item.id, { cap, outlineMat, focusRing, y: 0, v: 0, held: false, flashUntil: 0, hover: false, focus: false });
  }

  board.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(board);
  bounds.max.y += CFG.hoverLift;
  bounds.expandByScalar(0.06);

  /* Fit kamera ke ukuran container */
  let dirty = true;
  const corner = new THREE.Vector3();
  function fit() {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.updateMatrixWorld();
    let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
    for (let i = 0; i < 8; i++) {
      corner.set(
        i & 1 ? bounds.max.x : bounds.min.x,
        i & 2 ? bounds.max.y : bounds.min.y,
        i & 4 ? bounds.max.z : bounds.min.z,
      ).applyMatrix4(camera.matrixWorldInverse);
      minX = Math.min(minX, corner.x); maxX = Math.max(maxX, corner.x);
      minY = Math.min(minY, corner.y); maxY = Math.max(maxY, corner.y);
    }
    const pad = 1.06;
    let halfW = ((maxX - minX) / 2) * pad;
    let halfH = ((maxY - minY) / 2) * pad;
    const aspect = width / height;
    if (halfW / halfH > aspect) halfH = halfW / aspect;
    else halfW = halfH * aspect;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    camera.left = cx - halfW;
    camera.right = cx + halfW;
    camera.top = cy + halfH;
    camera.bottom = cy - halfH;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    dirty = false;
  }

  /* Animasi */
  const tiltTarget = new THREE.Vector2();
  const tilt = new THREE.Vector2();

  function stepSprings(dt: number, now: number) {
    let active = false;
    keys.forEach((k) => {
      const pressed = k.held || now < k.flashUntil;
      const target = pressed ? -CFG.travel : k.hover || k.focus ? CFG.hoverLift : 0;
      if (reducedMotion) {
        if (k.y !== target) { k.y = target; k.v = 0; active = true; }
      } else {
        const a = (target - k.y) * CFG.springK - k.v * CFG.springDamping;
        k.v += a * dt;
        k.y += k.v * dt;
        if (Math.abs(target - k.y) < 1e-4 && Math.abs(k.v) < 1e-3) {
          k.y = target; k.v = 0;
        } else {
          active = true;
        }
      }
      k.cap.position.y = k.y;
    });
    return active;
  }

  function stepTilt(dt: number) {
    const tx = reducedMotion ? 0 : tiltTarget.x;
    const ty = reducedMotion ? 0 : tiltTarget.y;
    if (tilt.x === tx && tilt.y === ty) return false;
    const f = 1 - Math.exp(-dt * 6);
    tilt.x += (tx - tilt.x) * f;
    tilt.y += (ty - tilt.y) * f;
    if (Math.abs(tx - tilt.x) < 1e-4 && Math.abs(ty - tilt.y) < 1e-4) tilt.set(tx, ty);
    board.rotation.set(-tilt.y * CFG.tiltX, tilt.x * CFG.tiltY, 0);
    return true;
  }

  let raf = 0;
  let running = false;
  let last = 0;
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(Math.max((t - last) / 1000, 0), 1 / 30);
    last = t;
    const a = stepSprings(dt, t);
    const b = stepTilt(dt);
    if (a || b || dirty) {
      renderer.render(scene, camera);
      dirty = false;
    }
  };
  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  /* Pointer (mouse & sentuh) */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hoverId: string | null = null;
  let heldId: string | null = null;

  const toNdc = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const pick = (): string | null => {
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(hitMeshes, false)[0];
    return (hit?.object.userData.keyId as string | undefined) ?? null;
  };
  const setHover = (id: string | null) => {
    if (hoverId === id) return;
    if (hoverId) { const k = keys.get(hoverId); if (k) k.hover = false; }
    hoverId = id;
    if (id) { const k = keys.get(id); if (k) k.hover = true; }
    canvas.style.cursor = id ? 'pointer' : '';
  };
  const release = () => {
    if (!heldId) return;
    const k = keys.get(heldId);
    if (k) k.held = false;
    heldId = null;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    toNdc(e);
    setHover(pick());
    tiltTarget.set(ndc.x, ndc.y);
  };
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    toNdc(e);
    const id = pick();
    if (!id) return;
    const k = keys.get(id);
    if (!k) return;
    heldId = id;
    k.held = true;
    k.flashUntil = performance.now() + 90;
    try { canvas.setPointerCapture(e.pointerId); } catch { /* abaikan */ }
    opts.onPressStart(id);
  };
  const onUp = (e: PointerEvent) => {
    if (!heldId) return;
    toNdc(e);
    const id = heldId;
    const over = pick();
    release();
    if (over === id) opts.onActivate(id);
  };
  const onLeave = () => {
    setHover(null);
    tiltTarget.set(0, 0);
  };
  const onLost = (e: Event) => {
    e.preventDefault();
    opts.onContextLost();
  };

  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('webglcontextlost', onLost);

  const ro = new ResizeObserver(() => fit());
  ro.observe(container);
  const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
  io.observe(container);

  fit();

  let disposed = false;

  return {
    press(id) {
      const k = keys.get(id);
      if (k) k.flashUntil = performance.now() + 140;
    },
    setFocused(id) {
      keys.forEach((k, kid) => {
        const f = kid === id;
        k.focus = f;
        k.focusRing.visible = f;
        k.outlineMat.color.set(f ? CFG.focus : CFG.ink);
      });
      dirty = true;
    },
    setReducedMotion(value) {
      reducedMotion = value;
      dirty = true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', release);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          (m as THREE.MeshBasicMaterial).map?.dispose();
          m.dispose();
        });
      });
      gradientMap.dispose();
      renderer.dispose();
    },
  };
}
