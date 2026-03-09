"use client";

import { ArrowUp, ArrowRight } from "lucide-react";
import { ROOT_NODE_KEY } from "@/constants/AST";
import {
  useCanvas,
  findNodeByKey,
  findParentKey,
  canHaveChildren,
  getValidMoveTargets,
} from "@/hooks/useCanvas";

export function MoveControl() {
  const { selectedNodeKey, components, moveNodeToTarget } = useCanvas();

  if (!selectedNodeKey) {
    return (
      <p className="text-xs text-muted">
        Select a component on the canvas to move it.
      </p>
    );
  }

  if (selectedNodeKey === ROOT_NODE_KEY) {
    return (
      <p className="text-xs text-muted">Root cannot be moved.</p>
    );
  }

  const selectedNode = findNodeByKey(components, selectedNodeKey);
  const parentKey = findParentKey(components, selectedNodeKey);
  const parentNode = parentKey ? findNodeByKey(components, parentKey) : null;
  const grandparentKey = parentKey
    ? findParentKey(components, parentKey)
    : null;

  const validTargets = getValidMoveTargets(components, selectedNodeKey);
  const containerChildren =
    selectedNode?.children?.filter((c) => canHaveChildren(c)) ?? [];

  const handleMoveTo = (targetKey: string) => {
    moveNodeToTarget(selectedNodeKey, targetKey);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted uppercase tracking-wider">
          Current
        </label>
        <span className="text-sm font-medium text-foreground">
          {selectedNode?.type ?? "—"}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-muted uppercase tracking-wider">
          Move to
        </label>
        <select
          value=""
          onChange={(e) => {
            const key = e.target.value;
            if (key) handleMoveTo(key);
            e.target.value = "";
          }}
          className="w-full px-2 py-1.5 text-sm bg-[var(--background)] border border-[var(--border-light)] rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          aria-label="Choose target container"
        >
          <option value="">Choose a container…</option>
          {validTargets.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <p className="text-[10px] text-muted">
          Move this component into any container in one click.
        </p>
      </div>

      {parentKey && parentKey !== ROOT_NODE_KEY && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">
            Parent
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-foreground">
              {parentNode?.type ?? "—"}
            </span>
            <button
              type="button"
              onClick={() => handleMoveTo(parentKey)}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded border border-[var(--border-light)] bg-[var(--background)] text-foreground hover:border-[var(--primary)]/50 hover:bg-primary/5 transition-colors"
              title="Move to parent (reorder)"
              aria-label="Move to parent"
            >
              <ArrowUp size={14} strokeWidth={2} />
              Move here
            </button>
          </div>
        </div>
      )}

      {grandparentKey && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">
            Move up
          </label>
          <button
            type="button"
            onClick={() => handleMoveTo(grandparentKey)}
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded border border-[var(--border-light)] bg-[var(--background)] text-foreground hover:border-[var(--primary)]/50 hover:bg-primary/5 transition-colors w-fit"
            title="Move one level up"
            aria-label="Move up one level"
          >
            <ArrowUp size={14} strokeWidth={2} />
            Move up one level
          </button>
        </div>
      )}

      {containerChildren.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">
            Move into child
          </label>
          <div className="flex flex-col gap-1.5">
            {containerChildren.map((child) => {
              const key = child.props?.key as string;
              if (!key) return null;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-2 py-1 pr-1 rounded border border-[var(--border-light)] bg-[var(--background)] pl-2"
                >
                  <span className="text-sm text-foreground">{child.type}</span>
                  <button
                    type="button"
                    onClick={() => handleMoveTo(key)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border border-[var(--border-light)] text-foreground hover:border-[var(--primary)]/50 hover:bg-primary/5 transition-colors shrink-0"
                    title={`Move into ${child.type}`}
                    aria-label={`Move into ${child.type}`}
                  >
                    <ArrowRight size={14} strokeWidth={2} />
                    Move into
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
