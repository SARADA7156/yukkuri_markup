import { IPC, type ElectronAPI } from "../shared/ipc-channels";
import { contextBridge, ipcRenderer } from "electron";

const api: ElectronAPI = {
    quit: () => ipcRenderer.send(IPC.QUIT),
    scriptRead: () => ipcRenderer.invoke(IPC.SCRIPT_READ),
    scriptSave: (path, data) => ipcRenderer.invoke(IPC.SCRIPT_SAVE, path, data),
    scriptSaveAs: (data) => ipcRenderer.invoke(IPC.SCRIPT_SAVE_AS, data),
}

contextBridge.exposeInMainWorld("electronAPI", api);