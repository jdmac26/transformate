/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
    domains: ["github.com", "lh3.googleusercontent.com", "pbs.twimg.com"],
  },
};

export default nextConfig;
