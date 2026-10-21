import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { formatMs } from "../extensions/calculateDuration";
import { memo } from "react";
import { toScriptObject } from "../extensions/parseToJson";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";

export default memo(function ScriptLine({ lineId }: { lineId: string }) {
    const lineData = useScriptStore((s) => s.scripts[lineId]);
    const { characters, emotions } = useSpeackerStore();

    if (!lineData) return null;

    const scriptObject = toScriptObject(lineData.text, characters, emotions);

    return (
        <div className="flex flex-col gap-1">
            {scriptObject.type === "yukkuriVoice" &&
                <div className="flex items-center">
                    <strong className="min-w-26">{scriptObject.speaker}({scriptObject.emotion})</strong>
                    <p>{scriptObject.text}</p>
                    <p className="text-green-500 text-sm ms-1">{formatMs(scriptObject.readingMs)}</p>
                </div>
            }

            {scriptObject.type === "paragraph" &&
                <p>{scriptObject.text}</p>
            }
        </div>
    );
})