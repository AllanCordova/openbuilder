"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AmbientOrbs, ScrollReveal } from "@/components/landing";
import { UserUpdate } from "@/components/config/UserUpdate";

export default function SettingsEditPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AmbientOrbs />
      <main className="relative z-10 flex-1 w-full">
        <section className="relative py-16 px-4 overflow-hidden">
          <ScrollReveal className="relative z-10 max-w-canvas mx-auto w-full flex flex-col items-center text-center">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6 group"
            >
              <ArrowLeft
                size={20}
                strokeWidth={2}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <span>Back to profile</span>
            </Link>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-[var(--header-border)] text-sm font-medium mb-6 w-fit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span>Edit account</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
              Edit Profile
            </h1>
            <p className="text-typography-body text-muted max-w-xl">
              Update your personal information and avatar
            </p>
          </ScrollReveal>
        </section>

        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-canvas mx-auto w-full flex justify-center">
            <ScrollReveal className="w-full max-w-md">
              <UserUpdate />
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
