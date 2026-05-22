import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface CursorGlowState {
  x: number;
  y: number;
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectsConfig.projects)[0];
  index: number;
}) {
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef<CursorGlowState>({ x: 0.5, y: 0.5 });
  const currentRef = useRef<CursorGlowState>({ x: 0.5, y: 0.5 });
  const isHoveringRef = useRef(false);

  // Cursor-following radial glow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardInnerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    targetRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const animateGlow = useCallback(() => {
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(300px circle at ${currentRef.current.x * 100}% ${currentRef.current.y * 100}%, rgba(164, 135, 92, 0.08), transparent 60%)`;
    }
    if (isHoveringRef.current) {
      rafRef.current = requestAnimationFrame(animateGlow);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const glow = glowRef.current;
    const card = cardInnerRef.current;
    if (!glow || !card) return;
    glow.style.opacity = '1';
    card.style.transform = 'translateY(-4px)';
    card.style.boxShadow = '0 20px 60px rgba(23, 23, 23, 0.1)';
    card.style.borderColor = 'rgba(164, 135, 92, 0.4)';
    isHoveringRef.current = true;
    rafRef.current = requestAnimationFrame(animateGlow);
  }, [animateGlow]);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    const card = cardInnerRef.current;
    if (!glow || !card) return;
    glow.style.opacity = '0';
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
    card.style.borderColor = 'rgba(164, 135, 92, 0.15)';
    isHoveringRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  // Staggered alignment
  const alignments = ['flex-start', 'center', 'flex-end'];
  const alignment = alignments[index % 3];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: alignment,
        width: '100%',
        marginBottom: index < projectsConfig.projects.length - 1 ? '80px' : '0',
      }}
    >
      <div
        ref={cardInnerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          backgroundColor: '#EFE9DE',
          border: '1px solid rgba(164, 135, 92, 0.15)',
          borderRadius: '4px',
          padding: '0',
          maxWidth: '420px',
          width: '100%',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Cursor glow overlay */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '3/4',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Project Number */}
          <span
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '14px',
              fontWeight: 400,
              color: '#A4875C',
              letterSpacing: '0.1em',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            {project.number}
          </span>

          {/* Title */}
          <h3
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '24px',
              fontWeight: 500,
              color: '#171717',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.6,
              color: '#505050',
              marginBottom: '24px',
            }}
          >
            {project.description}
          </p>

          {/* Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#171717',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {project.linkLabel}
            <span style={{ fontSize: '14px' }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Card reveals
      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
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
      id="work"
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
          maxWidth: '1100px',
          margin: '0 auto 100px',
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
          {projectsConfig.sectionLabel}
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
          {projectsConfig.title}
        </h2>
      </div>

      {/* Staggered Cards */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {projectsConfig.projects.map((project, i) => (
          <div
            key={project.number}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <ProjectCard
              project={project}
              index={i}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
