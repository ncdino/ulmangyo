"use client";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function MainPageCard({ children, className, isList = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className={twMerge(
        "rounded-3xl relative shadow-2xl",
        className
      )}
    >
      <div className={isList ? `p-6 md:p-7 lg:p-8` : `p-3 md:p-4 lg:p-8`}>
        {children}
      </div>
    </motion.div>
  );
}
