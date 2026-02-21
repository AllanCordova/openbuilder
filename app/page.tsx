import Link from "next/link";
import { Layout, Sparkles, Code, Zap } from "lucide-react";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-spacing-lg max-w-canvas mx-auto w-full">
        <section className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Layout className="text-primary" size={48} strokeWidth={2} />
            <h1 className="text-typography-display font-bold text-foreground">
              Open Builder
            </h1>
          </div>
          <p className="text-typography-body text-muted max-w-2xl mx-auto mb-8">
            Build beautiful interfaces with our visual component builder. Drag,
            drop, and customize components to create your perfect application.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-default font-medium text-typography-body hover:bg-[var(--primary-hover)] transition-colors"
          >
            <span>Start Building</span>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <div className="flex flex-col items-center p-6 bg-background-alt border border-header rounded-default">
            <div className="bg-primary/10 p-4 rounded-default mb-4">
              <Code className="text-primary" size={32} strokeWidth={2} />
            </div>
            <h2 className="text-typography-heading font-semibold text-foreground mb-2">
              Component Library
            </h2>
            <p className="text-typography-body text-muted text-center">
              Access a rich library of pre-built components ready to use in your
              projects.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-background-alt border border-header rounded-default">
            <div className="bg-primary/10 p-4 rounded-default mb-4">
              <Layout className="text-primary" size={32} strokeWidth={2} />
            </div>
            <h2 className="text-typography-heading font-semibold text-foreground mb-2">
              Visual Canvas
            </h2>
            <p className="text-typography-body text-muted text-center">
              Drag and drop components onto the canvas to build your interface
              visually.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-background-alt border border-header rounded-default">
            <div className="bg-primary/10 p-4 rounded-default mb-4">
              <Zap className="text-primary" size={32} strokeWidth={2} />
            </div>
            <h2 className="text-typography-heading font-semibold text-foreground mb-2">
              Fast Development
            </h2>
            <p className="text-typography-body text-muted text-center">
              Speed up your development process with our intuitive builder
              interface.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
