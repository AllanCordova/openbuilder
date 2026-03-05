"use client";

import { motion } from "framer-motion";
import { FolderKanban } from "lucide-react";
import { CreateProjectForm } from "@/components/project/CreateProjectForm";
import { ProjectList } from "@/components/project/ProjectList";
import { ScrollReveal, AmbientOrbs } from "@/components/landing";

export default function ProjectPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <AmbientOrbs />
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <ScrollReveal className="relative z-10 max-w-canvas mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-[var(--header-border)] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FolderKanban size={18} />
            <span>Your workspace</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
            Projects
          </h1>
          <p className="text-typography-body text-muted max-w-xl">
            Create and manage your projects. Open any project to add pages and
            build with the visual editor.
          </p>
        </ScrollReveal>
      </section>

      {/* Create + List */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-canvas mx-auto w-full flex flex-col gap-10">
          <ScrollReveal>
            <div className="rounded-default border border-[var(--header-border)] bg-background-alt p-6 sm:p-8 max-w-md">
              <CreateProjectForm />
            </div>
          </ScrollReveal>

          <div>
            <motion.h2
              className="text-typography-heading font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Your projects
            </motion.h2>
            <ProjectList />
          </div>
        </div>
      </section>
    </main>
  );
}
