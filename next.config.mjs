/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    qualities: [75, 90],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
