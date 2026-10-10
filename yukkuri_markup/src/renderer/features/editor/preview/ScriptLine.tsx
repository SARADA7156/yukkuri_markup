import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { parseToJson } from "./parseToJson";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import { formatMs } from "./calculateDuration";
import { memo } from "react";

export default memo(function ScriptLine({ lineId }: { lineId: string }) {
    const script = useScriptStore((s) => s.scripts[lineId]);
    const chars = useSpeackerStore((s) => s.characters);
    const emos = useSpeackerStore((s) => s.emotions);

    if (!script) return null;

    const parsed = parseToJson(script.text, chars, emos);

    return (
        <div className="flex flex-col gap-1">
            {parsed.type === "yukkuriVoice" &&
                <div className="flex items-center">
                    <strong className="min-w-26">{parsed.speaker}({parsed.emotion})</strong>
                    <p>{parsed.text}</p>
                    <p className="text-green-500 text-sm ms-1">{formatMs(parsed.readingMs)}</p>
                </div>
            }

            {parsed.type === "paragraph" &&
                <p>{parsed.text}</p>
            }
        </div>
    );
})