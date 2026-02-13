"use client";

import { Plus } from "lucide-react";
import { useCanvas } from "@/hooks/useCanvas";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ASTNode, schemaToASTNode } from "@/types/AstNode.type";
import { ComponentLibrary } from "@prisma/client";

type PropsType = {
  components: ComponentLibrary[];
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  padding: "0.5rem 0.75rem",
  background: "var(--background-alt)",
  border: "1px solid var(--border-light)",
  borderRadius: "var(--radius-md)",
};

const addButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  padding: 0,
  borderRadius: "var(--radius-md)",
  background: "var(--primary)",
  color: "var(--background)",
  border: "none",
  cursor: "pointer",
  flexShrink: 0,
};

export const LibInterface = ({ components }: PropsType) => {
  const { addComponent } = useCanvas();

  const handleAdd = (node: ASTNode) => () => {
    addComponent(node);
  };

  return (
    <section
      className="lib-section"
      aria-label="Biblioteca de componentes"
      style={{ marginBottom: "var(--spacing-dashboard)" }}
    >
      <h2
        style={{
          fontSize: "var(--text-base)",
          fontWeight: 600,
          color: "var(--foreground)",
          marginBottom: "0.75rem",
        }}
      >
        Biblioteca de componentes
      </h2>
      {components.length === 0 ? (
        <EmptyFallback message="Nenhum componente na biblioteca." />
      ) : (
        <ul style={listStyle}>
          {components.map((c) => (
            <li key={c.id} style={itemStyle}>
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--foreground)",
                  fontWeight: 500,
                }}
              >
                {c.name}
              </span>
              <button
                type="button"
                onClick={handleAdd(schemaToASTNode(c.default_schema_json))}
                style={addButtonStyle}
                title="Adicionar ao canvas"
                aria-label={`Adicionar ${c.name} ao canvas`}
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
