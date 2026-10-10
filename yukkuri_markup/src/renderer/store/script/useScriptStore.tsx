import { create } from "zustand";

export type ScriptObject = {
    id: string;
    text: string;
};

export type ParagraphObject = ScriptObject & {
    type: "paragraph";
};

export type YukkuriVoiceObject = ScriptObject & {
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
    readingTime: number;
};

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, ScriptObject>;
};

export interface ScriptStore {
    lineIds: string[];
    scripts: Record<string, ScriptObject>;

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