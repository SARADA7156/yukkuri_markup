import { create } from "zustand";

type BaseObject = {
    id: string;
    text: string;
}

type ParagraphObject = {
    type: "paragraph";
} & BaseObject;

type YukkuriVoiceObject = {
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
} & BaseObject

export type ScriptObject = ParagraphObject | YukkuriVoiceObject;

export interface ScriptStore {
    lineIds: string[];
    scripts: Record<string, ScriptObject>;
    readingTimes: Record<string, number>;
    totalReadingTimes: number;

    insertScript: (index: number, script: ScriptObject) => void;

    updateScript: (script: ScriptObject) => void;

    deleteScript: (id: string) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    readingTimes: {},
    totalReadingTimes: 0,

    insertScript: (index, script) => set((state) => ({
        lineIds: state.lineIds.toSpliced(index, 0, script.id),
        scripts: { ...state.scripts, [script.id]: script },
    })),

    updateScript: (script) => set((state) => {
        if (!(script.id in state.scripts)) return state;
        return { scripts: { ...state.scripts, [script.id]: script } };
    }),

    deleteScript: (id) => set((state) => {
        const { [id]: _removed, ...rest } = state.scripts;
        const { [id]: removedTime = 0, ...readingTimes } = state.readingTimes;

        return {
            lineIds: state.lineIds.filter((lineId) => lineId !== id),
            scripts: rest,
            readingTimes,
            totalReadingTimes: state.totalReadingTimes - removedTime,
        };
    })
}));