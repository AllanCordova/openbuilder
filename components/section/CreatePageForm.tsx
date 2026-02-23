"use client";

import { useForm } from "react-hook-form";
import { FileText, AlertCircle } from "lucide-react";
import { createPageSchema, type CreatePageSchema } from "@/schemas/Page.schema";
import type { ZodIssue } from "zod";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { usePageMutations } from "@/hooks/usePages";
import { ErrorFallback } from "../ui/ErrorFallback";

type CreatePageFormProps = {
  projectId: string;
  onSuccess?: () => void;
};

export const CreatePageForm = ({
  projectId,
  onSuccess,
}: CreatePageFormProps) => {
  const { createPage } = usePageMutations(projectId);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePageSchema>({
    defaultValues: { projectId, name: "" },
  });

  async function onSubmit(data: CreatePageSchema) {
    const result = createPageSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof CreatePageSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const response = await createPage(result.data);

    if (response.success) {
      reset({ projectId, name: "" });
      onSuccess?.();
    } else {
      setError("root", { message: response.error });
    }
  }

  return (
    <div className="relative w-full">
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
          <FileText className="text-primary" size={24} strokeWidth={2} />
          <span>Create Page</span>
        </div>

        {errors.root && <ErrorFallback error={errors.root.message} />}

        <Input
          label="Page Name"
          id="create-page-name"
          icon={<FileText />}
          type="text"
          placeholder="e.g., Home, Dashboard"
          autoComplete="off"
          error={errors.name?.message}
          {...register("name")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FileText size={20} strokeWidth={2} />
          <span>{isSubmitting ? "Creating…" : "Create Page"}</span>
        </button>
      </form>
    </div>
  );
};
