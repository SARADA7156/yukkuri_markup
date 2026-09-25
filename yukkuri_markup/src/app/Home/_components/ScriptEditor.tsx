import { Editor, EditorContent } from "@tiptap/react";

interface ScriptEditorProps {
    editor: Editor;
}

export default function ScriptEditor({ editor }: ScriptEditorProps) {
    return (
        <EditorContent editor={editor} className="h-full w-1/2 p-2 border-e border-e-[#00000036]" />
    )
}