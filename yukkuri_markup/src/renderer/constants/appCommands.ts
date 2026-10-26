import { loadScript } from "../lib/loadScript";
import { saveScript } from "../lib/saveScript";
import type { Command } from "../types/command";

const COMMANDS = ["FILE_OPEN", "SAVE", "SAVE_AS", "SETTINGS", "EXIT", "HELP", "RELEASE_NOTES"] as const;

export type CommandKey = typeof COMMANDS[number];

export const APP_COMMANDS: Record<CommandKey, Command> = {
    FILE_OPEN: {
        id: "FILE_OPEN",
        label: "ファイルを開く",
        shortcut: "ctrl+o",
        execute: (ctx) => loadScript(ctx),
    },
    SAVE: {
        id: "SAVE",
        label: "保存",
        shortcut: "ctrl+s",
        execute: (ctx) => saveScript(ctx)
    },
    SAVE_AS: {
        id: "SAVE_AS",
        label: "名前を付けて保存",
        shortcut: "ctrl+shift+s",
        execute: (ctx) => saveScript(ctx, true),
    },
    SETTINGS: {
        id: "SETTINGS",
        label: "設定",
        shortcut: "ctrl+comma",
        execute: (ctx) => {
            ctx.openModal("settings");
        }
    },
    EXIT: {
        id: "EXIT",
        label: "終了",
        execute: (ctx) => {
            ctx.api?.quit()
        }
    },
    // UNDO: {
    //     id: "UNDO",
    //     label: "元に戻す",
    //     shortcut: ["ControlLeft", "KeyZ"],
    //     shortcut: "ctrl+Z",
    //     execute: (ctx) => {
    //         ctx.editor?.chain().focus().undo().run();
    //     },
    // },
    // REDO: {
    //     id: "REDO",
    //     label: "やり直し",
    //     shortcut: ["ControlLeft", "KeyY"],
    //     shortcut: "ctrl+Y",
    //     execute: (ctx) => {
    //         ctx.editor?.chain().focus().redo().run();
    //     },
    // },
    // CUT: {
    //     id: "CUT",
    //     label: "切り取り",
    //     shortcut: "ctrl+X",
    //     execute: (ctx) => {
    //         const editor = ctx.editor;
    //         if (editor) {
    //             const selectedText = editor.state.doc.textBetween(
    //                 editor.state.selection.from,
    //                 editor.state.selection.to,
    //                 "\n"
    //             );
    //             navigator.clipboard.writeText(selectedText);
    //             editor.chain().focus().deleteSelection().run();
    //         }
    //     }
    // },
    // COPY: {
    //     id: "COPY",
    //     label: "コピー",
    //     shortcut: "ctrl+C",
    //     execute: (ctx) => {
    //         const editor = ctx.editor;
    //         if (editor) {
    //             const selectedText = editor.state.doc.textBetween(
    //                 editor.state.selection.from,
    //                 editor.state.selection.to,
    //                 "\n"
    //             );
    //             navigator.clipboard.writeText(selectedText);
    //         }
    //     }
    // },
    HELP: {
        id: "HELP",
        label: "ヘルプ",
        execute: (ctx) => {
            ctx.openModal("help");
        }
    },
    RELEASE_NOTES: {
        id: "RELEASE_NOTES",
        label: "リリースノート",
        execute: (ctx) => {
            ctx.openModal("releaseNotes");
        }
    }
} as const;