import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 홈 디렉토리의 다른 lockfile을 루트로 오인하지 않도록 프로젝트 루트를 명시
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
