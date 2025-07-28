'use client';

export function RippleLoader({ className = '' }) {
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Ripple loader with colored dots */}
      <span className="relative inline-block h-9 w-9 scale-100 rounded-full" style={{ backgroundColor: '#101820' }}>
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: '#101820',
            animation: 'ripple 1.5s ease-out infinite',
            animationDelay: '0.2s',
          }}
        ></span>
      </span>
      <span className="relative inline-block h-9 w-9 scale-90 rounded-full" style={{ backgroundColor: '#0077C8' }}>
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: '#0077C8',
            animation: 'ripple 1.5s ease-out infinite',
            animationDelay: '0.4s',
          }}
        ></span>
      </span>
      <span className="relative inline-block h-9 w-9 scale-80 rounded-full" style={{ backgroundColor: '#B2A9F5' }}>
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: '#B2A9F5',
            animation: 'ripple 1.5s ease-out infinite',
            animationDelay: '0.6s',
          }}
        ></span>
      </span>
      <span className="relative inline-block h-9 w-9 scale-70 rounded-full" style={{ backgroundColor: '#DDDAE8' }}>
        <span
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: '#DDDAE8',
            animation: 'ripple 1.5s ease-out infinite',
            animationDelay: '0.8s',
          }}
        ></span>
      </span>
    </div>
  );
}
