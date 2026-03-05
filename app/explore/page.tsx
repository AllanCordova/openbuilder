"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Library, ArrowRight } from "lucide-react";
import { usePublicProjectsList } from "@/hooks/usePublicProjects";
import { Spinner } from "@/components/ui/Spinner";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { ScrollReveal, AmbientOrbs } from "@/components/landing";

export default function ExplorePage() {
  const { data: projects = [], isLoading, error } = usePublicProjectsList();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-spacing-lg bg-background">
        <ErrorFallback error={error.message || "Failed to load projects"} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <AmbientOrbs />
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <ScrollReveal className="relative z-10 max-w-canvas mx-auto w-full text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-[var(--header-border)] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Library size={18} />
            <span>Public gallery</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Community templates
          </h1>
          <p className="text-typography-body text-muted max-w-2xl mx-auto">
            Explore and use projects built by the community. Get inspired or
            use them as a starting point.
          </p>
        </ScrollReveal>
      </section>

      <section className="relative z-10 flex-1 px-4 pb-24">
        <div className="max-w-canvas mx-auto w-full">
          {projects.length === 0 ? (
            <ScrollReveal>
              <EmptyFallback message="No public projects found at the moment." />
            </ScrollReveal>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
                hidden: {},
              }}
            >
              {projects.map((project: any) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.45,
                        ease: [0.22, 0.61, 0.36, 1],
                      },
                    },
                  }}
                >
                  <Link
                    href={`/explore/${project.id}`}
                    className="group block h-full flex flex-col p-6 rounded-default bg-background-alt border border-[var(--header-border)] hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <h3 className="text-typography-heading font-bold text-foreground mb-4 truncate text-center group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    <div className="flex items-center justify-center gap-3 mb-6">
                      {project.user?.avatar_url ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[var(--header-border)] shrink-0">
                          <Image
                            src={project.user.avatar_url}
                            alt={project.user.name ?? "Author"}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-[var(--header-border)] shrink-0">
                          <User size={18} />
                        </div>
                      )}
                      <span className="text-sm text-muted font-medium truncate">
                        {project.user?.name || "Anonymous"}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>View preview</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
