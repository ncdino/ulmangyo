"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../section/Header";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  return (
    <nav className="relative">
      <div className="absolute right-3 -top-1 flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? (
            <svg
              width="30px"
              height="30px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <div>
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#ffffff"
                  strokeWidth="1.5"
                  d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-0 right-0 w-full h-screen z-[200] bg-gradient-to-r from-[#232526] to-[#414345] text-white">
            <motion.div
              className="p-8"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex justify-start"></div>
                <div className="mb-20">
                  <span className="text-4xl text-gray-200">NAVIGATION.</span>
                </div>
                <div className="relative font-pretendard flex flex-col text-center gap-16">
                  <a
                    href="/"
                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-200 hover:text-gray-600"
                  >
                    🏠
                  </a>
                  <a
                    href="/capture"
                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-200 hover:text-gray-600"
                  >
                    📸
                  </a>
                  <a
                    href="/cart"
                    className="block py-2 text-6xl md:text-7xl lg:text-8xl text-gray-200 hover:text-gray-600"
                  >
                    🛒
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Menu;
