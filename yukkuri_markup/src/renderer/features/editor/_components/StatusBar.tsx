import { useEditorStore } from "@/store/editor/useEditorStore";

export default function StatusBar() {
    const { editorStatus } = useEditorStore();

    return (
        <div className="bg-blue-500 flex flex-row-reverse items-center px-4 text-sm">
            <div>
                <p>トータル: {editorStatus.totalLine}行 / {editorStatus.totalChar}文字</p>
            </div>
        </div>
    );
}