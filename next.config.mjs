/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
    formats: ['image/webp'],
    // Steps up to 2400px so a retina screen showing a 1200px-wide photo gets a sharp ~2400px image,
    // instead of the default 3840px step (slow to generate and larger than the source photos).
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2400],
  },
};
export default nextConfig;
