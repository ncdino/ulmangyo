"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AddComplete() {
  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  const [animationState, setAnimationState] = useState("visible");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationState("hidden");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={animationState}
      transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      className="w-[130px] h-[130px] bg-[#2f4f4f] rounded-full flex justify-center items-center shadow-xl"
    >
      <svg
        width="80px"
        height="80px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
