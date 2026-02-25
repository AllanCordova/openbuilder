import { create } from "zustand";

type ConfirmModalStore = {
  isOpen: boolean;
  message: string;
  resolvePromise: ((value: boolean) => void) | null;
  ask: (message: string) => Promise<boolean>;
  respond: (value: boolean) => void;
};

export const useConfirmModal = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  message: "",
  resolvePromise: null,

  ask: (message) =>
    new Promise((resolve) => {
      set({ isOpen: true, message, resolvePromise: resolve });
    }),
  respond: (value) =>
    set((state) => {
      if (state.resolvePromise) state.resolvePromise(value);
      return { isOpen: false, message: "", resolvePromise: null };
    }),
}));
