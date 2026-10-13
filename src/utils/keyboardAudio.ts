/**
 * Synthetic mechanical keyboard audio generator using Web Audio API.
 * Zero external asset dependencies, zero bandwidth overhead.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a realistic mechanical key switch "thock" sound.
 * @param pitchMultiplier slight pitch variation for tactile realism
 */
export function playKeyThock(pitchMultiplier = 1): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Transient Click (High-frequency contact snap)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(450 * pitchMultiplier, now);
    snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.025);

    snapGain.gain.setValueAtTime(0.08, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.025);

    // 2. Body Thock (Deep acoustic cavity resonance)
    const thockOsc = ctx.createOscillator();
    const thockGain = ctx.createGain();
    thockOsc.type = 'sine';
    thockOsc.frequency.setValueAtTime(130 * pitchMultiplier, now);
    thockOsc.frequency.exponentialRampToValueAtTime(45, now + 0.045);

    thockGain.gain.setValueAtTime(0.12, now);
    thockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    thockOsc.connect(thockGain);
    thockGain.connect(ctx.destination);
    thockOsc.start(now);
    thockOsc.stop(now + 0.045);
  } catch {
    // Graceful fallback if user hasn't interacted or audio not supported
  }
}
