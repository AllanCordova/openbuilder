"use client";

import { ColorControl } from "../control/ColorControl";

type ColorsBlockProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export function ColorsBlock({ currentClassName, onChange }: ColorsBlockProps) {
  return (
    <div className="flex flex-col gap-4">
      <ColorControl
        label="Background"
        type="bg"
        currentClassName={currentClassName}
        onChange={onChange}
      />
      <ColorControl
        label="Text"
        type="text"
        currentClassName={currentClassName}
        onChange={onChange}
      />
    </div>
  );
}
