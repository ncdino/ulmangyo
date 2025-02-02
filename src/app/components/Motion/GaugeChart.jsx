"use client";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
// import useStore from "@/app/store/zustand/store";

export default function GaugeChart({
  maxValue = 1,
  strokeWidth = 10,
  color = "blue",
  emptyColor = "#eee",
  label,
  animated = false,
  className,
  size = 80,
  value,
}) {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const initialProgress = animated ? 0 : (value / maxValue) * circumference;
  const [progress, setProgress] = useState(initialProgress);

  const angle = (value / maxValue) * 180;

  useEffect(() => {
    if (animated) {
      let animationFrameId;
      let startTimestamp = null;
      const duration = 1000;

      const animate = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progressValue = Math.min(timestamp - startTimestamp, duration);
        const newProgress =
          (progressValue / duration) * ((value / maxValue) * circumference);
        setProgress(newProgress);
        if (progressValue < duration) {
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrameId);
    } else {
      setProgress((value / maxValue) * circumference);
    }
  }, [value, animated, maxValue, circumference, size]);

  return (
    <div className={twMerge(`relative overflow-hidden`, className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={emptyColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round"
          transform={`rotate(-180 ${size / 2} ${size / 2})`}
          className={`transition-stroke-dasharray duration-300 ease-in-out ${
            !animated && "transition-none"
          }`}
        />
      </svg>
      {label && (
        <div
          className={`absolute top-[40%] right-1/2 -translate-x-1/2 text-center text-sm lg:text-2xl`}
        >
          {typeof label === "number" ? label.toFixed(1) : label}%
        </div>
      )}
    </div>
  );
}
