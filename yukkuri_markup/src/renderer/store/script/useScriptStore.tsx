import type { ScriptObject } from "@/renderer/types/script";
import { create } from "zustand";

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, ScriptObject>;
};

export interface ScriptStore {
    /** 入力した行ごとのユニークなidが格納される。この配列は表示される行の順序を保証しなければならない。 */
    lineIds: string[];

    /** 実際にエディタの行に入力したテキストとidのオブジェクトが格納される。 */
    scripts: Record<string, ScriptObject>;

    /** 総読上げ時間 */
    totalReadingMs: number;

    /** 現在開いているファイル名 */
    fileName: string;

    /** 現在開いているファイルパス */
    filePath: string | null;

    /** 未保存状態かどうか */
    isModified: boolean;

    /** ファイル読込み中かどうか */
    isLoading: boolean;

    /** エラー状態かどうか */
    error: string | null;

    /**
     * idの配列と変更があったオブジェクトを渡し、ストアの状態を最新にする。
     * @param payload 新しくセットするidの配列と変更があった台本オブジェクト
     */
    syncScripts: (payload: SyncPayload) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    totalReadingMs: 0,
    fileName: "untitle",
    filePath: null,
    isModified: false,
    isLoading: false,
    error: null,

    syncScripts: ({ lineIds, changed }) => set((state) => {
        const scripts = { ...state.scripts, ...changed };
        let totalReadingMs = 0;

        for (const [_, script] of Object.entries(changed)) {
            if (script.type === "yukkuriVoice") {
                totalReadingMs += script.readingMs;
            }
        }

        const alive = new Set(lineIds);
        for (const id of state.lineIds) {
            if (!alive.has(id)) {
                if (scripts[id] && scripts[id].type === "yukkuriVoice") {
                    totalReadingMs -= scripts[id].readingMs ?? 0;
                }
                delete scripts[id];
            }
        }

        return { lineIds, scripts, totalReadingMs, isModifined: true };
    }),
}));