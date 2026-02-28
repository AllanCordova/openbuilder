import { useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

type UseImageUploadProps = {
  onSuccess: (url: string) => void;
};

export function useImageUpload({ onSuccess }: UseImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 2MB");
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      e.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onSuccess(data.url);
    } catch (error: any) {
      toast.error(`Upload Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return { handleFileChange, isUploading };
}
