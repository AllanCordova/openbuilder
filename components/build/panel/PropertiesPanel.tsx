"use client";

import { useCanvas, findNodeByKey } from "@/hooks/useCanvas";
import { EmptyFallback } from "../../ui/fallback/EmptyFallback";
import {
  PanelBlock,
  TextBlock,
  LinkBlock,
  ColorsBlock,
  SpacingBlock,
  LayoutBlock,
  ImageBlock,
  InputBlock,
  MoveBlock,
  AdvancedBlock,
} from "./block";
import {
  Type,
  Link2,
  Palette,
  Box,
  LayoutGrid,
  Image as ImageIcon,
  FileInput,
  Code,
  ArrowLeftRight,
} from "lucide-react";
export const PropertiesPanel = () => {
  const { selectedNodeKey, components, updateComponent } = useCanvas();

  const selectedNode = selectedNodeKey
    ? findNodeByKey(components, selectedNodeKey)
    : null;

  if (!selectedNode) {
    return <EmptyFallback message="Select a component to edit." />;
  }

  const handlePropChange = (propName: string, value: string | number) => {
    if (!selectedNodeKey) return;
    updateComponent(selectedNodeKey, { [propName]: value });
  };

  const className = (selectedNode.props.className as string) || "";
  const setClassName = (newClass: string) => handlePropChange("className", newClass);

  const showTextBlock =
    selectedNode.type === "Text" || selectedNode.type === "Button";
  const showTagBlock =
    selectedNode.type === "Text" || selectedNode.type === "Card";
  const showLinkBlock =
    selectedNode.type === "Button" ||
    selectedNode.props?.tag === "a" ||
    selectedNode.props?.href !== undefined;
  const showImageBlock = selectedNode.type === "Image";
  const showInputBlock = selectedNode.type === "Input";

  return (
    <div className="flex flex-col h-full bg-[var(--background-alt)] border-l border-[var(--border-light)]">
      <div className="p-4 border-b border-[var(--border-light)] shrink-0">
        <h3 className="font-bold text-typography-heading text-foreground">
          Properties
        </h3>
        <span className="text-xs font-mono text-muted bg-[var(--background)] px-2 py-1 rounded border border-[var(--border-light)] mt-1.5 inline-block">
          {selectedNode.type}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
        {showTextBlock && (
          <PanelBlock title="Text" icon={Type} defaultOpen={true}>
            <TextBlock
              content={(selectedNode.props.content as string) ?? ""}
              tag={(selectedNode.props.tag as string) ?? ""}
              onContentChange={(v) => handlePropChange("content", v)}
              onTagChange={showTagBlock ? (v) => handlePropChange("tag", v) : undefined}
              showContent={true}
              showTag={showTagBlock}
            />
          </PanelBlock>
        )}

        {showTagBlock && !showTextBlock && (
          <PanelBlock title="Tag" icon={Type} defaultOpen={true}>
            <TextBlock
              tag={(selectedNode.props.tag as string) ?? ""}
              onTagChange={(v) => handlePropChange("tag", v)}
              showContent={false}
              showTag={true}
            />
          </PanelBlock>
        )}

        {showLinkBlock && (
          <PanelBlock title="Link" icon={Link2} defaultOpen={false}>
            <LinkBlock
              href={(selectedNode.props.href as string) ?? ""}
              onChange={(v) => handlePropChange("href", v)}
            />
          </PanelBlock>
        )}

        <PanelBlock title="Colors" icon={Palette} defaultOpen={false}>
          <ColorsBlock currentClassName={className} onChange={setClassName} />
        </PanelBlock>

        <PanelBlock title="Spacing" icon={Box} defaultOpen={false}>
          <SpacingBlock currentClassName={className} onChange={setClassName} />
        </PanelBlock>

        <PanelBlock title="Layout" icon={LayoutGrid} defaultOpen={false}>
          <LayoutBlock currentClassName={className} onChange={setClassName} />
        </PanelBlock>

        {showImageBlock && (
          <PanelBlock title="Image" icon={ImageIcon} defaultOpen={true}>
            <ImageBlock
              src={(selectedNode.props.src as string) ?? ""}
              alt={(selectedNode.props.alt as string) ?? ""}
              currentClassName={className}
              onClassNameChange={setClassName}
              onSrcChange={(v) => handlePropChange("src", v)}
              onAltChange={(v) => handlePropChange("alt", v)}
            />
          </PanelBlock>
        )}

        {showInputBlock && (
          <PanelBlock title="Input" icon={FileInput} defaultOpen={true}>
            <InputBlock
              type={(selectedNode.props.type as string) ?? "text"}
              placeholder={(selectedNode.props.placeholder as string) ?? ""}
              rows={((selectedNode.props.rows as number) ?? 4) as number}
              isTextarea={selectedNode.props?.tag === "textarea"}
              onTypeChange={(v) => handlePropChange("type", v)}
              onPlaceholderChange={(v) => handlePropChange("placeholder", v)}
              onRowsChange={(v) => handlePropChange("rows", v)}
            />
          </PanelBlock>
        )}

        <PanelBlock title="Move" icon={ArrowLeftRight} defaultOpen={false}>
          <MoveBlock />
        </PanelBlock>

        <PanelBlock title="Advanced" icon={Code} defaultOpen={false}>
          <AdvancedBlock className={className} onChange={setClassName} />
        </PanelBlock>
      </div>
    </div>
  );
};
