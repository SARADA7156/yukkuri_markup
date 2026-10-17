import type { ElectronAPI } from "../shared/ipc-channels.ts";
import { app, contextBridge } from "electron";

const api: ElectronAPI = {
    quit: () => app.quit(),
}

contextBridge.exposeInMainWorld("electronAPI", api);