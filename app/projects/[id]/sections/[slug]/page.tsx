import { getComponents } from "@/actions/ComponentLibrary.action";
import { BuilderClientShell } from "@/components/section/BuilderClientShell";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

type PagesDetailsProps = {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string; tag?: string }>;
};

export default async function PagesDetailsServer({
  params,
  searchParams,
}: PagesDetailsProps) {
  const { id, slug } = await params;
  const search = await searchParams;

  const componentsRes = await getComponents({
    page: Number(search.page) || 1,
    limit: Number(search.limit) || 10,
    tag: search.tag,
  });

  if (!componentsRes.success || !componentsRes.data) {
    return <EmptyFallback message="Falha ao carregar componentes." />;
  }

  return (
    <BuilderClientShell
      projectId={id}
      slug={slug}
      initialComponents={componentsRes.data.data}
      paginationMeta={componentsRes.data.meta}
    />
  );
}
