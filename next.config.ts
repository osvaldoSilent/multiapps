import path from "path";
import type { NextConfig } from "next";
import type { WebpackConfigContext } from "next/dist/server/config-shared";

const nextConfig: NextConfig = {
webpack: (config: WebpackConfigContext["config"], { isServer }) => {
config.resolve.alias = {
...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
};
return config;
},
};

export default nextConfig;
