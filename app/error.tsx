"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("UI Error Boundary acionado.");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-red-50 text-red-900 rounded-lg">
      <h2 className="text-xl font-bold mb-2">
        Ops! Algo deu errado no servidor.
      </h2>

      <p>Não foi possível carregar esta página.</p>

      {error.digest && (
        <p className="text-xs text-red-500 mt-2 font-mono">
          Código do erro: {error.digest}
        </p>
      )}

      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
