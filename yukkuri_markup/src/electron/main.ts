import { app, BrowserWindow, ipcMain } from "electron";
import { createWindow } from "./windows/mainWindow.ts";

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipcMain.on("app:quit", () => {
    app.quit();
});