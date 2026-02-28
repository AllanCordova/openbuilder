"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Save,
  UploadCloud,
  ImageIcon,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import type { ZodIssue } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/Auth.action";
import { updateUserSchema, type UpdateUserSchema } from "@/schemas/Auth.schema";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { useProfile } from "@/hooks/useProfile";
import { useImageUpload } from "@/hooks/useImageUpload";

export function UserUpdate() {
  const { data, isLoading } = useProfile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserSchema>({
    defaultValues: { name: "", avatar_url: "" },
  });

  const { handleFileChange, isUploading: isUploadingFile } = useImageUpload({
    onSuccess: (newUrl) =>
      setValue("avatar_url", newUrl, { shouldValidate: true }),
  });

  useEffect(() => {
    if (data) {
      reset({ name: data.name || "", avatar_url: data.avatar_url || "" });
    }
  }, [data, reset]);

  const currentAvatar = watch("avatar_url");

  async function onSubmit(formData: UpdateUserSchema) {
    const result = updateUserSchema.safeParse(formData);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof UpdateUserSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const response = await updateProfile(result.data);
    if (!response.success) {
      setError("root", {
        message: response.error ?? "Failed to update profile",
      });
      return;
    }

    toast.success("Profile updated successfully!");
    router.push("/settings");
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {(isSubmitting || isLoading) && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center rounded-default bg-background/80 backdrop-blur-sm"
            aria-live="polite"
          >
            <Spinner />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full p-8 bg-background-alt border border-header rounded-default shadow-sm"
        >
          <div className="relative flex flex-col items-center gap-2 mb-2 text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="absolute left-0 top-0 p-2 -ml-2 text-muted hover:text-foreground hover:bg-background/50 rounded-default transition-colors"
              title="Go back"
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2 mt-2">
              <User size={28} strokeWidth={2} />
            </div>
            <h2 className="text-typography-display font-semibold text-foreground">
              Edit Profile
            </h2>
            <p className="text-typography-body text-muted">
              Update your personal information and avatar
            </p>
          </div>

          {errors.root && <ErrorFallback error={errors.root.message} />}

          <div className="flex flex-col gap-3">
            <label className="text-typography-body text-foreground font-medium flex items-center gap-2">
              <ImageIcon size={18} className="text-muted" /> Profile Picture
            </label>

            <div className="flex flex-col items-center justify-center gap-4 w-full">
              {isUploadingFile ? (
                <div className="w-full h-40 flex flex-col items-center justify-center rounded-default border-2 border-dashed border-border-light bg-background shadow-sm">
                  <Spinner />
                </div>
              ) : currentAvatar ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="relative w-32 h-32 rounded-default overflow-hidden border-2 border-border-light bg-background shadow-sm mx-auto">
                    <Image
                      src={currentAvatar}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("avatar_url", "", { shouldValidate: true })
                    }
                    className="flex items-center gap-2 text-sm text-[var(--destructive)] hover:opacity-80 font-medium transition-opacity"
                  >
                    <Trash2 size={16} /> Remove Picture
                  </button>
                </div>
              ) : (
                <label className="w-full max-w-[280px] h-40 mx-auto flex flex-col items-center justify-center rounded-default border-2 border-dashed border-border-light bg-background hover:bg-background/50 hover:border-primary transition-all cursor-pointer shadow-sm group">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <UploadCloud
                    className="text-muted w-10 h-10 mb-3 group-hover:text-primary transition-colors"
                    strokeWidth={1.5}
                  />
                  <span className="text-typography-body text-primary font-medium group-hover:text-primary-hover transition-colors">
                    Click to select image
                  </span>
                  <span className="text-xs text-muted mt-2">
                    SVG, PNG, JPG (max 2MB)
                  </span>
                </label>
              )}
            </div>

            <input type="hidden" {...register("avatar_url")} />
            {errors.avatar_url && (
              <span className="text-xs text-[var(--destructive)] flex items-center justify-center gap-1 mt-1">
                {errors.avatar_url.message}
              </span>
            )}
          </div>

          <Input
            label="Display Name"
            id="update-name"
            icon={<User />}
            type="text"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name")}
          />

          <button
            type="submit"
            disabled={isSubmitting || isLoading || isUploadingFile}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={20} strokeWidth={2} />
            <span>{isSubmitting ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
