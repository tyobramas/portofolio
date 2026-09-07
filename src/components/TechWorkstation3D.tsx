import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Award, Compass } from 'lucide-react';

interface TechWorkstation3DProps {
  className?: string;
}


// ─── Helper: Dark metal material ───
function darkMetal() {
  return new THREE.MeshStandardMaterial({
    color: 0x1a1d24,
    metalness: 0.85,
    roughness: 0.35,
  });
}

// ─── Helper: Gold accent material ───
function goldMat(emissiveIntensity = 0.15) {
  return new THREE.MeshStandardMaterial({
    color: 0xe5a93c,
    metalness: 0.9,
    roughness: 0.25,
    emissive: 0xe5a93c,
    emissiveIntensity,
  });
}

// ─── Build the Laptop ───
function buildLaptop(): THREE.Group {
  const laptop = new THREE.Group();

  // Base (bottom half of laptop)
  const baseGeo = new THREE.BoxGeometry(2.8, 0.08, 1.8);
  const baseMat = darkMetal();
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.position.set(0, 0.04, 0);
  laptop.add(baseMesh);

  // Keyboard surface detail
  const kbGeo = new THREE.BoxGeometry(2.2, 0.015, 1.0);
  const kbMat = new THREE.MeshStandardMaterial({ color: 0x0d0f14, metalness: 0.7, roughness: 0.5 });
  const kbMesh = new THREE.Mesh(kbGeo, kbMat);
  kbMesh.position.set(0, 0.09, 0.15);
  laptop.add(kbMesh);

  // Trackpad
  const tpGeo = new THREE.BoxGeometry(0.7, 0.01, 0.45);
  const tpMat = new THREE.MeshStandardMaterial({ color: 0x15171e, metalness: 0.6, roughness: 0.4 });
  const tpMesh = new THREE.Mesh(tpGeo, tpMat);
  tpMesh.position.set(0, 0.09, -0.55);
  laptop.add(tpMesh);

  // Screen lid (angled upright)
  const screenGroup = new THREE.Group();
  screenGroup.position.set(0, 0.08, 0.9);
  screenGroup.rotation.x = -Math.PI * 0.38;

  // Screen bezel (outer frame)
  const bezelGeo = new THREE.BoxGeometry(2.8, 1.9, 0.06);
  const bezelMesh = new THREE.Mesh(bezelGeo, darkMetal());
  screenGroup.add(bezelMesh);

  // Screen display (emissive interior — the "room" glows through here)
  const displayGeo = new THREE.BoxGeometry(2.5, 1.6, 0.02);
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0x2a1e0f,
    emissive: 0xd4a044,
    emissiveIntensity: 0.08,
    metalness: 0.1,
    roughness: 0.9,
  });
  const displayMesh = new THREE.Mesh(displayGeo, displayMat);
  displayMesh.position.z = 0.035;
  screenGroup.add(displayMesh);

  // Room scene INSIDE the screen: miniature 3D office room
  const roomGroup = buildMiniRoom();
  roomGroup.position.set(0, -0.1, 0.06);
  roomGroup.scale.set(0.52, 0.52, 0.35);
  screenGroup.add(roomGroup);

  laptop.add(screenGroup);

  // Gold hinge accent line
  const hingeGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.6, 12);
  const hingeMesh = new THREE.Mesh(hingeGeo, goldMat(0.3));
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, 0.08, 0.9);
  laptop.add(hingeMesh);

  return laptop;
}

// ─── Build a miniature room visible inside the laptop screen ───
function buildMiniRoom(): THREE.Group {
  const room = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xb89b6a, roughness: 0.85, metalness: 0.05 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x8b6f3f, roughness: 0.75, metalness: 0.1 });

  // Back wall
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.0), wallMat);
  backWall.position.set(0, 0.5, -1.2);
  room.add(backWall);

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.5), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.0, 0);
  room.add(floor);

  // Windows (two bright rectangles on back wall)
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0xfff5e0,
    emissive: 0xfff5e0,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6,
  });
  [-0.9, 0.9].forEach((x) => {
    const win = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.2), windowMat);
    win.position.set(x, 0.6, -1.18);
    room.add(win);
  });

  // Window blinds (thin horizontal lines)
  const blindMat = new THREE.MeshStandardMaterial({ color: 0xd4c097, roughness: 0.7 });
  [-0.9, 0.9].forEach((x) => {
    for (let i = 0; i < 6; i++) {
      const blind = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.02, 0.02), blindMat);
      blind.position.set(x, 0.2 + i * 0.2, -1.16);
      room.add(blind);
    }
  });

  // Bookshelf (center back wall)
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0xc4a160, roughness: 0.65 });
  const shelfFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.15), shelfMat);
  shelfFrame.position.set(0, 0.6, -1.10);
  room.add(shelfFrame);

  // Shelf dividers
  for (let i = 0; i < 4; i++) {
    const divider = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.03, 0.14), shelfMat);
    divider.position.set(0, -0.15 + i * 0.45, -1.08);
    room.add(divider);
  }

  // Mini books on shelves (colorful tiny boxes)
  const bookColors = [0x8b4513, 0x2f5f2f, 0x4a3060, 0xc87533, 0x3b5998, 0x704214];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const bookMat = new THREE.MeshStandardMaterial({
        color: bookColors[(row * 4 + col) % bookColors.length],
        roughness: 0.7,
      });
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22 + Math.random() * 0.1, 0.10), bookMat);
      book.position.set(-0.35 + col * 0.22, 0.05 + row * 0.45, -1.02);
      room.add(book);
    }
  }

  // Room desk (inside the monitor)
  const deskMat = new THREE.MeshStandardMaterial({ color: 0xa88e5a, roughness: 0.6 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.9), deskMat);
  desk.position.set(0.2, -0.45, -0.4);
  room.add(desk);

  // Desk legs
  [[-0.7, -0.8], [1.1, -0.8], [-0.7, 0.0], [1.1, 0.0]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), deskMat);
    leg.position.set(x + 0.2, -0.72, z + 0.0);
    room.add(leg);
  });

  // Small monitor on the desk (inside the room)
  const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.03), darkMetal());
  monitorBody.position.set(0.5, -0.0, -0.5);
  room.add(monitorBody);

  const monitorScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.35),
    new THREE.MeshStandardMaterial({ color: 0x0a1628, emissive: 0x1a3a5c, emissiveIntensity: 0.3 })
  );
  monitorScreen.position.set(0.5, 0.0, -0.48);
  room.add(monitorScreen);

  // Room point light (warm interior glow)
  const roomLight = new THREE.PointLight(0xffd699, 0.6, 4);
  roomLight.position.set(0, 1.0, -0.5);
  room.add(roomLight);

  return room;
}

// ─── Build left floating code monitor ───
function buildCodeMonitor(): THREE.Group {
  const monitor = new THREE.Group();

  // Monitor body
  const bodyGeo = new THREE.BoxGeometry(1.0, 0.75, 0.04);
  const bodyMesh = new THREE.Mesh(bodyGeo, darkMetal());
  monitor.add(bodyMesh);

  // Screen with code-like emissive
  const screenGeo = new THREE.PlaneGeometry(0.88, 0.62);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0c1420,
    emissive: 0x1a4a2a,
    emissiveIntensity: 0.25,
    metalness: 0.1,
    roughness: 0.9,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.z = 0.025;
  monitor.add(screenMesh);

  // Simulated code lines (thin glowing bars)
  const codeMat = new THREE.MeshBasicMaterial({ color: 0x44cc66, transparent: true, opacity: 0.65 });
  const codeMatBlue = new THREE.MeshBasicMaterial({ color: 0x55aaff, transparent: true, opacity: 0.55 });
  const codeMatGold = new THREE.MeshBasicMaterial({ color: 0xe5a93c, transparent: true, opacity: 0.6 });
  const codeMats = [codeMat, codeMatBlue, codeMatGold, codeMat, codeMatBlue];

  for (let i = 0; i < 10; i++) {
    const lineWidth = 0.15 + Math.random() * 0.45;
    const indent = Math.random() > 0.5 ? 0.08 : 0;
    const lineGeo = new THREE.PlaneGeometry(lineWidth, 0.018);
    const lineMesh = new THREE.Mesh(lineGeo, codeMats[i % codeMats.length]);
    lineMesh.position.set(-0.32 + indent + lineWidth / 2, 0.24 - i * 0.052, 0.028);
    monitor.add(lineMesh);
  }

  // Monitor stand (thin arm)
  const standGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8);
  const standMesh = new THREE.Mesh(standGeo, darkMetal());
  standMesh.position.set(0, -0.55, 0);
  monitor.add(standMesh);

  return monitor;
}

// ─── Build a floating 3D holographic cube ───
function buildHoloCube(): THREE.Group {
  const group = new THREE.Group();

  const cubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
  const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x55ffcc, transparent: true, opacity: 0.8 });
  const wireframe = new THREE.LineSegments(edgesGeo, lineMat);
  group.add(wireframe);

  const innerGeo = new THREE.OctahedronGeometry(0.16, 0);
  const innerMat = new THREE.MeshBasicMaterial({ color: 0xe5a93c, wireframe: true, transparent: true, opacity: 0.6 });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerCore);

  return group;
}

// ─── Build the vintage radio ───
function buildRadio(): THREE.Group {
  const radio = new THREE.Group();

  const bodyGeo = new THREE.BoxGeometry(0.5, 0.35, 0.3);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x6b3a1f, roughness: 0.55, metalness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  radio.add(body);

  // Speaker grille (horizontal lines)
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0x4a2810, metalness: 0.4, roughness: 0.5 });
  for (let i = 0; i < 5; i++) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.012, 0.01), grilleMat);
    line.position.set(0, -0.05 + i * 0.04, 0.155);
    radio.add(line);
  }

  // Gold dial
  const dialGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
  const dial = new THREE.Mesh(dialGeo, goldMat(0.4));
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0.15, -0.12, 0.155);
  radio.add(dial);

  // Antenna
  const antGeo = new THREE.CylinderGeometry(0.008, 0.005, 0.5, 6);
  const antMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.2 });
  const ant = new THREE.Mesh(antGeo, antMat);
  ant.position.set(-0.15, 0.4, 0);
  ant.rotation.z = 0.15;
  radio.add(ant);

  return radio;
}

// ─── Build the coffee mug ───
function buildCoffeeMug(): THREE.Group {
  const mug = new THREE.Group();

  // Cup body (cylinder)
  const cupGeo = new THREE.CylinderGeometry(0.1, 0.09, 0.2, 16, 1, true);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0xd4cdc0,
    roughness: 0.5,
    metalness: 0.15,
    side: THREE.DoubleSide,
  });
  const cup = new THREE.Mesh(cupGeo, cupMat);
  mug.add(cup);

  // Bottom disc
  const bottomGeo = new THREE.CircleGeometry(0.09, 16);
  const bottom = new THREE.Mesh(bottomGeo, cupMat);
  bottom.rotation.x = Math.PI / 2;
  bottom.position.y = -0.1;
  mug.add(bottom);

  // Coffee surface (dark liquid)
  const coffeeGeo = new THREE.CircleGeometry(0.085, 16);
  const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3e2410, roughness: 0.3 });
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.08;
  mug.add(coffee);

  // Handle (torus)
  const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 8, 12, Math.PI);
  const handle = new THREE.Mesh(handleGeo, cupMat);
  handle.rotation.y = Math.PI / 2;
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.13, 0, 0);
  mug.add(handle);

  return mug;
}

// ─── Build the Moebius / abstract golden sculpture ───
function buildSculpture(): THREE.Group {
  const sculpt = new THREE.Group();

  // Twisted torus knot
  const knotGeo = new THREE.TorusKnotGeometry(0.25, 0.06, 80, 12, 2, 3);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0xd4a050,
    metalness: 0.95,
    roughness: 0.15,
    emissive: 0xd4a050,
    emissiveIntensity: 0.05,
  });
  const knot = new THREE.Mesh(knotGeo, knotMat);
  sculpt.add(knot);

  return sculpt;
}

// ─── Build the red power cable ───
function buildCable(): THREE.Group {
  const cableGroup = new THREE.Group();
  const cableMat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 0.45, metalness: 0.2 });

  // Cable path using a CatmullRom curve
  const cablePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.5, 0.08, 0.4),
    new THREE.Vector3(-0.2, 0.02, 0.8),
    new THREE.Vector3(0.3, 0.02, 1.2),
    new THREE.Vector3(0.6, 0.01, 1.7),
    new THREE.Vector3(0.3, 0.01, 2.2),
    new THREE.Vector3(0.0, 0.01, 2.6),
  ]);

  const cableGeo = new THREE.TubeGeometry(cablePath, 40, 0.025, 8, false);
  const cable = new THREE.Mesh(cableGeo, cableMat);
  cableGroup.add(cable);

  // Plug at the end of the cable
  const plugBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.05, 0.15, 12),
    new THREE.MeshStandardMaterial({ color: 0xaa1818, roughness: 0.4, metalness: 0.3 })
  );
  plugBody.position.set(0.0, 0.06, 2.65);
  plugBody.rotation.x = Math.PI / 2;
  cableGroup.add(plugBody);

  // Two gold prongs
  const prongMat = goldMat(0.2);
  [-0.025, 0.025].forEach((x) => {
    const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.12, 6), prongMat);
    prong.position.set(x, 0.06, 2.78);
    prong.rotation.x = Math.PI / 2;
    cableGroup.add(prong);
  });

  return cableGroup;
}

// ─── Build the notebook & pen ───
function buildNotebook(): THREE.Group {
  const nbGroup = new THREE.Group();

  // Notebook body
  const nbGeo = new THREE.BoxGeometry(0.5, 0.04, 0.7);
  const nbMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.6, metalness: 0.2 });
  const nb = new THREE.Mesh(nbGeo, nbMat);
  nbGroup.add(nb);

  // Elastic band
  const bandGeo = new THREE.BoxGeometry(0.01, 0.045, 0.7);
  const band = new THREE.Mesh(bandGeo, goldMat(0.2));
  band.position.set(0.08, 0, 0);
  nbGroup.add(band);

  // Pen
  const penGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.55, 6);
  const penMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.3 });
  const pen = new THREE.Mesh(penGeo, penMat);
  pen.rotation.x = Math.PI / 2;
  pen.rotation.z = 0.1;
  pen.position.set(0.32, 0.035, 0.1);
  nbGroup.add(pen);

  // Pen clip (gold)
  const clipGeo = new THREE.BoxGeometry(0.008, 0.005, 0.12);
  const clip = new THREE.Mesh(clipGeo, goldMat(0.3));
  clip.position.set(0.32, 0.045, -0.12);
  nbGroup.add(clip);

  return nbGroup;
}

// ─── Build small floating info monitor (top-right) ───
function buildInfoMonitor(): THREE.Group {
  const monitor = new THREE.Group();

  const bodyGeo = new THREE.BoxGeometry(0.6, 0.45, 0.03);
  const body = new THREE.Mesh(bodyGeo, darkMetal());
  monitor.add(body);

  const screenGeo = new THREE.PlaneGeometry(0.52, 0.36);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x1a0f08,
    emissive: 0x8b4513,
    emissiveIntensity: 0.12,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.z = 0.018;
  monitor.add(screen);

  // Mini UI elements on screen
  const uiMat = new THREE.MeshBasicMaterial({ color: 0xf5c869, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 3; i++) {
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(0.12 + i * 0.05, 0.04), uiMat);
    bar.position.set(-0.12 + i * 0.14, 0.06 - i * 0.08, 0.020);
    monitor.add(bar);
  }

  return monitor;
}

// ─── Build desk mat / platform ───
function buildDeskMat(): THREE.Group {
  const group = new THREE.Group();

  const matGeo = new THREE.BoxGeometry(4.5, 0.04, 3.5);
  const matMat = new THREE.MeshStandardMaterial({ color: 0x2a2a30, roughness: 0.75, metalness: 0.2 });
  const mat = new THREE.Mesh(matGeo, matMat);
  group.add(mat);

  // Subtle edge bevel line (gold)
  const edgeGeo = new THREE.BoxGeometry(4.52, 0.005, 3.52);
  const edge = new THREE.Mesh(edgeGeo, goldMat(0.08));
  edge.position.y = 0.023;
  group.add(edge);

  return group;
}

// ─── Build small keyboard on the laptop base ───
function buildKeyboard(): THREE.Group {
  const kb = new THREE.Group();

  // Base plate
  const baseGeo = new THREE.BoxGeometry(1.2, 0.03, 0.5);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xd4cdc0, roughness: 0.5, metalness: 0.3 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  kb.add(base);

  // Key rows
  const keyMat = new THREE.MeshStandardMaterial({ color: 0xf0e8d8, roughness: 0.6, metalness: 0.15 });
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 10; col++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.08), keyMat);
      key.position.set(-0.45 + col * 0.1, 0.025, -0.15 + row * 0.1);
      kb.add(key);
    }
  }

  return kb;
}

// ─── Small sticky notes ───
function buildStickyNotes(): THREE.Group {
  const group = new THREE.Group();
  const colors = [0xffe066, 0xffaa55];
  colors.forEach((c, i) => {
    const noteGeo = new THREE.BoxGeometry(0.18, 0.005, 0.18);
    const noteMat = new THREE.MeshStandardMaterial({ color: c, roughness: 0.8 });
    const note = new THREE.Mesh(noteGeo, noteMat);
    note.position.set(i * 0.22, i * 0.006, 0);
    note.rotation.y = i * 0.15;
    group.add(note);
  });
  return group;
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
export default function TechWorkstation3D({ className = '' }: TechWorkstation3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInteractedRef = useRef(false);

  const markInteracted = useCallback(() => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      setHasInteracted(true);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // ─── Scene ───
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0c10);
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.08);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Isometric-ish perspective
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(3.5, 4.0, 5.5);
    camera.lookAt(0, 0.3, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ─── Lighting ───
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x404050, 0.6);
    scene.add(ambientLight);

    // Main key light (warm directional from upper-left)
    const keyLight = new THREE.DirectionalLight(0xffd699, 1.6);
    keyLight.position.set(-4, 6, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    scene.add(keyLight);

    // Fill light from right (cooler)
    const fillLight = new THREE.DirectionalLight(0x8899cc, 0.5);
    fillLight.position.set(5, 3, -2);
    scene.add(fillLight);

    // Rim light (back)
    const rimLight = new THREE.DirectionalLight(0xffa040, 0.4);
    rimLight.position.set(-2, 2, -5);
    scene.add(rimLight);

    // Gold accent point light
    const goldPointLight = new THREE.PointLight(0xe5a93c, 0.7, 8);
    goldPointLight.position.set(0, 2, 1);
    scene.add(goldPointLight);

    // Red cable glow
    const redGlow = new THREE.PointLight(0xff3333, 0.3, 4);
    redGlow.position.set(0.3, 0.3, 2.4);
    scene.add(redGlow);

    // ─── Ground / Infinite Dark Surface ───
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0e0f13,
      roughness: 0.85,
      metalness: 0.15,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);

    // ─── Assemble All 3D Objects ───
    const sceneRoot = new THREE.Group();

    // Desk mat
    const deskMat = buildDeskMat();
    deskMat.position.set(0, 0, 0.3);
    sceneRoot.add(deskMat);

    // Laptop (center piece)
    const laptop = buildLaptop();
    laptop.position.set(0, 0.05, 0);
    laptop.castShadow = true;
    sceneRoot.add(laptop);

    // Left floating code monitor
    const codeMonitor = buildCodeMonitor();
    codeMonitor.position.set(-2.0, 1.2, -0.2);
    codeMonitor.rotation.y = 0.25;
    sceneRoot.add(codeMonitor);

    // Floating holographic 3D cube (near the code monitor)
    const holoCube = buildHoloCube();
    holoCube.position.set(-1.8, 0.6, 0.3);
    sceneRoot.add(holoCube);

    // Top-right floating info monitor
    const infoMonitor = buildInfoMonitor();
    infoMonitor.position.set(2.0, 1.6, -0.8);
    infoMonitor.rotation.y = -0.3;
    sceneRoot.add(infoMonitor);

    // Vintage radio (left of laptop)
    const radio = buildRadio();
    radio.position.set(-1.2, 0.22, 0.5);
    radio.rotation.y = 0.15;
    sceneRoot.add(radio);

    // Keyboard (in front of laptop)
    const keyboard = buildKeyboard();
    keyboard.position.set(-0.3, 0.06, -0.7);
    sceneRoot.add(keyboard);

    // Coffee mug
    const coffeeMug = buildCoffeeMug();
    coffeeMug.position.set(0.7, 0.15, -0.5);
    sceneRoot.add(coffeeMug);

    // Notebook & pen
    const notebook = buildNotebook();
    notebook.position.set(1.3, 0.07, -0.2);
    notebook.rotation.y = -0.2;
    sceneRoot.add(notebook);

    // Golden sculpture (right side)
    const sculpture = buildSculpture();
    sculpture.position.set(1.8, 0.5, 0.4);
    sceneRoot.add(sculpture);

    // Sticky notes
    const stickyNotes = buildStickyNotes();
    stickyNotes.position.set(-0.2, 0.08, -0.4);
    sceneRoot.add(stickyNotes);

    // Red power cable
    const cable = buildCable();
    cable.position.set(-0.2, 0, 0);
    sceneRoot.add(cable);

    // Enable shadows on all meshes
    sceneRoot.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    scene.add(sceneRoot);

    // ─── Gold Dust Particles (true 3D depth) ───
    const particleCount = 60;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 7;
      pPositions[i * 3 + 1] = Math.random() * 3.5;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 220, 140, 1)');
      grad.addColorStop(0.4, 'rgba(229, 169, 60, 0.6)');
      grad.addColorStop(1, 'rgba(229, 169, 60, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      map: pTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ─── Red geometric accent planes (background depth like the reference) ───
    const accentMat = new THREE.MeshBasicMaterial({
      color: 0xcc2222,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    // Upper-left accent
    const accent1 = new THREE.Mesh(new THREE.PlaneGeometry(3, 2), accentMat);
    accent1.position.set(-5, 3.5, -4);
    accent1.rotation.y = 0.5;
    accent1.rotation.z = -0.3;
    scene.add(accent1);

    // Lower-right accent
    const accent2 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.5), accentMat);
    accent2.position.set(5, 1, -3);
    accent2.rotation.y = -0.4;
    accent2.rotation.z = 0.2;
    scene.add(accent2);

    setIsLoaded(true);

    // ─── Mouse Tracking ───
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const baseCamPos = new THREE.Vector3(3.5, 4.0, 5.5);
    const lookTarget = new THREE.Vector3(0, 0.3, 0);
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      markInteracted();
    };

    const onMouseLeave = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetMouse.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouse.y = -(((t.clientY - rect.top) / rect.height) * 2 - 1);
        markInteracted();
      }
    };

    const onTouchEnd = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    // ─── Resize ───
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ─── Animation Loop ───
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      // Camera orbits slightly based on mouse (depth parallax)
      camera.position.x = baseCamPos.x + mouse.x * 1.2;
      camera.position.y = baseCamPos.y + mouse.y * 0.6;
      camera.position.z = baseCamPos.z + mouse.y * 0.3;
      camera.lookAt(lookTarget);

      // Holographic cube rotation
      holoCube.rotation.x = t * 0.8;
      holoCube.rotation.y = t * 1.1;
      holoCube.position.y = 0.6 + Math.sin(t * 2.0) * 0.06;

      // Sculpture slow rotation
      sculpture.rotation.y = t * 0.3;

      // Radio antenna gentle sway
      const ant = radio.children[radio.children.length - 1];
      if (ant) ant.rotation.z = 0.15 + Math.sin(t * 1.5) * 0.03;

      // Particle gentle float
      const positions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(t * 0.5 + i * 0.7) * 0.0008;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Gold light subtle flicker
      goldPointLight.intensity = 0.7 + Math.sin(t * 3) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
        if ((obj as THREE.LineSegments).isLineSegments) {
          const ls = obj as THREE.LineSegments;
          ls.geometry?.dispose();
          (ls.material as THREE.Material)?.dispose();
        }
      });

      pGeo.dispose();
      pMat.dispose();
      pTexture.dispose();
      renderer.dispose();
    };
  }, [markInteracted]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl border border-[#262A38] bg-[#0B0C10] group select-none ${className}`}
      style={{ minHeight: '340px' }}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Subtle Depth Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/60 via-transparent to-transparent pointer-events-none" />

      {/* Interactive Tech Badge (Top-Right) */}
      <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-[#0B0C10]/85 backdrop-blur-md px-3 py-1 text-xs shadow-lg pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500" />
        </span>
        <span className="font-mono text-[11px] font-semibold text-gold-300">
          3D WebGL // Interactive
        </span>
      </div>

      {/* Interaction Hint */}
      {!hasInteracted && (
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0B0C10]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-sans text-ink-300 pointer-events-none animate-pulse">
          <Compass size={12} className="text-gold-400" />
          <span>Move mouse to explore 3D depth</span>
        </div>
      )}

      {/* Floating Gold Badge: 13+ Years Experience (Bottom-Left) */}
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
