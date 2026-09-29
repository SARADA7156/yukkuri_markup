import Toolbar from "./_components/Toolbar";
import { parseScriptToJson, type ScriptData } from "./parser";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharBar from "./_components/characters/CharBar";
import EmotionBar from "./_components/emotions/EmotionBar";
import { useSpeackerStore } from "@/store/speacker/useSpeakerStore";
import StatusBar from "./_components/StatusBar";

export default function EditorHome() {
    const [scriptData, setScriptData] = useState<ScriptData>({
        type: "doc",
        content: []
    });

    const { characters, emotions } = useSpeackerStore();

    const editor = useEditor({
        extensions: [StarterKit],
        onUpdate({ editor }) {
            const text = editor.getText();
            const parsedJson = parseScriptToJson(text, characters, emotions);

            setScriptData(parsedJson);
        }
    });

    return (
        <div className="grid grid-rows-[3%_94%_3%] h-full">
            <Toolbar />

            <div className="flex h-full">
                <div className="grid grid-rows-2">
                    <CharBar editor={editor} />
                    <EmotionBar editor={editor} />
                </div>

                <div className="flex-1 flex m-0.5 bg-(--content) rounded-lg border border-(--border)">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview scriptData={scriptData} />
                </div>
            </div>

            <StatusBar editor={editor} />
        </div>
    );
}