"use client";

import { useState } from "react";
import {
  X,
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useProfile, useProfileMutations } from "@/hooks/useProfile";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "sonner";
import Image from "next/image";

const navLinks = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data, isLoading } = useProfile();
  const { logout } = useProfileMutations();

  const handleLogout = async () => {
    const response = await logout();

    if (response.success) {
      router.push("/login");
      toast.success("Logged out successfully!");
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300 ease-in-out shadow-xl lg:shadow-none
          /* Fundo preto/muito escuro, texto claro, e borda na direita com a cor primária */
          bg-[#0a0a0b] text-white border-r border-[var(--primary)]
          lg:sticky lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 ${isCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex items-center justify-center p-4 h-16 border-b border-[var(--primary)] shrink-0">
          <span className="text-xl font-bold truncate">
            <span className="lg:hidden text-[var(--primary)]">Cadre</span>
            <span className="hidden lg:inline text-[var(--primary)]">
              {isCollapsed ? "C" : "Cadre"}
            </span>
          </span>
        </div>

        <div className="hidden lg:flex justify-center p-2 border-b border-[var(--primary)] bg-black/40">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md text-white/70 hover:text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors w-full flex justify-center"
            title={isCollapsed ? "Expandir" : "Retrair"}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                title={isCollapsed ? link.name : ""}
                className={`
                  flex items-center gap-3 py-2 rounded-default transition-all text-sm font-medium
                  px-3 ${isCollapsed ? "lg:px-0 lg:justify-center" : ""}
                  ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "text-white/70 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"
                  }
                `}
              >
                <Icon size={20} className="shrink-0" />
                <span className={`${isCollapsed ? "lg:hidden" : "block"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-[var(--primary)] bg-black/40">
          <div
            className={`
              /* Borda primária na caixa de usuário também */
              border border-[var(--primary)] rounded-default flex items-center bg-[#111113] transition-all gap-3
              p-3 ${isCollapsed ? "lg:p-2 lg:justify-center" : ""}
            `}
          >
            {isLoading ? (
              <Spinner />
            ) : data ? (
              <>
                <div
                  className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase shadow-sm overflow-hidden relative"
                  title={isCollapsed ? data.name : ""}
                >
                  {data.avatar_url ? (
                    <Image
                      src={data.avatar_url}
                      alt={data.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  ) : (
                    <span>{data.name.charAt(0)}</span>
                  )}
                </div>

                <div
                  className={`flex flex-col overflow-hidden flex-1 ${isCollapsed ? "lg:hidden" : "block"}`}
                >
                  <span className="text-sm font-semibold text-white truncate">
                    {data.name || "Usuário"}
                  </span>
                  <span className="text-xs text-white/50 truncate">
                    {data.email || "usuario@builder.com"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className={`p-1.5 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors shrink-0 ${isCollapsed ? "lg:hidden" : "block"}`}
                  title="Sair"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <div
                className={`flex flex-col text-sm w-full text-center text-white/70 ${isCollapsed ? "lg:hidden" : "block"}`}
              >
                <span>Não logado</span>
                <Link
                  href="/login"
                  onClick={onClose}
                  className="text-[var(--primary)] hover:underline font-medium"
                >
                  Fazer login
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
