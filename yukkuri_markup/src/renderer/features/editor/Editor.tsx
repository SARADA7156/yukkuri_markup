import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count"
import { Mention } from "@tiptap/extension-mention";
import UniqueID from "@tiptap/extension-unique-id";
import { suggestion } from "./autoComplete/suggestion";
import CharBar from "./speaker/CharBar";
import EmotionBar from "./speaker/EmotionBar";
import ScriptEditor from "./editor/ScriptEditor";
import ScriptPreview from "./preview/ScriptPreview";
import StatusBar from "./status/StatusBar";
import Panel from "@/renderer/components/Panel";
import FileStatus from "./fileStatus/FileStatus";

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

                <Panel className="flex-1 grid grid-rows-[4%_96%] m-0.5">
                    <FileStatus />

                    <div className="flex">
                        <ScriptEditor editor={editor} />
                        <ScriptPreview />
                    </div>
                </Panel>
            </div>

            <StatusBar />
        </>
    );
}