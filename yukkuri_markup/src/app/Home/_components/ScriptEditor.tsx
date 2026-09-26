import { Editor, EditorContent } from "@tiptap/react";

interface ScriptEditorProps {
    editor: Editor;
}

export default function ScriptEditor({ editor }: ScriptEditorProps) {
    return (
        <div className="w-1/2 border-e border-e-(--border) flex flex-col">
            <p className="ms-2">エディター</p>
            <EditorContent editor={editor} className="h-full" />
        </div>
    )
}