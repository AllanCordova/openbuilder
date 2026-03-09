"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useProjectByIdQuery } from "@/hooks/useProjects";
import { PageList } from "@/components/section/PageList";
import { CreatePageForm } from "@/components/section/CreatePageForm";
import { EmptyFallback } from "@/components/ui/fallback/EmptyFallback";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorFallback } from "@/components/ui/fallback/ErrorFallback";
import { ExportProjectButton } from "@/components/project/ExportProjectButton";
import { ReturnFallback } from "@/components/ui/fallback/ReturnFallback";
import { ScrollReveal, AmbientOrbs } from "@/components/landing";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: currentProject, isLoading, error } = useProjectByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-background">
        <ErrorFallback error={error.message || "Failed to load project"} />
        <ReturnFallback text="Back to projects" href="/projects" />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-background">
        <EmptyFallback message="Project not found" />
        <ReturnFallback text="Back to projects" href="/projects" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <AmbientOrbs />
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="relative z-10 max-w-canvas mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ReturnFallback text="Back to projects" href="/projects" />
          </motion.div>

          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mt-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                {currentProject.name}
              </h1>
              <p className="text-muted mt-1 text-typography-body">
                {new Date(currentProject.createdAt).toLocaleDateString(
                  undefined,
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${id}/sections`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-default font-medium text-sm border border-[var(--header-border)] text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <LayoutGrid size={18} />
                <span>View gallery</span>
              </Link>
              <ExportProjectButton projectId={id} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Create + Pages */}
      <section className="relative z-10 px-4 pb-24">
        <div className="max-w-canvas mx-auto w-full flex flex-col gap-10">
          <ScrollReveal>
            <div className="rounded-default border border-[var(--header-border)] bg-background-alt p-6 sm:p-8 max-w-md">
              <CreatePageForm projectId={currentProject.id} />
            </div>
          </ScrollReveal>

          <div>
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-typography-heading font-bold text-foreground">
                Pages
              </h2>
            </motion.div>
            <div className="rounded-default border border-[var(--header-border)] bg-background-alt p-6 sm:p-8">
              <PageList projectId={currentProject.id} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
