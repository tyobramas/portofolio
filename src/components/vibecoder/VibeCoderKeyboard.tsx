import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { playKeyThock } from '../../utils/keyboardAudio';

interface KeyDef {
  id: string;
  char: string;
  sublabel: string;
  targetId: string;
  color: number;
  pitch: number;
  row: 1 | 2;
  colIndex: number;
  isTallEnter?: boolean;
}

// ── Authentic Debbie Pastel-Pop Candy Keycap Palette (High-Luminance & High-Contrast) ──
const KEYS_CONFIG: KeyDef[] = [
  // ── Row 1: B - R - A - M (Top Row) ──
  {
    id: 'B',
    char: 'B',
    sublabel: 'PROJECTS',
    targetId: '#projects',
    color: 0xff85c0, // High-Luminance Bubblegum Candy Pink (Debbie P)
    pitch: 0.95,
    row: 1,
    colIndex: 0,
  },
  {
    id: 'R',
    char: 'R',
    sublabel: 'ABOUT ME',
    targetId: '#about',
    color: 0xc4b5fd, // High-Luminance Soft Pastel Lavender / Periwinkle (Debbie O)
    pitch: 1.0,
    row: 1,
    colIndex: 1,
  },
  {
    id: 'A1',
    char: 'A',
    sublabel: 'SKILLS',
    targetId: '#expertise',
    color: 0x6ee7b7, // High-Luminance Fresh Mint Emerald (Debbie R)
    pitch: 1.05,
    row: 1,
    colIndex: 2,
  },
  {
    id: 'M',
    char: 'M',
    sublabel: 'SERVICES',
    targetId: '#services',
    color: 0xfdba74, // High-Luminance Sunny Apricot Peach (Debbie T)
    pitch: 1.1,
    row: 1,
    colIndex: 3,
  },

  // ── Row 2: A - S - T - Y - O (Bottom Row) ──
  {
    id: 'A2',
    char: 'A',
    sublabel: 'EXPLORE',
    targetId: '#projects',
    color: 0x67e8f9, // High-Luminance Electric Azure Sky (Debbie F)
    pitch: 1.02,
    row: 2,
    colIndex: 0,
  },
  {
    id: 'S',
    char: 'S',
    sublabel: 'FOCUS',
    targetId: '#about',
    color: 0xf472b6, // High-Luminance Orchid Blossom Pink (Debbie O)
    pitch: 1.08,
    row: 2,
    colIndex: 1,
  },
  {
    id: 'T',
    char: 'T',
    sublabel: 'EXPERTISE',
    targetId: '#expertise',
    color: 0xfb7185, // High-Luminance Coral Candy Red (Debbie L)
    pitch: 1.12,
    row: 2,
    colIndex: 2,
  },
  {
    id: 'Y',
    char: 'Y',
    sublabel: 'CERTIFICATES',
    targetId: '#certificates',
    color: 0x93c5fd, // High-Luminance Cornflower Pastel Blue (Debbie I)
    pitch: 1.15,
    row: 2,
    colIndex: 3,
  },
  {
    id: 'O',
    char: 'O',
    sublabel: 'SAY HELLO',
    targetId: '#contact',
    color: 0xbef264, // High-Luminance Radiant Lime Green (Debbie O)
    pitch: 1.2,
    row: 2,
    colIndex: 4,
  },

  // ── Signature Tall Enter Key (Golden Canary Yellow, Spans Rows 1 & 2 on the right) ──
  {
    id: 'ENTER',
    char: '↵',
    sublabel: "LET'S TALK",
    targetId: '#contact',
    color: 0xfde047, // High-Luminance Sunflower Canary Yellow (Debbie Enter)
    pitch: 0.85,
    row: 2,
    colIndex: 5,
    isTallEnter: true,
  },
];

const SEQUENCE_IDS = ['B', 'R', 'A1', 'M', 'A2', 'S', 'T', 'Y', 'O', 'ENTER'];

interface KeyMeshState {
  def: KeyDef;
  group: THREE.Group;
  initialY: number;
  currentY: number;
  targetY: number;
  velocity: number;
  capMesh: THREE.Mesh;
}

// ── Realistic Sculpted Mechanical Keycap Geometry with Rounded Bevels & Dish ──
function createSculptedKeycapGeometry(
  width = 1.36,
  depth = 1.36,
  height = 0.78,
  isTall = false
): THREE.BufferGeometry {
  const segX = 28;
  const segY = 16;
  const segZ = isTall ? 44 : 28;

  const geo = new THREE.BoxGeometry(width, height, depth, segX, segY, segZ);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const halfH = height / 2;

  // Gentle taper (0.09) keeps top face broad, flat, and spacious
  const taper = 0.09;
  // Subtle dish depth (0.015) prevents decal from ever being submerged under the rim
  const dishDepth = 0.015;
  const filletRadius = 0.08;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // t from 0 (bottom) to 1 (top)
    const t = (v.y + halfH) / height;

    // 1. Tapering inward toward top face (authentic draft angle)
    const taperScale = 1.0 - t * taper;
    v.x *= taperScale;
    v.z *= taperScale;

    // 2. Corner smoothing (Squircle fillet on all 4 vertical corners)
    const halfW = (width * taperScale) / 2;
    const halfD = (depth * taperScale) / 2;
    const normX = v.x / halfW;
    const normZ = v.z / halfD;
    const cornerDist = Math.hypot(normX, normZ);
    if (cornerDist > 1.0) {
      const factor = 1.0 / cornerDist;
      v.x = v.x * (0.86 + 0.14 * factor);
      v.z = v.z * (0.86 + 0.14 * factor);
    }

    // 3. Bevel rounding on the top perimeter rim (smooth fillet into top face)
    if (t > 0.88) {
      const rimT = (t - 0.88) / 0.12;
      const rimPull = Math.sin(rimT * Math.PI * 0.5) * filletRadius;
      v.x *= 1.0 - rimPull * 0.25;
      v.z *= 1.0 - rimPull * 0.25;
    }

    // 4. Subtle ergonomic dish on top surface where fingers rest
    if (v.y >= halfH - 0.02) {
      const dishX = normX;
      const dishZ = isTall ? normZ * 0.42 : normZ;
      const dishFactor = Math.max(0, 1.0 - (dishX * dishX + dishZ * dishZ * 0.85));
      v.y -= dishDepth * dishFactor;
    }

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

// ── Ultra-Sharp 2048px Canvas Decal for Double-Shot Inset Typography ──
function createLegendTexture(
  char: string,
  sublabel: string,
  isTall = false,
  keyColor = 0xffffff
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = isTall ? 2048 : 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Perceptual relative luminance calculation (ITU-R BT.709)
  const r = ((keyColor >> 16) & 255) / 255;
  const g = ((keyColor >> 8) & 255) / 255;
  const b = (keyColor & 255) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Ultra-crisp contrast selection:
  // If key has lower luminance (lum < 0.48), use pure crisp white with dark shadow.
  // If key is bright pastel (lum >= 0.48), use rich solid jet black #09090B with soft ambient lift.
  const isDark = lum < 0.48;
  const inkColor = isDark ? '#FFFFFF' : '#09090B';
  const sublabelColor = isDark ? '#FFFFFF' : '#09090B';

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Subtle clean edge contrast shadow to prevent ANY background bleeding
  ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.5)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;

  if (isTall) {
    // Tall Enter Key: Thick Bold Return Arrow
    ctx.lineWidth = 44;
    ctx.strokeStyle = inkColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(660, 360);
    ctx.lineTo(660, 500);
    ctx.lineTo(360, 500);
    ctx.stroke();

    // Bold Arrowhead pointing left
    ctx.beginPath();
    ctx.moveTo(460, 410);
    ctx.lineTo(340, 500);
    ctx.lineTo(460, 590);
    ctx.stroke();

    // Vertical text: LET'S TALK (Centered safely within top dish)
    ctx.save();
    ctx.translate(512, 1260);
    ctx.rotate(Math.PI / 2);
    ctx.font = '900 112px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = inkColor;
    ctx.letterSpacing = '0.14em';
    ctx.fillText("LET'S TALK", 0, 0);
    ctx.restore();
  } else {
    // Standard Alpha Key: Ultra-bold, crisp primary letter (centered upper region)
    ctx.font = '900 320px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = inkColor;
    ctx.fillText(char, 512, 355);

    // High-Legibility Micro Caption: Large, heavy font weight 900
    // Centered at y=620 with massive safety margins on all 4 borders so NO text is ever clipped
    const subFontSize = sublabel.length > 10 ? 80 : sublabel.length > 7 ? 92 : 106;
    ctx.font = `900 ${subFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.letterSpacing = sublabel.length > 10 ? '0.02em' : '0.05em';
    ctx.fillStyle = sublabelColor;
    ctx.fillText(sublabel, 512, 620);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

export default function VibeCoderKeyboard() {
  const mountRef = useRef<HTMLDivElement>(null);

  const keyMeshesRef = useRef<KeyMeshState[]>([]);
  const loopStepRef = useRef(0);
  const soundEnabledRef = useRef(false);
  const autoLoopPlayingRef = useRef(true);
  const userPausedRef = useRef(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerKeyAction = useCallback((def: KeyDef, isManual = false) => {
    const item = keyMeshesRef.current.find((k) => k.def.id === def.id);
    if (item) {
      item.targetY = item.initialY - 0.28;
    }

    if (soundEnabledRef.current) {
      playKeyThock(def.pitch);
    }

    if (isManual) {
      const target = document.querySelector(def.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const pauseLoopTemporarily = useCallback(() => {
    userPausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      userPausedRef.current = false;
    }, 2400);
  }, []);

  // ── Three.js Scene Setup (Cinematic Studio Lighting & Large Scale) ──
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 280;

    // 1. Scene & Camera (Centered on true geometric midpoint X=0.72 so Enter is never cut off on mobile)
    const scene = new THREE.Scene();

    const aspect = width / height;
    const targetCenterX = 0.84;
    const mobileScale = Math.max(1.0, 3.4 / Math.max(aspect, 0.75));
    const camera = new THREE.PerspectiveCamera(34, aspect, 0.1, 100);
    camera.position.set(targetCenterX, 4.3 * mobileScale, 5.6 * mobileScale);
    camera.lookAt(targetCenterX, 0.05, 0);

    // 2. High-Performance WebGL Renderer with Transparent Canvas & Saturated True-Color Space
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setClearColor(0x000000, 0); // 100% Transparent, no box!

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Studio Balanced Lighting (Vibrant Candy Color Preservation - No White Bleaching)
    // A. Soft balanced ambient fill so saturated candy pigments are not washed out
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    // B. Key Light: Crisp Soft Shadows without washing out keycap colors
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
    keyLight.position.set(6, 11, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 28;
    keyLight.shadow.camera.left = -8;
    keyLight.shadow.camera.right = 8;
    keyLight.shadow.camera.top = 8;
    keyLight.shadow.camera.bottom = -8;
    scene.add(keyLight);

    // C. Specular Rim / Edge Backlight (Glints on beveled key borders)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.65);
    rimLight.position.set(-7, 8, -6);
    scene.add(rimLight);

    // D. Warm Fill Light
    const fillLight = new THREE.DirectionalLight(0xfffbf0, 0.35);
    fillLight.position.set(-6, 4, 6);
    scene.add(fillLight);

    // 4. Keyboard Master Group
    const keyboardGroup = new THREE.Group();
    scene.add(keyboardGroup);

    // Mathematical Pitch & Sizing (Enlarged keycap boxes)
    const keyW = 1.48;
    const keyD = 1.48;
    const gap = 0.20;
    const pitch = keyW + gap; // 1.68
    const tallDepth = 2 * pitch - gap; // 3.16
    const keyH = 0.74;

    const stdGeo = createSculptedKeycapGeometry(keyW, keyD, keyH, false);
    const tallGeo = createSculptedKeycapGeometry(keyW, tallDepth, keyH, true);

    // Soft Contact Shadow Plane underneath the entire keyboard
    const shadowPlaneGeo = new THREE.PlaneGeometry(18, 12);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    shadowPlane.receiveShadow = true;
    keyboardGroup.add(shadowPlane);

    const keyMeshItems: KeyMeshState[] = [];

    KEYS_CONFIG.forEach((def) => {
      const keyGroup = new THREE.Group();

      let posX = 0;
      let posZ = 0;

      if (def.isTallEnter) {
        // Tall Enter Key on the right: sits safely to the right of O without overlapping
        posX = 3.0 * pitch;
        posZ = 0.0;
      } else if (def.row === 1) {
        // Row 1 (B, R, A, M): Staggered naturally by half pitch relative to Row 2
        posX = (def.colIndex - 1.5) * pitch;
        posZ = -pitch * 0.52;
      } else {
        // Row 2 (A, S, T, Y, O): 5 keys spanning from left to right
        posX = (def.colIndex - 2.0) * pitch;
        posZ = pitch * 0.52;
      }

      // ── Dark Mechanical Switch Well / Socket on Ground ──
      const socketW = keyW + 0.06;
      const socketD = def.isTallEnter ? tallDepth + 0.06 : keyD + 0.06;
      const socketGeo = new THREE.BoxGeometry(socketW, 0.12, socketD);
      const socketMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.75,
        metalness: 0.25,
      });
      const socketMesh = new THREE.Mesh(socketGeo, socketMat);
      socketMesh.position.set(posX, 0.03, posZ);
      socketMesh.receiveShadow = true;
      keyboardGroup.add(socketMesh);

      // ── Saturated Premium Smooth PBT Keycap Material (Pop Candy Aesthetic) ──
      const capGeo = def.isTallEnter ? tallGeo : stdGeo;
      const capMat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.25,
        metalness: 0.02,
        emissive: new THREE.Color(def.color),
        emissiveIntensity: 0.16,
      });

      const capMesh = new THREE.Mesh(capGeo, capMat);
      capMesh.castShadow = true;
      capMesh.receiveShadow = true;
      keyGroup.add(capMesh);

      // ── High-Resolution Canvas Decal Texture for Inset Typography ──
      const decalTex = createLegendTexture(def.char, def.sublabel, def.isTallEnter, def.color);
      const decalW = keyW * 0.82;
      const decalD = def.isTallEnter ? tallDepth * 0.84 : keyD * 0.82;
      const decalGeo = new THREE.PlaneGeometry(decalW, decalD);
      const decalMat = new THREE.MeshBasicMaterial({
        map: decalTex,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
      });
      const decalMesh = new THREE.Mesh(decalGeo, decalMat);
      decalMesh.rotateX(-Math.PI / 2);
      decalMesh.position.y = 0.375; // Sits safely above the top surface (never submerged)
      keyGroup.add(decalMesh);

      const restingY = 0.37;
      keyGroup.position.set(posX, restingY, posZ);
      keyboardGroup.add(keyGroup);

      const item: KeyMeshState = {
        def,
        group: keyGroup,
        initialY: restingY,
        currentY: restingY,
        targetY: restingY,
        velocity: 0,
        capMesh,
      };

      capMesh.userData = { item };
      keyMeshItems.push(item);
    });

    keyMeshesRef.current = keyMeshItems;

    // Ergonomic 3D isometric perspective angle
    keyboardGroup.rotation.x = 0.36;
    keyboardGroup.rotation.y = -0.04;

    // ── Mouse Interaction & Raycasting ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh: THREE.Mesh | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Subtle dynamic 3D parallax tilt as cursor moves across screen
      const targetRotY = mouse.x * 0.08 - 0.04;
      const targetRotX = 0.36 - mouse.y * 0.05;
      keyboardGroup.rotation.y += (targetRotY - keyboardGroup.rotation.y) * 0.06;
      keyboardGroup.rotation.x += (targetRotX - keyboardGroup.rotation.x) * 0.06;
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
      const intersects = raycaster.intersectObjects(
        keyMeshItems.map((k) => k.capMesh),
        false
      );

      if (intersects.length > 0) {
        const item = intersects[0].object.userData.item as KeyMeshState;
        if (item) {
          pauseLoopTemporarily();
          triggerKeyAction(item.def, true);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const clickY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(new THREE.Vector2(clickX, clickY), camera);
      const intersects = raycaster.intersectObjects(
        keyMeshItems.map((k) => k.capMesh),
        false
      );

      if (intersects.length > 0) {
        const item = intersects[0].object.userData.item as KeyMeshState;
        if (item) {
          pauseLoopTemporarily();
          triggerKeyAction(item.def, true);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('mousedown', handlePointerDown);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true });

    // ── Render & Spring Physics Loop ──
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Spring physics (Hooke's law with damping)
      keyMeshItems.forEach((item) => {
        const displacement = item.currentY - item.targetY;
        const springK = 0.44;
        const damping = 0.72;

        const force = -springK * displacement - damping * item.velocity;
        item.velocity += force;
        item.currentY += item.velocity;

        item.group.position.y = item.currentY;
        item.targetY += (item.initialY - item.targetY) * 0.18;
      });

      // Hover glow detection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        keyMeshItems.map((k) => k.capMesh),
        false
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== hit) {
          if (hoveredMesh) {
            (hoveredMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
          }
          hoveredMesh = hit;
          (hoveredMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.65;
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        if (hoveredMesh) {
          (hoveredMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
          hoveredMesh = null;
          renderer.domElement.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 300;
      const newAspect = newW / newH;
      camera.aspect = newAspect;
      const targetCenterX = 0.84;
      const newScale = Math.max(1.0, 3.4 / Math.max(newAspect, 0.75));
      camera.position.set(targetCenterX, 4.3 * newScale, 5.6 * newScale);
      camera.lookAt(targetCenterX, 0.05, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('mousedown', handlePointerDown);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.dispose();
      stdGeo.dispose();
      tallGeo.dispose();
      shadowPlaneGeo.dispose();
    };
  }, [triggerKeyAction, pauseLoopTemporarily]);

  // ── Typing Loop Sequence ──
  useEffect(() => {
    let mounted = true;
    let timerId: NodeJS.Timeout | null = null;

    const tick = () => {
      if (!mounted) return;

      if (!autoLoopPlayingRef.current || userPausedRef.current || document.hidden) {
        timerId = setTimeout(tick, 250);
        return;
      }

      const idx = loopStepRef.current;
      if (idx < SEQUENCE_IDS.length) {
        const keyId = SEQUENCE_IDS[idx];
        const keyDef = KEYS_CONFIG.find((k) => k.id === keyId);
        if (keyDef) {
          triggerKeyAction(keyDef, false);
        }
        loopStepRef.current = idx + 1;
        timerId = setTimeout(tick, 320);
      } else {
        loopStepRef.current = 0;
        timerId = setTimeout(tick, 1800);
      }
    };

    timerId = setTimeout(tick, 600);

    return () => {
      mounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [triggerKeyAction]);

  // ── Physical Keyboard Input Listener ──
  useEffect(() => {
    let lastAWasFirst = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const k = e.key.toLowerCase();
      let matched: KeyDef | undefined;

      if (k === 'b') matched = KEYS_CONFIG.find((x) => x.id === 'B');
      else if (k === 'r') matched = KEYS_CONFIG.find((x) => x.id === 'R');
      else if (k === 'a') {
        matched = lastAWasFirst ? KEYS_CONFIG.find((x) => x.id === 'A2') : KEYS_CONFIG.find((x) => x.id === 'A1');
        lastAWasFirst = !lastAWasFirst;
      } else if (k === 'm') matched = KEYS_CONFIG.find((x) => x.id === 'M');
      else if (k === 's') matched = KEYS_CONFIG.find((x) => x.id === 'S');
      else if (k === 't') matched = KEYS_CONFIG.find((x) => x.id === 'T');
      else if (k === 'y') matched = KEYS_CONFIG.find((x) => x.id === 'Y');
      else if (k === 'o') matched = KEYS_CONFIG.find((x) => x.id === 'O');
      else if (k === 'enter' || k === ' ') matched = KEYS_CONFIG.find((x) => x.id === 'ENTER');

      if (matched) {
        pauseLoopTemporarily();
        triggerKeyAction(matched, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKeyAction, pauseLoopTemporarily]);

  return (
    <div className="relative mx-auto w-full max-w-5xl select-none px-2 py-0">
      {/* ── Massive Floating 3D Mechanical Keys (No Container Box, Transparent WebGL) ── */}
      <div className="relative w-full flex justify-center items-center overflow-visible">
        <div
          ref={mountRef}
          className="w-full h-[230px] sm:h-[285px] md:h-[320px] cursor-grab active:cursor-grabbing touch-manipulation"
          title="Interactive 3D Mechanical Keyboard: Click or tap any key"
        />
      </div>
    </div>
  );
}