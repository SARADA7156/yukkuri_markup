import type { Command } from "../types/command";

const COMMANDS = ["FILE_OPEN", "SAVE", "SETTINGS", "EXIT", "UNDO", "REDO", "CUT", "COPY", "PASTE", "HELP", "RELEASE_NOTES"] as const;

type CommandKey = typeof COMMANDS[number];

export const APP_COMMANDS: Record<CommandKey, Command> = {
    FILE_OPEN: {
        id: "fileOpen",
        label: "ファイルを開く",
        execute: (ctx) => { }
    },
    SAVE: {
        id: "save",
        label: "保存",
        execute: (ctx) => { }
    },
    SETTINGS: {
        id: "settings",
        label: "設定",
        execute: (ctx) => {
            ctx.openModal("settings");
        }
    },
    EXIT: {
        id: "exit",
        label: "終了",
        execute: (ctx) => { }
    },
    UNDO: {
        id: "undo",
        label: "元に戻す",
        execute: (ctx) => {
            ctx.editor?.chain().focus().undo().run();
        },
    },
    REDO: {
        id: "redo",
        label: "やり直し",
        execute: (ctx) => {
            ctx.editor?.chain().focus().redo().run();
        },
    },
    CUT: {
        id: "cut",
        label: "切り取り",
        execute: (ctx) => {
            const editor = ctx.editor;
            if (editor) {
                const selectedText = editor.state.doc.textBetween(
                    editor.state.selection.from,
                    editor.state.selection.to,
                    "\n"
                );
                navigator.clipboard.writeText(selectedText);
                editor.chain().focus().deleteSelection().run();
            }
        }
    },
    COPY: {
        id: "copy",
        label: "コピー",
        execute: (ctx) => {
            const editor = ctx.editor;
            if (editor) {
                const selectedText = editor.state.doc.textBetween(
                    editor.state.selection.from,
                    editor.state.selection.to,
                    "\n"
                );
                navigator.clipboard.writeText(selectedText);
            }
        }
    },
    PASTE: {
        id: "paste",
        label: "貼り付け",
        execute: async (ctx) => {
            const editor = ctx.editor;
            if (editor) {
                const clipboardText = await navigator.clipboard.readText();
                editor.chain().focus().insertContent(clipboardText).run();
            }
        }
    },
    HELP: {
        id: "help",
        label: "ヘルプ",
        execute: (ctx) => {
            ctx.openModal("help");
        }
    },
    RELEASE_NOTES: {
        id: "releaseNotes",
        label: "リリースノート",
        execute: (ctx) => {
            ctx.openModal("releaseNotes");
        }
    }
} as const;