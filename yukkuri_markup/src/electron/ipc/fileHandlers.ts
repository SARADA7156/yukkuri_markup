import { dialog, ipcMain } from "electron";
import type { FileService } from "../services/fileService";
import { IPC } from "@/shared/ipc-channels";
import type { ScriptObject } from "@/shared/script";

export function registerFileHandlers(fileService: FileService) {
    ipcMain.handle(IPC.SCRIPT_READ, async () => {
        const r = await dialog.showOpenDialog({ properties: ["openFile"] });
        console.log(r)
    });
    ipcMain.handle(IPC.SCRIPT_SAVE, async (_, path: string | null | undefined, data: ScriptObject) => {
        
    });
}