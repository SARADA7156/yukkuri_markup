import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { parseScriptToJson, type ScriptData } from "../parser";

interface ScriptEditorProps {
    onChangeJson: (data: ScriptData) => void;
}

export default function ScriptEditor({ onChangeJson }: ScriptEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        onUpdate({ editor }) {
            const text = editor.getText();
            const parsedJson = parseScriptToJson(text);

            onChangeJson(parsedJson);
        }
    });

    return (
        <EditorContent editor={editor} className="h-full w-1/2 p-1 border-e border-e-[#00000036]" />
    )
}