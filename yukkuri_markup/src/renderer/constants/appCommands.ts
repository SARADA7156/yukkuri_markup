import type { Command } from "../types/command";

const COMMANDS = ["FILE_OPEN", "SAVE", "SETTINGS", "EXIT", "UNDO", "REDO", "CUT", "COPY", "PASTE", "HELP", "RELEASE_NOTES"] as const;

type CommandKey = typeof COMMANDS[number];

export const APP_COMMANDS: Record<CommandKey, Command> = {
    FILE_OPEN: {
        id: "fileOpen",
        label: "ファイルを開く",
        shortcut: ["ControlLeft", "KeyO"],
        shortcutLabel: "Ctrl+O",
        execute: (ctx) => { }
    },
    SAVE: {
        id: "save",
        label: "保存",
        shortcut: ["ControlLeft", "KeyS"],
        shortcutLabel: "Ctrl+S",
        execute: (ctx) => { }
    },
    SETTINGS: {
        id: "settings",
        label: "設定",
        shortcut: ["ControlLeft", "Comma"],
        shortcutLabel: "Ctrl+,",
        execute: (ctx) => {
            ctx.openModal("settings");
        }
    },
    EXIT: {
        id: "exit",
        label: "終了",
        execute: (ctx) => {
            window.electronAPI.quit()
        }
    },
    UNDO: {
        id: "undo",
        label: "元に戻す",
        shortcut: ["ControlLeft", "KeyZ"],
        shortcutLabel: "Ctrl+Z",
        execute: (ctx) => {
            ctx.editor?.chain().focus().undo().run();
        },
    },
    REDO: {
        id: "redo",
        label: "やり直し",
        shortcut: ["ControlLeft", "KeyY"],
        shortcutLabel: "Ctrl+Y",
        execute: (ctx) => {
            ctx.editor?.chain().focus().redo().run();
        },
    },
    CUT: {
        id: "cut",
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
        id: "copy",
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
        id: "paste",
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