import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { ScriptObject } from "@/shared/script";
import type { Editor } from "@tiptap/core";
import type { Transaction } from "@tiptap/pm/state";
import { useEffect } from "react";
import { parseToJson } from "../extensions/parseToJson";

export default function useTransaction(editor: Editor | null) {
    const updateEditorStatus = useEditorStore((state) => state.updateEditorStatus);

    const syncScripts = useScriptStore((state) => state.syncScripts);

    const debouncedParse = useDebouncedCallback(() => {
        if (!editor) return;

        const { lineIds, scripts } = useScriptStore.getState();
        const { characters, emotions } = useSpeackerStore.getState();

        const ids: string[] = [];
        const newScripts: Record<string, ScriptObject> = {};

        // Tiptapの全ノード内のidを取得
        editor.state.doc.forEach((node) => {
            const id: string | undefined = node.attrs.lineId;
            if (id) {
                ids.push(id);

                // 文字列を直接比較し差分を検知する
                const prevText = scripts[id]?.text;
                const text = node.textContent;

                if (prevText !== undefined && prevText !== text) {
                    newScripts[id] = { id, ...parseToJson(text, characters, emotions) };
                }
            }
        });

        // idによる追加検知
        const oldIds = new Set(lineIds);
        editor.state.doc.forEach((node) => {
            const id: string | undefined = node.attrs.lineId;
            if (id && !oldIds.has(id)) {
                newScripts[id] = { id, ...parseToJson(node.textContent, characters, emotions) };
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