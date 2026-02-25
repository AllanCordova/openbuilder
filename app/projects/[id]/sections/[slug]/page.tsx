import { getComponents } from "@/actions/ComponentLibrary.action";
import { BuilderClientShell } from "@/components/section/BuilderClientShell";
import { EmptyFallback } from "@/components/ui/EmptyFallback";

type PagesDetailsProps = {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function PagesDetailsServer({
  params,
  searchParams,
}: PagesDetailsProps) {
  const { id, slug } = await params;
  const search = await searchParams;

  const page = Number(search.page) || 1;
  const limit = Number(search.limit) || 10;

  const componentsRes = await getComponents({ page, limit });

  if (!componentsRes?.data) {
    return <EmptyFallback message="Component not found!" />;
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
