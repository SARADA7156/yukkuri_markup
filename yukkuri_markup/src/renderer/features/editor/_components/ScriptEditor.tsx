import { Editor, EditorContent } from "@tiptap/react";

interface ScriptEditorProps {
    editor: Editor;
}

export default function ScriptEditor({ editor }: ScriptEditorProps) {
    return (
        <div className="w-1/2 min-h-full border-e border-e-(--border) grid grid-rows-[3%_97%]">
            <h1 className="mx-2">エディター</h1>
            <EditorContent editor={editor}/>
        </div>
    )
}