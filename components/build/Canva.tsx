"use client";

import { useEffect, useRef } from "react";
import { useCanvas } from "@/hooks/useCanvas";
import { ComponentRender } from "./ComponentRender";
import { ASTNode, schemaToASTNode } from "@/types/AstNode.type";
import { PageDto } from "@/types/Page.dto";
import { CanvasDropZone } from "@/components/build/CanvasDropZone";

type CanvaProps = {
  page: PageDto;
};

export const Canva = ({ page }: CanvaProps) => {
  const { components, setComponents } = useCanvas();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current || page?.schema_json == null) return;
    const raw = page.schema_json as Record<string, unknown>;
    if (!raw || typeof raw !== "object") {
      isInitialized.current = true;
      return;
    }
    if (raw.type === "root" && Array.isArray(raw.children)) {
      setComponents(raw.children as ASTNode[]);
    } else if (Object.keys(raw).length > 0) {
      setComponents([schemaToASTNode(raw)]);
    }
    isInitialized.current = true;
  }, [page, setComponents]);

  return (
    <CanvasDropZone>
      <section
        className="canva-dashboard-block flex-1 min-h-full p-[var(--spacing-dashboard)] bg-[var(--dashboard-bg)] [border:var(--dashboard-border)] rounded-[var(--radius-dashboard)]"
        aria-label="Canvas area"
      >
        <div className="flex flex-col gap-3">
          {components.map((c, index) => (
            <ComponentRender key={index} no={c} isEditable={true} />
          ))}
        </div>
      </section>
    </CanvasDropZone>
  );
};
