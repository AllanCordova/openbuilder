import { ASTNode } from "@/types/AstNode.type";

type PropsType = {
  no: ASTNode;
};

const validTextTags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"] as const;

export const ComponentRender = ({ no }: PropsType) => {
  switch (no.type) {
    case "Button":
      return (
        <button className={no.props.className} type="button">
          {no.props.content ?? ""}
        </button>
      );
    case "Text": {
      const tag = no.props.tag;
      const Tag =
        typeof tag === "string" && validTextTags.includes(tag as (typeof validTextTags)[number])
          ? (tag as (typeof validTextTags)[number])
          : "span";
      return <Tag className={no.props.className}>{no.props.content ?? ""}</Tag>;
    }
    case "Card": {
      const children = no.children ?? [];
      return (
        <div className={no.props.className}>
          {children.map((child, index) => (
            <ComponentRender key={index} no={child} />
          ))}
        </div>
      );
    }
    default:
      return null;
  }
};
