"use client";

import { use } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useProjectByIdQuery } from "@/hooks/useProjects";
import { PageList } from "@/components/section/PageList";
import { CreatePageForm } from "@/components/section/CreatePageForm";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { ExportProjectButton } from "@/components/project/ExportProjectButton";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: currentProject, isLoading, error } = useProjectByIdQuery(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorFallback error={error.message || "Failed to load project"} />;
  }

  if (!currentProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <EmptyFallback message="Project not found" />
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-default bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2} />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 flex justify-start">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary hover:text-[var(--primary-hover)] transition-colors"
            >
              <ChevronLeft size={18} strokeWidth={2} />
              <span className="hidden sm:inline">Back to Projects</span>
            </Link>
          </div>

          <div className="flex items-center flex-col flex-wrap justify-center gap-x-3 gap-y-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground text-center">
              {currentProject.name}
            </h1>
            <span className="text-sm text-typography-body text-foreground/70 whitespace-nowrap">
              {new Date(currentProject.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex-1"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">Pages</h2>
            <ExportProjectButton projectId={id} />
          </div>

          <div className="lg:col-span-1">
            <CreatePageForm projectId={currentProject.id} />
          </div>

          <div className="lg:col-span-2 h-full">
            <PageList projectId={currentProject.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
