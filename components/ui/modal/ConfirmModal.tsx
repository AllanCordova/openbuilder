"use client";

import { useConfirmModal } from "@/hooks/useConfirmModal";

export const ConfirmModal = () => {
  const { isOpen, message, respond } = useConfirmModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--background)] border border-[var(--border-light)] p-spacing-lg rounded-default shadow-xl max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
        <p className="text-foreground text-typography-body mb-6">{message}</p>

        <div className="flex justify-end gap-spacing-md mt-4">
          <button
            onClick={() => respond(false)}
            className="px-4 py-2 rounded-default bg-[var(--background-alt)] text-muted hover:text-foreground hover:bg-[var(--border-light)] transition-colors text-sm font-medium"
          >
            Cancelar
          </button>

          <button
            onClick={() => respond(true)}
            className="px-4 py-2 rounded-default bg-[var(--destructive)] text-white hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
