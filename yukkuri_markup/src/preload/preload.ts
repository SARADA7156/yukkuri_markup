import { IPC, type ElectronAPI } from "../shared/ipc-channels";
import { contextBridge, ipcRenderer } from "electron";

const api: ElectronAPI = {
    quit: () => ipcRenderer.send(IPC.QUIT),
    scriptLoad: () => ipcRenderer.invoke(IPC.SCRIPT_LOAD),
    scriptSave: (data, options) => ipcRenderer.invoke(IPC.SCRIPT_SAVE, data, options),
}

contextBridge.exposeInMainWorld("electronAPI", api);