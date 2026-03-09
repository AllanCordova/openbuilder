"use client";

import { SpacingControl } from "../control/SpacingControl";

type SpacingBlockProps = {
  currentClassName: string;
  onChange: (newClassName: string) => void;
};

export function SpacingBlock({
  currentClassName,
  onChange,
}: SpacingBlockProps) {
  return <SpacingControl currentClassName={currentClassName} onChange={onChange} />;
}
