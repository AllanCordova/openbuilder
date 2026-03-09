"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EmptyFallback } from "@/components/ui/fallback/EmptyFallback";
import type { PageDto } from "@/types/Page.dto";

type PublicPageListProps = {
  projectId: string;
  pages: PageDto[];
};

export const PublicPageList = ({ projectId, pages }: PublicPageListProps) => {
  if (!pages || pages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <EmptyFallback message="No public pages available for this project." />
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <motion.h2
        className="text-typography-heading font-bold text-foreground mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Project pages
      </motion.h2>
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.08 },
          },
          hidden: {},
        }}
      >
        {pages.map((page) => (
          <motion.div
            key={page.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 0.61, 0.36, 1],
                },
              },
            }}
          >
            <Link
              href={`/explore/${projectId}/${page.slug}`}
              className="group flex items-center justify-between p-5 rounded-default bg-background-alt border border-[var(--header-border)] hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-11 h-11 rounded-default bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-colors shrink-0">
                  <FileText size={22} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-typography-body font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-sm text-muted truncate mt-0.5">
                    {page.slug}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all duration-300 shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
