"use client";

import { useState } from "react";
import { downloadProjectZip } from "@/actions/Project.action";
import { Download, Loader2 } from "lucide-react";

type Props = {
  projectId: string;
};

export const ExportProjectButton = ({ projectId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);

      const response = await downloadProjectZip({ id: projectId });

      if (response.data?.base64File) {
        const dataUrl = `data:application/zip;base64,${response.data.base64File}`;

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${response.data.projectName}_source.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Erro ao exportar projeto", error);
      alert("Falha ao exportar o projeto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isLoading}
      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-70 transition-colors"
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <Download size={16} />
      )}
      {isLoading ? "Gerando Zip..." : "Exportar Projeto"}
    </button>
  );
};
