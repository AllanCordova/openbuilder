import { ASTNode } from "@/types/AstNode.type";

function generateReactCodeFromAST(node: ASTNode): string {
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

  let baseProps = "";
  if (className) baseProps += ` className="${className}"`;

  const childrenCode =
    node.children && node.children.length > 0
      ? node.children.map(generateReactCodeFromAST).join("\n  ")
      : "";

  const innerContent = content || "";

  switch (node.type) {
    case "root": {
      return `<div${baseProps}>\n  ${childrenCode}\n</div>`;
    }

    case "Button": {
      const isLink = !!href;
      const tagName = isLink ? "a" : "button";

      let props = baseProps;
      if (isLink) props += ` href="${href}"`;
      else props += ` type="button"`;

      return `<${tagName}${props}>\n  ${innerContent}\n</${tagName}>`;
    }

    case "Text": {
      const tagName = tag || "span";

      let props = baseProps;
      if (href && tagName === "a") props += ` href="${href}"`;

      return `<${tagName}${props}>\n  ${innerContent}\n</${tagName}>`;
    }

    case "Image": {
      const finalSrc = src || "https://via.placeholder.com/150";
      const finalAlt = alt || "Imagem";

      return `<img src="${finalSrc}" alt="${finalAlt}"${baseProps} />`;
    }

    case "Input": {
      const isTextArea = tag === "textarea";

      let props = baseProps;
      if (placeholder) props += ` placeholder="${placeholder}"`;

      if (isTextArea) {
        if (rows) props += ` rows={${rows}}`;
        return `<textarea${props} />`;
      }

      const finalType = type || "text";
      return `<input type="${finalType}"${props} />`;
    }

    case "Card": {
      const tagName = tag || "div";
      return `<${tagName}${baseProps}>\n  ${childrenCode}\n</${tagName}>`;
    }

    default: {
      if (childrenCode) {
        return `<div${baseProps}>\n  ${childrenCode}\n</div>`;
      }
      return `<div${baseProps}>${innerContent}</div>`;
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
