import { useEffect, useState } from 'react';

/**
 * CinematicCloudParallax
 * Asymmetric, creative, 100% organic cloud parallax:
 * - Distinct, completely different cloud shapes on Left vs Right (no mirrored clones).
 *   - Left: Multi-tiered billowy cumulus mountain cluster + delicate upper wisp + lower trail.
 *   - Right: Elongated sweeping wind cloud with curled tail + puffy 3-bump cloudlet + lower wisp.
 * - Perfectly positioned on outer margins: zero cut edges, zero flat borders.
 * - Opacity strictly tuned to ~30% (0.26 - 0.30) for a whisper-quiet, elegant, non-intrusive aesthetic.
 * - Multi-depth stacked parallax: foreground layers slide faster (1.30x) over background layers (0.45x - 0.55x).
 * - 100% static when resting (no idle animation, no floating loop).
 * - Smooth cinematic parting to left & right on scroll.
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

  // ── Depth Layer Calibrations (Parting left and right on scroll) ──
  // Foreground (Front): exits faster (1.30x speed), fades out at 340px
  const fgProgress = Math.min(scrollY / 340, 1);
  const fgLeftX = -scrollY * 1.3;
  const fgRightX = scrollY * 1.3;
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
          LEFT FLANK: Unique Billowing Cumulus Mountain & Wisps (60% Opacity)
          ========================================================================= */}

      {/* [Left Flank - Upper Cloud: Substantial Tiered Billowy Cloud (Diperbesar)] */}
      <div
        className="absolute top-[14%] -left-[6%] sm:-left-[2%] lg:left-[1%] w-[230px] sm:w-[330px] lg:w-[440px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgLeftX * 1.1}px, ${-scrollY * 0.08}px, 0)`,
          opacity: bgOpacity * 0.58,
        }}
      >
        <img
          src="/images/clouds/cloud_layer_mid_flip.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_6px_16px_rgba(24,24,27,0.025)]"
          loading="eager"
        />
      </div>

      {/* [Left Flank - Main Body: Magnificent Multi-Tiered Billowy Cumulus Cluster] */}
      <div
        className="absolute top-[46%] -left-[14%] sm:-left-[8%] lg:-left-[2%] w-[290px] sm:w-[390px] lg:w-[500px] z-20 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${fgLeftX}px, ${-scrollY * 0.22}px, 0) scale(${1 - fgProgress * 0.08})`,
          opacity: fgOpacity * 0.6, // Exactly 60% opacity
        }}
      >
        <img
          src="/images/clouds/cloud_layer_front.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(24,24,27,0.04)]"
          loading="eager"
        />
      </div>

      {/* [Left Flank - Lower Trail: Soft Horizontal Atmospheric Wisp] */}
      <div
        className="hidden md:block absolute top-[70%] left-[3%] lg:left-[6%] w-[180px] lg:w-[240px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgLeftX * 0.7}px, ${-scrollY * 0.06}px, 0)`,
          opacity: bgOpacity * 0.5, // 50% opacity
        }}
      >
        <img
          src="/images/clouds/cloud_left_soft_trail.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_6px_14px_rgba(24,24,27,0.02)]"
          loading="eager"
        />
      </div>

      {/* =========================================================================
          RIGHT FLANK: Unique Sweeping Horizontal Wind Cloud & Puffy Cloudlet (60% Opacity)
          ========================================================================= */}

      {/* [Right Flank - Upper Cloud: Cute 3-Bump Puffy Cloudlet (agak ke atas)] */}
      <div
        className="absolute top-[16%] -right-[4%] sm:-right-[1%] lg:right-[3%] w-[160px] sm:w-[210px] lg:w-[270px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgRightX * 1.1}px, ${-scrollY * 0.08}px, 0)`,
          opacity: bgOpacity * 0.56, // ~56% opacity
        }}
      >
        <img
          src="/images/clouds/cloud_natural_puffy.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_4px_12px_rgba(24,24,27,0.02)]"
          loading="eager"
        />
      </div>

      {/* [Right Flank - Main Body: Signature Sweeping Horizontal Cloud with Curled Wisps] */}
      <div
        className="absolute top-[48%] -right-[12%] sm:-right-[5%] lg:-right-[1%] w-[290px] sm:w-[390px] lg:w-[500px] z-20 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${fgRightX}px, ${-scrollY * 0.22}px, 0) scale(${1 - fgProgress * 0.08})`,
          opacity: fgOpacity * 0.6, // Exactly 60% opacity
        }}
      >
        <img
          src="/images/clouds/cloud_natural_sweep.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(24,24,27,0.04)]"
          loading="eager"
        />
      </div>

      {/* [Right Flank - Lower Wisp: Slender Atmospheric Wisp] */}
      <div
        className="hidden md:block absolute top-[71%] right-[5%] lg:right-[9%] w-[160px] lg:w-[220px] z-10 transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgRightX * 0.6}px, ${-scrollY * 0.08}px, 0)`,
          opacity: bgOpacity * 0.5, // 50% opacity
        }}
      >
        <img
          src="/images/clouds/cloud_natural_lower_left.png"
          alt=""
          className="w-full h-auto drop-shadow-[0_6px_14px_rgba(24,24,27,0.02)]"
          loading="eager"
        />
      </div>
    </div>
  );
}
