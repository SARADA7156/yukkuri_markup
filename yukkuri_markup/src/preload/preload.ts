import type { ElectronAPI } from "../shared/ipc-channels";
import { contextBridge, ipcRenderer } from "electron";

const api: ElectronAPI = {
    quit: () => ipcRenderer.send("app:quit"),
}

contextBridge.exposeInMainWorld("electronAPI", api);