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

// ── Sosok orang duduk, membelakangi kamera ─────────────────
function buildPerson() {
  const g = new THREE.Group();
  const skinM  = mat(C.skin, 0.9);
  const shirtM = mat(0x3d5a7a, 0.9);
  const pantM  = mat(0x2c3542, 0.95);
  const chairM = mat(C.fabric, 0.95);
  const steelM = mat(C.metal, 0.4, 0.85);

  const SEAT = 0.92;            // tinggi dudukan — 0.6 × tinggi meja (1.5)

  // ── Kursi: base bintang 5 + roda + gas lift ──
  const chair = new THREE.Group();

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.08, 12), steelM);
  hub.position.y = 0.11; chair.add(hub);

  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = box(0.42, 0.055, 0.09, steelM);
    leg.position.set(Math.cos(a) * 0.21, 0.1, Math.sin(a) * 0.21);
    leg.rotation.y = -a;
    chair.add(leg);

    const caster = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), mat(0x14171d, 0.7));
    caster.position.set(Math.cos(a) * 0.4, 0.055, Math.sin(a) * 0.4);
    caster.castShadow = true;
    chair.add(caster);
  }

  const lift = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, SEAT - 0.28, 12), steelM);
  lift.position.y = 0.14 + (SEAT - 0.28) / 2; chair.add(lift);

  const seat = box(0.58, 0.11, 0.56, chairM);
  seat.position.set(0, SEAT, 0.02); chair.add(seat);

  const back = box(0.56, 0.9, 0.1, chairM);
  back.position.set(0, SEAT + 0.5, -0.26);
  back.rotation.x = -0.12; chair.add(back);

  // sandaran tangan
  [-0.33, 0.33].forEach((x) => {
    const rest = box(0.07, 0.06, 0.38, mat(0x1e242c, 0.9));
    rest.position.set(x, SEAT + 0.24, 0.02); chair.add(rest);
    const support = box(0.05, 0.22, 0.05, steelM);
    support.position.set(x, SEAT + 0.12, -0.1); chair.add(support);
  });

  g.add(chair);

  // ── Badan ──
  const hips = box(0.46, 0.2, 0.42, pantM);
  hips.position.set(0, SEAT + 0.14, 0.02); g.add(hips);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.21, 0.5, 6, 14), shirtM);
  torso.position.set(0, SEAT + 0.54, -0.03);
  torso.rotation.x = 0.16;
  torso.castShadow = true; g.add(torso);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.085, 0.12, 10), skinM);
  neck.position.set(0, SEAT + 0.87, 0.02); g.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.175, 20, 16), skinM);
  head.position.set(0, SEAT + 1.03, 0.04);
  head.castShadow = true; g.add(head);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.183, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.62),
    mat(C.hair, 0.95)
  );
  hair.position.set(0, SEAT + 1.05, 0.03); g.add(hair);

  // ── Kaki: paha horizontal, betis turun ke lantai ──
  [-0.14, 0.14].forEach((x) => {
    const thigh = box(0.17, 0.15, 0.46, pantM);
    thigh.position.set(x, SEAT + 0.03, 0.26); g.add(thigh);

    const shin = box(0.15, SEAT - 0.16, 0.15, pantM);
    shin.position.set(x, (SEAT - 0.16) / 2 + 0.06, 0.46); g.add(shin);

    const shoe = box(0.17, 0.09, 0.3, mat(0x14171d, 0.8));
    shoe.position.set(x, 0.05, 0.56);
    shoe.castShadow = true; g.add(shoe);
  });

  // ── Lengan: bahu → siku → telapak di keyboard ──
  const KB_TOP = 1.62;          // meja 1.56 + tebal keyboard 0.06
  const HAND_Z = 0.60;          // jarak jangkauan ke depan
  const arms: THREE.Object3D[] = [];

  [-1, 1].forEach((side) => {
    const shoulder = new THREE.Vector3(side * 0.27, SEAT + 0.74, -0.01);
    const elbow    = new THREE.Vector3(side * 0.33, SEAT + 0.40, 0.30);
    const hand     = new THREE.Vector3(side * 0.16, KB_TOP + 0.04, HAND_Z);

    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.068, shoulder.distanceTo(elbow), 5, 10), shirtM);
    upper.position.copy(shoulder.clone().lerp(elbow, 0.5));
    upper.lookAt(elbow); upper.rotateX(Math.PI / 2);
    upper.castShadow = true; g.add(upper);

    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.058, elbow.distanceTo(hand), 5, 10), skinM);
    fore.position.copy(elbow.clone().lerp(hand, 0.5));
    fore.lookAt(hand); fore.rotateX(Math.PI / 2);
    fore.castShadow = true; g.add(fore);

    const palm = new THREE.Mesh(new THREE.SphereGeometry(0.062, 10, 8), skinM);
    palm.position.copy(hand);
    palm.scale.set(1, 0.65, 1.15);
    palm.castShadow = true; g.add(palm);

    arms.push(fore, palm);      // hanya dua ini yang dianimasikan
  });

  arms.forEach((obj) => {
    obj.userData.baseY = obj.position.y;
  });

  return { group: g, arms };
}

// ── Papan tech stack di dinding kiri, animasi checklist ─────
const STACK = [
  { tag: 'TS',  label: 'TypeScript',   color: '#3178c6' },
  { tag: 'FL',  label: 'Flutter',      color: '#42a5f5' },
  { tag: 'PHP', label: 'Laravel',      color: '#f05340' },
  { tag: 'RE',  label: 'React 18',     color: '#61dafb' },
  { tag: 'PY',  label: 'Python / AI',  color: '#ffd845' },
  { tag: 'PG',  label: 'PostgreSQL',   color: '#4d97c4' },
  { tag: 'DK',  label: 'Docker / CI',  color: '#2496ed' },
];

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function buildStackBoard() {
  const cv = document.createElement('canvas');
  cv.width = 900;
  cv.height = 660;
  const ctx = cv.getContext('2d')!;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  let checked = 0, timer = 0, hold = 0;

  function draw() {
    ctx.fillStyle = '#141821';
    ctx.fillRect(0, 0, cv.width, cv.height);

    // header
    ctx.fillStyle = '#e5a93c';
    ctx.font = '700 30px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText('TECH STACK', 46, 52);
    ctx.fillStyle = '#5d6472';
    ctx.font = '500 20px ui-monospace, monospace';
    ctx.fillText(`${checked}/${STACK.length}`, cv.width - 100, 54);
    ctx.fillStyle = '#e5a93c';
    ctx.fillRect(46, 82, 84, 3);

    STACK.forEach((s, i) => {
      const y = 132 + i * 72;
      const on = i < checked;

      ctx.fillStyle = on ? 'rgba(229,169,60,0.07)' : 'rgba(255,255,255,0.02)';
      roundRect(ctx, 42, y, cv.width - 84, 58, 8);
      ctx.fill();

      // checkbox
      ctx.strokeStyle = on ? '#e5a93c' : '#3a4150';
      ctx.lineWidth = 2.5;
      roundRect(ctx, 62, y + 17, 24, 24, 5);
      ctx.stroke();
      if (on) {
        ctx.strokeStyle = '#e5a93c';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(67, y + 29);
        ctx.lineTo(73, y + 35);
        ctx.lineTo(82, y + 22);
        ctx.stroke();
      }

      // chip logo (inisial berwarna)
      ctx.fillStyle = on ? s.color : '#2c323d';
      roundRect(ctx, 108, y + 13, 52, 32, 6);
      ctx.fill();
      ctx.fillStyle = on ? '#0d1117' : '#5d6472';
      ctx.font = '700 19px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.tag, 134, y + 30);
      ctx.textAlign = 'left';

      // label
      ctx.fillStyle = on ? '#e8edf5' : '#727a88';
      ctx.font = '600 23px Inter, system-ui, sans-serif';
      ctx.fillText(s.label, 180, y + 30);
    });

    tex.needsUpdate = true;
  }

  function update(dt: number) {
    if (hold > 0) {
      hold -= dt;
      if (hold <= 0) {
        checked = 0;
        draw();
      }
      return;
    }
    timer += dt;
    if (timer > 0.75) {
      timer = 0;
      checked++;
      if (checked >= STACK.length) {
        checked = STACK.length;
        hold = 3;
      }
      draw();
    }
  }

  draw();
  return { tex, update };
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
  cv.width = 1280; cv.height = 720;
  const ctx = cv.getContext('2d')!;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const lineLens = CODE.map(l => l.reduce((a, [t]) => a + t.length, 0));
  const total = lineLens.reduce((a, b) => a + b + 1, 0);
  const FS = 31, LH = 47, PAD_L = 104, PAD_T = 100;

  let typed = 0, hold = 0;

  function draw(t: number) {
    // latar editor
    ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 0, cv.width, cv.height);
    // title bar
    ctx.fillStyle = '#122536'; ctx.fillRect(0, 0, cv.width, 54);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.arc(30 + i * 30, 27, 8, 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#5f7f96'; ctx.font = '500 23px ui-monospace, monospace';
    ctx.fillText('syncQueue.ts', 138, 28);
    // gutter
    ctx.fillStyle = '#0a1520'; ctx.fillRect(0, 54, 78, cv.height);

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
      ctx.fillText(String(i + 1).padStart(2, ' '), 26, y);
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
      typed += dt * 36;
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
  const W = 7.2, D = 6, H = 4.4;

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

  // Papan tech stack — menempel dinding kiri (menggantikan jendela)
  const board = buildStackBoard();
  const boardFrame = box(0.08, 2.24, 3.04, mat(C.gold, 0.35, 0.85));
  boardFrame.position.set(-W / 2 + 0.14, 2.35, 0.3);
  room.add(boardFrame);

  const boardFace = new THREE.Mesh(
    new THREE.PlaneGeometry(2.9, 2.1),
    new THREE.MeshStandardMaterial({
      map: board.tex,
      roughness: 0.85,
      emissive: 0xffffff,
      emissiveMap: board.tex,
      emissiveIntensity: 0.42,
    })
  );
  boardFace.rotation.y = Math.PI / 2;
  boardFace.position.set(-W / 2 + 0.19, 2.35, 0.3);
  room.add(boardFace);

  // Desk against back wall (diperlebar untuk dual monitor)
  const desk = new THREE.Group();
  const deskTop = box(4.2, 0.12, 1.3, mat(C.woodMid, 0.7));
  deskTop.position.set(0, 1.5, 0);
  desk.add(deskTop);

  ([[-1.95, -0.5], [1.95, -0.5], [-1.95, 0.5], [1.95, 0.5]] as [number, number][]).forEach(([x, z]) => {
    const leg = box(0.1, 1.5, 0.1, mat(C.woodDark, 0.8));
    leg.position.set(x, 0.75, z);
    desk.add(leg);
  });
  desk.position.set(0, 0, -D / 2 + 1.1);
  room.add(desk);

  // Ultrawide 34" Monitor
  const code = buildCodeScreen();

  const MON_Y = 2.52;
  const MON_Z = -D / 2 + 0.75;

  const mon = new THREE.Group();
  const monBody = box(2.9, 1.68, 0.08, mat(C.metal, 0.4, 0.7));
  monBody.position.set(0, MON_Y, 0); mon.add(monBody);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.72, 1.53),          // 16:9 pas dengan canvas
    new THREE.MeshBasicMaterial({ map: code.tex, toneMapped: false })
  );
  screen.position.set(0, MON_Y, 0.05); mon.add(screen);

  const neckA = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 10), mat(C.metal, 0.4, 0.8));
  neckA.position.set(0, 1.72, 0); mon.add(neckA);
  const footA = box(0.95, 0.05, 0.32, mat(C.metal, 0.4, 0.8));
  footA.position.set(0, 1.59, 0.06); mon.add(footA);

  mon.position.set(0, 0, MON_Z);                  // center, tidak offset lagi
  room.add(mon);

  const PERSON_Z = -D / 2 + 2.0;        // -1.0 → torso bebas dari bibir meja (-1.25)
  const HAND_Z   = PERSON_Z - 0.60;     // -1.60 → titik keyboard

  // Keyboard tepat di bawah telapak tangan, center x = 0
  const kb = box(1.15, 0.06, 0.4, mat(0x22262e, 0.8));
  kb.position.set(0, 1.59, HAND_Z);
  room.add(kb);

  const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10), mat(0x22262e, 0.7));
  mouse.scale.set(0.8, 0.5, 1.25);
  mouse.position.set(0.85, 1.61, HAND_Z + 0.02);
  room.add(mouse);

  // Mug: mengisi sisi kanan meja yang kosong setelah monitor 2 dihapus
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.085, 0.17, 14), mat(0xd9d3c7, 0.75));
  mug.position.set(1.5, 1.65, HAND_Z + 0.05);
  mug.castShadow = true; room.add(mug);
  const mugEar = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.018, 8, 14), mat(0xd9d3c7, 0.75));
  mugEar.position.set(1.6, 1.66, HAND_Z + 0.05);
  mugEar.rotation.y = Math.PI / 2; room.add(mugEar);

  // Gold desk lamp — dipindah ke kiri meja
  const lampArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8),
    mat(C.gold, 0.3, 0.9)
  );
  lampArm.position.set(-2.1, 1.95, -D / 2 + 0.85);
  lampArm.rotation.z = -0.28;
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
  shade.position.set(-1.92, 2.32, -D / 2 + 0.85);
  shade.rotation.z = Math.PI - 0.3;
  room.add(shade);

  // Bookshelf on back wall (digeser ke dinding dan ditipiskan)
  const shelf = new THREE.Group();
  const shelfBody = box(1.7, 2.5, 0.42, mat(C.woodDark, 0.8));
  shelfBody.position.set(0, 1.25, 0);
  shelf.add(shelfBody);

  const bookColors = [0x7a3b2a, 0x2f5240, 0x4a3a62, 0xa8763c, 0x36527a];
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < 9; i++) {
      const h = 0.26 + Math.random() * 0.16;
      const b = box(0.14, h, 0.3, mat(bookColors[i % 5], 0.9));
      b.position.set(-0.68 + i * 0.17, 0.52 + r * 0.75 + h / 2, 0.16);
      shelf.add(b);
    }
  }
  shelf.position.set(-2.72, 0, -D / 2 + 0.32);
  room.add(shelf);

  // ── Tanaman pot ──
  const plant = new THREE.Group();

  const potBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.19, 0.36, 16),
    mat(0xa9663f, 0.9)
  );
  potBody.position.y = 0.18;
  potBody.castShadow = true; potBody.receiveShadow = true;
  plant.add(potBody);

  const potRim = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.275, 0.06, 16), mat(0xbd7548, 0.85));
  potRim.position.y = 0.37; plant.add(potRim);

  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.245, 0.03, 16), mat(0x33241a, 0.98));
  soil.position.y = 0.385; plant.add(soil);

  // batang
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.038, 0.42, 8), mat(0x3f6b3a, 0.9));
  stem.position.y = 0.6; plant.add(stem);

  // kanopi: rumpun daun mengelilingi titik pusat, bukan tumpukan vertikal
  const leafM = mat(0x3d7a4a, 0.92);
  const CANOPY = [
    [ 0.00, 0.95, 0.00, 0.30],
    [ 0.24, 0.86, 0.10, 0.22],
    [-0.22, 0.88, -0.08, 0.21],
    [ 0.08, 0.80, -0.24, 0.19],
    [-0.10, 0.78, 0.23, 0.18],
    [ 0.15, 1.06, -0.12, 0.17],
    [-0.14, 1.04, 0.10, 0.16],
  ] as const;

  CANOPY.forEach(([x, y, z, r]) => {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), leafM);
    leaf.position.set(x, y, z);
    leaf.scale.set(1.25, 0.72, 1.25);        // pipih seperti rumpun daun
    leaf.rotation.y = Math.random() * Math.PI;
    leaf.castShadow = true;
    plant.add(leaf);
  });

  plant.position.set(2.55, 0, -1.35);        // sudut kanan-belakang, bebas dari meja
  room.add(plant);

  // Area rug (dirapatkan)
  const rug = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.6, 0.03, 28),
    mat(0x4a4438, 0.98)
  );
  rug.position.set(0.6, 0.02, 1.5);
  rug.receiveShadow = true;
  room.add(rug);

  // Person
  const person = buildPerson();
  person.group.rotation.y = Math.PI;
  person.group.position.set(0, 0, PERSON_Z);
  room.add(person.group);

  return { room, person, code, board };
}

// ── React Component ────────────────────────────────────────
export default function DioramaRoom3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
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
    const frustum = 4.35;
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -frustum * aspect, frustum * aspect, frustum, -frustum, 0.1, 120
    );
    camera.position.set(11, 8.7, 11);
    camera.lookAt(0, 2.1, 0);

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
    renderer.toneMappingExposure = 1.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const { room, person, code, board } = buildRoom();
    scene.add(room);

    // ── Cinematic lighting ──
    scene.add(new THREE.AmbientLight(0xd8c9b4, 0.7));
    scene.add(new THREE.HemisphereLight(0x9fb4c4, 0x6a4f38, 0.85));

    const key = new THREE.DirectionalLight(0xffe8c4, 2.9);
    key.position.set(-9, 9, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.normalBias = 0.02;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xbfd4e8, 0.95);
    fill.position.set(9, 6, 9);
    scene.add(fill);

    // Pengganti cahaya jendela: lampu plafon hangat
    const ceiling = new THREE.PointLight(0xffd9a8, 20, 14, 2);
    ceiling.position.set(0.2, 3.9, 0.6);
    scene.add(ceiling);

    // Lampu meja (kiri meja, dekat lampu emas)
    const deskLight = new THREE.PointLight(C.lamp, 22, 8, 2);
    deskLight.position.set(-1.92, 2.32, -2.15);
    scene.add(deskLight);

    // Monitor 1 (utama) light
    const screenLight = new THREE.PointLight(C.screen, 13, 6.5, 2);
    screenLight.position.set(0, 2.4, -1.95);
    scene.add(screenLight);

    // ── Smooth parallax following cursor ──
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 0.22;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 0.1;
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
      board.update(dt);

      // Parallax lerp
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      room.rotation.y = cx;
      camera.position.y = 8.7 + cy * 3.4;
      camera.lookAt(0, 2.1, 0);

      // Micro-animations (keyboard typing, breathing)
      if (!reduced) {
        person.arms.forEach((a, i) => {
          const baseY = (a.userData.baseY as number) ?? a.position.y;
          a.position.y = baseY + Math.sin(t * 8 + i * 1.6) * 0.004;
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
      board.tex.dispose();
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

      {/* Interaction hint (selalu dipertahankan) */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0B0C10]/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-sans text-ink-300 pointer-events-none">
        <Compass size={12} className="text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Move mouse to explore 3D depth</span>
      </div>

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
