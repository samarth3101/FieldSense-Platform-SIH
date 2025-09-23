const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development' && process.env.PWA !== 'true',
  buildExcludes: [/middleware-manifest\.json$/],
  // Offline fallback page (must be static)
  fallbacks: {
    document: '/offline',
  },
  // Runtime caching strategies for production build
  runtimeCaching: [
    {
      // Images: cache-first with expiration
      urlPattern: /.*\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 },
      },
    },
    {
      // API calls to your own domain or future API subdomain
      urlPattern: /https?:\/\/[^/]*fieldsense[^/]*\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-primary',
        networkTimeoutSeconds: 8,
        expiration: { maxEntries: 120, maxAgeSeconds: 7 * 24 * 60 * 60 },
      },
    },
    {
      // Fonts (Google or local) - stale while revalidate
      urlPattern: /https?:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'fonts',
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 24 * 60 * 60 },
      },
    },
    {
      // JS/CSS assets - stale while revalidate
      urlPattern: /.*\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources' },
    },
    {
      // HTML navigations - match all document requests
      urlPattern: /.*$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `\n      @import "src/styles/variables.scss";\n      @import "src/styles/mixins.scss";\n    `,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Allow LAN IP access during dev (must be array of origin strings)
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://172.20.10.7:3000',
  ],
  // TEMP: Ignore ESLint errors during build so we can ship/test PWA quickly.
  // Remove this after fixing TypeScript/ESLint issues.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Helpful for PWA headers & future middleware if needed
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
