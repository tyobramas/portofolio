import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Award, Compass } from 'lucide-react';

// ── Brand-aligned color palette ────────────────────────────
const C = {
  wallWarm:  0x3a2f26, wallSide: 0x2e251e, floor: 0x5a3f2a,
  woodDark:  0x4a3222, woodMid:  0x6b4a2f, fabric: 0x2f3a34,
  metal:     0x1a1d24, gold:     0xe5a93c,
  skin:      0xc9a07a, shirt:    0x27303a, hair: 0x1b1512,
  screen:    0x9fd8ff, lamp:     0xffcf8a,
};

const mat = (color: number, rough = 0.85, metal = 0.05) =>
  new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });

const box = (w: number, h: number, d: number, m: THREE.Material) => {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

// ── Seated person, facing away from camera ─────────────────
function buildPerson() {
  const g = new THREE.Group();
  const skinM = mat(C.skin, 0.9);
  const shirtM = mat(C.shirt, 0.95);

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

    const shin = box(0.16, 0.44, 0.17, mat(0x1f262e, 0.95));
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

// ── Complete room scene ────────────────────────────────────
function buildRoom() {
  const room = new THREE.Group();
  const W = 9, D = 9, H = 5.2;

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.3, D), mat(C.floor, 0.8));
  floor.position.y = -0.15;
  floor.receiveShadow = true;
  room.add(floor);

  // Floor plank lines (subtle detail)
  for (let i = 1; i < 9; i++) {
    const plank = box(W, 0.02, 0.02, mat(0x3f2b1c, 0.9));
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
  const monBody = box(1.5, 0.95, 0.07, mat(C.metal, 0.4, 0.7));
  monBody.position.set(0, 2.28, 0);
  mon.add(monBody);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.36, 0.82),
    new THREE.MeshStandardMaterial({
      color: 0x0d1b28,
      emissive: C.screen,
      emissiveIntensity: 0.85,
    })
  );
  screen.position.set(0, 2.28, 0.04);
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
  shelf.position.set(-2.9, 0, -D / 2 + 0.4);
  room.add(shelf);

  // Potted plant
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.22, 0.4, 12),
    mat(0x8a5a3a, 0.9)
  );
  pot.position.set(3.1, 0.2, -1.2);
  pot.castShadow = true;
  room.add(pot);

  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), mat(0x2f5a3a, 0.95));
    leaf.position.set(
      3.1 + Math.sin(i) * 0.3,
      0.65 + i * 0.14,
      -1.2 + Math.cos(i) * 0.3
    );
    leaf.scale.set(1, 0.6, 1);
    room.add(leaf);
  }

  // Area rug
  const rug = new THREE.Mesh(
    new THREE.CylinderGeometry(1.7, 1.7, 0.03, 28),
    mat(0x4a4438, 0.98)
  );
  rug.position.set(0.8, 0.02, 1.9);
  rug.receiveShadow = true;
  room.add(rug);

  // Person
  const person = buildPerson();
  person.group.position.set(0, 0, -D / 2 + 2.3);
  room.add(person.group);

  return { room, person, screen };
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
    scene.fog = new THREE.Fog(0x0b0d12, 22, 40);

    // ── Isometric orthographic camera ──
    const frustum = 8.2;
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect, frustum, -frustum, 0.1, 120
    );
    camera.position.set(15, 12.5, 15);
    camera.lookAt(0, 2, 0);

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
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const { room, person, screen } = buildRoom();
    scene.add(room);

    // ── Cinematic lighting ──
    scene.add(new THREE.HemisphereLight(0x6a7a88, 0x2a1e16, 0.42));

    const key = new THREE.DirectionalLight(0xffe2b0, 2.1);
    key.position.set(-9, 9, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.0012;
    scene.add(key);

    const deskLight = new THREE.PointLight(C.lamp, 14, 7, 2);
    deskLight.position.set(1.1, 2.15, -3.6);
    scene.add(deskLight);

    const screenLight = new THREE.PointLight(C.screen, 6, 4.5, 2);
    screenLight.position.set(0, 2.3, -3.2);
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

      const t = clock.getElapsedTime();

      // Parallax lerp
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      room.rotation.y = cx;
      camera.position.y = 12.5 + cy * 4;
      camera.lookAt(0, 2, 0);

      // Micro-animations (keyboard typing, breathing, screen flicker)
      if (!reduced) {
        person.arms.forEach((a, i) => {
          a.position.y += Math.sin(t * 7 + i * 1.6) * 0.0016;
        });
        person.group.position.y = Math.sin(t * 1.4) * 0.012;
        (screen.material as THREE.MeshStandardMaterial).emissiveIntensity =
          0.85 + Math.sin(t * 2.6) * 0.07;
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
