import type { ScriptFileObject, ScriptObject } from "@/shared/script";
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

    loadScript: (data: ScriptFileObject) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    totalReadingMs: 0,
    fileName: "untitled",
    filePath: null,
    isModified: false,
    isLoading: false,
    error: null,

    syncScripts: ({ lineIds, changed }) => set((state) => {
        const scripts: Record<string, ScriptObject> = {};

        // 生きているIDだけ残す（削除もここで完了）
        for (const id of lineIds) {
            const s = changed[id] ?? state.scripts[id];
            if (s) scripts[id] = s;
        }

        let totalReadingMs = 0;
        for (const s of Object.values(scripts)) {
            if (s.type === "yukkuriVoice") totalReadingMs += s.readingMs;
        }

        return { lineIds, scripts, totalReadingMs, isModified: true };
    }),

    loadScript: ({ lineIds, scripts, totalReadingMs }) => set(() => ({
        lineIds,
        scripts,
        totalReadingMs,
    })),
}));