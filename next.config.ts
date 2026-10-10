import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The pre-launch waitlist became the newsletter; keep old links working.
  async redirects() {
    return [{ source: "/waitlist", destination: "/newsletter", permanent: true }];
  },
};

export default nextConfig;
