"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { signIn } from "@/actions/Auth.action";
import { signInSchema, type SignInSchema } from "@/schemas/Auth.schema";
import type { ZodIssue } from "zod";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";
import { ErrorFallback } from "../ui/ErrorFallback";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  async function onSubmit(data: SignInSchema) {
    const result = signInSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((err: ZodIssue) => {
        const path = err.path[0] as keyof SignInSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    const response = await signIn(result.data);
    if (!response.success) {
      setError("root", { message: response.error ?? "Something went wrong" });
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {isSubmitting && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-default bg-background/80"
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
          <LogIn className="text-primary" size={24} strokeWidth={2} />
          <span>Sign in</span>
        </div>

        {errors.root && <ErrorFallback error={errors.root.message} />}

        <Input
          label="Email"
          id="login-email"
          icon={<Mail />}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          id="login-password"
          icon={<Lock />}
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <LogIn size={20} strokeWidth={2} />
          <span>{isSubmitting ? "Signing in…" : "Sign in"}</span>
        </button>

        <p className="text-typography-body text-muted text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-[var(--primary-hover)] transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
