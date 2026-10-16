import type { Editor } from "@tiptap/core";
import type { ModalType } from "../store/modal/useModalState";

export interface CommandContext {
    editor: Editor | null;
    openModal: (modalType: ModalType) => void;
}

export interface Command {
    id: string;
    label: string;
    shortcut?: string[];
    shortcutLabel?: string;
    isActive?: (ctx: CommandContext) => boolean;
    isEnabled?: (ctx: CommandContext) => boolean;
    execute: (ctx: CommandContext) => Promise<void> | void;
}

export interface MenuGroup {
    title: string;
    items: Command[];
}