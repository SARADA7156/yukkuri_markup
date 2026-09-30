import type { ScriptData } from "@/types/scriptData";
import { create } from "zustand";

interface EditorStatus {
    totalLine: number;
    totalChar: number;
}

interface EditorStore {
    /**
     * エディターに入力しJSON形式に成形されたデータが格納されている。
     */
    scriptData: ScriptData;

    /**
     * 行や文字数の総数を保管する
     */
    editorStatus: EditorStatus;

    /**
     * 台本データを更新するメソッド
     * @param data パースされたJSON形式の台本データ
     */
    updateScriptData: (data: ScriptData) => void;

    /**
     * エディターのステータスを更新するメソッド
     * @param data 更新後のデータ
     */
    updateEditorStatus: (data: EditorStatus) => void;
}

export const useEditorStore = create<EditorStore>((set) => {
    return {
        scriptData: {
            type: "doc",
            content: []
        },

        editorStatus: { totalLine: 1, totalChar: 0 },

        updateScriptData: (data) => set(() => ({
            scriptData: data
        })),

        updateEditorStatus: (data) => set(() => ({
            editorStatus: data
        }))
    }
});