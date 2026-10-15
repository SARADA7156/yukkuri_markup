import { EditorContent } from "@tiptap/react";
import { useTiptapEditor } from "../EditorProvider";
import useTransaction from "../extensions/useTransaction";

export default function ScriptEditor() {
    const editor = useTiptapEditor();

    if (!editor) return null;

    useTransaction(editor);
    return (
        <div className="w-1/2 min-h-full border-e border-e-(--border) grid grid-rows-[3%_97%]">
            <h1 className="mx-2">エディター</h1>
            <EditorContent editor={editor}/>
        </div>
    )
}