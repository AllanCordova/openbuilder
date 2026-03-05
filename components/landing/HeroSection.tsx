"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-[var(--header-border)] text-sm font-medium mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Sparkles size={18} />
          <span>Visual builder for modern interfaces</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
          Build pages visually.
          <br />
          <span className="text-primary">No code required.</span>
        </h1>
        <p className="text-typography-body text-muted max-w-2xl mx-auto mb-10 text-lg">
          Drag, drop, and customize components to create your application. From
          landing pages to dashboards—ship faster with Cadre.
        </p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-default font-semibold text-typography-body hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:shadow-[var(--shadow-primary)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start building
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 bg-background-alt border border-[var(--header-border)] text-foreground px-8 py-4 rounded-default font-medium text-typography-body hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            Explore templates
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
