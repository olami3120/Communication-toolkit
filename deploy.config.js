module.exports = {
  // Build output directory
  distDir: 'dist',
  
  // Production server configuration
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  
  // Cache control headers
  headers: {
    '/**': {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    '/assets/**': {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    '/index.html': {
      'Cache-Control': 'no-cache',
    },
  },
  
  // Security headers
  security: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  },
  
  // Compression settings
  compression: {
    enabled: true,
    level: 6,
  },
} 