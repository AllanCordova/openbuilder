import { schemaToASTNode } from "@/types/AstNode.type";
import { Page } from "@prisma/client";
import { ComponentRender } from "../ComponentRender";

type PropsType = {
  page: Page;
};

export const Preview = ({ page }: PropsType) => {
  const raw = page.schema_json as any;
  const schema =
    raw && Array.isArray(raw.root)
      ? { type: "root", props: {}, children: raw.root }
      : schemaToASTNode(raw);

  return (
    <>
      <ComponentRender no={schema} isEditable={false} />
    </>
  );
};
