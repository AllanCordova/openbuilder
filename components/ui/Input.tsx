"use client";

import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

type InputProps = {
  label: string;
  id: string;
  icon: React.ReactNode;
  error?: string;
} & React.ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, icon, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={id}
          className="text-typography-body text-foreground font-medium"
        >
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted [&>svg]:size-[18px] [&>svg]:stroke-[2]">
            {icon}
          </div>
          <input
            ref={ref}
            id={id}
            className={`w-full pl-10 pr-4 py-3 text-typography-body text-foreground bg-background border rounded-default outline-none transition-colors placeholder:text-muted ${
              error ? "border-[var(--destructive)]" : "border-border-light"
            } focus:border-[var(--primary)] ${className}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
        </div>
        <div
          id={`${id}-error`}
          role="alert"
          className={`min-h-[1.25rem] text-[length:var(--text-sm)] flex items-center gap-1 mt-1 ${error ? "visible text-[var(--destructive)]" : "invisible"}`}
        >
          {error && (
            <>
              <AlertCircle size={14} strokeWidth={2} className="shrink-0 text-[var(--destructive)]" />
              <span>{error}</span>
            </>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
