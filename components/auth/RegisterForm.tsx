"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";
import { signUp } from "@/actions/Auth.action";
import { signUpSchema, type SignUpSchema } from "@/schemas/Auth.schema";
import type { ZodIssue } from "zod";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { ErrorFallback } from "../ui/ErrorFallback";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const router = useRouter();

  async function onSubmit(data: SignUpSchema) {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof SignUpSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const response = await signUp(result.data);
    if (!response.success) {
      setError("root", { message: response.error ?? "Something went wrong" });
      return;
    }

    router.push("/login");
    router.refresh();
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
          <UserPlus className="text-primary" size={24} strokeWidth={2} />
          <span>Create account</span>
        </div>

        {errors.root && <ErrorFallback error={errors.root.message} />}

        <Input
          label="Name"
          id="register-name"
          icon={<User />}
          type="text"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          id="register-email"
          icon={<Mail />}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          id="register-password"
          icon={<Lock />}
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <UserPlus size={20} strokeWidth={2} />
          <span>{isSubmitting ? "Creating account…" : "Sign up"}</span>
        </button>

        <p className="text-typography-body text-muted text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-[var(--primary-hover)] transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};
