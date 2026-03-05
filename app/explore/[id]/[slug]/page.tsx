"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePublicProjectByIdQuery } from "@/hooks/usePublicProjects";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { Preview } from "@/components/build/Preview";
import { ReturnFallback } from "@/components/ui/ReturnFallback";

export default function PublicPageDetail() {
  const params = useParams();

  const projectId = params.id as string;
  const slug = params.slug as string;

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
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background gap-6">
        <ErrorFallback
          error={error.message || "Failed to load project details."}
        />
        <ReturnFallback text="Back to Explore" href="/explore" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background gap-6">
        <EmptyFallback message="Project not found or is private." />
        <ReturnFallback text="Back to Explore" href="/explore" />
      </div>
    );
  }

  const targetSlug = `/${slug}`;
  const page = project.pages?.find(
    (p: any) => p.slug === targetSlug || p.slug === slug,
  );

  if (!page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background p-8">
        <EmptyFallback message={`Page "${slug}" not found in this project.`} />
        <Link
          href={`/explore/${projectId}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-default bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
        >
          Back to project
        </Link>
        <Link
          href="/explore"
          className="text-muted hover:text-primary font-medium text-sm transition-colors"
        >
          Return to community
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen flex flex-col bg-background">
      <motion.header
        className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 border-b border-[var(--header-border)] bg-background/85 backdrop-blur-md flex items-center justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 min-w-0">
          <ReturnFallback
            text="Back to pages"
            href={`/explore/${projectId}`}
          />

          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider truncate">
              {project.name}
            </span>
            <h1 className="text-sm font-bold text-foreground truncate">
              {page.name}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          {project.user && (
            <span className="text-xs font-medium text-muted flex items-center gap-1.5">
              By{" "}
              <span className="text-foreground">{project.user.name}</span>
            </span>
          )}
          <span className="text-xs text-muted bg-background-alt px-3 py-1.5 rounded-full border border-[var(--header-border)]">
            Built with <strong className="text-primary">Cadre</strong>
          </span>
        </div>
      </motion.header>

      <div className="flex-1 w-full relative">
        <Preview page={page} />
      </div>
    </main>
  );
}
