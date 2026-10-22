import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { formatMs } from "../extensions/calculateDuration";
import { memo } from "react";

export default memo(function ScriptLine({ lineId }: { lineId: string }) {
    const lineData = useScriptStore((s) => s.parsedScripts[lineId]);

    if (!lineData) return null;

    return (
        <div className="flex flex-col gap-1">
            {lineData.type === "yukkuriVoice" &&
                <div className="flex items-center">
                    <strong className="min-w-26">{lineData.speaker}({lineData.emotion})</strong>
                    <p>{lineData.text}</p>
                    <p className="text-green-500 text-sm ms-1">{formatMs(lineData.readingMs)}</p>
                </div>
            }

            {lineData.type === "paragraph" &&
                <p>{lineData.text}</p>
            }
        </div>
    );
})