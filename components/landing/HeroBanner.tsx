"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <section className="px-4 -mt-4 pb-16">
      <motion.div
        className="max-w-canvas mx-auto w-full overflow-hidden rounded-default border border-[var(--header-border)] shadow-lg bg-background-alt/50"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <div className="relative w-full aspect-[21/9] min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
          <Image
            src="/assets/home-image.jpg"
            alt="Build and connect—create interfaces visually with Cadre"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 72rem"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
