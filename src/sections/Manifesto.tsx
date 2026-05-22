import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Word-by-word scroll reveal for bio text
  useEffect(() => {
    const textEl = textRef.current;
    const containerEl = sectionRef.current;
    if (!textEl || !containerEl) return;

    function initAnimation() {
      // Clean up previous
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerEl) st.kill();
      });

      // Split text into words
      splitRef.current = new SplitType(textEl as HTMLElement, { types: 'words' });
      const words = (textEl as HTMLElement).querySelectorAll('.word');

      if (words.length === 0) return;

      // GSAP ScrollTrigger pipeline
      tlRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 70%',
          end: 'center 50%',
          scrub: true,
        },
      });

      tlRef.current.fromTo(
        words,
        {
          opacity: 0,
          filter: 'blur(8px) brightness(60%)',
          willChange: 'filter, opacity',
        },
        {
          opacity: 1,
          filter: 'blur(0px) brightness(100%)',
          stagger: 0.03,
          ease: 'sine.out',
        }
      );
    }

    // Wait for fonts before splitting
    document.fonts.ready.then(() => {
      initAnimation();
    });

    // ResizeObserver with 150ms debounce
    const ro = new ResizeObserver(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        initAnimation();
      }, 150);
    });
    ro.observe(containerEl);

    return () => {
      ro.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (tlRef.current) tlRef.current.kill();
      if (splitRef.current) splitRef.current.revert();
    };
  }, []);

  // Entrance animations for other elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left image reveal
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Label reveal
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: labelRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Pills reveal
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.lang-pill');
        gsap.fromTo(
          pills,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#F7F4EE',
        position: 'relative',
        zIndex: 2,
        padding: '160px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          gap: '80px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Left — Portrait Video */}
        <div
          ref={leftRef}
          className="w-full md:w-[40%]"
          style={{
            flex: '1 1 380px',
            maxWidth: '420px',
            position: 'relative',
            opacity: 0,
          }}
        >
          <div
            style={{
              position: 'relative',
              border: '1px solid #A4875C',
              padding: '12px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/jamalimahmudjoy.jpg"
              alt="Portrait"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '3/4',
                objectFit: 'cover',
                animation: 'slowZoom 20s ease-in-out infinite alternate',
              }}
            />
          </div>
          <style>{`
            @keyframes slowZoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.02); }
            }
          `}</style>
        </div>

        {/* Right — Content */}
        <div
          className="w-full md:w-[55%]"
          style={{
            flex: '1 1 500px',
          }}
        >
          {/* Section Label */}
          <p
            ref={labelRef}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#A4875C',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '40px',
              opacity: 0,
            }}
          >
            {aboutConfig.sectionLabel}
          </p>

          {/* Bio Text — with word-by-word reveal */}
          <p
            ref={textRef}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(16px, 2vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#505050',
              maxWidth: '520px',
              marginBottom: '40px',
            }}
          >
            {aboutConfig.bio}
          </p>

          {/* Language Pills */}
          <div
            ref={pillsRef}
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {aboutConfig.languages.map((lang) => (
              <span
                key={lang}
                className="lang-pill"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#505050',
                  letterSpacing: '0.06em',
                  padding: '6px 16px',
                  border: '1px solid rgba(164, 135, 92, 0.3)',
                  borderRadius: '9999px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = '#A4875C';
                  el.style.backgroundColor = 'rgba(164, 135, 92, 0.05)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(164, 135, 92, 0.3)';
                  el.style.backgroundColor = 'transparent';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
