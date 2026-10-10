import type { BaseObject } from "@/renderer/types/script";
import { create } from "zustand";

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, BaseObject>;
};

export interface ScriptStore {
    /**
     * 入力した行ごとのユニークなidが格納される。この配列は表示される行の順序を保証しなければならない。
     */
    lineIds: string[];

    /**
     * 実際にエディタの行に入力したテキストとidのオブジェクトが格納される。
     */
    scripts: Record<string, BaseObject>;

    /**
     * idの配列と変更があったオブジェクトを渡し、ストアの状態を最新にする。
     * @param payload 新しくセットするidの配列と変更があった台本オブジェクト
     */
    syncScripts: (payload: SyncPayload) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},

    syncScripts: ({ lineIds, changed }) => set((state) => {
        const scripts = { ...state.scripts, ...changed };

        const alive = new Set(lineIds);
        for (const id of state.lineIds) {
            if (!alive.has(id)) {
                delete scripts[id];
            }
        }

        return { lineIds, scripts };
    })
}));