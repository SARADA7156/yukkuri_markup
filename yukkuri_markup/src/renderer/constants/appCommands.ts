import { saveScript } from "../lib/saveScript";
import type { Command } from "../types/command";

const COMMANDS = ["FILE_OPEN", "SAVE", "SAVE_AS", "SETTINGS", "EXIT", "UNDO", "REDO", "CUT", "COPY", "PASTE", "HELP", "RELEASE_NOTES"] as const;

export type CommandKey = typeof COMMANDS[number];

export const APP_COMMANDS: Record<CommandKey, Command> = {
    FILE_OPEN: {
        id: "FILE_OPEN",
        label: "ファイルを開く",
        shortcut: ["ControlLeft", "KeyO"],
        shortcutLabel: "Ctrl+O",
        execute: (ctx) => { ctx.api?.scriptLoad() }
    },
    SAVE: {
        id: "SAVE",
        label: "保存",
        shortcut: ["ControlLeft", "KeyS"],
        shortcutLabel: "Ctrl+S",
        execute: (ctx) => saveScript(ctx)
    },
    SAVE_AS: {
        id: "SAVE_AS",
        label: "名前を付けて保存",
        shortcut: ["ControlLeft", "ShiftLeft", "KeyS"],
        shortcutLabel: "Ctrl+Shift+S",
        execute: (ctx) => saveScript(ctx, true),
    },
    SETTINGS: {
        id: "SETTINGS",
        label: "設定",
        shortcut: ["ControlLeft", "Comma"],
        shortcutLabel: "Ctrl+,",
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
    UNDO: {
        id: "UNDO",
        label: "元に戻す",
        shortcut: ["ControlLeft", "KeyZ"],
        shortcutLabel: "Ctrl+Z",
        execute: (ctx) => {
            ctx.editor?.chain().focus().undo().run();
        },
    },
    REDO: {
        id: "REDO",
        label: "やり直し",
        shortcut: ["ControlLeft", "KeyY"],
        shortcutLabel: "Ctrl+Y",
        execute: (ctx) => {
            ctx.editor?.chain().focus().redo().run();
        },
    },
    CUT: {
        id: "CUT",
        label: "切り取り",
        shortcut: ["ControlLeft", "KeyX"],
        shortcutLabel: "Ctrl+X",
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
        id: "COPY",
        label: "コピー",
        shortcut: ["ControlLeft", "KeyC"],
        shortcutLabel: "Ctrl+C",
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
        id: "PASTE",
        label: "貼り付け",
        shortcut: ["ControlLeft", "KeyV"],
        shortcutLabel: "Ctrl+V",
        execute: async (ctx) => {
            const editor = ctx.editor;
            if (editor) {
                const clipboardText = await navigator.clipboard.readText();
                editor.chain().focus().insertContent(clipboardText).run();
            }
        }
    },
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