import type { ScriptFileObject } from "./script";

export const IPC = {
    QUIT: "app:quit",
    SCRIPT_READ: "script:read",
    SCRIPT_SAVE: "script:save",
    SCRIPT_SAVE_AS: "script:saveAs",
} as const;

export type IpcResponse<T> =
    | { success: true; data: T }
    | { success: false; error: { code: string; message: string } };

export type ScriptSaveRes =
    | { canceled: false, fileName: string, filePath: string; }
    | { canceled: true }

export interface ElectronAPI {
    quit(): void;
    scriptRead(): Promise<IpcResponse<ScriptFileObject>>;
    scriptSave(data: ScriptFileObject, path?: string): Promise<IpcResponse<ScriptSaveRes>>;
    scriptSaveAs(data: ScriptFileObject): Promise<IpcResponse<ScriptSaveRes>>;
}