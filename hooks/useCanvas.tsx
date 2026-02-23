"use client";

import { ASTNode } from "@/types/AstNode.type";
import { create } from "zustand";

interface Canvas {
  components: ASTNode[];
  selectedNodeKey: string | null;

  addComponent: (node: ASTNode) => void;
  removeComponent: (key: string) => void;
  updateComponent: (key: string, newProps: Partial<ASTNode["props"]>) => void;
  moveComponent: (startIndex: number, endIndex: number) => void;

  setSelectedNode: (key: string | null) => void;
  setComponents: (node: ASTNode[]) => void;
  clearCanvas: () => void;
}

const removeNodeByKey = (nodes: ASTNode[], keyToRemove: string): ASTNode[] => {
  return nodes
    .filter((node) => node.props?.key !== keyToRemove)
    .map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeNodeByKey(node.children, keyToRemove),
        };
      }
      return node;
    });
};

const generateKeysForNode = (node: ASTNode): ASTNode => {
  return {
    ...node,
    props: { ...node.props, key: crypto.randomUUID() },
    children: node.children
      ? node.children.map(generateKeysForNode)
      : undefined,
  };
};

const updateNodeByKey = (
  nodes: ASTNode[],
  keyToUpdate: string,
  newProps: any,
): ASTNode[] => {
  return nodes.map((node) => {
    if (node.props?.key === keyToUpdate) {
      return { ...node, props: { ...node.props, ...newProps } };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeByKey(node.children, keyToUpdate, newProps),
      };
    }
    return node;
  });
};

export const findNodeByKey = (
  nodes: ASTNode[],
  key: string,
): ASTNode | null => {
  for (const node of nodes) {
    if (node.props?.key === key) return node;
    if (node.children) {
      const found = findNodeByKey(node.children, key);
      if (found) return found;
    }
  }
  return null;
};

export const findParentKey = (
  nodes: ASTNode[],
  childKey: string,
  currentParentKey: string | null = null,
): string | null => {
  for (const node of nodes) {
    if (node.props?.key === childKey) return currentParentKey;
    if (node.children) {
      const found = findParentKey(
        node.children,
        childKey,
        node.props?.key as string,
      );
      if (found) return found;
    }
  }
  return null;
};

export const useCanvas = create<Canvas>((set) => ({
  components: [],
  selectedNodeKey: null,

  addComponent: (node: ASTNode) =>
    set((state) => ({
      components: [...state.components, generateKeysForNode(node)],
    })),

  removeComponent: (key: string) =>
    set((state) => ({
      components: removeNodeByKey(state.components, key),
      selectedNodeKey:
        state.selectedNodeKey === key ? null : state.selectedNodeKey,
    })),

  updateComponent: (key: string, newProps: Partial<ASTNode["props"]>) =>
    set((state) => ({
      components: updateNodeByKey(state.components, key, newProps),
    })),

  moveComponent: (startIndex: number, endIndex: number) =>
    set((state) => {
      const reorderedComponents = Array.from(state.components);

      const [movedItem] = reorderedComponents.splice(startIndex, 1);

      reorderedComponents.splice(endIndex, 0, movedItem);

      return { components: reorderedComponents };
    }),

  setSelectedNode: (key: string | null) => set({ selectedNodeKey: key }),

  setComponents: (nodes: ASTNode[]) => set({ components: nodes }),
  clearCanvas: () => set({ components: [], selectedNodeKey: null }),
}));
