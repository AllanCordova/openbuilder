"use client";

import { useEffect, useRef } from "react";
import { useCanvas } from "@/hooks/useCanvas";
import { ComponentRender } from "../ComponentRender";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { schemaToASTNode } from "@/types/AstNode.type";
import { PageDto } from "@/types/Page.dto";

type CanvaProps = {
  page: PageDto;
};

export const Canva = ({ page }: CanvaProps) => {
  const { components, setComponents } = useCanvas();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && page?.schema_json) {
      const raw = page.schema_json as any;
      let initialComponents = [];

      if (raw && Array.isArray(raw.root)) {
        initialComponents = raw.root;
      } else if (raw && Object.keys(raw).length > 0) {
        initialComponents = [schemaToASTNode(raw)];
      }

      setComponents(initialComponents);
      isInitialized.current = true;
    }
  }, [page, setComponents]);

  return (
    <section
      className="canva-dashboard-block flex-1 min-h-full p-[var(--spacing-dashboard)] bg-[var(--dashboard-bg)] [border:var(--dashboard-border)] rounded-[var(--radius-dashboard)]"
      aria-label="Canvas area"
    >
      {components.length === 0 ? (
        <EmptyFallback
          message="Add your components here."
          showBackButton={false}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {components.map((c, index) => (
            <ComponentRender key={index} no={c} isEditable={true} />
          ))}
        </div>
      )}
    </section>
  );
};
