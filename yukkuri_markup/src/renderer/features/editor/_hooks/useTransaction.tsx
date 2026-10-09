import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useScriptStore, type ScriptObject } from "@/renderer/store/script/useScriptStore";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { Editor } from "@tiptap/core";
import type { Transaction } from "@tiptap/pm/state";
import { useEffect } from "react";
import { parseToJson } from "../lib/parseToJson";
import { calculateDuration } from "../lib/calculateDuration";

export default function useTransaction(editor: Editor | null) {
    const updateEditorStatus = useEditorStore((state) => state.updateEditorStatus);
    const characters = useSpeackerStore((state) => state.characters);
    const emotions = useSpeackerStore((state) => state.emotions);

    const lineIds = useScriptStore((state) => state.lineIds);
    const scripts = useScriptStore((state) => state.scripts);
    const syncScripts = useScriptStore((state) => state.syncScripts);

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
        const oldIds = new Set(lineIds);
        const added = ids.filter(id => !oldIds.has(id));

        const newScripts: Record<string, ScriptObject> = {};
        added.forEach((id) => {
            const node = editor.state.doc.content.content.find((n) => n.attrs.lineId === id);

            if (!node) return;

            const rawText = node.content.content[0]?.text ?? "";
            const scriptData = parseToJson(rawText, characters, emotions);
            const readingTime = calculateDuration(scriptData.text)

            if (scriptData.type === "yukkuriVoice") {
                const { type, text, emotion, speaker } = scriptData;
                newScripts[id] = {
                    id,
                    type,
                    text,
                    readingTime,
                    emotion,
                    speaker,
                }
                return;
            }
            newScripts[id] = {
                id,
                type: scriptData.type,
                text: scriptData.text,
                readingTime,
            };
        });

        console.log(ids, newScripts);
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