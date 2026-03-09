"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Mail, Calendar, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { AmbientOrbs, ScrollReveal } from "@/components/landing";
import { useProfile } from "@/hooks/useProfile";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/fallback/EmptyFallback";

export default function ProfilePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="relative min-h-screen flex flex-col bg-background">
        <AmbientOrbs />
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
          <Spinner />
          <p className="text-typography-body text-muted animate-pulse">
            Loading profile...
          </p>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative min-h-screen flex flex-col bg-background">
        <AmbientOrbs />
        <main className="relative z-10 flex-1 flex items-center justify-center px-4">
          <EmptyFallback message="Could not load profile data." />
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AmbientOrbs />
      <main className="relative z-10 flex-1 w-full">
        <section className="relative py-16 px-4 overflow-hidden">
          <ScrollReveal className="relative z-10 max-w-canvas mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-[var(--header-border)] text-sm font-medium mb-6 w-fit"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <User size={18} />
                <span>Account</span>
              </motion.div>
              <Link
                href="/settings/edit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-default font-semibold text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:shadow-[var(--shadow-primary)] hover:scale-[1.02] active:scale-[0.98] shrink-0 w-fit"
              >
                <Edit2 size={18} strokeWidth={2} />
                <span>Edit Profile</span>
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
              My Profile
            </h1>
            <p className="text-typography-body text-muted max-w-xl">
              Manage your personal information and account settings
            </p>
          </ScrollReveal>
        </section>

        <section className="relative z-10 px-4 pb-24">
          <div className="max-w-canvas mx-auto w-full">
            <ScrollReveal>
              <div className="rounded-default border border-[var(--header-border)] bg-background-alt overflow-hidden shadow-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-[var(--header-border)] bg-background/50">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-background bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                    {data.avatar_url ? (
                      <Image
                        src={data.avatar_url}
                        alt={data.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 112px, 128px"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-primary uppercase">
                        {data.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h2 className="text-2xl font-semibold text-foreground">
                      {data.name}
                    </h2>
                    <p className="text-typography-body text-muted flex items-center gap-2 mt-1">
                      <Mail size={16} className="shrink-0" />
                      {data.email}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  <h3 className="text-typography-heading font-semibold text-foreground flex items-center gap-2">
                    <div className="w-10 h-10 rounded-default bg-primary/10 flex items-center justify-center text-primary">
                      <User size={20} strokeWidth={2} />
                    </div>
                    Account Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 p-5 rounded-default border border-[var(--header-border)] bg-background hover:border-primary/20 transition-colors">
                      <span className="text-sm font-medium text-muted uppercase tracking-wider">
                        Full Name
                      </span>
                      <span className="text-typography-body text-foreground font-medium">
                        {data.name}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 p-5 rounded-default border border-[var(--header-border)] bg-background hover:border-primary/20 transition-colors">
                      <span className="text-sm font-medium text-muted uppercase tracking-wider">
                        Email Address
                      </span>
                      <span className="text-typography-body text-foreground font-medium">
                        {data.email}
                      </span>
                    </div>
                    {data.createdAt && (
                      <div className="flex flex-col gap-1 p-5 rounded-default border border-[var(--header-border)] bg-background hover:border-primary/20 transition-colors sm:col-span-2">
                        <span className="text-sm font-medium text-muted uppercase tracking-wider flex items-center gap-2">
                          <Calendar size={14} /> Member Since
                        </span>
                        <span className="text-typography-body text-foreground font-medium">
                          {new Date(data.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </div>
  );
}
