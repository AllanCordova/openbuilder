"use client";

import {
  INITIAL_ROOT_NODE,
  ROOT_NODE_KEY,
  VOID_ELEMENTS,
} from "@/constants/AST";
import { ASTNode } from "@/types/AstNode.type";
import { create } from "zustand";

export const canHaveChildren = (node: ASTNode): boolean => {
  const tag = node.props?.tag?.toLowerCase();
  if (!tag) return true;
  return !VOID_ELEMENTS.includes(tag);
};

interface Canvas {
  components: ASTNode[];
  selectedNodeKey: string | null;
  hoveredNodeKey: string | null;

  addComponent: (node: ASTNode) => void;
  addComponentAtTarget: (targetKey: string, node: ASTNode) => void;
  removeComponent: (key: string) => void;
  updateComponent: (key: string, newProps: Partial<ASTNode["props"]>) => void;
  moveNodeToTarget: (draggedKey: string, targetKey: string) => void;

  setSelectedNode: (key: string | null) => void;
  setHoveredNode: (key: string | null) => void;
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

export const isKeyInTree = (node: ASTNode, key: string): boolean => {
  if (node.props?.key === key) return true;
  if (node.children) {
    for (const child of node.children) {
      if (isKeyInTree(child, key)) return true;
    }
  }
  return false;
};

const extractNodeByKey = (
  nodes: ASTNode[],
  keyToExtract: string,
): { nodes: ASTNode[]; extracted: ASTNode | null } => {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.props?.key === keyToExtract) {
      const extracted = node;
      const newNodes = [...nodes.slice(0, i), ...nodes.slice(i + 1)];
      return { nodes: newNodes, extracted };
    }
    if (node.children?.length) {
      const { nodes: newChildren, extracted } = extractNodeByKey(
        node.children,
        keyToExtract,
      );
      if (extracted) {
        const newNode = { ...node, children: newChildren };
        const newNodes = nodes.map((n, j) => (j === i ? newNode : n));
        return { nodes: newNodes, extracted };
      }
    }
  }
  return { nodes, extracted: null };
};

const insertNodeByKey = (
  nodes: ASTNode[],
  targetKey: string,
  newNode: ASTNode,
): ASTNode[] => {
  return nodes.map((node) => {
    if (node.props?.key === targetKey) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: insertNodeByKey(node.children, targetKey, newNode),
      };
    }
    return node;
  });
};

export const useCanvas = create<Canvas>((set) => ({
  components: [INITIAL_ROOT_NODE],
  selectedNodeKey: null,
  hoveredNodeKey: null,

  addComponent: (node: ASTNode) =>
    set((state) => {
      const newNode = generateKeysForNode(node);
      let targetKey = state.selectedNodeKey || ROOT_NODE_KEY;
      const targetNode = findNodeByKey(state.components, targetKey);
      if (targetNode && !canHaveChildren(targetNode)) {
        targetKey = findParentKey(state.components, targetKey) || ROOT_NODE_KEY;
      }
      return {
        components: insertNodeByKey(state.components, targetKey, newNode),
      };
    }),

  addComponentAtTarget: (targetKey: string, node: ASTNode) =>
    set((state) => {
      const targetNode = findNodeByKey(state.components, targetKey);
      if (!targetNode || !canHaveChildren(targetNode)) return state;
      const newNode = generateKeysForNode(node);
      return {
        components: insertNodeByKey(state.components, targetKey, newNode),
      };
    }),

  removeComponent: (key: string) =>
    set((state) => {
      if (key === ROOT_NODE_KEY) return state;

      return {
        components: removeNodeByKey(state.components, key),
        selectedNodeKey:
          state.selectedNodeKey === key ? null : state.selectedNodeKey,
      };
    }),

  updateComponent: (key: string, newProps: Partial<ASTNode["props"]>) =>
    set((state) => ({
      components: updateNodeByKey(state.components, key, newProps),
    })),

  moveNodeToTarget: (draggedKey: string, targetKey: string) =>
    set((state) => {
      if (draggedKey === targetKey) return state;
      if (draggedKey === ROOT_NODE_KEY) return state;
      const targetNode = findNodeByKey(state.components, targetKey);
      if (!targetNode || !canHaveChildren(targetNode)) return state;
      const { nodes: rest, extracted } = extractNodeByKey(
        state.components,
        draggedKey,
      );
      if (!extracted) return state;
      if (isKeyInTree(extracted, targetKey)) return state;
      return {
        components: insertNodeByKey(rest, targetKey, extracted),
        selectedNodeKey:
          state.selectedNodeKey === draggedKey ? targetKey : state.selectedNodeKey,
      };
    }),

  setSelectedNode: (key: string | null) => set({ selectedNodeKey: key }),

  setHoveredNode: (key: string | null) => set({ hoveredNodeKey: key }),

  setComponents: (nodes: ASTNode[]) => set({ components: nodes }),

  clearCanvas: () =>
    set({
      components: [INITIAL_ROOT_NODE],
      selectedNodeKey: null,
      hoveredNodeKey: null,
    }),
}));
