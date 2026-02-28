"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Mail, Calendar, Edit2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

export default function ProfilePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner />
        <p className="text-typography-body text-muted animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!data) {
    return <EmptyFallback message="Could not load profile data." />;
  }

  return (
    <div className="p-spacing-lg max-w-4xl mx-auto w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-typography-display font-bold text-foreground">
            My Profile
          </h1>
          <p className="text-typography-body text-muted">
            Manage your personal information and account settings
          </p>
        </div>

        <Link
          href="/settings/edit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-default font-medium text-typography-body bg-primary text-background hover:bg-[var(--primary-hover)] transition-colors shrink-0"
        >
          <Edit2 size={18} strokeWidth={2} />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="bg-background-alt border border-header rounded-default overflow-hidden shadow-sm">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-border-light bg-background/50">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-background bg-[var(--primary)]/10 flex items-center justify-center shrink-0 shadow-sm">
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

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-2 sm:mt-4">
            <h2 className="text-typography-display font-semibold text-foreground">
              {data.name}
            </h2>
            <p className="text-typography-body text-muted flex items-center gap-2 mt-1">
              <Mail size={16} className="shrink-0" />
              {data.email}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <h3 className="text-typography-heading font-medium text-foreground flex items-center gap-2">
            <User size={20} className="text-primary" />
            Account Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1 p-4 rounded-default border border-border-light bg-background">
              <span className="text-[length:var(--text-sm)] font-medium text-muted uppercase tracking-wider">
                Full Name
              </span>
              <span className="text-typography-body text-foreground font-medium">
                {data.name}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-4 rounded-default border border-border-light bg-background">
              <span className="text-[length:var(--text-sm)] font-medium text-muted uppercase tracking-wider">
                Email Address
              </span>
              <span className="text-typography-body text-foreground font-medium">
                {data.email}
              </span>
            </div>

            {data.createdAt && (
              <div className="flex flex-col gap-1 p-4 rounded-default border border-border-light bg-background">
                <span className="text-[length:var(--text-sm)] font-medium text-muted uppercase tracking-wider flex items-center gap-2">
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
    </div>
  );
}
