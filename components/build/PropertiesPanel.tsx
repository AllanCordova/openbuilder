"use client";

import { useCanvas, findNodeByKey, findParentKey } from "@/hooks/useCanvas";
import { ChevronLeft, Type, Hash, Layers } from "lucide-react";
import { Input } from "@/components/ui/Input";

export const PropertiesPanel = () => {
  const { components, selectedNodeKey, setSelectedNode, updateComponent } =
    useCanvas();

  if (!selectedNodeKey) {
    return (
      <div className="p-6 text-center text-muted">
        <p>Select a component on the canvas to edit its properties.</p>
      </div>
    );
  }

  const currentNode = findNodeByKey(components, selectedNodeKey);
  const parentNodeKey = findParentKey(components, selectedNodeKey);

  if (!currentNode) {
    setSelectedNode(null);
    return null;
  }

  return (
    <div className="flex flex-col gap-6 p-4 bg-background-alt border border-border-light rounded-default">
      <div className="flex items-center justify-between pb-4 border-b border-border-light">
        <div>
          <h3 className="text-sm font-bold text-foreground">
            Editing: {currentNode.type}
          </h3>
          <p className="text-xs text-muted">
            Key: {currentNode.props.key?.toString().slice(0, 8)}...
          </p>
        </div>

        <button
          onClick={() => setSelectedNode(parentNodeKey)}
          disabled={!parentNodeKey}
          className="p-2 rounded-md hover:bg-background transition-colors disabled:opacity-30"
          title="Go to parent"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {currentNode.type !== "Card" && currentNode.type !== "div" && (
          <Input
            id="Content Text"
            label="Content Text"
            icon={<Type size={16} />}
            value={currentNode.props.content?.toString() || ""}
            onChange={(e) =>
              updateComponent(selectedNodeKey, { content: e.target.value })
            }
            placeholder="Enter text..."
          />
        )}

        <Input
          id="CSS Classes"
          label="CSS Classes"
          icon={<Hash size={16} />}
          value={currentNode.props.className?.toString() || ""}
          onChange={(e) =>
            updateComponent(selectedNodeKey, { className: e.target.value })
          }
          placeholder="e.g. flex flex-col gap-4 text-center..."
        />
      </div>

      {currentNode.children && currentNode.children.length > 0 && (
        <div className="pt-4 border-t border-border-light">
          <h4 className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
            <Layers size={14} /> Children Elements
          </h4>
          <div className="flex flex-col gap-2">
            {currentNode.children.map((child, index) => (
              <button
                key={child.props.key as string}
                onClick={() => setSelectedNode(child.props.key as string)}
                className="text-left px-3 py-2 text-sm rounded-md bg-background border border-border-light hover:border-primary transition-colors flex justify-between"
              >
                <span>{child.type}</span>
                <span className="text-muted text-xs">#{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
