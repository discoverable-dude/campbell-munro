import type { NextConfig } from "next";
import { REDIRECTS } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75] },
  async redirects() {
    return [
      // Canonical host is www: send the bare domain there, keeping the path.
      { source: "/:path*", has: [{ type: "host" as const, value: "campbellmunro.co.uk" }], destination: "https://www.campbellmunro.co.uk/:path*", permanent: true },
      ...REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/video/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
