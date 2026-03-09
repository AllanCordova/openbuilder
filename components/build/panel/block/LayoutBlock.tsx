"use client";

import { LayoutControl } from "../control/LayoutControl";

type LayoutBlockProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export function LayoutBlock({
  currentClassName,
  onChange,
}: LayoutBlockProps) {
  return (
    <LayoutControl
      currentClassName={currentClassName}
      onChange={onChange}
    />
  );
}
