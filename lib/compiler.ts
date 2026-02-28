import { ASTNode } from "@/types/AstNode.type";

function generateReactCodeFromAST(node: ASTNode): string {
  if (node.type === "root") {
    const children = node.children || [];
    return children.map(generateReactCodeFromAST).join("\n");
  }

  const {
    key,
    tag,
    content,
    className,
    href,
    src,
    alt,
    type,
    placeholder,
    rows,
    ...otherProps
  } = node.props || {};

  let propsString = "";
  if (className) propsString += ` className="${className}"`;
  if (href) propsString += ` href="${href}"`;
  if (src) propsString += ` src="${src}"`;
  if (alt) propsString += ` alt="${alt}"`;
  if (type) propsString += ` type="${type}"`;
  if (placeholder) propsString += ` placeholder="${placeholder}"`;
  if (rows) propsString += ` rows={${rows}}`;
  const childrenCode = node.children
    ? node.children.map(generateReactCodeFromAST).join("\n  ")
    : "";

  const innerContent = content || "";

  switch (node.type) {
    case "Button": {
      const isLink = !!href;
      const tagName = isLink ? "a" : "button";
      return `<${tagName}${propsString}>\n  ${innerContent}\n</${tagName}>`;
    }

    case "Text": {
      const tagName = tag || "span";
      return `<${tagName}${propsString}>\n  ${innerContent}\n</${tagName}>`;
    }

    case "Image": {
      const fallbackSrc = src || "https://via.placeholder.com/150";
      const fallbackAlt = alt || "Imagem";
      return `<img src="${fallbackSrc}" alt="${fallbackAlt}"${propsString} />`;
    }

    case "Input": {
      const isTextArea = tag === "textarea";
      if (isTextArea) {
        return `<textarea${propsString} />`;
      }
      const fallbackType = type || "text";
      return `<input type="${fallbackType}"${propsString} />`;
    }

    case "Card": {
      const tagName = tag || "div";
      return `<${tagName}${propsString}>\n  ${childrenCode}\n</${tagName}>`;
    }

    default: {
      if (node.children && node.children.length > 0) {
        return `<div${propsString}>\n  ${childrenCode}\n</div>`;
      }
      return "";
    }
  }
}

export function createReactFileContent(
  ast: ASTNode,
  componentName = "MyPage",
): string {
  const componentBody = generateReactCodeFromAST(ast);

  return `
import React from 'react';

export default function ${componentName}() {
  return (
    <>
      ${componentBody}
    </>
  );
}
  `.trim();
}
