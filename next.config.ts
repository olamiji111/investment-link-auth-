/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.100.19", "172.20.10.4"],

  serverExternalPackages: ["firebase-admin"],

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;