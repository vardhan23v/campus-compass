import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
  outputFileTracingIncludes: {
    "/**/*": ["./prisma/**/*"],
  },
};

export default nextConfig;
