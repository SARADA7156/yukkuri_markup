import { create } from "zustand";

type BaseObject = {
    id: string;
    text: string;
}

type ParagraphObject = {
    type: "paragraph";
} & BaseObject;

type YUkkuriVoiceObject = {
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
} & BaseObject

export type ScriptObject = ParagraphObject | YUkkuriVoiceObject;

export interface ScriptStore {
    lineIds: string[];
    scripts: Record<string, ScriptObject>;
    readingTimes: Record<string, number>;
    totalReadingTimes: number;

    insertScript: (index: number, script: ScriptObject) => void;

    updateScript: (script: ScriptObject) => void;

    deleteScript: (id: string) => void;
}

export const useScriptStore = create<ScriptStore>((set, get) => {
    return {
        lineIds: [],
        scripts: {},
        readingTimes: {},
        totalReadingTimes: 0,

        insertScript: (index, script) => set(() => ({

        })),

        updateScript: (script) => set(() => ({

        })),

        deleteScript: (id) => set(() => ({
            
        }))
    }
});