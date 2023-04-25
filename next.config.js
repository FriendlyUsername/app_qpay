/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
