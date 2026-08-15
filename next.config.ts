import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Lets the dev server's HMR/hydration work when opened from another
     device on the same network (e.g. testing on a phone via the LAN IP
     printed in the `next dev` startup log), instead of only `localhost`. */
  allowedDevOrigins: ["192.168.86.234"],
};

export default nextConfig;
