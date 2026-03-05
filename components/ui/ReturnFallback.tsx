"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ReturnFallbackProps = {
  text?: string;
  href?: string;
};

export const ReturnFallback = ({
  text = "Go Back",
  href,
}: ReturnFallbackProps) => {
  const router = useRouter();

  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors w-fit";

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={text}>
        <ArrowLeft size={16} strokeWidth={2.5} />
        <span>{text}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={() => router.back()}
      className={baseClasses}
      aria-label="Go back"
    >
      <ArrowLeft size={16} strokeWidth={2.5} />
      <span>{text}</span>
    </button>
  );
};
