"use client";

import { useForm } from "react-hook-form";
import { FolderPlus } from "lucide-react";
import {
  createProjectSchema,
  type CreateProjectSchema,
} from "@/schemas/Project.schema";
import type { ZodIssue } from "zod";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useProjects } from "@/hooks/useProjects";

type CreateProjectFormProps = {
  onSuccess?: () => void;
};

export const CreateProjectForm = ({ onSuccess }: CreateProjectFormProps) => {
  const { addProject } = useProjects();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectSchema>({
    defaultValues: { name: "" },
  });

  async function onSubmit(data: CreateProjectSchema) {
    const result = createProjectSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof CreateProjectSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const isSuccess = await addProject(result.data);

    if (isSuccess) {
      reset();
      onSuccess?.();
    }
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {isSubmitting && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-default"
          style={{ background: "var(--background)" }}
          aria-live="polite"
        >
          <Spinner />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full p-6 bg-background-alt border border-header rounded-default"
      >
        <div className="flex items-center gap-2 text-typography-heading font-semibold text-foreground">
          <FolderPlus className="text-primary" size={24} strokeWidth={2} />
          <span>Create Project</span>
        </div>

        <Input
          label="Project Name"
          id="create-project-name"
          icon={<FolderPlus />}
          type="text"
          placeholder="My awesome project"
          autoComplete="off"
          error={errors.name?.message}
          {...register("name")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FolderPlus size={20} strokeWidth={2} />
          <span>{isSubmitting ? "Creating…" : "Create Project"}</span>
        </button>
      </form>
    </div>
  );
};
