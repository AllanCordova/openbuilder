"use client";

import { ColorPalette } from "../ColorPalette";

type ColorsBlockProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export function ColorsBlock({ currentClassName, onChange }: ColorsBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <ColorPalette
        label="Background"
        type="bg"
        currentClassName={currentClassName}
        onChange={onChange}
      />
      <ColorPalette
        label="Text"
        type="text"
        currentClassName={currentClassName}
        onChange={onChange}
      />
    </div>
  );
}
