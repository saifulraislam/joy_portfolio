import { footerConfig } from '../config';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#EFE9DE',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(164, 135, 92, 0.1)',
        padding: '60px 24px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Brand */}
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '18px',
            fontWeight: 400,
            color: '#171717',
            letterSpacing: '1px',
          }}
        >
          {footerConfig.brandName}
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '13px',
            fontStyle: 'italic',
            color: '#A4875C',
            letterSpacing: '0.02em',
          }}
        >
          {footerConfig.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'rgba(164, 135, 92, 0.3)',
            margin: '8px 0',
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 300,
            color: '#505050',
            letterSpacing: '0.05em',
          }}
        >
          {footerConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
