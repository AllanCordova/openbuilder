"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { usePublicProjectByIdQuery } from "@/hooks/usePublicProjects";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/fallback/EmptyFallback";
import { ErrorFallback } from "@/components/ui/fallback/ErrorFallback";
import { PublicPageList } from "@/components/section/PublicPageList";
import { ReturnFallback } from "@/components/ui/fallback/ReturnFallback";
import { ScrollReveal, AmbientOrbs } from "@/components/landing";

export default function PublicProjectIndex() {
  const params = useParams();
  const projectId = params.id as string;

  const {
    data: project,
    isLoading,
    error,
  } = usePublicProjectByIdQuery(projectId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-spacing-lg bg-background">
        <ErrorFallback
          error={error.message || "Failed to load project details."}
        />
        <ReturnFallback text="Back to Explore" href="/explore" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-spacing-lg bg-background gap-6">
        <EmptyFallback message="Project not found or is private." />
        <ReturnFallback text="Back to Explore" href="/explore" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col bg-background">
      <AmbientOrbs />
      {/* Hero header */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-canvas mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ReturnFallback text="Back to Explore" href="/explore" />
          </motion.div>

          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {project.name}
              </h1>
              <p className="text-muted mt-2 text-typography-body">
                Project pages overview
              </p>
            </div>

            {project.user && (
              <motion.div
                className="flex items-center gap-4 bg-background-alt px-5 py-3 rounded-default border border-[var(--header-border)] shadow-sm w-fit"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {project.user.avatar_url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--header-border)] shrink-0">
                    <Image
                      src={project.user.avatar_url}
                      alt={project.user.name ?? "Author"}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-[var(--header-border)] shrink-0">
                    <User size={20} />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold">
                    Created by
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {project.user.name || "Anonymous"}
                  </span>
                </div>
              </motion.div>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="relative z-10 flex-1 px-4 pb-24">
        <div className="max-w-canvas mx-auto w-full">
          <PublicPageList projectId={project.id} pages={project.pages || []} />
        </div>
      </section>
    </main>
  );
}
