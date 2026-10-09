import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import type { Character } from "@/renderer/store/speacker/character";
import type { Emotion } from "@/renderer/store/speacker/emotions";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { Editor } from "@tiptap/core";
import type { Node } from "@tiptap/pm/model";
import type { Transaction } from "@tiptap/pm/state";
import { useEffect } from "react";

export default function useTransaction(editor: Editor | null) {
    const updateEditorStatus = useEditorStore((state) => state.updateEditorStatus);
    const characters = useSpeackerStore((state) => state.characters);
    const emotions = useSpeackerStore((state) => state.emotions);

    const scripts = useScriptStore((state) => state.scripts);
    const syncScripts = useScriptStore((state) => state.syncScripts);

    const debouncedParse = useDebouncedCallback((content: readonly Node[], chars: Character[], emos: Emotion[]) => {
        const ids: string[] = [];
        content.forEach((node) => {
            if (node.attrs.lineId) ids.push(node.attrs.lineId);
        });



        console.log({ ids });

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

            debouncedParse(transaction.doc.content.content, characters, emotions)

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