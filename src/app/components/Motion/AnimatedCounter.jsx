"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function AnimatedCounter({
  from = 0,
  to,
  duration,
  decimalPlaces = 0,
  decimalSeparator = ".",
  playOnLoad = true,
  once = true,
  animationType = "smooth",
  currency = "",
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(() => formatNumber(from));

  function formatNumber(value) {
    return value.toFixed(decimalPlaces).replace(".", decimalSeparator);
  }

  useEffect(() => {
    if ((playOnLoad || isInView) && !hasAnimated) {
      const animationControl = animate(from, to, {
        duration,
        ease: animationType === "smooth" ? "easeInOut" : "linear",
        onUpdate: (latest) => {
          setDisplayValue(formatNumber(latest));
        },
        onComplete: () => {
          if (once) {
            setHasAnimated(true);
          }
        },
      });
      return () => animationControl.stop();
    }
  }, [
    from,
    to,
    duration,
    decimalPlaces,
    decimalSeparator,
    playOnLoad,
    isInView,
    animationType,
    once,
    hasAnimated,
  ]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={twMerge(`tabular-nums select-none`, className)}
      aria-label={`Counter ends at ${to}`}
    >
      {parseInt(displayValue).toLocaleString()} {currency}
    </motion.div>
  );
}
