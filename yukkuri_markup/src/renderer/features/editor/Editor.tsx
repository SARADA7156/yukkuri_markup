import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count"
import { Mention } from "@tiptap/extension-mention";
import UniqueID from "@tiptap/extension-unique-id";
import { suggestion } from "./lib/suggestion";
import CharBar from "./_components/CharBar";
import EmotionBar from "./_components/EmotionBar";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import StatusBar from "./_components/StatusBar";
import Panel from "@/renderer/components/Panel";

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CharacterCount,
            Mention.configure({
                HTMLAttributes: { class: "mention" },
                suggestion
            }),
            UniqueID.configure({
                types: ["paragraph"],
                attributeName: "lineId"
            }),
        ],
    });

    return (
        <>
            <div className="flex h-full">
                <div className="grid grid-rows-2">
                    <CharBar editor={editor} />
                    <EmotionBar editor={editor} />
                </div>

                <Panel className="flex-1 flex m-0.5">
                    <ScriptEditor editor={editor} />
                    <ScriptPreview />
                </Panel>
            </div>

            <StatusBar />
        </>
    );
}