import React from 'react';

// ─── CRT Overlay ─────────────────────────────────────────────
export const CRTOverlay: React.FC = () => (
  <>
    <div className="crt-overlay" aria-hidden="true" />
    <div className="crt-vignette" aria-hidden="true" />
    <div className="scan-stripe" aria-hidden="true" />
  </>
);

export default CRTOverlay;
