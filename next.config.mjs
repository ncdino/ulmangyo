import withPWAInit from "next-pwa";
/** @type {import('next').NextConfig} */


const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  siteUrl: "https://ulmangyo.site",
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
