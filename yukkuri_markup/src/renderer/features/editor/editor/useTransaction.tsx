import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import type { BaseObject } from "@/renderer/types/script";
import type { Editor } from "@tiptap/core";
import type { Transaction } from "@tiptap/pm/state";
import { useEffect } from "react";

export default function useTransaction(editor: Editor | null) {
    const updateEditorStatus = useEditorStore((state) => state.updateEditorStatus);

    const syncScripts = useScriptStore((state) => state.syncScripts);

    const debouncedParse = useDebouncedCallback(() => {
        if (!editor) return;

        const { lineIds, scripts } = useScriptStore.getState();

        const ids: string[] = [];
        const newScripts: Record<string, BaseObject> = {};

        // Tiptapの全ノード内のidを取得
        editor.state.doc.forEach((node) => {
            const id: string | undefined = node.attrs.lineId;
            if (id) {
                ids.push(id);

                // 文字列を直接比較し差分を検知する
                const prevText = scripts[id]?.text;
                const text = node.textContent;

                if (prevText !== undefined && prevText !== text) {
                    newScripts[id] = { id, text };
                }
            }
        });

        // idによる追加検知
        const oldIds = new Set(lineIds);
        editor.state.doc.forEach((node) => {
            const id: string | undefined = node.attrs.lineId;
            if (id && !oldIds.has(id)) {
                newScripts[id] = { id, text: node.textContent };
            }
        });

        syncScripts({ lineIds: ids, changed: newScripts });
    }, 500);

    useEffect(() => {
        if (!editor) return;

        const handleTransaction = ({ 
            editor,
            transaction
        }: {
            editor: Editor,
            transaction: Transaction
        }) => {
            if (!transaction.docChanged) return;

            debouncedParse()

            const characterCount = editor.storage.characterCount.characters();
            let lineCount = 0;
            editor.state.doc.forEach((node) => {
                if (node.isBlock) lineCount++;
            });

            updateEditorStatus({ totalLine: lineCount, totalChar: characterCount });
        }

        editor.on("transaction", handleTransaction);

        return () => {
            editor.off("transaction", handleTransaction);
        }
    }, [editor]);
}