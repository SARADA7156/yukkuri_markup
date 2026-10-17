import type { Editor } from "@tiptap/core";
import type { ModalType } from "../store/modal/useModalState";
import type { ElectronAPI } from "@/shared/ipc-channels";
import type { CommandKey } from "../constants/appCommands";

export interface CommandContext {
    editor: Editor | null;
    openModal: (modalType: ModalType) => void;
    api?: ElectronAPI;
}

export interface Command {
    id: CommandKey;
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