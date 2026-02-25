"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layout, User, LogOut } from "lucide-react";
import { useProfile, useProfileMutations } from "@/hooks/useProfile";
import { ErrorFallback } from "./ErrorFallback";
import { toast } from "sonner";

export const Header = () => {
  const router = useRouter();
  const { data, isLoading, error } = useProfile();
  const { logout } = useProfileMutations();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      router.push("/login");
      toast.success("Logged out successfully!");
    }
  };

  if (error) {
    return <ErrorFallback error={error.message || "Failed to load user!"} />;
  }

  return (
    <header
      data-testid="header-main-container"
      className="flex items-center justify-between bg-background border-b border-header p-spacing-lg"
    >
      <Link
        href="/"
        className="flex items-center gap-spacing-md text-foreground hover:opacity-90 transition-opacity"
        data-testid="header-logo-link"
      >
        <Layout className="text-primary" size={24} strokeWidth={2} />
        <h1 className="text-typography-heading font-bold">Open Builder</h1>
      </Link>

      <nav className="flex items-center gap-spacing-md">
        {!isLoading && (
          <>
            {data ? (
              <>
                <Link
                  href="/projects"
                  className="text-header-link-active flex items-center gap-2 text-typography-body transition-colors font-medium"
                  data-testid="header-canvas-link"
                >
                  <Layout size={20} strokeWidth={2} />
                  <span>Canvas</span>
                </Link>
                <div className="flex items-center gap-2 text-header-link text-typography-body px-2 py-1 bg-background-alt rounded-default">
                  <User size={20} strokeWidth={2} />
                  <span data-testid="header-user-name">{data.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 text-typography-body hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-default cursor-pointer"
                  title="Sair da conta"
                  data-testid="header-logout-button"
                >
                  <LogOut size={20} strokeWidth={2} />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-header-link flex items-center gap-2 text-typography-body transition-colors"
                  data-testid="header-login-link"
                >
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="text-header-link flex items-center gap-2 text-typography-body transition-colors"
                  data-testid="header-register-link"
                >
                  <span>Register</span>
                </Link>
                <Link
                  href="/projects"
                  className="text-header-link-active flex items-center gap-2 text-typography-body transition-colors font-medium"
                  data-testid="header-canvas-link"
                >
                  <Layout size={20} strokeWidth={2} />
                  <span>Projects</span>
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};
