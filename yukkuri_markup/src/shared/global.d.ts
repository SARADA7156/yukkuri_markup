import type { ElectronAPI } from "./ipc-channels";

declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}