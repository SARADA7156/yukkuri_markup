import type { BaseObject, ScriptObject } from "@/shared/script";
import { create } from "zustand";
import type { Character } from "../speacker/character";
import type { Emotion } from "../speacker/emotions";
import { toScriptObject } from "@/renderer/features/editor/extensions/parseToJson";

type SyncPayload = {
    lineIds: string[];
    changed: Record<string, BaseObject>;
};

export interface ScriptStore {
    /** 入力した行ごとのユニークなidが格納される。この配列は表示される行の順序を保証しなければならない。 */
    lineIds: string[];

    /** 実際にエディタの行に入力したテキストとidのオブジェクトが格納される。 */
    scripts: Record<string, BaseObject>;

    /** パース済のオブジェクトが格納される */
    parsedScripts: Record<string, ScriptObject>;

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

    syncParsedScripts: (payload: SyncPayload, chars: Character[], emos: Emotion[]) => void;

    setFileInfo: (fileName: string, filePath: string) => void;
}

export const useScriptStore = create<ScriptStore>((set) => ({
    lineIds: [],
    scripts: {},
    parsedScripts: {},
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

    syncParsedScripts: ({ lineIds, changed }, chars, emos) => set((state) => {
        const parsedScripts: Record<string, ScriptObject> = {};
        let totalReadingMs = 0;

        for (const id of lineIds) {
            const script = changed[id];

            if (!script) continue;

            const parsedScript = { id, ...toScriptObject(script.text, chars, emos) };
            if (parsedScript.type === "yukkuriVoice") {
                totalReadingMs += parsedScript.readingMs;
            }

            parsedScripts[id] = parsedScript;
        }

        return {
            parsedScripts: { ...state.parsedScripts, ...parsedScripts },
            totalReadingMs,
        };
    }),

    setFileInfo: (fileName, filePath) => set(() => ({
        fileName,
        filePath,
        isModified: false,
    })),
}));