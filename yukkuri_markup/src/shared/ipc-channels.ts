import type { ScriptObject } from "./script";

export const IPC = {
    QUIT: "app:quit",
    SCRIPT_READ: "script:read",
    SCRIPT_SAVE: "script:save",
    SCRIPT_SAVE_AS: "script:saveAs",
} as const;

export interface ElectronAPI {
    quit(): void;
    scriptRead(): Promise<ScriptObject>;
    scriptSave(path: string | null | undefined, data: ScriptObject): Promise<void>;
    scriptSaveAs(data: ScriptObject): Promise<void>;
}