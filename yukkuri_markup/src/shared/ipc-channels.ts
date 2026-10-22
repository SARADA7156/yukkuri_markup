import type { ScriptData } from "./script";

export const IPC = {
    QUIT: "app:quit",
    SCRIPT_LOAD: "script:load",
    SCRIPT_SAVE: "script:save",
    SCRIPT_SAVE_AS: "script:saveAs",
} as const;

export type IpcResponse<T> =
    | { status: "success"; data: T }
    | { status: "error"; error: { code: string; message: string } }
    | { status: "canceled" };

export type SaveOptions = { filePath?: string; forceSaveAs?: boolean }
export type File = { fileName: string, filePath: string; }
export type ScriptLoadRes = ScriptData & File;

export interface ElectronAPI {
    quit(): void;
    scriptLoad(): Promise<IpcResponse<ScriptLoadRes>>;
    scriptSave(data: ScriptData, opsions?: SaveOptions): Promise<IpcResponse<File>>;
}