"use client";

import { useCanvas } from "@/hooks/useCanvas";
import { ComponentRender } from "../ComponentRender";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

export const Canva = () => {
  const { components } = useCanvas();

  console.log(components);

  return (
    <section
      className="canva-dashboard-block flex-1 min-h-full p-[var(--spacing-dashboard)] bg-[var(--dashboard-bg)] [border:var(--dashboard-border)] rounded-[var(--radius-dashboard)]"
      aria-label="Canvas area"
    >
      {components.length === 0 ? (
        <EmptyFallback message="Add your components here." />
      ) : (
        <div className="flex flex-col gap-3">
          {components.map((c, index) => (
            <ComponentRender key={index} no={c} />
          ))}
        </div>
      )}
    </section>
  );
};
