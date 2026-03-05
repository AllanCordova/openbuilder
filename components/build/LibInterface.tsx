"use client";

import { useCanvas } from "@/hooks/useCanvas";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ASTNode, schemaToASTNode } from "@/types/AstNode.type";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { Filter, FilterOption } from "@/components/ui/Filter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DraggableLibraryItem } from "@/components/build/DraggableLibraryItem";

const componentTags: FilterOption[] = [
  { label: "Buttons", value: "Buttons" },
  { label: "Texts", value: "Texts" },
  { label: "Containers", value: "Containers" },
  { label: "Images", value: "Images" },
  { label: "Inputs", value: "Inputs" },
];

type PropsType = {
  components: ComponentLibraryDto[];
};

export const LibInterface = ({ components }: PropsType) => {
  const { addComponent } = useCanvas();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTag = searchParams.get("tag") || "";

  const handleAdd = (node: ASTNode) => () => {
    addComponent(node);
  };

  const handleFilterChange = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section
      className="lib-section mb-[var(--spacing-dashboard)] flex flex-col gap-4"
      aria-label="Component Library"
    >
      <h2 className="text-[length:var(--text-base)] font-semibold text-foreground">
        Component Library
      </h2>

      <Filter
        options={componentTags}
        activeValue={activeTag}
        onFilterChange={handleFilterChange}
        allLabel="All"
      />

      {components.length === 0 ? (
        <EmptyFallback message="No components in the library." />
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-2">
          {components.map((c) => (
            <DraggableLibraryItem
              key={c.id}
              id={c.id}
              name={c.name}
              schema={c.default_schema_json}
              onAddClick={handleAdd(schemaToASTNode(c.default_schema_json))}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
