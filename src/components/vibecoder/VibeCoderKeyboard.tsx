import React, { useCallback, useEffect, useRef, useState } from 'react';
import { playKeyThock } from '../../utils/keyboardAudio';
import {
  ROW_1_KEYS, ROW_2_KEYS, ENTER_KEY, KEY_BY_ID, SEQUENCE_IDS, LETTER_TO_ID,
  type KeyItem,
} from './keyboard/keyData';
import type { KeyboardSceneHandle } from './keyboard/createKeyboardScene';
import './VibeCoderKeyboard.css';

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState<boolean>(() => !!window.matchMedia?.(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function canUse3D() {
  try {
    if (new URLSearchParams(window.location.search).get('kb') === 'css') return false;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return false;
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2'); // three r163+ wajib WebGL2
  } catch {
    return false;
  }
}

export default function VibeCoderKeyboard() {
  const reducedMotion = usePrefersReducedMotion();
  const soundOn = true;
  const motionOn = true;
  const shortcutsOn = true;
  const [is3D, setIs3D] = useState(false);
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<KeyboardSceneHandle | null>(null);
  const inViewRef = useRef(true);
  const pausedUntilRef = useRef(0);
  const nextARef = useRef<'A1' | 'A2'>('A1');
  const pressTimerRef = useRef<number>();
  const soundRef = useRef(soundOn);
  const reducedRef = useRef(reducedMotion);

  useEffect(() => { soundRef.current = soundOn; }, [soundOn]);
  useEffect(() => {
    reducedRef.current = reducedMotion;
    sceneRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  const flash = useCallback((id: string) => {
    sceneRef.current?.press(id);
    setPressedKeyId(id);
    window.clearTimeout(pressTimerRef.current);
    pressTimerRef.current = window.setTimeout(() => setPressedKeyId(null), 160);
  }, []);

  const playSound = useCallback((id: string) => {
    pausedUntilRef.current = performance.now() + 6000;
    if (soundRef.current) playKeyThock(KEY_BY_ID[id]?.pitch ?? 1);
  }, []);

  const navigate = useCallback((id: string) => {
    const key = KEY_BY_ID[id];
    if (!key) return;
    pausedUntilRef.current = performance.now() + 6000;
    const go = () => {
      const target = document.querySelector<HTMLElement>(key.targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedRef.current ? 'auto' : 'smooth', block: 'start' });
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    // beri waktu animasi tekan terlihat
    if (reducedRef.current) go();
    else window.setTimeout(go, 120);
  }, []);

  const trigger = useCallback((id: string) => {
    flash(id);
    playSound(id);
    navigate(id);
  }, [flash, playSound, navigate]);

  /* ── Muat scene 3D (lazy) ── */
  useEffect(() => {
    if (!canUse3D()) return;
    let cancelled = false;
    let handle: KeyboardSceneHandle | null = null;

    (async () => {
      try {
        const { createKeyboardScene } = await import('./keyboard/createKeyboardScene');
        if (cancelled || !canvasRef.current || !stageRef.current) return;
        handle = await createKeyboardScene({
          canvas: canvasRef.current,
          container: stageRef.current,
          rows: [ROW_1_KEYS, ROW_2_KEYS],
          enterKey: ENTER_KEY,
          reducedMotion: reducedRef.current,
          onPressStart: playSound,
          onActivate: navigate,
          onContextLost: () => {
            sceneRef.current?.dispose();
            sceneRef.current = null;
            setIs3D(false);
          },
        });
        if (cancelled) { handle.dispose(); return; }
        sceneRef.current = handle;
        setIs3D(true);
      } catch (err) {
        console.warn('[VibeCoderKeyboard] 3D tidak tersedia, memakai versi CSS.', err);
      }
    })();

    return () => {
      cancelled = true;
      handle?.dispose();
      sceneRef.current = null;
      setIs3D(false);
    };
  }, [playSound, navigate]);

  /* ── Lacak apakah keyboard terlihat ── */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => { inViewRef.current = !!entry?.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Auto-typing (bisa dihentikan, tanpa suara) ── */
  useEffect(() => {
    if (!motionOn || reducedMotion) return;
    let stepIdx = 0;
    let timer = 0;
    const tick = () => {
      const canRun = performance.now() > pausedUntilRef.current && !document.hidden && inViewRef.current;
      if (!canRun) { timer = window.setTimeout(tick, 500); return; }
      flash(SEQUENCE_IDS[stepIdx]);
      stepIdx = (stepIdx + 1) % SEQUENCE_IDS.length;
      timer = window.setTimeout(tick, stepIdx === 0 ? 2600 : 230);
    };
    timer = window.setTimeout(tick, 1200);
    return () => window.clearTimeout(timer);
  }, [motionOn, reducedMotion, flash]);

  /* ── Shortcut keyboard fisik (bisa dimatikan) ── */
  useEffect(() => {
    if (!shortcutsOn) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (!inViewRef.current) return;

      const k = e.key.toLowerCase();
      let id: string | null = null;
      if (k === 'enter') {
        if (document.activeElement && document.activeElement !== document.body) return;
        id = 'ENTER';
      } else if (k === 'a') {
        id = nextARef.current;
        nextARef.current = id === 'A1' ? 'A2' : 'A1';
      } else {
        id = LETTER_TO_ID[k] ?? null;
      }
      if (!id) return;
      e.preventDefault();
      trigger(id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcutsOn, trigger]);

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // biarkan ctrl/cmd/middle-click berperilaku normal
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    trigger(id);
  };

  const linkProps = (key: KeyItem) => ({
    href: key.targetId,
    className: `vibe-btn ${key.isEnter ? 'vibe-btn--enter' : ''} ${pressedKeyId === key.id ? 'is-pressed' : ''}`,
    style: { '--key-top': key.topColor, '--key-front': key.frontColor } as React.CSSProperties,
    'aria-keyshortcuts': shortcutsOn ? (key.isEnter ? 'Enter' : key.char) : undefined,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => onLinkClick(e, key.id),
    onFocus: () => sceneRef.current?.setFocused(key.id),
    onBlur: () => sceneRef.current?.setFocused(null),
  });

  const renderKey = (key: KeyItem) => (
    <div className="vibe-key-unit" key={key.id}>
      <a {...linkProps(key)}>
        <span className="vibe-cap">
          <span className="vibe-face">
            <span className="vibe-glare" aria-hidden="true" />
            <span className="vibe-letter" aria-hidden="true">{key.char}</span>
            <span className="vibe-sublabel">{key.label}</span>
            {key.hasBump && <span className="vibe-bump" aria-hidden="true" />}
          </span>
        </span>
      </a>
    </div>
  );

  return (
    <div className="vibe-stage-wrapper">
      <div ref={stageRef} className={`vibe-kb-stage ${is3D ? 'is-3d' : ''}`}>
        <nav aria-label="Portfolio sections">
          <div className="vibe-keyboard-layout">
            <div className="vibe-keys-area">
              <div className="vibe-row vibe-row-1">{ROW_1_KEYS.map(renderKey)}</div>
              <div className="vibe-row vibe-row-2">{ROW_2_KEYS.map(renderKey)}</div>
            </div>

            <div className="vibe-enter-unit">
              <a {...linkProps(ENTER_KEY)}>
                <span className="vibe-cap">
                  <span className="vibe-face">
                    <span className="vibe-glare" aria-hidden="true" />
                    <svg
                      viewBox="0 0 24 24"
                      className="vibe-enter-arrow"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M20 7v5a3 3 0 0 1-3 3H5" />
                      <path d="M9 11l-4 4 4 4" />
                    </svg>
                    <span className="vibe-enter-sublabel">{ENTER_KEY.label}</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </nav>

        <canvas ref={canvasRef} className="vibe-kb-canvas" aria-hidden="true" />
      </div>
    </div>
  );
}