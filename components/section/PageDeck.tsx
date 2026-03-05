"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Preview } from "../build/Preview";
import { PageDto } from "@/types/Page.dto";

interface PageDeckProps {
  projectId: string;
  pages: PageDto[];
}

export const PageDeck = ({ projectId, pages }: PageDeckProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % pages.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + pages.length) % pages.length);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-4 md:p-6 relative">
      {pages.length > 1 && (
        <div className="flex items-center justify-between md:justify-end w-full gap-4 mb-6 md:pr-12">
          <div className="text-typography-body font-medium text-muted md:hidden">
            {activeIndex + 1} / {pages.length}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={prevCard}
              className="p-3 rounded-full bg-secondary/10 text-primary hover:bg-secondary/20 transition-colors shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft size={24} />
            </button>

            <span className="font-medium text-typography-body hidden md:block text-muted">
              {activeIndex + 1} / {pages.length}
            </span>

            <button
              onClick={nextCard}
              className="p-3 rounded-full bg-secondary/10 text-primary hover:bg-secondary/20 transition-colors shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="relative w-full aspect-[3/4] md:aspect-[16/10] max-h-[700px] md:pr-12 perspective-1000 flex items-center justify-center">
        <div className="relative w-full h-full">
          {pages.map((page, index) => {
            const isActive = index === activeIndex;
            const isSecond = index === (activeIndex + 1) % pages.length;
            const isThird = index === (activeIndex + 2) % pages.length;

            if (!isActive && !isSecond && !isThird && pages.length > 3) {
              return null;
            }

            let zIndex = 0;
            let transformStyles = "";
            let opacity = 0;

            if (isActive) {
              zIndex = 30;
              transformStyles = "translate(0px, 0px) scale(1)";
              opacity = 1;
            } else if (isSecond) {
              zIndex = 20;
              transformStyles = "translate(4%, -4%) scale(0.95)";
              opacity = 0.8;
            } else if (isThird) {
              zIndex = 10;
              transformStyles = "translate(8%, -8%) scale(0.9)";
              opacity = 0.5;
            }

            return (
              <div
                key={page.id}
                onClick={() => !isActive && setActiveIndex(index)}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out rounded-[var(--radius-lg)] border border-border-light shadow-2xl bg-background overflow-hidden ${
                  !isActive ? "cursor-pointer hover:brightness-95" : ""
                }`}
                style={{
                  zIndex,
                  transform: transformStyles,
                  opacity,
                }}
              >
                <div className="w-full h-full pointer-events-none overflow-hidden flex justify-center bg-background">
                  <Preview page={page} />
                </div>

                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col sm:flex-row items-start sm:items-end justify-between text-white pointer-events-none gap-4">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold">
                        {page.name}
                      </h2>
                      <p className="text-white/80 font-mono mt-1 md:mt-2 text-sm md:text-base">
                        {page.slug}
                      </p>
                    </div>
                    <Link
                      href={`/projects/${projectId}/sections/${page.slug.replace(/^\//, "")}`}
                      className="flex items-center justify-center w-full sm:w-auto gap-2 bg-primary text-background px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform pointer-events-auto shadow-lg"
                    >
                      <Eye size={18} />
                      View
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
