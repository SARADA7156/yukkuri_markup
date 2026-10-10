import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { Editor } from "@tiptap/core";
import type { Transaction } from "@tiptap/pm/state";
import { useEffect } from "react";

export default function useTransaction(editor: Editor | null) {
    const updateEditorStatus = useEditorStore((state) => state.updateEditorStatus);
    const characters = useSpeackerStore((state) => state.characters);
    const emotions = useSpeackerStore((state) => state.emotions);

    const debouncedParse = useDebouncedCallback(() => {
        if (!editor) return;

        // Tiptapの全ノード内のidを取得
        const ids: string[] = [];

        editor.state.doc.forEach((node) => {
            if (node.attrs.lineId) {
                ids.push(node.attrs.lineId);
            }
        });

        // 行の追加判定
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
    }, [editor, characters, emotions]);
}