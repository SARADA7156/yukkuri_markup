import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import ScriptLine from "./ScriptLine";

export default function ScriptPreview() {
    const lineIds = useScriptStore((s) => s.lineIds);

    return (
        <div className="px-2 w-1/2 grid grid-rows-[3%_97%] h-full rounded-lg">
            <h1>プレビュー</h1>

            <div className="pb-40 overflow-y-auto select-text">
                {lineIds.map((id) => (
                    <ScriptLine lineId={id} key={id} />
                ))}
            </div>
        </div>
    );
}