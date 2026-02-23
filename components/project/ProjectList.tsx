"use client";

import { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useProjectsList, useProjectMutations } from "@/hooks/useProjects";
import { EditProjectModal } from "./EditProjectModal";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { Spinner } from "../ui/Spinner";
import Link from "next/link";
import { ErrorFallback } from "../ui/ErrorFallback";

export const ProjectList = () => {
  const { data: projects = [], isLoading, error } = useProjectsList();
  const { deleteProject } = useProjectMutations();

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const editingProject = projects.find((p) => p.id === editingProjectId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorFallback error={error.message || "Failed to load projects"} />;
  }

  if (projects.length === 0) {
    return <EmptyFallback message="No projects yet" />;
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between p-4 bg-background border border-border-light rounded-default"
        >
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
          >
            <h3 className="text-typography-body font-semibold text-foreground">
              {project.name}
            </h3>
          </Link>

          <div className="flex gap-2 justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                setEditingProjectId(project.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors text-sm"
              aria-label="Edit project"
            >
              <Edit size={16} strokeWidth={2} />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(project.id);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-default font-medium text-typography-body bg-[var(--destructive)]/10 text-[var(--destructive)] hover:bg-[var(--destructive)]/20 transition-colors text-sm"
              aria-label="Delete project"
            >
              <Trash2 size={16} strokeWidth={2} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          isOpen={editingProjectId !== null}
          onClose={() => setEditingProjectId(null)}
          onSuccess={() => setEditingProjectId(null)}
        />
      )}
    </div>
  );
};
