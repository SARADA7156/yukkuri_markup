import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { useScriptStore } from "@/renderer/store/script/useScriptStore";
import { formatMs } from "../preview/calculateDuration";

export default function StatusBar() {
    const editorStatus = useEditorStore((s) => s.editorStatus);
    const totalReadingMs = useScriptStore((s) => s.totalReadingMs);

    return (
        <div className="bg-blue-500 flex flex-row-reverse items-center px-4 text-sm gap-4">
            <div>
                <p>総読上げ時間(予想): {formatMs(totalReadingMs, "mm:ss")}</p>
            </div>
            <div>
                <p>トータル: {editorStatus.totalLine}行 / {editorStatus.totalChar}文字</p>
            </div>
        </div>
    );
}