/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: "https://ulmangyo.vercel.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};

export default nextConfig;
