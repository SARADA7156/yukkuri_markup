import CharBar from "./components/CharBar";
import EmotionBar from "./components/EmotionBar";
import ScriptEditor from "./components/ScriptEditor";
import ScriptPreview from "./components/ScriptPreview";
import Panel from "@/renderer/components/Panel";
import FileStatus from "./components/FileStatus";

export default function Editor() {
    return (
        <div className="flex h-full">
            <div className="grid grid-rows-2">
                <CharBar />
                <EmotionBar />
            </div>

            <Panel className="flex-1 grid grid-rows-[4%_96%] m-0.5">
                <FileStatus />

                <div className="flex">
                    <ScriptEditor />
                    <ScriptPreview />
                </div>
            </Panel>
        </div>
    );
}