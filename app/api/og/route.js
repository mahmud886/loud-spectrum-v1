import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Loud Spectrum';
  const subtitle = searchParams.get('subtitle') || 'Premium terpene products for enhanced flavor and experience';

  // Colors sourced from styles/globals.css theme guide
  const backgroundColor = '#101820'; // Umbra/Dark
  const primaryColor = '#FFFFFF'; // White text on dark
  const accentColor = '#0077C8'; // Brand blue
  const accentSoft = '#C0AEE7'; // Soft violet

  // Public logo URL (light variant for dark background)
  const origin = request.headers.get('x-forwarded-host')
    ? `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('x-forwarded-host')}`
    : new URL(request.url).origin;
  const logoUrl = `${origin}/assets/svgs/logos/logo-light.svg`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: backgroundColor,
          color: primaryColor,
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <img src={logoUrl} width={260} height={48} style={{ display: 'block' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 34, opacity: 0.85, color: accentSoft }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 28, opacity: 0.9 }}>loudspectrum.com</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div
              style={{
                height: 8,
                width: 160,
                background: accentColor,
                boxShadow: `0 0 40px ${accentColor}`,
              }}
            />
            <div
              style={{
                height: 8,
                width: 48,
                background: accentSoft,
                boxShadow: `0 0 26px ${accentSoft}`,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
