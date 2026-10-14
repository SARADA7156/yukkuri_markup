import { useScriptStore } from "@/renderer/store/script/useScriptStore";

export default function FileStatus() {
    const { fileName, isModified } = useScriptStore();

    return (
        <div className="border-b border-b-(--border) bg-(--content2) rounded-t-lg flex px-2 gap-1">
            <p className="content-center">{fileName}</p>
            {isModified && <p className="content-center">●</p>}
        </div>
    );
}