"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Navigation from "@/app/components/section/Navigation";

export default function Header({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className={twMerge(
        `font-pretendard font-bold tracking-tighter bg-gradient-to-r from-[#000000] to-[#434343] backdrop-blur top-0 sticky z-50 py-2`,
        className
      )}
    >
      {/* 메뉴 */}
      <div className="flex justify-between items-center px-4 text-zinc-100">
        {children}
        <button
          onClick={toggleMenu}
          className="text-zinc-100 hover:text-white focus:outline-none"
        >
          {isOpen ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute z-[9999] w-full px-4 py-2 text-zinc-100 bg-black"
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
