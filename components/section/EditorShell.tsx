"use client";

import { useState } from "react";
import { Page } from "@prisma/client";
import { Spinner } from "@/components/ui/Spinner";
import { Canva } from "@/components/build/Canva";
import { Preview } from "@/components/build/Preview";
import { ActionResponse } from "@/types/ActionResponse.type";
import { usePages } from "@/hooks/usePages";
import { ErrorFallback } from "../ui/ErrorFallback";
import { EmptyFallback } from "../ui/EmptyFallback";

type Props = {
  page: ActionResponse<Page>;
  components: ActionResponse<any[]>;
};

export const EditorShell = ({ page, components }: Props) => {
  const [view, setView] = useState<"preview" | "canva">("preview");
  const [isLoading, setIsLoading] = useState(false);
  const {} = usePages();

  const handleToggle = (target: "preview" | "canva") => {
    setIsLoading(true);
    setTimeout(() => {
      setView(target);
      setIsLoading(false);
    }, 120);
  };

  const pageError = !page.success ? page.error : null;
  const componentsError = !components.success ? components.error : null;
  const pageData = page.success ? page.data : null;

  if (pageError) {
    return <ErrorFallback error={pageError} name="Page Error:" />;
  }

  if (componentsError) {
    return <ErrorFallback error={componentsError} name="Components Error:" />;
  }

  if (!pageData) {
    return <EmptyFallback message="Page data not available." />;
  }

  if (isLoading) {
    return (
      <div className="py-6 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggle("preview")}
            className={`inline-flex items-center gap-2 py-2 px-3 rounded-default font-medium transition-colors ${
              view === "preview"
                ? "bg-primary text-background"
                : "bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => handleToggle("canva")}
            className={`inline-flex items-center gap-2 py-2 px-3 rounded-default font-medium transition-colors ${
              view === "canva"
                ? "bg-primary text-background"
                : "bg-background-alt text-foreground hover:bg-[var(--primary-hover)]/10"
            }`}
          >
            Canva
          </button>
        </div>
      </div>

      <div className="w-full">
        {view === "preview" && <Preview page={pageData} />}
        {view === "canva" && <Canva />}
      </div>
    </div>
  );
};
