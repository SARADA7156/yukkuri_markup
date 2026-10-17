export const IPC = {
    QUIT: "app:quit"
} as const;

export interface ElectronAPI {
    quit(): void;
}