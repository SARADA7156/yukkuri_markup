import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { formatMs } from "../extensions/calculateDuration";
import { memo } from "react";
import Button from "@/renderer/components/Button";
import { MdContentCopy } from "react-icons/md";

export default memo(function ScriptLine({ lineId }: { lineId: string }) {
    const lineData = useScriptStore((s) => s.parsedScripts[lineId]);

    if (!lineData) return null;

    const handleClick = async (text: string) => {
        await navigator.clipboard.writeText(text);
    }

    return (
        <div className="flex gap-1">
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

            <Button title="セリフをコピー" onClick={() => handleClick(lineData.text)}>
                <MdContentCopy />
            </Button>
        </div>
    );
})