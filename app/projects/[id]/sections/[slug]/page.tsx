import { getComponents } from "@/actions/ComponentLibrary.action";
import { getPageBySlug } from "@/actions/Page.action";
import { LibInterface } from "@/components/build/LibInterface";
import { SavePage } from "@/components/section/SavePage";
import { EditorShell } from "@/components/section/EditorShell";
import { EmptyFallback } from "@/components/ui/EmptyFallback";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type PagesDetailsProps = {
  params: Promise<{
    id: string;
    slug: string;
  }>;
};

export default async function PagesDetails({ params }: PagesDetailsProps) {
  const { id, slug } = await params;

  const componentsRes = await getComponents();

  const pageRes = await getPageBySlug({ projectId: id, slug: `/${slug}` });

  if (!componentsRes.data) {
    return <EmptyFallback message="Component not found!" />;
  }

  if (!pageRes.data) {
    return <EmptyFallback message="Page not found!" />;
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)" }}
    >
      <article
        className="lib-article"
        style={{
          width: "min(20rem, 100%)",
          minWidth: "16rem",
          padding: "var(--spacing-dashboard)",
          borderRight: "1px solid var(--border-light)",
          flexShrink: 0,
        }}
      >
        <Link
          href={`/projects/${id}`}
          className="flex items-center gap-2 text-primary text-sm mb-4 hover:underline"
        >
          <ChevronLeft size={16} /> Go out
        </Link>
        <h1
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "var(--spacing-dashboard)",
          }}
        >
          Components
        </h1>
        <LibInterface components={componentsRes.data} />
      </article>

      <main
        className="canva-area"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "var(--spacing-dashboard)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <header className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
          <div>
            <span className="text-xs uppercase tracking-wider text-foreground/50 font-bold">
              Edit Page
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              {pageRes.data.name || "Página não encontrada"}
            </h2>
          </div>
          <div>
            <SavePage pageId={pageRes.data.id} projectId={id} />
          </div>
        </header>

        <EditorShell page={pageRes} components={componentsRes} />
      </main>
    </div>
  );
}
