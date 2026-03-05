"use client";

import { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Edit,
  LayoutGrid,
  MoreVertical,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useProjectsList, useProjectMutations } from "@/hooks/useProjects";
import { EditProjectModal } from "./EditProjectModal";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { Spinner } from "@/components/ui/Spinner";
import Link from "next/link";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { ProjectDto } from "@/types/Project.dto";

function ProjectCardMenu({
  projectId,
  onEdit,
  onDelete,
  onClose,
}: {
  projectId: string;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <Link
        href={`/projects/${projectId}/sections`}
        onClick={onClose}
        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-foreground hover:bg-primary/10 rounded-md transition-colors"
      >
        <LayoutGrid size={16} />
        <span>Gallery</span>
      </Link>
      <button
        type="button"
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-foreground hover:bg-primary/10 rounded-md transition-colors text-left"
      >
        <Edit size={16} />
        <span>Edit</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[var(--destructive)] hover:bg-destructive/10 rounded-md transition-colors text-left"
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </button>
    </>
  );
}

export const ProjectList = () => {
  const { data: projects = [], isLoading, error } = useProjectsList();
  const { deleteProject } = useProjectMutations();
  const { ask } = useConfirmModal();

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const editingProject = projects.find((p) => p.id === editingProjectId);

  useEffect(() => {
    if (!menuOpenId) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpenId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorFallback error={error.message || "Failed to load projects"} />;
  }

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyFallback message="No projects yet. Create one above." />
      </motion.div>
    );
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await ask(
      "Are you sure you want to delete this project?",
    );
    if (isConfirmed) {
      await deleteProject(id);
      toast.success("Project deleted!");
    }
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.05 },
          },
          hidden: {},
        }}
      >
        {projects.map((project: ProjectDto) => (
          <motion.article
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 0.61, 0.36, 1],
                },
              },
            }}
            className="group flex flex-col p-6 rounded-default bg-background-alt border border-[var(--header-border)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-typography-heading font-bold text-foreground truncate flex-1 min-w-0">
                {project.name}
              </h3>
              <div className="relative shrink-0" ref={menuOpenId === project.id ? menuRef : undefined}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpenId((id) => (id === project.id ? null : project.id));
                  }}
                  className="p-2 rounded-default text-muted hover:text-foreground hover:bg-primary/10 transition-colors"
                  aria-label="Project actions"
                  aria-expanded={menuOpenId === project.id}
                >
                  <MoreVertical size={20} />
                </button>
                {menuOpenId === project.id && (
                  <div
                    className="absolute right-0 top-full mt-1 py-1 min-w-[160px] rounded-default border border-[var(--header-border)] bg-background shadow-lg z-50"
                    role="menu"
                  >
                    <ProjectCardMenu
                      projectId={project.id}
                      onEdit={() => setEditingProjectId(project.id)}
                      onDelete={() => handleDelete(project.id)}
                      onClose={() => setMenuOpenId(null)}
                    />
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-muted mb-6">
              Manage pages, create new ones, or open the visual gallery.
            </p>

            <div className="mt-auto flex flex-col gap-3">
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-default font-semibold text-sm bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors group/link"
              >
                <FileText size={18} />
                <span>Manage pages</span>
                <ArrowRight
                  size={16}
                  className="opacity-70 group-hover/link:translate-x-0.5 transition-transform"
                />
              </Link>
              <Link
                href={`/projects/${project.id}/sections`}
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-default font-medium text-sm border border-[var(--header-border)] text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <LayoutGrid size={16} />
                <span>View gallery</span>
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          isOpen={editingProjectId !== null}
          onClose={() => setEditingProjectId(null)}
          onSuccess={() => setEditingProjectId(null)}
        />
      )}
    </>
  );
};
