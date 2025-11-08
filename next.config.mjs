import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  images: {
    // Set Content-Disposition to inline so images display in browser instead of downloading
    contentDispositionType: 'inline',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loudspectrum.com',
      },
      {
        protocol: 'https',
        hostname: 'api.loudspectrum.com',
      },
    ],
  },
  headers: async () => {
    // Security headers to apply to most routes
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    return [
      {
        // CRITICAL: Exclude _next/image specifically - must come first
        // This handles both local and remote API images
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          // Explicitly set Content-Disposition to inline for all optimized images
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
      {
        // Exclude all other _next routes from security headers
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Apply security headers to routes that don't start with /_next
        // This pattern excludes _next routes explicitly
        source: '/((?!_next).*)',
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    optimizeCss: {
      inlineFonts: true,
      preloadFonts: false, // Disable font preloading to reduce warnings
    },
    optimizePackageImports: ['@/components', '@/lib'],
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize CSS loading - reduce aggressive splitting to prevent preload warnings
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'initial', // Changed from 'all' to 'initial' to reduce preloading
        enforce: true,
        priority: 1,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
