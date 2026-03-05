"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      className="group flex flex-col p-8 bg-background-alt border border-[var(--header-border)] rounded-default hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full"
      variants={cardVariants}
      whileHover={{ y: -4 }}
    >
      <div className="w-14 h-14 rounded-default bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary/20 transition-colors">
        <Icon size={28} strokeWidth={2} />
      </div>
      <h3 className="text-typography-heading font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-typography-body text-muted flex-1">{description}</p>
    </motion.div>
  );
}
