"use client";

import { useForm } from "react-hook-form";
import { Edit, Check, X } from "lucide-react";
import { updatePageSchema, type UpdatePageSchema } from "@/schemas/Page.schema";
import type { ZodIssue } from "zod";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import type { PageDto } from "@/types/Page.dto";
import { usePageMutations } from "@/hooks/usePages";
import { ErrorFallback } from "../ui/ErrorFallback";
import { toast } from "sonner";

type EditPageModalProps = {
  page: PageDto;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export const EditPageModal = ({
  page,
  isOpen,
  onClose,
  onSuccess,
}: EditPageModalProps) => {
  const { updatePage } = usePageMutations(page.projectId);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePageSchema>({
    defaultValues: { name: page.name },
  });

  async function onSubmit(data: UpdatePageSchema) {
    const result = updatePageSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof UpdatePageSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const response = await updatePage({ id: page.id, data: result.data });

    if (response.success) {
      reset();
      onSuccess?.();
      toast.success("Page edited!");
    } else {
      setError("root", {
        message: response.error,
      });
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit className="text-primary" size={20} strokeWidth={2} />
              <h3 className="text-typography-heading font-semibold text-foreground">
                Edit Page
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-muted hover:text-foreground transition-colors disabled:opacity-60"
              aria-label="Close modal"
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          {errors.root && (
            <ErrorFallback error={errors.root.message as string} />
          )}

          <Input
            label="Page Name"
            id={`edit-page-name-${page.id}`}
            icon={<Edit />}
            type="text"
            placeholder="Page name"
            autoComplete="off"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Check size={20} strokeWidth={2} />
              <span>{isSubmitting ? "Saving…" : "Save"}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-background-alt border border-header hover:bg-background transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <X size={20} strokeWidth={2} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
