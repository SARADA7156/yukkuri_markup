import { app, dialog, ipcMain } from "electron";
import { FILE_ERROR_MESSAGES, type FileService } from "../services/fileService";
import { IPC, type IpcResponse, type SaveOptions, type File, type ScriptLoadRes } from "@/shared/ipc-channels";
import { scriptDataSchema, type ScriptData } from "@/shared/script";
import path from "path";
import { ApplicationError, toAppError } from "../error/applicationError";

export function registerFileHandlers(fileService: FileService) {
    ipcMain.handle(IPC.SCRIPT_LOAD, async (): Promise<IpcResponse<ScriptLoadRes>> => {
        try {
            const r = await dialog.showOpenDialog({ properties: ["openFile"] });

            if (r.canceled) return { status: "canceled" };

            const filePath = r.filePaths[0];
            const fileContent = await fileService.readFile(filePath);

            if (!fileContent.ok) {
                throw new ApplicationError({ code: "fileReadError", message: FILE_ERROR_MESSAGES[fileContent.code] });
            }

            const rawData = JSON.parse(fileContent.data);
            const verificationed = scriptDataSchema.safeParse(rawData);

            if (!verificationed.success) throw new ApplicationError({
                code: "dataSchemaError",
                message: "ファイルの形式が破損しています。" 
            });

            return {
                status: "success",
                data: {
                    ...verificationed.data,
                    filePath,
                    fileName: path.basename(filePath),
                }
            }
        } catch(error) {
            const e = toAppError(error);
            return { status: "error", error: e };
        }
    });

    ipcMain.handle(
        IPC.SCRIPT_SAVE,
        async (
            _,
            data: ScriptData,
            options?: SaveOptions
        ): Promise<IpcResponse<File>> => {
            try {
                // 1. バリデーション
                const parsedData = scriptDataSchema.safeParse(data);

                if (!parsedData.success) throw new ApplicationError({
                    code: "dataSchemaError",
                    message: "データの形式が違います"
                });

                let targetPath = options?.filePath;

                if (!targetPath || options?.forceSaveAs) {
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
                    targetPath = dialogPath;
                }

                // 2. ファイル書き込み
                const result = await fileService.writeFile(targetPath, JSON.stringify(parsedData.data, null, 2));

                if (!result.ok) throw new ApplicationError({ code: "fileWriteError", message: FILE_ERROR_MESSAGES[result.code] })

                // 3. 結果返却
                return {
                    status: "success",
                    data: {
                        fileName: path.basename(targetPath),
                        filePath: targetPath
                    }
                };
            } catch (error) {
                const e = toAppError(error);
                return { status: "error", error: e };
            }
    });
}