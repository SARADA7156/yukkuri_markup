import Button from "@/components/Button/Button";
import { Editor, EditorContent } from "@tiptap/react";

interface ScriptEditorProps {
    editor: Editor;
}

export default function ScriptEditor({ editor }: ScriptEditorProps) {
    const contentClear = () => {
        editor.commands.clearContent();
    }

    return (
        <div className="h-full w-1/2 border-e border-e-black/20 flex flex-col">
            <EditorContent editor={editor} className="h-full" />

            <div className="mt-auto border-t border-t-black/20 p-2">
                <Button className="ms-auto text-red-600" onClick={() => contentClear()}>
                    全て削除
                </Button>
            </div>
        </div>
    )
}