import { ASTNode } from "@/types/AstNode.type";

export const ROOT_NODE_KEY = "root-canvas";

export const INITIAL_ROOT_NODE: ASTNode = {
  type: "root",
  props: {
    key: ROOT_NODE_KEY,
    tag: "div",
    className: "w-full min-h-screen bg-black flex flex-col",
    "data-root": true,
  },
  children: [],
};

export const VOID_ELEMENTS = [
  "img",
  "input",
  "br",
  "hr",
  "meta",
  "link",
  "textarea",
];

export const validTextTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "a",
  "label",
  "blockquote",
  "div",
  "strong",
  "em",
] as const;

export const validCardTags = [
  "div",
  "section",
  "article",
  "aside",
  "header",
  "footer",
  "nav",
  "main",
] as const;