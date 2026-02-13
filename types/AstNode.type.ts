export interface ASTNode {
  type: string;
  props: {
    className?: string;
    content?: string;
    tag?: string;
    [key: string]: string | number | boolean | undefined | null;
  };
  children?: ASTNode[];
}

export function schemaToASTNode(value: unknown): ASTNode {
  return (value ?? {}) as ASTNode;
}
