import { useEffect, useRef } from 'react';

export default function AtmosphericEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Cursor-following light
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp
      if (currentX === -9999) {
        currentX = mouseX;
        currentY = mouseY;
      } else {
        currentX += (mouseX - currentX) * 0.06;
        currentY += (mouseY - currentY) * 0.06;
      }

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Grain Texture Overlay */}
      <div
        className="grain-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Ambient Orbs */}
      <div
        style={{
          position: 'fixed',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          background: 'radial-gradient(circle, rgba(164, 135, 92, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'orbDrift1 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '-8%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          filter: 'blur(100px)',
          background: 'radial-gradient(circle, rgba(239, 233, 222, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'orbDrift2 25s ease-in-out infinite',
        }}
      />

      {/* Cursor Light */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(164, 135, 92, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
          left: '-9999px',
          top: '-9999px',
        }}
      />

      {/* Keyframe animations */}
      <style>{`
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, 20px) scale(1.1); }
          66% { transform: translate(-20px, 40px) scale(0.95); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, -20px) scale(1.05); }
          66% { transform: translate(20px, -30px) scale(0.9); }
        }
      `}</style>
    </>
  );
}
