import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroConfig } from '../config';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const accentRef = useRef<HTMLParagraphElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        accentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        descriptorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video Background */}
      {heroConfig.videoPath && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={heroConfig.videoPath} type="video/mp4" />
        </video>
      )}

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 24px',
        }}
      >
        {/* Name */}
        <h1
          ref={nameRef}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 300,
            color: '#F7F4EE',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            opacity: 0,
          }}
        >
          {heroConfig.name}
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F7F4EE',
            lineHeight: 1.3,
            marginBottom: '4px',
            opacity: 0,
          }}
        >
          {heroConfig.tagline}
        </p>

        {/* Tagline Accent */}
        <p
          ref={accentRef}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#A4875C',
            lineHeight: 1.3,
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          {heroConfig.taglineAccent}
        </p>

        {/* Descriptor */}
        <p
          ref={descriptorRef}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(247, 244, 238, 0.7)',
            lineHeight: 1.7,
            maxWidth: '480px',
            margin: '0 auto 40px',
            letterSpacing: '0.02em',
            opacity: 0,
          }}
        >
          {heroConfig.descriptor}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <a
            href={heroConfig.ctaPrimaryTarget}
            onClick={(e) => handleCtaClick(e, heroConfig.ctaPrimaryTarget)}
            className="pill-btn pill-btn-primary"
          >
            {heroConfig.ctaPrimary}
          </a>
          <a
            href={heroConfig.ctaSecondaryTarget}
            onClick={(e) => handleCtaClick(e, heroConfig.ctaSecondaryTarget)}
            className="pill-btn pill-btn-outline"
            style={{
              borderColor: 'rgba(247, 244, 238, 0.4)',
              color: '#F7F4EE',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'rgba(247, 244, 238, 0.1)';
              el.style.borderColor = 'rgba(247, 244, 238, 0.6)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'transparent';
              el.style.borderColor = 'rgba(247, 244, 238, 0.4)';
            }}
          >
            {heroConfig.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(247, 244, 238, 0.5)',
            animation: 'scrollPulse 3s ease-in-out infinite',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '32px',
            backgroundColor: 'rgba(247, 244, 238, 0.3)',
            animation: 'scrollPulse 3s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
