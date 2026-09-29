import type { Editor } from "@tiptap/react";
import type { EditorStatus } from "../types/editor";
import { useEffect, useState } from "react";

interface StatusBarProps {
    editor: Editor;
}

export default function StatusBar({ editor }: StatusBarProps) {
    const [editorStatus, setEditorStatus] = useState<EditorStatus>({
        totalLine: 0,
        totalChar: 0,
    });

    useEffect(() => {
        const handleUpdate = () => {
            const characterCount = editor.storage.characterCount.characters();

            let lineCount = 0;
            editor.state.doc.forEach((node) => {
                if (node.isBlock) lineCount++;
            });

            setEditorStatus({ totalLine: lineCount, totalChar: characterCount });
        }

        editor.on("update", handleUpdate);

        return () => {
            editor.off("update", handleUpdate);
        }
    }, [editor]);

    return (
        <div className="bg-blue-500 flex flex-row-reverse items-center px-4 text-sm">
            <div>
                <p>トータル: {editorStatus.totalLine}行 / {editorStatus.totalChar}文字</p>
            </div>
        </div>
    );
}