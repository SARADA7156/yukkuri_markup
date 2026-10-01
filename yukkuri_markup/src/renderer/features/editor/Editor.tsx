import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count"
import { parseScriptToJson } from "./parser";
import CharBar from "./_components/characters/CharBar";
import EmotionBar from "./_components/emotions/EmotionBar";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import StatusBar from "./_components/StatusBar";
import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";

export default function Editor() {
    const { characters, emotions } = useSpeackerStore();
    const { updateScriptData, updateEditorStatus } = useEditorStore();

    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount
        ],
        onUpdate({ editor }) {
            const text = editor.getText();
            const parsedJson = parseScriptToJson(text, characters, emotions);

            updateScriptData(parsedJson);

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

                <div className="flex-1 flex m-0.5 bg-(--content) rounded-lg border border-(--border)">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview />
                </div>
            </div>

            <StatusBar />
        </>
    );
}