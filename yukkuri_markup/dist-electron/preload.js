let electron = require("electron");
//#region src/preload/preload.ts
electron.contextBridge.exposeInMainWorld("electronAPI", { quit: () => electron.ipcRenderer.send("app:quit") });
//#endregion
