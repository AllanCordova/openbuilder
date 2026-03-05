import PageGallery from "@/components/section/PageGallery";

type PagesProps = {
  params: Promise<{ id: string }>;
};

export default async function Sections({ params }: PagesProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-6 w-full">
      <h1 className="text-4xl font-bold text-foreground">Gallery</h1>
      <PageGallery projectId={id} />
    </div>
  );
}
