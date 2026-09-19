import { useEffect, useRef } from 'react';

/**
 * ============================================================================
 * AMBIENT DEEP-FIELD CONSTELLATION
 * ============================================================================
 * - Dua lapis gerak: drift abadi (node melayang pelan selamanya) +
 *   kamera sinematik yang digerakkan scroll (dolly, yaw, rise, fade).
 * - Topologi edge FIXED: dibangun sekali dari posisi rest via k-nearest-neighbor,
 *   sehingga garis tidak pernah putus/berkedip — hanya meregang & memendek.
 * - Depth = perspektif + depth-of-field (node jauh jadi bokeh lembut,
 *   node dekat tajam). Bukan dari kecerahan berlebihan.
 * - Terkurung di sisi kanan, tidak menyentuh teks maupun foto.
 */

const CONFIG = {
  // ── Kepadatan ──
  meshCols: 9,          // kolom grid node bergaris (naikkan kalau terasa sepi)
  meshRows: 7,          // baris grid node bergaris
  dustCount: 120,       // debu kecil tanpa garis — pengisi ruang, sangat murah
  heroCount: 5,         // jumlah node yang sedikit lebih terang
  neighbors: 3,         // tetangga terdekat per node → 3 bikin segitiga, bukan garis tunggal
  maxLinkDist: 270,     // jarak maksimum edge (world unit) — kunci utama panjang garis

  // ── Kamera ──
  fov: 620,
  scrollRange: 620,     // px scroll untuk mencapai progress = 1
  camPush: 300,         // dolly maju saat scroll
  camRise: 190,         // pergeseran vertikal kamera
  camYaw: 0.20,         // rotasi horizontal (radian) pada scroll penuh
  camPitch: -0.09,      // tilt vertikal
  ease: 0.065,          // lerp scroll → makin kecil makin sinematik

  // ── Gerak & intensitas ──
  driftAmp: 18,         // amplitudo melayang (world unit)
  driftSpeed: 0.00011,  // KECEPATAN DRIFT: 0.00007 sangat tenang, 0.0002 jelas terlihat
  intensity: 1.0,       // master brightness
};

interface Node {
  x: number; y: number; z: number; r: number;
  hero: boolean; dust: boolean;
  ax: number; ay: number; az: number;   // amplitudo drift per sumbu
  fx: number; fy: number; fz: number;   // frekuensi drift per sumbu
  px: number; py: number; pz: number;   // fase awal
  tw: number;                           // fase twinkle
}

// PRNG deterministik supaya komposisi konsisten di setiap reload
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sprite radial di-cache sekali → jauh lebih murah daripada shadowBlur per frame
function makeSprite(inner: string, outer: string) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, inner);
  rad.addColorStop(0.35, outer);
  rad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = rad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

export default function HeroConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0, height = 0, dpr = 1;
    let raf: number | null = null;
    let inView = true, visible = !document.hidden, dead = false;
    let targetProgress = 0, curProgress = 0;

    const rnd = mulberry32(20240517);
    const glow = makeSprite('rgba(190,240,255,0.95)', 'rgba(60,170,230,0.45)');
    const haze = makeSprite('rgba(40,110,170,0.40)', 'rgba(20,60,110,0.18)');

    // ── 1. BANGUN NODE ────────────────────────────────────────────────────────
    const nodes: Node[] = [];
    const mobile = window.innerWidth < 768;
    const cols = mobile ? 6 : CONFIG.meshCols;
    const rows = mobile ? 5 : CONFIG.meshRows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // vn: 0 = jauh (atas), 1 = dekat (bawah) → bidang mesh surut ke titik hilang
        const vn = (r + 0.5 + (rnd() - 0.5) * 0.7) / rows;
        const un = ((c + 0.5 + (rnd() - 0.5) * 0.7) / cols) * 2 - 1;
        nodes.push({
          x: un * (190 + vn * 300),
          y: -250 + vn * 520 + Math.sin(un * 2.3) * 38,
          z: -500 + vn * 780,
          r: 1.5 + vn * 2.1,
          hero: false, dust: false,
          ax: CONFIG.driftAmp * (0.6 + rnd() * 0.8),
          ay: CONFIG.driftAmp * (0.5 + rnd() * 0.7),
          az: CONFIG.driftAmp * (0.9 + rnd() * 1.4),
          fx: CONFIG.driftSpeed * (0.7 + rnd() * 0.9),
          fy: CONFIG.driftSpeed * (0.6 + rnd() * 1.0),
          fz: CONFIG.driftSpeed * (0.5 + rnd() * 0.8),
          px: rnd() * Math.PI * 2, py: rnd() * Math.PI * 2, pz: rnd() * Math.PI * 2,
          tw: rnd() * Math.PI * 2,
        });
      }
    }
    const meshCount = nodes.length;

    for (let i = 0; i < CONFIG.heroCount; i++) {
      const n = nodes[Math.floor(rnd() * meshCount)];
      n.hero = true; n.r += 1.1;
    }

    const dustN = mobile ? 50 : CONFIG.dustCount;
    for (let i = 0; i < dustN; i++) {
      const vn = rnd();
      nodes.push({
        x: (rnd() * 2 - 1) * (240 + vn * 340),
        y: -300 + vn * 640,
        z: -620 + vn * 900,
        r: 0.6 + rnd() * 1.1,
        hero: false, dust: true,
        ax: CONFIG.driftAmp * 0.5, ay: CONFIG.driftAmp * 0.4, az: CONFIG.driftAmp * 0.7,
        fx: CONFIG.driftSpeed * (0.4 + rnd()),
        fy: CONFIG.driftSpeed * (0.4 + rnd()),
        fz: CONFIG.driftSpeed * (0.3 + rnd() * 0.7),
        px: rnd() * 6.28, py: rnd() * 6.28, pz: rnd() * 6.28,
        tw: rnd() * 6.28,
      });
    }

    // ── 2. EDGE FIXED: k-nearest-neighbor, dihitung SEKALI dari posisi rest ───
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < meshCount; i++) {
      const cand: { j: number; d: number }[] = [];
      for (let j = 0; j < meshCount; j++) {
        if (i === j) continue;
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y, (a.z - b.z) * 0.55);
        if (dist < CONFIG.maxLinkDist) cand.push({ j, d: dist });
      }
      cand.sort((p, q) => p.d - q.d);
      for (let k = 0; k < Math.min(CONFIG.neighbors, cand.length); k++) {
        const j = cand[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    }

    // ── 3. RESIZE ─────────────────────────────────────────────────────────────
    let rt: ReturnType<typeof setTimeout> | null = null;
    function resize() {
      if (dead || !canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(rect.width, 240);
      height = Math.max(rect.height, 360);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    }
    const ro = new ResizeObserver(() => {
      if (rt) clearTimeout(rt);
      rt = setTimeout(resize, 120);
    });
    ro.observe(canvas);

    // ── 4. RENDER ─────────────────────────────────────────────────────────────
    const proj = new Float32Array(nodes.length * 4); // sx, sy, scale, zcam
    const order = Array.from(nodes.keys());

    function render(t: number) {
      if (!ctx || !width) return;
      ctx.clearRect(0, 0, width, height);

      const p = curProgress;
      const fade = Math.max(0, 1 - Math.pow(p, 1.5)) * CONFIG.intensity;
      if (fade <= 0.005) return;

      const cx = width * 0.70;   // pusat scene didorong ke kanan
      const cy = height * 0.46;
      const yaw = p * CONFIG.camYaw, pitch = p * CONFIG.camPitch;
      const cY = Math.cos(yaw), sY = Math.sin(yaw);
      const cX = Math.cos(pitch), sX = Math.sin(pitch);
      const camZ = CONFIG.fov - p * CONFIG.camPush;
      const camY = p * CONFIG.camRise;

      // Proyeksi 3D → 2D
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const wx = n.x + Math.sin(t * n.fx + n.px) * n.ax;
        const wy = n.y + Math.cos(t * n.fy + n.py) * n.ay - camY;
        const wz = n.z + Math.sin(t * n.fz + n.pz) * n.az;

        const x1 = wx * cY + wz * sY;
        const z1 = -wx * sY + wz * cY;
        const y2 = wy * cX - z1 * sX;
        const z2 = wy * sX + z1 * cX;

        const pz = z2 + camZ;
        const s = pz > 40 ? CONFIG.fov / pz : 0;
        proj[i * 4] = cx + x1 * s;
        proj[i * 4 + 1] = cy + y2 * s;
        proj[i * 4 + 2] = s;
        proj[i * 4 + 3] = z2;
      }

      // GARIS — tipis, gradient, meregang mengikuti node
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const [i, j] of edges) {
        const sA = proj[i * 4 + 2], sB = proj[j * 4 + 2];
        if (sA <= 0 || sB <= 0) continue;
        const ax = proj[i * 4], ay = proj[i * 4 + 1];
        const bx = proj[j * 4], by = proj[j * 4 + 1];
        const len = Math.hypot(bx - ax, by - ay);
        if (len > width * 0.40) continue;              // buang garis kepanjangan
        const avg = (sA + sB) * 0.5;
        const a = Math.min(0.40, 0.10 + avg * 0.17) * fade * (1 - len / (width * 0.55));
        if (a <= 0.004) continue;
        const g = ctx.createLinearGradient(ax, ay, bx, by);
        g.addColorStop(0, `rgba(110,200,255,${(a * (0.5 + sA * 0.4)).toFixed(3)})`);
        g.addColorStop(0.5, `rgba(80,170,235,${a.toFixed(3)})`);
        g.addColorStop(1, `rgba(110,200,255,${(a * (0.5 + sB * 0.4)).toFixed(3)})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = Math.max(0.4, 0.85 * avg);
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      }
      ctx.restore();

      // NODE — urut jauh → dekat; jauh = bokeh, dekat = tajam
      order.sort((a, b) => proj[a * 4 + 3] - proj[b * 4 + 3]);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const i of order) {
        const s = proj[i * 4 + 2];
        if (s <= 0) continue;
        const n = nodes[i];
        const x = proj[i * 4], y = proj[i * 4 + 1];
        const twinkle = 0.82 + 0.18 * Math.sin(t * 0.0006 + n.tw);
        const rs = Math.max(0.5, n.r * s);
        const sharp = Math.min(1, Math.max(0, (s - 0.55) / 0.55)); // 0 blur → 1 tajam
        const base = (n.dust ? 0.46 : n.hero ? 1.0 : 0.72) * fade * twinkle;

        // halo / bokeh
        const hs = rs * (14 - sharp * 8);
        ctx.globalAlpha = base * (0.30 + (1 - sharp) * 0.35);
        ctx.drawImage(sharp < 0.35 ? haze : glow, x - hs / 2, y - hs / 2, hs, hs);

        // inti hanya untuk node yang cukup dekat/fokus
        if (sharp > 0.2) {
          ctx.globalAlpha = base * sharp;
          ctx.fillStyle = n.hero ? 'rgba(225,248,255,0.95)' : 'rgba(170,225,255,0.85)';
          ctx.beginPath();
          ctx.arc(x, y, rs * (0.45 + sharp * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // ── 5. LOOP: drift jalan terus, scroll hanya menggerakkan kamera ──────────
    function loop(t: number) {
      if (dead || !inView || !visible) { raf = null; return; }
      curProgress += (targetProgress - curProgress) * CONFIG.ease;
      render(t);
      raf = requestAnimationFrame(loop);
    }
    function wake() {
      if (dead || reduced || !inView || !visible) return;
      if (raf === null) raf = requestAnimationFrame(loop);
    }
    function sleep() {
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    }

    function onScroll() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const passed = Math.max(0, -rect.top);
      targetProgress = Math.min(1, passed / CONFIG.scrollRange);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (e) => { inView = e[0].isIntersecting; inView ? wake() : sleep(); },
      { rootMargin: '120px' }
    );
    io.observe(canvas);

    function onVis() {
      visible = !document.hidden;
      visible && inView ? wake() : sleep();
    }
    document.addEventListener('visibilitychange', onVis);

    resize();
    onScroll();
    curProgress = targetProgress;
    if (reduced) render(0); else wake();

    return () => {
      dead = true;
      sleep();
      if (rt) clearTimeout(rt);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none select-none absolute top-0 right-0 z-0 h-full w-[70%] sm:w-[52%] lg:w-[40%] xl:w-[34%]"
      style={{
        maskImage:
          'radial-gradient(120% 95% at 100% 42%, black 22%, rgba(0,0,0,0.5) 58%, transparent 86%)',
        WebkitMaskImage:
          'radial-gradient(120% 95% at 100% 42%, black 22%, rgba(0,0,0,0.5) 58%, transparent 86%)',
      }}
    />
  );
}
