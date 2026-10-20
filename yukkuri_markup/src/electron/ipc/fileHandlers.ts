import { app, dialog, ipcMain } from "electron";
import type { FileService } from "../services/fileService";
import { IPC, type IpcResponse, type ScriptSaveRes } from "@/shared/ipc-channels";
import { scriptFileObjectSchema, type ScriptFileObject } from "@/shared/script";
import path from "path";

export function registerFileHandlers(fileService: FileService) {
    const saveScript = async (data: ScriptFileObject, targetPath?: string): Promise<IpcResponse<ScriptSaveRes>> => {
        try {
            // 1. バリデーション
            const parsedData = scriptFileObjectSchema.parse(data);

            let filePath = targetPath;

            // パスが指定されていない場合は「名前をつけて保存」ダイアログを表示
            if (!filePath) {
                const { canceled, filePath: dialogPath } = await dialog.showSaveDialog({
                    title: "ファイルを保存",
                    defaultPath: path.join(app.getPath("documents"), "untitled.json"),
                    filters: [
                        { name: "JSONファイル", extensions: ["json"] },
                        { name: "すべてのファイル", extensions: ["*"] },
                    ]
                });

                if (canceled || !dialogPath) {
                    return { status: "canceled" }
                }
                filePath = dialogPath;
            }

            // 2. ファイル書き込み
            await fileService.writeFile(filePath, JSON.stringify(parsedData, null, 2));

            // 3. 結果返却
            return {
                status: "success",
                data: {
                    fileName: path.basename(filePath),
                    filePath
                }
            };
        } catch (error: any) {
            dialog.showErrorBox(
                "保存エラー",
                `ファイルの保存に失敗しました。\n詳細: ${error.message}`
            );

            // Zodのエラーやファイル書き込みエラーを安全にレスポンスとして返す
            return {
                status: "error",
                error: error.message || "予期せぬエラーが発生しました"
            };
        }
    };

    ipcMain.handle(IPC.SCRIPT_READ, async (): Promise<IpcResponse<ScriptFileObject>> => {
        try {
            const r = await dialog.showOpenDialog({ properties: ["openFile"] });

            if (r.canceled) return { status: "canceled" };

            const fileContent = await fileService.readFile(r.filePaths[0]);

            if (!fileContent.ok) {
                throw new Error(`An error occurred while loading the file. code: ${fileContent.code}`);
            }

            const rawData = JSON.parse(fileContent.data);
            const verificationed = scriptFileObjectSchema.parse(rawData);

            return {
                status: "success",
                data: verificationed
            }
        } catch(error: any) {
            return {
                status: "error",
                error: error.message || "予期せぬエラーが発生しました"
            }
        }
    });

    ipcMain.handle(IPC.SCRIPT_SAVE, async (_, data: ScriptFileObject, targetPath?: string) => {
        return await saveScript(data, targetPath);
    });

    ipcMain.handle(IPC.SCRIPT_SAVE_AS, async (_, data: ScriptFileObject) => {
        return await saveScript(data);
    });
}