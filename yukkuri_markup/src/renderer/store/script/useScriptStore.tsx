import type { BaseObject, ScriptData } from "@/shared/script";
import { create } from "zustand";

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, BaseObject>;
};

export interface ScriptStore {
    /** 入力した行ごとのユニークなidが格納される。この配列は表示される行の順序を保証しなければならない。 */
    lineIds: string[];

    /** 実際にエディタの行に入力したテキストとidのオブジェクトが格納される。 */
    scripts: Record<string, BaseObject>;

    /** 総読上げ時間 */
    totalReadingMs: number;

    /** 現在開いているファイル名 */
    fileName: string;

    /** 現在開いているファイルパス */
    filePath: string | undefined;

    /** 未保存状態かどうか */
    isModified: boolean;

    /**
     * idの配列と変更があったオブジェクトを渡し、ストアの状態を最新にする。
     * @param payload 新しくセットするidの配列と変更があった台本オブジェクト
     */
    syncScripts: (payload: SyncPayload) => void;

    loadScript: (data: ScriptData) => void;

    setFileInfo: (fileName: string, filePath: string) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    totalReadingMs: 0,
    fileName: "untitled",
    filePath: undefined,
    isModified: false,

    syncScripts: ({ lineIds, changed }) => set((state) => {
        const scripts: Record<string, BaseObject> = {};

        // 生きているIDだけ残す（削除もここで完了）
        for (const id of lineIds) {
            const s = changed[id] ?? state.scripts[id];
            if (s) scripts[id] = s;
        }

        return { lineIds, scripts, isModified: true };
    }),

    loadScript: ({ lineIds, scripts }) => set(() => ({
        lineIds,
        scripts,
    })),

    setFileInfo: (fileName, filePath) => set(() => ({
        fileName,
        filePath,
        isModified: false,
    })),
}));