import { getProjectPages } from "@/actions/Page.action";
import { EmptyFallback } from "../ui/fallback/EmptyFallback";
import { PageDeck } from "./PageDeck";
import { ErrorFallback } from "../ui/fallback/ErrorFallback";

export default async function PageGallery({
  projectId,
}: {
  projectId: string;
}) {
  const pages = await getProjectPages({ projectId: projectId });

  if (!pages.success) {
    return <ErrorFallback error={pages.error} />;
  }

  if (!pages.data) {
    return <EmptyFallback message="Pages not found!" />;
  }

  return (
    <div className="w-full h-full min-h-[80vh] flex items-center justify-center">
      <PageDeck projectId={projectId} pages={pages.data} />
    </div>
  );
}
