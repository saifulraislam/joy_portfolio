import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline line draw animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        );
      }

      // Node reveals
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });

      // Entry reveals
      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: '#F7F4EE',
        position: 'relative',
        zIndex: 2,
        padding: '160px 24px',
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        style={{
          textAlign: 'center',
          marginBottom: '100px',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            color: '#A4875C',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          {experienceConfig.sectionLabel}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: '#171717',
            letterSpacing: '-0.02em',
          }}
        >
          {experienceConfig.title}
        </h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Vertical Line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'rgba(164, 135, 92, 0.2)',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#A4875C',
              transformOrigin: 'top',
              transform: 'scaleY(0)',
            }}
          />
        </div>

        {/* Entries */}
        {experienceConfig.entries.map((entry, i) => (
          <div
            key={`${entry.organization}-${i}`}
            ref={(el) => { entryRefs.current[i] = el; }}
            style={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              paddingLeft: i % 2 === 0 ? '0' : '50%',
              paddingRight: i % 2 === 0 ? '50%' : '0',
              paddingTop: i === 0 ? '0' : '48px',
              position: 'relative',
              opacity: 0,
            }}
          >
            {/* Timeline Node */}
            <div
              ref={(el) => { nodeRefs.current[i] = el; }}
              style={{
                position: 'absolute',
                left: '50%',
                top: i === 0 ? '8px' : '56px',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: '2px solid #A4875C',
                backgroundColor: '#F7F4EE',
                zIndex: 2,
                boxShadow: '0 0 0 4px rgba(164, 135, 92, 0.1)',
                opacity: 0,
              }}
            />

            {/* Content */}
            <div
              style={{
                padding: i % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px',
                textAlign: i % 2 === 0 ? 'right' : 'left',
                maxWidth: '280px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#171717',
                  marginBottom: '6px',
                  lineHeight: 1.4,
                }}
              >
                {entry.organization}
              </p>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#505050',
                  marginBottom: '8px',
                }}
              >
                {entry.role}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#A4875C',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {entry.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
