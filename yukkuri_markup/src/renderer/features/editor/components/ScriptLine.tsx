import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { formatMs } from "../extensions/calculateDuration";
import { memo } from "react";

export default memo(function ScriptLine({ lineId }: { lineId: string }) {
    const script = useScriptStore((s) => s.scripts[lineId]);

    if (!script) return null;

    return (
        <div className="flex flex-col gap-1">
            {script.type === "yukkuriVoice" &&
                <div className="flex items-center">
                    <strong className="min-w-26">{script.speaker}({script.emotion})</strong>
                    <p>{script.text}</p>
                    <p className="text-green-500 text-sm ms-1">{formatMs(script.readingMs)}</p>
                </div>
            }

            {script.type === "paragraph" &&
                <p>{script.text}</p>
            }
        </div>
    );
})