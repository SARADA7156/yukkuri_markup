import Container from "@/components/Container";
import Toolbar from "./_components/Toolbar";
import { parseScriptToJson, type ScriptData } from "./parser";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { DEFAULT_CHARACTERS, type Character } from "./character";
import SideBar from "./_components/SideBar";

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
        <div className="mt-4">
            <Toolbar />

            <Container className="flex h-185 bg-white">
                <SideBar chars={chars} editor={editor} />

                <div className="flex bg-white w-full">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview scriptData={scriptData} />
                </div>
            </Container>
        </div>
    );
}