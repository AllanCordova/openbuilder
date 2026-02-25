"use client";

import { ASTNode } from "@/types/AstNode.type";
import { create } from "zustand";

interface Canvas {
  components: ASTNode[];
  addComponent: (node: ASTNode) => void;
  setComponents: (node: ASTNode[]) => void;
  clearCanvas: () => void;
}

export const useCanvas = create<Canvas>((set) => ({
  components: [],

  addComponent: (node: ASTNode) =>
    set((state) => ({
      components: [...state.components, node],
    })),

  setComponents: (nodes: ASTNode[]) => set({ components: nodes }),

  clearCanvas: () => set({ components: [] }),
}));
