export interface KeyItem {
  id: string;
  char: string;
  /** Teks link yang dibaca screen reader & Google */
  label: string;
  targetId: string;
  topColor: string;
  frontColor: string;
  pitch: number;
  hasBump?: boolean;
  isEnter?: boolean;
}

export const ROW_1_KEYS: KeyItem[] = [
  { id: 'B', char: 'B', label: 'Projects', targetId: '#projects', topColor: '#FF85C0', frontColor: '#E11D48', pitch: 0.95 },
  { id: 'R', char: 'R', label: 'About me', targetId: '#about', topColor: '#C4B5FD', frontColor: '#7C3AED', pitch: 1.0 },
  { id: 'A1', char: 'A', label: 'Skills', targetId: '#expertise', topColor: '#6EE7B7', frontColor: '#059669', pitch: 1.05, hasBump: true },
  { id: 'M', char: 'M', label: 'Services', targetId: '#services', topColor: '#FDBA74', frontColor: '#EA580C', pitch: 1.1 },
];

export const ROW_2_KEYS: KeyItem[] = [
  { id: 'A2', char: 'A', label: 'Explore', targetId: '#projects', topColor: '#67E8F9', frontColor: '#0284C7', pitch: 1.02 },
  { id: 'S', char: 'S', label: 'Focus', targetId: '#about', topColor: '#F472B6', frontColor: '#C026D3', pitch: 1.08 },
  { id: 'T', char: 'T', label: 'Expertise', targetId: '#expertise', topColor: '#FB7185', frontColor: '#DC2626', pitch: 1.12, hasBump: true },
  { id: 'Y', char: 'Y', label: 'Certificates', targetId: '#certificates', topColor: '#93C5FD', frontColor: '#2563EB', pitch: 1.15 },
  { id: 'O', char: 'O', label: 'Say hello', targetId: '#contact', topColor: '#BEF264', frontColor: '#65A30D', pitch: 1.2 },
];

export const ENTER_KEY: KeyItem = {
  id: 'ENTER', char: '↵', label: "Let's talk", targetId: '#contact',
  topColor: '#FDE047', frontColor: '#CA8A04', pitch: 0.85, isEnter: true,
};

export const ALL_KEYS: KeyItem[] = [...ROW_1_KEYS, ...ROW_2_KEYS, ENTER_KEY];

export const KEY_BY_ID: Record<string, KeyItem> = Object.fromEntries(
  ALL_KEYS.map((k) => [k.id, k]),
);

export const SEQUENCE_IDS = ['B', 'R', 'A1', 'M', 'A2', 'S', 'T', 'Y', 'O', 'ENTER'];

/** Huruf A ditangani terpisah (bergantian A1 / A2) */
export const LETTER_TO_ID: Record<string, string> = {
  b: 'B', r: 'R', m: 'M', s: 'S', t: 'T', y: 'Y', o: 'O',
};
