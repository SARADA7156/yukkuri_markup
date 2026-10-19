import { app, BrowserWindow, ipcMain } from "electron";
import { createWindow } from "./windows/mainWindow.ts";
import { IPC } from "@/shared/ipc-channels.ts";
import { registerAllHandlers } from "./ipc/index.ts";

app.whenReady().then(() => {
    registerAllHandlers();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipcMain.on(IPC.QUIT, () => {
    app.quit();
});