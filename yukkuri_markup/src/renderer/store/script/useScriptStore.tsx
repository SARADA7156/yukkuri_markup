import type { ScriptObject } from "@/renderer/types/script";
import { create } from "zustand";

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, ScriptObject>;
};

export interface ScriptStore {
    /**
     * 入力した行ごとのユニークなidが格納される。この配列は表示される行の順序を保証しなければならない。
     */
    lineIds: string[];

    /**
     * 実際にエディタの行に入力したテキストとidのオブジェクトが格納される。
     */
    scripts: Record<string, ScriptObject>;

    totalReadingMs: number;

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

        return { lineIds, scripts, totalReadingMs };
    })
}));