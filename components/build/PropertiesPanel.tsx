"use client";

import { useCanvas, findNodeByKey } from "@/hooks/useCanvas";
import { ColorPalette } from "./ColorPalette";
import { EmptyFallback } from "../ui/EmptyFallback";
import { LayoutControl } from "./LayoutControl";
import { SpacingControl } from "./SpacingControl";

export const PropertiesPanel = () => {
  const { selectedNodeKey, components, updateComponent } = useCanvas();

  const selectedNode = selectedNodeKey
    ? findNodeByKey(components, selectedNodeKey)
    : null;

  if (!selectedNode) {
    return <EmptyFallback message="Select one canva component to edit!" />;
  }

  const handlePropChange = (propName: string, value: string | number) => {
    if (!selectedNodeKey) return;

    updateComponent(selectedNodeKey, {
      [propName]: value,
    });
  };

  const inputClassName =
    "w-full px-3 py-2 bg-[var(--background)] border border-[var(--border-light)] rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors text-foreground placeholder:text-muted";
  const labelClassName = "text-sm font-semibold text-foreground";

  return (
    <div className="flex flex-col h-full bg-[var(--background-alt)] border-l border-[var(--border-light)]">
      <div className="p-5 border-b border-[var(--border-light)] shrink-0">
        <h3 className="font-bold text-typography-heading text-foreground">
          Properties Panel
        </h3>
        <span className="text-xs font-mono text-muted bg-[var(--background)] px-2 py-1 rounded border border-[var(--border-light)] mt-1 inline-block">
          {selectedNode.type}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-6 flex-1 overflow-y-auto">
        <LayoutControl
          currentClassName={(selectedNode.props.className as string) || ""}
          onChange={(newClass) => handlePropChange("className", newClass)}
        />

        <SpacingControl
          currentClassName={(selectedNode.props.className as string) || ""}
          onChange={(newClass) => handlePropChange("className", newClass)}
        />

        <div className="flex flex-col gap-4 border-b border-[var(--border-light)] pb-5">
          <ColorPalette
            label="Background Color"
            type="bg"
            currentClassName={(selectedNode.props.className as string) || ""}
            onChange={(newClassString) =>
              handlePropChange("className", newClassString)
            }
          />
          <ColorPalette
            label="Text Color"
            type="text"
            currentClassName={(selectedNode.props.className as string) || ""}
            onChange={(newClassString) =>
              handlePropChange("className", newClassString)
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClassName}>Classes (Tailwind)</label>
            <textarea
              className={`${inputClassName} font-mono`}
              rows={4}
              value={(selectedNode.props.className as string) || ""}
              onChange={(e) => handlePropChange("className", e.target.value)}
              placeholder="Ex: px-4 py-2 bg-blue-500 text-white..."
            />
          </div>

          {(selectedNode.type === "Text" || selectedNode.type === "Button") && (
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Content</label>
              <input
                type="text"
                className={inputClassName}
                value={(selectedNode.props.content as string) || ""}
                onChange={(e) => handlePropChange("content", e.target.value)}
              />
            </div>
          )}

          {(selectedNode.type === "Text" || selectedNode.type === "Card") && (
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>HTML Tag</label>
              <input
                type="text"
                className={`${inputClassName} font-mono`}
                value={(selectedNode.props.tag as string) || ""}
                onChange={(e) =>
                  handlePropChange("tag", e.target.value.toLowerCase())
                }
                placeholder="Ex: h1, div, section, a"
              />
            </div>
          )}

          {(selectedNode.type === "Button" ||
            selectedNode.props.tag === "a" ||
            selectedNode.props.href !== undefined) && (
            <div className="flex flex-col gap-1.5">
              <label className={labelClassName}>Link URL (href)</label>
              <input
                type="text"
                className={inputClassName}
                value={(selectedNode.props.href as string) || ""}
                onChange={(e) => handlePropChange("href", e.target.value)}
                placeholder="https://..."
              />
            </div>
          )}

          {selectedNode.type === "Image" && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className={labelClassName}>Image URL (src)</label>
                <input
                  type="text"
                  className={inputClassName}
                  value={(selectedNode.props.src as string) || ""}
                  onChange={(e) => handlePropChange("src", e.target.value)}
                  placeholder="https://suaimagem.com/foto.jpg"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClassName}>Alternative Text (alt)</label>
                <input
                  type="text"
                  className={inputClassName}
                  value={(selectedNode.props.alt as string) || ""}
                  onChange={(e) => handlePropChange("alt", e.target.value)}
                  placeholder="Image description for accessibility"
                />
              </div>
            </>
          )}

          {selectedNode.type === "Input" && (
            <>
              {selectedNode.props.tag !== "textarea" && (
                <div className="flex flex-col gap-1.5">
                  <label className={labelClassName}>Input Type</label>
                  <select
                    className={inputClassName}
                    value={(selectedNode.props.type as string) || "text"}
                    onChange={(e) => handlePropChange("type", e.target.value)}
                  >
                    <option value="text">Text (text)</option>
                    <option value="email">Email (email)</option>
                    <option value="password">Password (password)</option>
                    <option value="number">Number (number)</option>
                    <option value="search">Search (search)</option>
                  </select>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <label className={labelClassName}>Placeholder</label>
                <input
                  type="text"
                  className={inputClassName}
                  value={(selectedNode.props.placeholder as string) || ""}
                  onChange={(e) =>
                    handlePropChange("placeholder", e.target.value)
                  }
                  placeholder="Ex: John Doe..."
                />
              </div>
              {selectedNode.props.tag === "textarea" && (
                <div className="flex flex-col gap-1.5">
                  <label className={labelClassName}>Lines (rows)</label>
                  <input
                    type="number"
                    className={inputClassName}
                    value={(selectedNode.props.rows as number) || 4}
                    onChange={(e) =>
                      handlePropChange("rows", parseInt(e.target.value) || 4)
                    }
                    min={1}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
