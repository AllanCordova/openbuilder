"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MousePointer2,
  Eye,
  FileDown,
  LayoutTemplate,
} from "lucide-react";

const items = [
  {
    icon: MousePointer2,
    label: "Drag & drop",
    description: "Arrange components on the canvas with intuitive controls.",
  },
  {
    icon: Eye,
    label: "Live preview",
    description: "See changes instantly as you build.",
  },
  {
    icon: FileDown,
    label: "Export",
    description: "Download your project when it's ready.",
  },
  {
    icon: LayoutTemplate,
    label: "Sections & pages",
    description: "Organize content with multiple pages per project.",
  },
];

export function SpotlightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-canvas mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            hidden: {},
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center text-center p-6 rounded-default bg-background-alt/80 border border-[var(--header-border)] hover:border-primary/25 hover:bg-primary/5 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
                  },
                }}
              >
                <div className="w-12 h-12 rounded-default bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-typography-heading font-semibold text-foreground mb-1">
                  {item.label}
                </h3>
                <p className="text-sm text-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
