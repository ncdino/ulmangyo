/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.3rem",
        md: "1rem",
        lg: "2rem",
      },
    },
    extend: {
      fontFamily: {
        paperlogy: ["var(--font-paperlogy)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      borderWidth: {
        3: "3px",
        6: "6px",
        10: "10px",
        14: "14px",
        15: "15px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        md: "768px",
        lg: "1200px",
        xl: "1440px",
      },
      colors: {
        primary: "#FF979B",
        orange: "#fd7702",
        secondary: "#19547b",
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: false,
};
