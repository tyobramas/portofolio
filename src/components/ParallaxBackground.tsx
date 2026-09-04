import React from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base background: slightly brighter modern slate */}
      <div className="absolute inset-0" style={{ backgroundColor: '#0f182d' }} />

      {/* Fine grid */}
      <div className="absolute inset-0 fine-grid opacity-75" />

      {/* 3D Glass Refraction Glow 1: Vibrant Cyan — Top Left */}
      <motion.div
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full pointer-events-none filter blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.16) 0%, rgba(14,165,233,0.05) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.05, 1], x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3D Glass Refraction Glow 2: Indigo / Violet — Top Right */}
      <motion.div
        className="absolute top-10 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.13) 0%, rgba(99,102,241,0.04) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1], x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* 3D Glass Refraction Glow 3: Sky Blue — Center */}
      <motion.div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[750px] h-[750px] rounded-full pointer-events-none filter blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* 3D Glass Refraction Glow 4: Emerald / Teal — Bottom Right */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full pointer-events-none filter blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.10) 0%, rgba(20,184,166,0.04) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.05, 1], x: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
};

export default ParallaxBackground;

