import { getComponents } from "@/action/ComponentLibrary.action";
import { Canva } from "@/components/build/Canva";
import { LibInterface } from "@/components/build/LibInterface";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

export default async function Home() {
  const response = await getComponents();

  if (!response) {
    return <EmptyFallback message="nenhum componente encontrado"/>;
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
        <h1
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--foreground)",
            marginBottom: "var(--spacing-dashboard)",
          }}
        >
          Construir
        </h1>
        <LibInterface components={response} />
      </article>
      <main
        className="canva-area"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "var(--spacing-dashboard)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Canva />
      </main>
    </div>
  );
}
