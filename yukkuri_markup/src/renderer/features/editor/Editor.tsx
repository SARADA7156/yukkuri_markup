import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count"
import { Mention } from "@tiptap/extension-mention";
import UniqueID from "@tiptap/extension-unique-id";
import { suggestion } from "./suggestion";
import { parseScriptToJson } from "./parser";
import CharBar from "./_components/CharBar";
import EmotionBar from "./_components/EmotionBar";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import StatusBar from "./_components/StatusBar";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import Panel from "@/renderer/components/Panel";
import { useDebouncedCallback } from "@/renderer/hooks/useDebouncedCallback";
import type { Character } from "@/renderer/store/speacker/character";
import type { Emotion } from "@/renderer/store/speacker/emotions";

export default function Editor() {
    const { characters, emotions } = useSpeackerStore();
    const { updateScriptData, updateEditorStatus } = useEditorStore();

    const debouncedParse = useDebouncedCallback((text: string, chars: Character[], emos: Emotion[]) => {
        const parsedJson = parseScriptToJson(text, chars, emos);
        updateScriptData(parsedJson);
    }, 500);

    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            Mention.configure({
                HTMLAttributes: { class: "mention" },
                suggestion
            }),
            UniqueID.configure({
                types: ["heading", "paragraph"],
                attributeName: "lineId"
            }),
        ],
        onUpdate({ editor }) {
            const text = editor.getText();
            const json = editor.getJSON();
            console.log(json)

            // 解析・保存データ更新は重い処理なのでデバウンス実行
            debouncedParse(text, characters, emotions);

            // 文字数・行数カウントのステータス更新は、軽い処理なので即時実行でレスポンスよく表示させる
            const characterCount = editor.storage.characterCount.characters();
            let lineCount = 0;
            editor.state.doc.forEach((node) => {
                if (node.isBlock) lineCount++;
            });

            updateEditorStatus({ totalLine: lineCount, totalChar: characterCount });
        }
    });

    return (
        <>
            <div className="flex h-full">
                <div className="grid grid-rows-2">
                    <CharBar editor={editor} />
                    <EmotionBar editor={editor} />
                </div>

                <Panel className="flex-1 flex m-0.5">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview />
                </Panel>
            </div>

            <StatusBar />
        </>
    );
}