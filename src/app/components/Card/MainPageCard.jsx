"use client";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export default function MainPageCard({ children, className, isList = false }) {
  return (
    <div className={twMerge("rounded-3xl relative shadow-2xl", className)}>
      <div className={isList ? `p-6 md:p-7 lg:p-8` : `p-3 md:p-4 lg:p-8`}>
        {children}
      </div>
    </div>
  );
}
