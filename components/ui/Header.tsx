"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layout, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "@/actions/Auth.action";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
} | null;

export const Header = () => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

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
        {!loading && (
          <>
            {user ? (
              <>
                <Link
                  href="/project"
                  className="text-header-link-active flex items-center gap-2 text-typography-body transition-colors font-medium"
                  data-testid="header-canvas-link"
                >
                  <Layout size={20} strokeWidth={2} />
                  <span>Canvas</span>
                </Link>
                <div className="flex items-center gap-2 text-header-link text-typography-body px-2 py-1 bg-background-alt rounded-default">
                  <User size={20} strokeWidth={2} />
                  <span data-testid="header-user-name">{user.name}</span>
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
