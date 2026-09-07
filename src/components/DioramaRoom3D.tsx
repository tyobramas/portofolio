import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Award, Compass } from 'lucide-react';

// ── Brand-aligned color palette ────────────────────────────
const C = {
  wallWarm:  0x74604c, wallSide: 0x5e4c3a, floor: 0x9a7048,
  woodDark:  0x6b4a30, woodMid:  0xa1734a, fabric: 0x44514a,
  metal:     0x2a2f38, gold:     0xe5a93c,
  skin:      0xd9b28c, shirt:    0x3d5a7a, hair: 0x2b211a,
  screen:    0x9fd8ff, lamp:     0xffcf8a,
};

const mat = (color: number, rough = 0.85, metal = 0.05) =>
  new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

const box = (w: number, h: number, d: number, m: THREE.Material) => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
};

// ── Seated person, facing away from camera ─────────────────
function buildPerson() {
  const g = new THREE.Group();
  const skinM = mat(C.skin, 0.9);
  const shirtM = mat(0x3d5a7a, 0.9);

  // Hips
  const hips = box(0.52, 0.22, 0.44, shirtM);
  hips.position.y = 0.62;
  g.add(hips);

  // Torso — slightly leaning forward toward screen
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.42, 6, 14), shirtM);
  torso.position.set(0, 1.02, -0.02);
  torso.rotation.x = 0.16;
  torso.castShadow = true;
  g.add(torso);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 20, 16), skinM);
  head.position.set(0, 1.46, 0.04);
  head.castShadow = true;
  g.add(head);

  // Hair (top half of sphere)
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.196, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.62),
    mat(C.hair, 0.95)
  );
  hair.position.copy(head.position);
  g.add(hair);

  // Thighs (seated) + shins (downward)
  [-0.16, 0.16].forEach((x) => {
    const thigh = box(0.19, 0.17, 0.5, shirtM);
    thigh.position.set(x, 0.55, 0.26);
    g.add(thigh);

    const shin = box(0.16, 0.44, 0.17, mat(0x2c3542, 0.95));
    shin.position.set(x, 0.28, 0.48);
    g.add(shin);
  });

  // Arms reaching toward keyboard — animated later
  const arms: THREE.Mesh[] = [];
  [-0.3, 0.3].forEach((x) => {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, 0.46, 5, 10), shirtM);
    arm.position.set(x, 1.02, 0.3);
    arm.rotation.set(1.16, 0, x < 0 ? -0.16 : 0.16);
    arm.castShadow = true;
    g.add(arm);
    arms.push(arm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.072, 10, 8), skinM);
    hand.position.set(x * 0.72, 0.9, 0.66);
    g.add(hand);
    arms.push(hand);
  });

  // Office chair
  const chair = new THREE.Group();
  const seat = box(0.6, 0.09, 0.58, mat(C.fabric, 0.95));
  seat.position.set(0, 0.5, 0.14);
  chair.add(seat);

  const back = box(0.58, 0.72, 0.09, mat(C.fabric, 0.95));
  back.position.set(0, 0.88, -0.16);
  back.rotation.x = -0.1;
  chair.add(back);

  const post = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.42, 10),
    mat(C.metal, 0.4, 0.8)
  );
  post.position.set(0, 0.26, 0.14);
  chair.add(post);

  g.add(chair);

  return { group: g, arms };
}

// ── Layar kode: mengetik → jeda → ulang ──────────────────────
const S = { kw: '#c792ea', str: '#c3e88d', fn: '#82aaff',
            num: '#f78c6c', com: '#637777', txt: '#d6deeb', op: '#89ddff' };

const CODE: [string, string][][] = [
  [['// offline-first sync engine', S.com]],
  [['export ', S.kw], ['async ', S.kw], ['function ', S.kw], ['syncQueue', S.fn], ['() {', S.op]],
  [['  const ', S.kw], ['pending', S.txt], [' = ', S.op], ['await ', S.kw], ['db', S.txt], ['.', S.op], ['unsynced', S.fn], ['();', S.op]],
  [['  if ', S.kw], ['(!pending.length) ', S.txt], ['return ', S.kw], ['0', S.num], [';', S.op]],
  [['', S.txt]],
  [['  for ', S.kw], ['(const ', S.kw], ['batch ', S.txt], ['of ', S.kw], ['chunk', S.fn], ['(pending, ', S.txt], ['50', S.num], [')) {', S.op]],
  [['    await ', S.kw], ['api', S.txt], ['.', S.op], ['post', S.fn], ['(', S.op], ["'/v1/sync'", S.str], [', batch);', S.op]],
  [['    await ', S.kw], ['db', S.txt], ['.', S.op], ['markSynced', S.fn], ['(batch);', S.op]],
  [['  }', S.op]],
  [['', S.txt]],
  [['  return ', S.kw], ['pending', S.txt], ['.length;', S.op]],
  [['}', S.op]],
];

function buildCodeScreen() {
  const cv = document.createElement('canvas');
  cv.width = 1024; cv.height = 616;
  const ctx = cv.getContext('2d')!;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const lineLens = CODE.map(l => l.reduce((a, [t]) => a + t.length, 0));
  const total = lineLens.reduce((a, b) => a + b + 1, 0);
  const FS = 25, LH = 38, PAD_L = 92, PAD_T = 74;

  let typed = 0, hold = 0;

  function draw(t: number) {
    // latar editor
    ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 0, cv.width, cv.height);
    // title bar
    ctx.fillStyle = '#122536'; ctx.fillRect(0, 0, cv.width, 46);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.arc(26 + i * 26, 23, 7, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#5f7f96'; ctx.font = '500 20px ui-monospace, monospace';
    ctx.fillText('syncQueue.ts', 120, 30);
    // gutter
    ctx.fillStyle = '#0a1520'; ctx.fillRect(0, 46, 66, cv.height);

    // hitung baris aktif
    let acc = 0, cur = 0, curChars = 0;
    for (let i = 0; i < CODE.length; i++) {
      if (typed <= acc + lineLens[i]) { cur = i; curChars = Math.floor(typed - acc); break; }
      acc += lineLens[i] + 1; cur = i; curChars = lineLens[i];
    }

    const visible = Math.floor((cv.height - PAD_T) / LH);
    const scroll = Math.max(0, cur - visible + 3);

    ctx.font = `${FS}px ui-monospace, "IBM Plex Mono", monospace`;
    ctx.textBaseline = 'middle';

    for (let i = scroll; i < Math.min(CODE.length, scroll + visible + 1); i++) {
      const y = PAD_T + (i - scroll) * LH;
      if (i > cur) break;

      ctx.fillStyle = i === cur ? '#7c9cb5' : '#33505f';
      ctx.font = `${FS - 3}px ui-monospace, monospace`;
      ctx.fillText(String(i + 1).padStart(2, ' '), 22, y);
      ctx.font = `${FS}px ui-monospace, monospace`;

      let x = PAD_L, budget = i === cur ? curChars : lineLens[i];
      for (const [text, color] of CODE[i]) {
        if (budget <= 0) break;
        const slice = text.slice(0, budget);
        ctx.fillStyle = color; ctx.fillText(slice, x, y);
        x += ctx.measureText(slice).width; budget -= slice.length;
      }
      // kursor kedip di baris aktif
      if (i === cur && Math.sin(t * 7) > -0.3) {
        ctx.fillStyle = '#e5a93c'; ctx.fillRect(x + 2, y - FS / 2, 3, FS + 2);
      }
    }
    tex.needsUpdate = true;
  }

  function update(dt: number, t: number) {
    if (hold > 0) { hold -= dt; if (hold <= 0) typed = 0; }
    else {
      typed += dt * 36;                       // kecepatan ketik ≈36 char/detik
      if (typed >= total) { typed = total; hold = 2.4; }
    }
    draw(t);
  }

  draw(0);
  return { tex, update };
}

// ── Complete room scene ────────────────────────────────────
function buildRoom() {
  const room = new THREE.Group();
  const W = 7, D = 7, H = 4.3;

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.3, D), mat(C.floor, 0.8));
  floor.position.y = -0.15;
  floor.receiveShadow = true;
  room.add(floor);

  // Floor plank lines (subtle detail)
  for (let i = 1; i < 9; i++) {
    const plank = box(W, 0.02, 0.02, mat(0x6d4a2c, 0.9));
    plank.position.set(0, 0.005, -D / 2 + i * (D / 9));
    room.add(plank);
  }

  // ONLY two walls = cutaway diorama look
  const backWall = box(W, H, 0.22, mat(C.wallWarm, 0.95));
  backWall.position.set(0, H / 2, -D / 2);
  room.add(backWall);

  const leftWall = box(0.22, H, D, mat(C.wallSide, 0.95));
  leftWall.position.set(-W / 2, H / 2, 0);
  room.add(leftWall);

  // Window on left wall (primary light source)
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 2.6),
    new THREE.MeshStandardMaterial({
      color: 0xdfeede,
      emissive: 0xbcd9c4,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.9,
    })
  );
  glass.rotation.y = Math.PI / 2;
  glass.position.set(-W / 2 + 0.13, 2.7, 0.4);
  room.add(glass);

  // Window bars
  for (let i = 0; i < 4; i++) {
    const bar = box(0.06, 0.06, 2.7, mat(C.woodDark, 0.9));
    bar.position.set(-W / 2 + 0.2, 1.5 + i * 0.8, 0.4);
    room.add(bar);
  }

  // Desk against back wall
  const desk = new THREE.Group();
  const deskTop = box(3.4, 0.12, 1.3, mat(C.woodMid, 0.7));
  deskTop.position.set(0, 1.5, 0);
  desk.add(deskTop);

  ([[-1.55, -0.5], [1.55, -0.5], [-1.55, 0.5], [1.55, 0.5]] as [number, number][]).forEach(([x, z]) => {
    const leg = box(0.1, 1.5, 0.1, mat(C.woodDark, 0.8));
    leg.position.set(x, 0.75, z);
    desk.add(leg);
  });
  desk.position.set(0, 0, -D / 2 + 1.1);
  room.add(desk);

  // Monitor + emissive screen
  const mon = new THREE.Group();
  const monBody = box(1.66, 1.04, 0.07, mat(C.metal, 0.4, 0.7));
  monBody.position.set(0, 2.28, 0);
  mon.add(monBody);

  const code = buildCodeScreen();
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.36, 0.82),
    new THREE.MeshBasicMaterial({ map: code.tex, toneMapped: false })
  );
  screen.position.set(0, 2.28, 0.045);
  mon.add(screen);

  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.42, 8),
    mat(C.metal, 0.4, 0.8)
  );
  stand.position.set(0, 1.7, 0);
  mon.add(stand);

  mon.position.set(0, 0, -D / 2 + 0.75);
  room.add(mon);

  // Keyboard
  const kb = box(0.95, 0.05, 0.34, mat(0x22262e, 0.8));
  kb.position.set(0, 1.58, -D / 2 + 1.45);
  room.add(kb);

  // Gold desk lamp — brand accent
  const lampArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8),
    mat(C.gold, 0.3, 0.9)
  );
  lampArm.position.set(1.3, 1.95, -D / 2 + 0.9);
  lampArm.rotation.z = 0.28;
  room.add(lampArm);

  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.3, 14, 1, true),
    new THREE.MeshStandardMaterial({
      color: C.gold,
      metalness: 0.85,
      roughness: 0.3,
      side: THREE.DoubleSide,
      emissive: C.lamp,
      emissiveIntensity: 0.35,
    })
  );
  shade.position.set(1.12, 2.32, -D / 2 + 0.9);
  shade.rotation.z = Math.PI + 0.3;
  room.add(shade);

  // Bookshelf on back wall
  const shelf = new THREE.Group();
  const shelfBody = box(2.1, 2.6, 0.5, mat(C.woodDark, 0.8));
  shelfBody.position.set(0, 1.3, 0);
  shelf.add(shelfBody);

  const bookColors = [0x7a3b2a, 0x2f5240, 0x4a3a62, 0xa8763c, 0x36527a];
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < 9; i++) {
      const h = 0.26 + Math.random() * 0.16;
      const b = box(0.14, h, 0.3, mat(bookColors[i % 5], 0.9));
      b.position.set(-0.85 + i * 0.2, 0.55 + r * 0.78 + h / 2, 0.16);
      shelf.add(b);
    }
  }
  shelf.position.set(-2.3, 0, -D / 2 + 0.4);
  room.add(shelf);

  // Potted plant
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.22, 0.4, 12),
    mat(0x8a5a3a, 0.9)
  );
  pot.position.set(2.8, 0.2, -1.2);
  pot.castShadow = true;
  room.add(pot);

  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), mat(0x2f5a3a, 0.95));
    leaf.position.set(
      2.8 + Math.sin(i) * 0.3,
      0.65 + i * 0.14,
      -1.2 + Math.cos(i) * 0.3
    );
    leaf.scale.set(1, 0.6, 1);
    room.add(leaf);
  }

  // Area rug
  const rug = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.6, 0.03, 28),
    mat(0x4a4438, 0.98)
  );
  rug.position.set(0.6, 0.02, 1.5);
  rug.receiveShadow = true;
  room.add(rug);

  // Person
  const person = buildPerson();
  person.group.scale.setScalar(1.28);            // proporsional dengan meja 1.5 tinggi
  person.group.rotation.y = Math.PI;             // ← balik badan supaya menghadap meja
  person.group.position.set(0, 0, -D / 2 + 2.15);
  room.add(person.group);

  return { room, person, screen, code };
}

// ── React Component ────────────────────────────────────────
export default function DioramaRoom3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInteractedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = null;

    // ── Isometric orthographic camera ──
    const frustum = 5.1;
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect, frustum, -frustum, 0.1, 120
    );
    camera.position.set(11.5, 9, 11.5);
    camera.lookAt(0, 1.75, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const { room, person, code } = buildRoom();
    scene.add(room);

    // ── Cinematic lighting ──
    scene.add(new THREE.AmbientLight(0xd8c9b4, 0.5));
    scene.add(new THREE.HemisphereLight(0x9fb4c4, 0x6a4f38, 0.85));

    const key = new THREE.DirectionalLight(0xffe8c4, 2.7);
    key.position.set(-9, 9, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.normalBias = 0.02;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbfd4e8, 0.75);
    fill.position.set(9, 6, 9);
    scene.add(fill);

    const deskLight = new THREE.PointLight(C.lamp, 22, 8, 2);
    deskLight.position.set(1.1, 2.15, -2.6);
    scene.add(deskLight);

    const screenLight = new THREE.PointLight(C.screen, 9, 5.5, 2);
    screenLight.position.set(0, 2.3, -2.2);
    scene.add(screenLight);

    // ── Smooth parallax following cursor ──
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.22;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.1;
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
      }
    };
    if (!reduced) mount.addEventListener('mousemove', onMove);

    // ── Pause render when offscreen (battery saver) ──
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      code.update(dt, t);

      // Parallax lerp
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      room.rotation.y = cx;
      camera.position.y = 9 + cy * 3.4;
      camera.lookAt(0, 1.75, 0);

      // Micro-animations (keyboard typing, breathing)
      if (!reduced) {
        person.arms.forEach((a, i) => {
          a.position.y += Math.sin(t * 7 + i * 1.6) * 0.0016;
        });
        person.group.position.y = Math.sin(t * 1.4) * 0.012;
      }

      renderer.render(scene, camera);
    };

    tick();
    setReady(true);

    // ── Responsive resize ──
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const a = w / h;
      camera.left = -frustum * a;
      camera.right = frustum * a;
      camera.top = frustum;
      camera.bottom = -frustum;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mount.removeEventListener('mousemove', onMove);
      code.tex.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) mount.removeChild(renderer.domElement);
    };
  }, [isMobile]);

  // ── Mobile: static image fallback ──
  if (isMobile) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-[#0B0C10] ${className}`}>
        <img
          src="/images/tech_workstation_3d.png"
          alt="Diorama 3D ruang kerja: seorang engineer sedang menulis kode"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Depth vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/60 via-transparent to-transparent pointer-events-none" />

        {/* Top-right badge */}
        <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#0B0C10]/85 backdrop-blur-md px-3 py-1 text-xs shadow-lg pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
          </span>
          <span className="font-mono text-[11px] font-semibold text-gold-300">
            3D WebGL // Interactive
          </span>
        </div>

        {/* Bottom-left badge */}
        <div className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-xl border border-gold-500/40 bg-[#0B0C10]/95 backdrop-blur-md px-4 py-2.5 shadow-2xl pointer-events-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400">
            <Award className="h-4 w-4 text-gold-400" />
          </div>
          <div>
            <p className="font-sans text-sm font-extrabold text-white leading-none">
              13+ Years
            </p>
            <p className="font-sans text-[0.6875rem] font-semibold text-gold-400 uppercase tracking-wider mt-0.5">
              Production Experience
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Desktop: full 3D canvas ──
  return (
    <div className={`relative ${className}`}>
      <div
        ref={mountRef}
        className="h-full w-full"
        role="img"
        aria-label="Diorama 3D ruang kerja: seorang engineer sedang menulis kode"
      />

      {/* Loading placeholder */}
      {!ready && (
        <div className="absolute inset-0 animate-pulse bg-[#12141c] rounded-xl" />
      )}

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/60 via-transparent to-transparent pointer-events-none" />

      {/* Top-right: WebGL badge */}
      <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#0B0C10]/85 backdrop-blur-md px-3 py-1 text-xs shadow-lg pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
        </span>
        <span className="font-mono text-[11px] font-semibold text-gold-300">
          3D WebGL // Interactive
        </span>
      </div>

      {/* Interaction hint */}
      {!hasInteracted && (
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0B0C10]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-sans text-ink-300 pointer-events-none animate-pulse">
          <Compass size={12} className="text-gold-400" />
          <span>Move mouse to explore 3D depth</span>
        </div>
      )}

      {/* Bottom-left: Experience badge */}
      <div className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-xl border border-gold-500/40 bg-[#0B0C10]/95 backdrop-blur-md px-4 py-2.5 shadow-2xl pointer-events-none">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/20 text-gold-400">
          <Award className="h-4 w-4 text-gold-400" />
        </div>
        <div>
          <p className="font-sans text-sm font-extrabold text-white leading-none">
            13+ Years
          </p>
          <p className="font-sans text-[0.6875rem] font-semibold text-gold-400 uppercase tracking-wider mt-0.5">
            Production Experience
          </p>
        </div>
      </div>
    </div>
  );
}
