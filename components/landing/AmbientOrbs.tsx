"use client";

export function AmbientOrbs() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.18]"
      aria-hidden
    >
      <div
        className="absolute left-1/4 w-80 h-80 rounded-full blur-3xl bg-[var(--primary)]"
        style={{ top: "5%", transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute right-0 w-72 h-72 rounded-full blur-3xl bg-[var(--primary-hover)]"
        style={{ top: "15%", transform: "translate(40%, -50%)" }}
      />
      <div
        className="absolute left-0 w-64 h-64 rounded-full blur-3xl bg-[var(--primary)]"
        style={{ top: "35%", transform: "translate(-30%, -50%)" }}
      />
      <div
        className="absolute right-1/3 w-80 h-80 rounded-full blur-3xl bg-[var(--primary-hover)]"
        style={{ top: "45%", transform: "translate(50%, -50%)" }}
      />
      <div
        className="absolute left-1/3 w-72 h-72 rounded-full blur-3xl bg-[var(--primary)]"
        style={{ top: "60%", transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute right-0 w-64 h-64 rounded-full blur-3xl bg-[var(--primary-hover)]"
        style={{ top: "72%", transform: "translate(30%, -50%)" }}
      />
      <div
        className="absolute left-0 w-80 h-80 rounded-full blur-3xl bg-[var(--primary)]"
        style={{ top: "88%", transform: "translate(-20%, -50%)" }}
      />
      <div
        className="absolute right-1/4 w-64 h-64 rounded-full blur-3xl bg-[var(--primary-hover)]"
        style={{ top: "98%", transform: "translate(50%, -50%)" }}
      />
    </div>
  );
}
