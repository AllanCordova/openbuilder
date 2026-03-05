"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const };

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  transition?: { duration?: number; delay?: number };
}

export function ScrollReveal({
  children,
  className = "",
  variants = defaultVariants,
  transition = defaultTransition,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ ...defaultTransition, ...transition }}
    >
      {children}
    </motion.div>
  );
}
