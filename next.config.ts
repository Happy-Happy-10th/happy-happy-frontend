import type { NextConfig } from "next";
import config from "config";

const nextConfig: NextConfig = {
  env: { ...config.util.toObject() },
};

export default nextConfig;
