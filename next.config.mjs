/** @type {import('next').NextConfig} */

// Applied to every response. The CSP is deliberately strict about where code
// and data can come from; `unsafe-inline`/`unsafe-eval` on scripts are what
// Next's runtime needs without a nonce-based setup.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com",
      "font-src 'self' data:",
      "connect-src 'self' https://res.cloudinary.com https://api.cloudinary.com",
      // The office maps on /contact are Google Maps embeds. Without this they
      // fall back to default-src 'self' and the iframes render blank.
      "frame-src https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    // Only meaningful over HTTPS; browsers ignore it on plain HTTP.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // Dev-only convenience for testing from a phone on the LAN.
  allowedDevOrigins: ["192.168.100.13"],

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Admin pages and API responses should never be cached by a proxy.
        // These are client components, so they can't export `robots` metadata —
        // the header is what keeps them out of search results.
        source: "/dashboard/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/dashboard",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/login",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default nextConfig;
