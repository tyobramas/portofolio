import { useEffect, useState } from 'react';

/**
 * CinematicCloudParallax
 * Premium Editorial Cloud Composition:
 * - Asymmetrical, organic diagonal flow (S-curve rhythm):
 *   - Upper-Left (6%): Grand billowy cumulus framing the dawn sky.
 *   - Upper-Right (8%): Distant, delicate celestial cloudlet giving atmospheric perspective.
 *   - Mid-Right (30%): Graceful sweeping wind cloud with tapered inward tail, counterbalancing the left.
 *   - Mid-Left (44%): Soft atmospheric cumulus bank tucked into the left flank behind the keyboard.
 *   - Lower-Right (70%): Slender horizon wisp quietly grounding the lower-right space.
 *   - Lower-Left (78%): Whisper-soft mist trail anchoring the bottom-left edge.
 * - Non-overlapping: Carefully calibrated in outer gutters so central headline, bio, and keyboard breathe freely.
 * - Staggered vertical rhythm (6% → 8% → 30% → 44% → 70% → 78%): Zero artificial parallel rows.
 * - Tonal depth hierarchy: Foreground clouds (52-56% opacity) over atmospheric background wisps (36-44% opacity).
 * - Smooth cinematic scroll parting: Left clouds part left, right clouds part right, fading seamlessly on scroll.
 */
export default function CinematicCloudParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (scrollY > 480 || reducedMotion) {
    return null;
  }

  // ── Depth Layer Calibrations (Smooth cinematic parting on scroll) ──
  // Foreground (Front): exits faster (1.20x speed), fades out at 340px
  const fgProgress = Math.min(scrollY / 340, 1);
  const fgLeftX = -scrollY * 1.2;
  const fgRightX = scrollY * 1.2;
  const fgOpacity = Math.max(0, 1 - fgProgress);

  // Background / Mid (Back): exits slower (0.45x - 0.55x speed), fades out at 440px
  const bgProgress = Math.min(scrollY / 440, 1);
  const bgLeftX = -scrollY * 0.45;
  const bgRightX = scrollY * 0.45;
  const bgOpacity = Math.max(0, 1 - bgProgress);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* =========================================================================
          1. UPPER-LEFT SKY: Grand Billowy Cumulus (Top-Left Sovereign Anchor, 6%)
          ========================================================================= */}
      <div
        className="absolute top-[4%] sm:top-[5%] lg:top-[6%] -left-[10%] sm:-left-[5%] md:-left-[2%] lg:left-[0%] xl:left-[1.5%] w-[210px] sm:w-[310px] md:w-[370px] lg:w-[430px] xl:w-[470px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgLeftX * 0.9}px, ${-scrollY * 0.08}px, 0)`,
          opacity: bgOpacity * 0.56,
        }}
      >
        <img
          src="/images/clouds/cloud_layer_mid_flip.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_10px_24px_rgba(24,24,27,0.035)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          2. UPPER-RIGHT SKY: Delicate Celestial Cloudlet (Atmospheric Perspective, 8%)
          ========================================================================= */}
      <div
        className="absolute top-[6%] sm:top-[7%] lg:top-[8%] right-[4%] sm:right-[6%] lg:right-[8%] xl:right-[11%] w-[110px] sm:w-[150px] md:w-[190px] lg:w-[220px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgRightX * 0.65}px, ${-scrollY * 0.07}px, 0)`,
          opacity: bgOpacity * 0.44,
        }}
      >
        <img
          src="/images/clouds/cloud_natural_puffy.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_6px_16px_rgba(24,24,27,0.025)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          3. MID-RIGHT SKY: Signature Sweeping Wind Cloud (Dynamic Counterweight, 30%)
          ========================================================================= */}
      <div
        className="absolute top-[26%] sm:top-[28%] lg:top-[30%] -right-[12%] sm:-right-[6%] md:-right-[3%] lg:-right-[1%] xl:right-[0.5%] w-[240px] sm:w-[340px] md:w-[410px] lg:w-[470px] xl:w-[510px] z-20 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${fgRightX * 1.15}px, ${-scrollY * 0.20}px, 0) scale(${1 - fgProgress * 0.06})`,
          opacity: fgOpacity * 0.56,
        }}
      >
        <img
          src="/images/clouds/cloud_natural_sweep.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_12px_28px_rgba(24,24,27,0.038)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          4. MID-LEFT SKY: Atmospheric Cumulus Bank (Deep Flank Volume, 44%)
          ========================================================================= */}
      <div
        className="absolute top-[40%] sm:top-[42%] lg:top-[44%] -left-[14%] sm:-left-[9%] md:-left-[5%] lg:-left-[2%] xl:left-[0%] w-[230px] sm:w-[310px] md:w-[370px] lg:w-[430px] xl:w-[450px] z-20 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${fgLeftX * 1.1}px, ${-scrollY * 0.18}px, 0) scale(${1 - fgProgress * 0.06})`,
          opacity: fgOpacity * 0.50,
        }}
      >
        <img
          src="/images/clouds/cloud_layer_front.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_12px_26px_rgba(24,24,27,0.035)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          5. LOWER-RIGHT HORIZON: Slender Atmospheric Wisp (Grounding Drift, 70%)
          ========================================================================= */}
      <div
        className="hidden sm:block absolute top-[66%] sm:top-[68%] lg:top-[70%] right-[3%] sm:right-[5%] lg:right-[7%] xl:right-[9%] w-[150px] md:w-[200px] lg:w-[240px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgRightX * 0.5}px, ${-scrollY * 0.06}px, 0)`,
          opacity: bgOpacity * 0.40,
        }}
      >
        <img
          src="/images/clouds/cloud_natural_lower_left.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_6px_14px_rgba(24,24,27,0.02)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          6. LOWER-LEFT HORIZON: Whisper-Soft Mist Trail (Subtle Base Anchor, 78%)
          ========================================================================= */}
      <div
        className="hidden md:block absolute top-[72%] sm:top-[75%] lg:top-[78%] left-[2%] sm:left-[4%] lg:left-[6%] xl:left-[8%] w-[140px] lg:w-[190px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgLeftX * 0.4}px, ${-scrollY * 0.05}px, 0)`,
          opacity: bgOpacity * 0.36,
        }}
      >
        <img
          src="/images/clouds/cloud_left_soft_trail.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_4px_12px_rgba(24,24,27,0.018)]"
          loading="eager"
        />
      </div>
    </div>
  );
}
