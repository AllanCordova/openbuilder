"use client";

import { Canva } from "@/components/build/Canva";
import { Preview } from "@/components/build/Preview";
import { PageDto } from "@/types/Page.dto";
import { PropertiesPanel } from "../build/PropertiesPanel";

type PagesDetailsProps = {
  page: PageDto;
  viewMode: "preview" | "canva";
  onViewChange: (mode: "preview" | "canva") => void;
};

export const EditorShell = ({
  page,
  viewMode,
  onViewChange,
}: PagesDetailsProps) => {
  const handleToggle = (target: "preview" | "canva") => {
    setTimeout(() => {
      onViewChange(target);
    }, 120);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggle("preview")}
            className={`inline-flex items-center gap-2 py-2 px-3 rounded-default font-medium transition-colors ${
              viewMode === "preview"
                ? "bg-primary text-background"
                : "bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => handleToggle("canva")}
            className={`inline-flex items-center gap-2 py-2 px-3 rounded-default font-medium transition-colors ${
              viewMode === "canva"
                ? "bg-primary text-background"
                : "bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10"
            }`}
          >
            Canva
          </button>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0">
        {viewMode === "preview" && (
          <div className="w-full h-full overflow-y-auto">
            <Preview page={page} />
          </div>
        )}

        {viewMode === "canva" && (
          <div className="flex gap-4 w-full h-full min-h-0">
            <div className="flex-1 min-w-0 h-full overflow-y-auto rounded-md border border-[var(--border-light)]">
              <Canva page={page} />
            </div>

            <aside className="w-80 h-full flex-shrink-0 flex flex-col min-h-0 bg-[var(--background-alt)] border border-[var(--border-light)] rounded-md overflow-hidden">
              <PropertiesPanel />
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
