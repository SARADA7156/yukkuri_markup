import { create } from "zustand";

type BaseObject = {
    id: string;
    text: string;
    readingTime: number;
};

export type ParagraphObject = BaseObject & {
    type: "paragraph";
};

export type YukkuriVoiceObject = BaseObject & {
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
};

export type ScriptObject = ParagraphObject | YukkuriVoiceObject;

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, ScriptObject>;
};

export interface ScriptStore {
    lineIds: string[];
    scripts: Record<string, ScriptObject>;
    totalReadingTimes: number;

    syncScripts: (payload: SyncPayload) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    totalReadingTimes: 0,

    syncScripts: ({ lineIds, changed }) => set((state) => {
        const scripts = { ...state.scripts, ...changed };

        const alive = new Set(lineIds);
        for (const id of state.lineIds) {
            if (!alive.has(id)) {
                delete scripts[id];
            }
        }

        const totalReadingTimes = lineIds.reduce(
            (sum, id) => sum + (scripts[id]?.readingTime ?? 0), 0
        );

        return { lineIds, scripts, totalReadingTimes };
    })
}));