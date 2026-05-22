import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FounderHelix from '../effects/HeritageHelix';
import { skillsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

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

      // Pills reveal
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.skill-pill');
        gsap.fromTo(
          pills,
          { opacity: 0, y: 15, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pillsRef.current,
              start: 'top 80%',
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
      id="skills"
      ref={sectionRef}
      style={{
        backgroundColor: '#F7F4EE',
        position: 'relative',
        zIndex: 2,
        padding: '160px 24px',
        overflow: 'hidden',
      }}
    >
      {/* FounderHelix Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5,
          zIndex: 0,
        }}
      >
        <FounderHelix />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
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
            {skillsConfig.sectionLabel}
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
            {skillsConfig.title}
          </h2>
        </div>

        {/* Pill Cloud */}
        <div
          ref={pillsRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '14px',
          }}
        >
          {/* Core Skills — larger, aged gold border */}
          {skillsConfig.coreSkills.map((skill) => (
            <span
              key={skill}
              className="skill-pill"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: '#171717',
                letterSpacing: '0.02em',
                padding: '12px 28px',
                border: '1.5px solid #A4875C',
                borderRadius: '9999px',
                backgroundColor: 'rgba(247, 244, 238, 0.8)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-3px)';
                el.style.backgroundColor = 'rgba(164, 135, 92, 0.08)';
                el.style.boxShadow = '0 8px 24px rgba(164, 135, 92, 0.12)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.backgroundColor = 'rgba(247, 244, 238, 0.8)';
                el.style.boxShadow = 'none';
              }}
            >
              {skill}
            </span>
          ))}

          {/* Supporting Skills — smaller, graphite border */}
          {skillsConfig.supportingSkills.map((skill) => (
            <span
              key={skill}
              className="skill-pill"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                color: '#505050',
                letterSpacing: '0.02em',
                padding: '10px 22px',
                border: '1px solid rgba(80, 80, 80, 0.3)',
                borderRadius: '9999px',
                backgroundColor: 'rgba(247, 244, 238, 0.8)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-3px)';
                el.style.borderColor = '#A4875C';
                el.style.color = '#171717';
                el.style.backgroundColor = 'rgba(164, 135, 92, 0.06)';
                el.style.boxShadow = '0 6px 20px rgba(164, 135, 92, 0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = 'rgba(80, 80, 80, 0.3)';
                el.style.color = '#505050';
                el.style.backgroundColor = 'rgba(247, 244, 238, 0.8)';
                el.style.boxShadow = 'none';
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
