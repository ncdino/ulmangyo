"use client";

import React from "react";
import { motion } from "framer-motion";
import ItemListCard from "@/app/components/Card/ItemListCard";

export default function CandidateList({
  title,
  candidates,
  onSelect,
  selectedValue,
  onSave,
}) {
  return (
    <div className="container">
      {/* Title Section */}
      <div className="grid grid-cols-6 gap-1 py-16">
        <div className="col-span-1">
          <span className="font-bold text-4xl">{title.step}.</span>
        </div>
        <div className="col-span-5">
          <p className="font-base text-2xl">인식된 문자 중</p>
          <span className="text-2xl font-base">
            <span className="font-extrabold ">{`"${title.label}"`}</span>을
            선택해주세요.
          </span>
        </div>
      </div>

      {/* Candidate List Section */}
      <motion.ul
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "backOut",
        }}
        className="flex flex-col items-center text-center gap-10 "
      >
        {candidates.map((candidate, index) => (
          <ItemListCard
            key={index}
            text={candidate.text}
            onClick={() => {
              onSelect(candidate.text);
              onSave && onSave();
            }}
            selected={selectedValue === candidate.text}
          />
        ))}
      </motion.ul>
    </div>
  );
}
