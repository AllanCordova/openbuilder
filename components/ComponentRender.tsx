"use client";

import { ASTNode } from "@/types/AstNode.type";
import { useCanvas } from "@/hooks/useCanvas";
import { Trash2, Edit2 } from "lucide-react";

type PropsType = {
  no: ASTNode;
  isEditable?: boolean;
};

const validTextTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
] as const;

export const ComponentRender = ({ no, isEditable = false }: PropsType) => {
  const { removeComponent, setSelectedNode, selectedNodeKey } = useCanvas();

  const renderElement = () => {
    switch (no.type) {
      case "root": {
        const children = no.children ?? [];
        return (
          <>
            {children.map((child, index) => (
              <ComponentRender key={index} no={child} isEditable={isEditable} />
            ))}
          </>
        );
      }
      case "Button":
        return (
          <button className={no.props.className} type="button">
            {no.props.content ?? ""}
          </button>
        );
      case "Text": {
        const tag = no.props.tag;
        const Tag =
          typeof tag === "string" &&
          validTextTags.includes(tag as (typeof validTextTags)[number])
            ? (tag as (typeof validTextTags)[number])
            : "span";
        return (
          <Tag className={no.props.className}>{no.props.content ?? ""}</Tag>
        );
      }
      case "Card": {
        const children = no.children ?? [];
        return (
          <div className={no.props.className}>
            {children.map((child, index) => (
              <ComponentRender key={index} no={child} isEditable={isEditable} />
            ))}
          </div>
        );
      }
      default: {
        const children = no.children ?? [];
        if (children.length > 0) {
          return (
            <div className={no.props.className}>
              {children.map((child, index) => (
                <ComponentRender
                  key={index}
                  no={child}
                  isEditable={isEditable}
                />
              ))}
            </div>
          );
        }
        return null;
      }
    }
  };

  const element = renderElement();

  if (!isEditable || no.type === "root") {
    return element;
  }

  const isSelected = selectedNodeKey === no.props.key;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (no.props.key) {
          setSelectedNode(no.props.key as string);
        }
      }}
      className={`relative group transition-all cursor-pointer ${
        isSelected
          ? "outline outline-2 outline-primary outline-offset-2"
          : "hover:outline hover:outline-2 hover:outline-blue-500/50 hover:outline-offset-2"
      }`}
    >
      <div className="pointer-events-none">{element}</div>

      <div
        className={`absolute -top-4 -right-2 flex items-center gap-1 z-50 ${isSelected ? "flex" : "hidden group-hover:flex"}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedNode(no.props.key as string);
          }}
          className="flex items-center justify-center bg-primary text-background p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label="Edit component"
        >
          <Edit2 size={14} strokeWidth={2.5} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (no.props.key) removeComponent(no.props.key as string);
          }}
          className="flex items-center justify-center bg-[var(--destructive)] text-white p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform"
          aria-label="Remove component"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
