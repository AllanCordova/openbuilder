"use client";

import { CreateProjectForm } from "@/components/project/CreateProjectForm";
import { ProjectList } from "@/components/project/ProjectList";

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-canvas mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-typography-display font-bold text-foreground mb-2">
            Projects
          </h1>
          <p className="text-typography-body text-muted">
            Create and manage your projects
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <CreateProjectForm />
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-default border border-header bg-background-alt p-6">
              <h2 className="text-typography-heading font-semibold text-foreground mb-6">
                Your Projects
              </h2>
              <ProjectList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
