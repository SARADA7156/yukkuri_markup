import { create } from "zustand";

interface EditorStatus {
    totalLine: number;
    totalChar: number;
}

interface EditorStore {
    /**
     * 行や文字数の総数を保管する
     */
    editorStatus: EditorStatus;

    /**
     * エディターのステータスを更新するメソッド
     * @param data 更新後のデータ
     */
    updateEditorStatus: (data: EditorStatus) => void;
}

export const useEditorStore = create<EditorStore>((set) => {
    return {
        editorStatus: { totalLine: 1, totalChar: 0 },

        updateEditorStatus: (data) => set(() => ({
            editorStatus: data
        }))
    }
});