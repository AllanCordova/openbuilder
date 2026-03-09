import { schemaToASTNode } from "@/types/AstNode.type";
import { Page } from "@prisma/client";
import { ComponentRender } from "./ComponentRender";

type PropsType = {
  page: Page;
};

export const Preview = ({ page }: PropsType) => {
  let raw = page.schema_json as any;

  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch (error) {
      console.error("Failed to parse schema_json for page:", page.id);
      return (
        <div className="flex h-full items-center justify-center text-gray-400">
          Invalid Schema
        </div>
      );
    }
  }

  const schema =
    raw && Array.isArray(raw.root)
      ? { type: "root", props: {}, children: raw.root }
      : schemaToASTNode(raw);

  return (
    <div className="w-full h-full bg-background">
      <div className="">
        <ComponentRender no={schema} isEditable={false} />
      </div>
    </div>
  );
};
