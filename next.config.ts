import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    outputFileTracingIncludes: {
      "/**/*": ["./prisma/**/*"],
    },
  },
};

export default nextConfig;
