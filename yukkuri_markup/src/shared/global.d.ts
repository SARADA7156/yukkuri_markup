import type { ElectronAPI } from "./ipc-channels.ts";

declare global {
    interface Window {
        electronAPI: ElectronAPI
    }
}