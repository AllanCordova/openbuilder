"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-32 px-4">
      <ScrollReveal
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to build something?
          </h2>
          <p className="text-typography-body text-muted mb-10">
            Create your first project and start designing with the visual
            builder in minutes.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary text-background px-10 py-4 rounded-default font-semibold text-lg hover:bg-[var(--primary-hover)] transition-colors shadow-lg hover:shadow-primary/20"
            >
              Start building
              <ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
