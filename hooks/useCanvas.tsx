'use client'

import { ASTNode } from "@/types/AstNode.type";
import { create } from "zustand";

interface Canvas {
  components: ASTNode[];
  addComponent: (node: ASTNode) => void;
  clearCanvas: () => void;
}

export const useCanvas = create<Canvas>((set) => ({
  components: [],

  addComponent: (node: ASTNode) =>
    set((state) => ({
      components: [...state.components, node],
    })),

  clearCanvas: () => set({ components: [] }),
}));
