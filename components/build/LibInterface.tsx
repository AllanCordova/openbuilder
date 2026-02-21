"use client";

import { Plus } from "lucide-react";
import { useCanvas } from "@/hooks/useCanvas";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ASTNode, schemaToASTNode } from "@/types/AstNode.type";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";

type PropsType = {
  components: ComponentLibraryDto[];
};

export const LibInterface = ({ components }: PropsType) => {
  const { addComponent } = useCanvas();

  const handleAdd = (node: ASTNode) => () => {
    addComponent(node);
  };

  return (
    <section
      className="lib-section mb-[var(--spacing-dashboard)]"
      aria-label="Component Library"
    >
      <h2 className="text-[length:var(--text-base)] font-semibold text-foreground mb-3">
        Component Library
      </h2>

      {components.length === 0 ? (
        <EmptyFallback message="No components in the library." />
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          {components.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-2 py-2 px-3 bg-[var(--background-alt)] border border-[var(--border-light)] rounded-[var(--radius-md)]"
            >
              <span className="text-[length:var(--text-sm)] text-foreground font-medium">
                {c.name}
              </span>
              <button
                type="button"
                onClick={handleAdd(schemaToASTNode(c.default_schema_json))}
                className="inline-flex items-center justify-center w-8 h-8 p-0 rounded-[var(--radius-md)] bg-primary text-background border-none cursor-pointer shrink-0 hover:bg-[var(--primary-hover)] transition-colors"
                title="Add to canvas"
                aria-label={`Add ${c.name} to canvas`}
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
