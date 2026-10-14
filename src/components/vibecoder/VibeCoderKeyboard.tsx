import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Keyboard } from 'lucide-react';
import { playKeyThock } from '../../utils/keyboardAudio';
import './VibeCoderKeyboard.css';

interface KeyItem {
  id: string;
  char: string;
  sublabel: string;
  targetId: string;
  topColor: string;
  frontColor: string;
  pitch: number;
  hasBump?: boolean;
}

// ── Authentic Debbie Pastel-Pop Candy Keycap Palette ──
const ROW_1_KEYS: KeyItem[] = [
  {
    id: 'B',
    char: 'B',
    sublabel: 'PROJECTS',
    targetId: '#projects',
    topColor: '#FF85C0',   // Candy Pink (Debbie P)
    frontColor: '#E11D48', // Deep Rose Front
    pitch: 0.95,
  },
  {
    id: 'R',
    char: 'R',
    sublabel: 'ABOUT ME',
    targetId: '#about',
    topColor: '#C4B5FD',   // Soft Lavender (Debbie O)
    frontColor: '#7C3AED', // Deep Violet Front
    pitch: 1.0,
  },
  {
    id: 'A1',
    char: 'A',
    sublabel: 'SKILLS',
    targetId: '#expertise',
    topColor: '#6EE7B7',   // Fresh Mint Green (Debbie R)
    frontColor: '#059669', // Deep Emerald Front
    pitch: 1.05,
    hasBump: true,
  },
  {
    id: 'M',
    char: 'M',
    sublabel: 'SERVICES',
    targetId: '#services',
    topColor: '#FDBA74',   // Sunny Apricot Peach (Debbie T)
    frontColor: '#EA580C', // Rich Terracotta Front
    pitch: 1.1,
  },
];

const ROW_2_KEYS: KeyItem[] = [
  {
    id: 'A2',
    char: 'A',
    sublabel: 'EXPLORE',
    targetId: '#projects',
    topColor: '#67E8F9',   // Electric Sky Cyan (Debbie F)
    frontColor: '#0284C7', // Rich Azure Front
    pitch: 1.02,
  },
  {
    id: 'S',
    char: 'S',
    sublabel: 'FOCUS',
    targetId: '#about',
    topColor: '#F472B6',   // Orchid Blossom Pink (Debbie O)
    frontColor: '#C026D3', // Rich Magenta Front
    pitch: 1.08,
  },
  {
    id: 'T',
    char: 'T',
    sublabel: 'EXPERTISE',
    targetId: '#expertise',
    topColor: '#FB7185',   // Coral Candy Red (Debbie L)
    frontColor: '#DC2626', // Deep Crimson Front
    pitch: 1.12,
    hasBump: true,
  },
  {
    id: 'Y',
    char: 'Y',
    sublabel: 'CERTIFICATES',
    targetId: '#certificates',
    topColor: '#93C5FD',   // Cornflower Pastel Blue (Debbie I)
    frontColor: '#2563EB', // Royal Blue Front
    pitch: 1.15,
  },
  {
    id: 'O',
    char: 'O',
    sublabel: 'SAY HELLO',
    targetId: '#contact',
    topColor: '#BEF264',   // Radiant Lime Green (Debbie O)
    frontColor: '#65A30D', // Olive Lime Front
    pitch: 1.2,
  },
];

const ENTER_KEY: KeyItem = {
  id: 'ENTER',
  char: '↵',
  sublabel: "LET'S TALK",
  targetId: '#contact',
  topColor: '#FDE047',   // Sunflower Canary Yellow (Debbie Enter)
  frontColor: '#CA8A04', // Rich Golden Amber Front
  pitch: 0.85,
};

const ALL_KEYS = [...ROW_1_KEYS, ...ROW_2_KEYS, ENTER_KEY];
const SEQUENCE_IDS = ['B', 'R', 'A1', 'M', 'A2', 'S', 'T', 'Y', 'O', 'ENTER'];

export default function VibeCoderKeyboard() {
  const [pressedKeyId, setPressedKeyId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const userPausedRef = useRef(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopStepRef = useRef(0);
  const lastAWasFirst = useRef(false);

  const pauseLoopTemporarily = useCallback(() => {
    userPausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      userPausedRef.current = false;
    }, 6000);
  }, []);

  const triggerKeyAction = useCallback((key: KeyItem, isManual = false) => {
    setPressedKeyId(key.id);
    setTimeout(() => {
      setPressedKeyId((curr) => (curr === key.id ? null : curr));
    }, 160);

    if (soundEnabled) {
      playKeyThock(key.pitch);
    }

    if (isManual) {
      pauseLoopTemporarily();
      const target = document.querySelector(key.targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [soundEnabled, pauseLoopTemporarily]);

  // ── Auto-Typing Animation Sequence ──
  useEffect(() => {
    let mounted = true;
    let timerId: NodeJS.Timeout | null = null;

    const tick = () => {
      if (!mounted) return;

      if (userPausedRef.current || document.hidden) {
        timerId = setTimeout(tick, 300);
        return;
      }

      const idx = loopStepRef.current;
      if (idx < SEQUENCE_IDS.length) {
        const keyId = SEQUENCE_IDS[idx];
        const keyDef = ALL_KEYS.find((k) => k.id === keyId);
        if (keyDef) {
          triggerKeyAction(keyDef, false);
        }
        loopStepRef.current = idx + 1;
        timerId = setTimeout(tick, 360);
      } else {
        loopStepRef.current = 0;
        timerId = setTimeout(tick, 2200);
      }
    };

    timerId = setTimeout(tick, 800);

    return () => {
      mounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [triggerKeyAction]);

  // ── Physical Keyboard Typing Listener ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const k = e.key.toLowerCase();
      let matched: KeyItem | undefined;

      if (k === 'b') matched = ALL_KEYS.find((x) => x.id === 'B');
      else if (k === 'r') matched = ALL_KEYS.find((x) => x.id === 'R');
      else if (k === 'a') {
        matched = lastAWasFirst.current
          ? ALL_KEYS.find((x) => x.id === 'A2')
          : ALL_KEYS.find((x) => x.id === 'A1');
        lastAWasFirst.current = !lastAWasFirst.current;
      } else if (k === 'm') matched = ALL_KEYS.find((x) => x.id === 'M');
      else if (k === 's') matched = ALL_KEYS.find((x) => x.id === 'S');
      else if (k === 't') matched = ALL_KEYS.find((x) => x.id === 'T');
      else if (k === 'y') matched = ALL_KEYS.find((x) => x.id === 'Y');
      else if (k === 'o') matched = ALL_KEYS.find((x) => x.id === 'O');
      else if (k === 'enter' || k === ' ') matched = ENTER_KEY;

      if (matched) {
        triggerKeyAction(matched, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKeyAction]);

  return (
    <div className="vibe-stage-wrapper">
      {/* Top Interactive Controls & Keyboard Hint */}
      <div className="vibe-control-bar">
        <span className="vibe-hint-pill">
          <Keyboard size={13} className="text-zinc-600" />
          <span className="hidden sm:inline">Interactive Keys: Click or type on your keyboard</span>
          <span className="sm:hidden">Tap any key to navigate</span>
        </span>

        <button
          type="button"
          onClick={() => setSoundEnabled((prev) => !prev)}
          className="vibe-sound-toggle"
          title={soundEnabled ? 'Mute Keyboard Audio' : 'Enable Keyboard Audio'}
        >
          {soundEnabled ? (
            <>
              <Volume2 size={13} className="text-emerald-700" />
              <span>Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX size={13} className="text-zinc-500" />
              <span>Sound: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* ── Debbie-Style Real Mechanical Keyboard Layout ── */}
      <div
        className="vibe-keyboard-layout"
        onMouseEnter={pauseLoopTemporarily}
        onTouchStart={pauseLoopTemporarily}
      >
        {/* Keys Main Block (Row 1 & Row 2) */}
        <div className="vibe-keys-area">
          {/* Row 1: B - R - A - M */}
          <div className="vibe-row vibe-row-1">
            {ROW_1_KEYS.map((key) => {
              const isPressed = pressedKeyId === key.id;
              return (
                <div key={key.id} className="vibe-key-unit">
                  <button
                    type="button"
                    onClick={() => triggerKeyAction(key, true)}
                    className={`vibe-btn ${isPressed ? 'is-pressed' : ''}`}
                    style={
                      {
                        '--key-top': key.topColor,
                        '--key-front': key.frontColor,
                      } as React.CSSProperties
                    }
                    title={`${key.char} — ${key.sublabel} (Click to scroll)`}
                  >
                    <div className="vibe-cap">
                      <div className="vibe-face">
                        <span className="vibe-glare" />
                        <span className="vibe-letter">{key.char}</span>
                        <span className="vibe-sublabel">{key.sublabel}</span>
                        {key.hasBump && <span className="vibe-bump" />}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Row 2: A - S - T - Y - O */}
          <div className="vibe-row vibe-row-2">
            {ROW_2_KEYS.map((key) => {
              const isPressed = pressedKeyId === key.id;
              return (
                <div key={key.id} className="vibe-key-unit">
                  <button
                    type="button"
                    onClick={() => triggerKeyAction(key, true)}
                    className={`vibe-btn ${isPressed ? 'is-pressed' : ''}`}
                    style={
                      {
                        '--key-top': key.topColor,
                        '--key-front': key.frontColor,
                      } as React.CSSProperties
                    }
                    title={`${key.char} — ${key.sublabel} (Click to scroll)`}
                  >
                    <div className="vibe-cap">
                      <div className="vibe-face">
                        <span className="vibe-glare" />
                        <span className="vibe-letter">{key.char}</span>
                        <span className="vibe-sublabel">{key.sublabel}</span>
                        {key.hasBump && <span className="vibe-bump" />}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tall Enter Key on the Right ── */}
        <div className="vibe-enter-unit">
          <button
            type="button"
            onClick={() => triggerKeyAction(ENTER_KEY, true)}
            className={`vibe-btn vibe-btn--enter ${pressedKeyId === ENTER_KEY.id ? 'is-pressed' : ''}`}
            style={
              {
                '--key-top': ENTER_KEY.topColor,
                '--key-front': ENTER_KEY.frontColor,
              } as React.CSSProperties
            }
            title="↵ LET'S TALK (Click to navigate to contact)"
          >
            <div className="vibe-cap">
              <div className="vibe-face">
                <span className="vibe-glare" />
                <svg
                  viewBox="0 0 24 24"
                  className="vibe-enter-arrow"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 7v5a3 3 0 0 1-3 3H5" />
                  <path d="M9 11l-4 4 4 4" />
                </svg>
                <span className="vibe-enter-sublabel">LET'S TALK</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}