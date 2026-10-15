import {
    createContext,
    useContext,
} from "react";
import type { Editor as TiptapEditor } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@tiptap/extension-mention";
import { suggestion } from "./extensions/suggestion";
import UniqueID from "@tiptap/extension-unique-id";

const EditorInstanceContext =
    createContext<TiptapEditor | null>(null);

export function EditorProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            Mention.configure({
                HTMLAttributes: { class: "mention" },
                suggestion,
            }),
            UniqueID.configure({
                types: ["paragraph"],
                attributeName: "lineId",
            }),
        ],
    });

    return (
        <EditorInstanceContext.Provider value={editor}>
            {children}
        </EditorInstanceContext.Provider>
    );
}

export function useTiptapEditor() {
    return useContext(EditorInstanceContext);
}