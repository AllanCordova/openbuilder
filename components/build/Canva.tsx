"use client";

import { useCanvas } from "@/hooks/useCanvas";
import { ComponentRender } from "../ComponentRender";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

const dashboardBlockStyle: React.CSSProperties = {
  border: "var(--dashboard-border)",
  borderRadius: "var(--radius-dashboard)",
  background: "var(--dashboard-bg)",
  minHeight: "100%",
  padding: "var(--spacing-dashboard)",
  flex: 1,
};

export const Canva = () => {
  const { components } = useCanvas();

  return (
    <section
      className="canva-dashboard-block"
      style={dashboardBlockStyle}
      aria-label="Área do canvas"
    >
      {components.length === 0 ? (
        <EmptyFallback message="Arraste ou adicione componentes aqui." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {components.map((c, index) => (
            <ComponentRender key={index} no={c} />
          ))}
        </div>
      )}
    </section>
  );
};
