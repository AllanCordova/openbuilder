"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { ASTNode } from "@/types/AstNode.type";
import { useCanvas, canHaveChildren } from "@/hooks/useCanvas";
import { ROOT_NODE_KEY } from "@/constants/AST";
import { Trash2, Edit2 } from "lucide-react";
import { validTextTags, validCardTags } from "@/constants/AST";

type PropsType = {
  no: ASTNode;
  isEditable?: boolean;
};



export const ComponentRender = ({ no, isEditable = false }: PropsType) => {
  const {
    removeComponent,
    setSelectedNode,
    setHoveredNode,
    selectedNodeKey,
    hoveredNodeKey,
  } = useCanvas();

  const isRoot = no.type === "root";
  const nodeKey =
    (no.props?.key as string) ?? (isRoot ? ROOT_NODE_KEY : undefined);
  const droppableId = nodeKey ?? ROOT_NODE_KEY;
  const isContainer = canHaveChildren(no);

  const { setNodeRef: setDraggableRef, attributes, listeners, isDragging } =
    useDraggable({
      id: droppableId,
      data: isRoot
        ? undefined
        : { type: "canvas" as const, nodeKey: nodeKey!, nodeType: no.type },
      disabled: isRoot,
    });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: droppableId,
    disabled: !isContainer,
  });

  const setNodeRef = (el: HTMLDivElement | null) => {
    setDraggableRef(el);
    setDroppableRef(el);
  };

  const preventNavIfEditing = (e: React.MouseEvent) => {
    if (isEditable) e.preventDefault();
  };

  const getEditorStyles = (type: string) => {
    if (!isEditable) return "";

    if (type === "root") {
      return "min-h-[120px] rounded-[var(--radius-default)] border border-dashed border-[var(--header-border)]";
    }
    if (type === "Card" || no.children?.length) {
      return "min-h-[32px] rounded-[var(--radius-default)] border border-dashed border-[var(--header-border)] p-2";
    }
    if (type === "Image") {
      return "block rounded-[var(--radius-default)] border-2 border-dashed border-transparent";
    }
    return "rounded-[var(--radius-default)]";
  };

  const renderElement = () => {
    const editorClass = getEditorStyles(no.type);

    switch (no.type) {
      case "root": {
        const children = no.children ?? [];
        return (
          <div className={`${no.props.className ?? ""} ${editorClass}`}>
            {children.map((child, index) => (
              <ComponentRender
                key={(child.props?.key as string) ?? index}
                no={child}
                isEditable={isEditable}
              />
            ))}
          </div>
        );
      }

      case "Button": {
        const href = no.props.href as string | undefined;
        return href ? (
          <a
            href={href}
            className={`${no.props.className} ${editorClass}`}
            onClick={preventNavIfEditing}
          >
            {no.props.content ?? ""}
          </a>
        ) : (
          <button
            className={`${no.props.className} ${editorClass}`}
            type="button"
          >
            {no.props.content ?? ""}
          </button>
        );
      }

      case "Text": {
        const tag = no.props.tag as string;
        const Tag = validTextTags.includes(tag as any) ? (tag as any) : "span";
        return (
          <Tag
            className={`${no.props.className} ${editorClass}`}
            onClick={Tag === "a" ? preventNavIfEditing : undefined}
          >
            {no.props.content ?? ""}
          </Tag>
        );
      }

      case "Image": {
        return (
          <img
            src={(no.props.src as string) || "https://via.placeholder.com/150"}
            alt={(no.props.alt as string) || "Imagem"}
            className={`${no.props.className} ${editorClass}`}
          />
        );
      }

      case "Input": {
        const tag = (no.props.tag as string) || "input";
        const type = (no.props.type as string) || "text";
        if (tag === "textarea") {
          return (
            <textarea
              rows={typeof no.props.rows === "number" ? no.props.rows : 4}
              placeholder={(no.props.placeholder as string) ?? ""}
              className={`${no.props.className ?? ""} ${editorClass}`}
              readOnly={isEditable}
            />
          );
        }
        return (
          <input
            type={type}
            placeholder={(no.props.placeholder as string) ?? ""}
            className={`${no.props.className ?? ""} ${editorClass}`}
            readOnly={isEditable}
          />
        );
      }

      case "Card": {
        const children = no.children ?? [];
        const Tag = validCardTags.includes(no.props.tag as any)
          ? (no.props.tag as any)
          : "div";
        return (
          <Tag className={`${no.props.className} ${editorClass}`}>
            {children.map((child, index) => (
              <ComponentRender
                key={(child.props?.key as string) ?? index}
                no={child}
                isEditable={isEditable}
              />
            ))}
          </Tag>
        );
      }

      default:
        return null;
    }
  };

  const element = renderElement();

  if (!isEditable) return element;

  const isSelected = selectedNodeKey === nodeKey;
  const isHovered = hoveredNodeKey === nodeKey;
  const showRing = isSelected || isHovered;
  const showDropZone = isContainer && isOver && !isDragging;

  const selectionRingClass = showRing
    ? "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)] z-10"
    : "";
  const dropZoneClass = showDropZone
    ? "bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-[var(--background)]"
    : "";
  const draggingClass = isDragging ? "opacity-50" : "";

  const handleRootMouseMove = (e: React.MouseEvent) => {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const keyEl = target?.closest?.("[data-node-key]");
    const key = keyEl?.getAttribute("data-node-key") ?? null;
    setHoveredNode(key);
  };

  return (
    <div
      ref={setNodeRef}
      {...(nodeKey ? { "data-node-key": nodeKey } : {})}
      className={`group relative overflow-visible transition-[box-shadow,outline] rounded-[var(--radius-default)] ${selectionRingClass} ${dropZoneClass} ${draggingClass} ${!isRoot ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
      onClick={(e) => {
        e.stopPropagation();
        if (nodeKey) setSelectedNode(nodeKey);
      }}
      onMouseMove={isRoot ? handleRootMouseMove : undefined}
      onMouseLeave={isRoot ? () => setHoveredNode(null) : undefined}
      {...(isRoot ? {} : { ...listeners, ...attributes })}
    >
      <div className={isRoot ? "w-full min-h-[120px]" : "min-w-0"}>{element}</div>

      <div
        className={`absolute flex items-center gap-1 z-[60] ${
          isRoot ? "bottom-2 right-2" : "top-0 right-0 -translate-y-1/2"
        } ${showRing ? "flex" : "hidden"} transition-opacity`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (nodeKey) setSelectedNode(nodeKey);
          }}
          className="flex items-center justify-center bg-primary text-background p-1.5 rounded shadow-md hover:scale-105 transition-transform"
          aria-label="Edit"
        >
          <Edit2 size={12} strokeWidth={3} />
        </button>

        {!isRoot && nodeKey && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeComponent(nodeKey);
            }}
            className="flex items-center justify-center bg-destructive text-white p-1.5 rounded shadow-md hover:scale-105 transition-transform"
            aria-label="Remove"
          >
            <Trash2 size={12} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};
