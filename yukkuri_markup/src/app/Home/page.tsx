import Container from "@/components/Container";
import Toolbar from "./_components/Toolbar";
import { parseScriptToJson, type ScriptData } from "./parser";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DEFAULT_CHARACTERS, type Character } from "./character";
import CharBar from "./_components/CharBar";

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

            <div className="bg-(--content) flex h-full">
                <CharBar chars={chars} editor={editor} />

                <div className="flex-1 flex min-h-full">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview scriptData={scriptData} />
                </div>

                <div className="w-[20%] bg-(--background) px-2">
                    <div id="speaker-settings-header">
                        <h1 className="border-b border-b-(--border)">読み上げ音声設定</h1>
                    </div>

                    <div>
                        <div>
                            <input type="number" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                
            </div>
        </div>
    );
}