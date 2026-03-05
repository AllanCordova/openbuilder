"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { Library, ArrowRight } from "lucide-react";

export function ExploreSection() {
  return (
    <section className="py-24 px-4">
      <ScrollReveal>
        <motion.div
          className="max-w-canvas mx-auto w-full rounded-default overflow-hidden border border-[var(--header-border)] bg-gradient-to-br from-primary/5 via-background-alt to-primary/10"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-default bg-primary/15 flex items-center justify-center shrink-0 text-primary">
                <Library size={32} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Community templates
                </h2>
                <p className="text-typography-body text-muted max-w-xl">
                  Discover projects shared by the community. Use them as a
                  starting point or inspiration—all from the public Explore
                  gallery.
                </p>
              </div>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-default font-semibold text-typography-body hover:bg-[var(--primary-hover)] transition-colors shrink-0 group"
            >
              Explore templates
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
