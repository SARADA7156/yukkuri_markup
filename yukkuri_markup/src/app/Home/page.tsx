import Toolbar from "./_components/Toolbar";
import { parseScriptToJson, type ScriptData } from "./parser";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DEFAULT_CHARACTERS, type Character } from "./_components/characters/character";
import CharBar from "./_components/characters/CharBar";

export default function EditorHome() {
    const [scriptData, setScriptData] = useState<ScriptData>({
        type: "doc",
        content: []
    });

    const [chars, setChars] = useState<Character[]>(DEFAULT_CHARACTERS);

    const editor = useEditor({
        extensions: [StarterKit],
        onUpdate({ editor }) {
            const text = editor.getText();
            const parsedJson = parseScriptToJson(text, chars);

            onChangeJson(parsedJson);
        }
    });

    const onChangeJson = (data: ScriptData) => {
        setScriptData(data);
    }

    return (
        <div className="grid grid-rows-[3%_94%_3%] h-full">
            <Toolbar />

            <div className="flex h-full">
                <CharBar chars={chars} editor={editor} setChars={setChars} />

                <div className="flex-1 flex m-0.5 bg-(--content) rounded-lg border border-(--border)">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview scriptData={scriptData} />
                </div>
            </div>

            <div>
                
            </div>
        </div>
    );
}