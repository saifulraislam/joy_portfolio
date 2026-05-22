import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: '#EFE9DE',
        position: 'relative',
        zIndex: 2,
        padding: '160px 24px',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Section Label */}
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            color: '#A4875C',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          {contactConfig.sectionLabel}
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.2,
            color: '#171717',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            opacity: 0,
          }}
        >
          {contactConfig.heading}
        </h2>

        {/* Subline */}
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: '#505050',
            marginBottom: '60px',
            opacity: 0,
          }}
        >
          {contactConfig.subline}
        </p>

        {/* Contact Methods */}
        <div style={{ marginBottom: '60px', opacity: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {/* Phone */}
            <a
              href={`tel:${contactConfig.phone}`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#171717',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A4875C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#171717';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{contactConfig.phone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contactConfig.email}`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#171717',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A4875C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#171717';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{contactConfig.email}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${contactConfig.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#171717',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A4875C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#171717';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              <span>{contactConfig.whatsapp}</span>
            </a>

            {/* Instagram */}
            <a
              href={contactConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#171717',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#A4875C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#171717';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
              <span>{contactConfig.instagram}</span>
            </a>
          </div>
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              textAlign: 'left',
              opacity: 0,
            }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#A4875C',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {contactConfig.formNameLabel}
              </label>
              <input
                type="text"
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(23, 23, 23, 0.2)',
                  padding: '8px 0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#171717',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#A4875C';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(23, 23, 23, 0.2)';
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#A4875C',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {contactConfig.formEmailLabel}
              </label>
              <input
                type="email"
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(23, 23, 23, 0.2)',
                  padding: '8px 0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#171717',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#A4875C';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(23, 23, 23, 0.2)';
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  color: '#A4875C',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {contactConfig.formMessageLabel}
              </label>
              <textarea
                required
                rows={3}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid rgba(23, 23, 23, 0.2)',
                  padding: '8px 0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#171717',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#A4875C';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(23, 23, 23, 0.2)';
                }}
              />
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="submit"
                className="pill-btn pill-btn-primary"
              >
                {contactConfig.submitText}
              </button>
            </div>
          </form>
        ) : (
          /* Success State */
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              opacity: 0,
              animation: 'fadeIn 0.6s ease forwards',
            }}
          >
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '18px',
                fontStyle: 'italic',
                color: '#A4875C',
                lineHeight: 1.5,
              }}
            >
              Thank you for visiting my portfolio.
            </p>
            <style>{`
              @keyframes fadeIn {
                to { opacity: 1; }
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}
