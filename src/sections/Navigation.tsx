import { useEffect, useRef, useState } from 'react';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleScroll();
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'rgba(247, 244, 238, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(164, 135, 92, 0.1)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 40px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          {navigationConfig.brandName ? (
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '20px',
                fontWeight: 400,
                color: '#171717',
                letterSpacing: '1px',
                textDecoration: 'none',
                transition: 'color 0.6s ease',
              }}
            >
              {navigationConfig.brandName}
            </a>
          ) : (
            <div />
          )}

          {/* Desktop Links */}
          {!isMobileView && (
            <div
              style={{ display: 'flex', gap: '32px', alignItems: 'center' }}
            >
            {navigationConfig.links.map((item) => (
              <a
                key={`${item.label}-${item.target}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="link-underline"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#505050',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.4s ease',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#171717';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = '#505050';
                }}
              >
                {item.label}
              </a>
            ))}

            {/* Connect CTA */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#171717',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                padding: '8px 20px',
                border: '1px solid #A4875C',
                borderRadius: '9999px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = '#A4875C';
                el.style.color = '#F7F4EE';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'transparent';
                el.style.color = '#171717';
              }}
            >
              Connect
            </a>
          </div>
          )}

          {/* Mobile Hamburger */}
          {isMobileView && (
            <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#171717',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                backgroundColor: '#171717',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none',
              }}
            />
          </button>
          )}
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isMobileView && menuOpen && (
        <div
          className="md:hidden"
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Mobile Side Menu */}
      {isMobileView && (
        <div
          className="md:hidden"
          style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '280px',
          zIndex: 99,
          backgroundColor: 'rgba(247, 244, 238, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 32px 32px 32px',
          gap: '24px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
        }}
      >
        {navigationConfig.links.map((item, i) => (
          <a
            key={`mobile-${item.label}`}
            href={item.target}
            onClick={(e) => handleNavClick(e, item.target)}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#171717',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.05 + i * 0.05}s`,
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#A4875C',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            marginTop: '24px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
            transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.25s`,
          }}
        >
          Connect
        </a>
      </div>
      )}
    </>
  );
}
