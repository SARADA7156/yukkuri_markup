import path from "path";
import Store from "electron-store";
import { ensureVisibleBounds } from "./ensureVisibleBounds.ts";
import { app, BrowserWindow } from "electron";

export interface WindowBounds {
    width: number;
    height: number;
    x?: number;
    y?: number;
    isMaximized: boolean;
}

interface StoreSchema {
    windowBounds: WindowBounds
}
const store = new Store<StoreSchema>();

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const isDev = !app.isPackaged;

export function createWindow() {
    // 前回起動していた際のウィンドウサイズと位置を取得
    const rawBounds = store.get("windowBounds", {
        width: 1200,
        height: 800,
        x: undefined,
        y: undefined,
        isMaximized: false,
    });

    const bounds = ensureVisibleBounds(rawBounds);

    const mainWindow = new BrowserWindow({
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        // 起動時に一瞬サイズ変更が映るのを防ぐため、最大化する場合は最初は非表示
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(app.getAppPath(), "/dist-electron/preload.js"),
        },
        icon: path.join(app.getAppPath(), "public/icon.ico")
    });
    mainWindow.setMenuBarVisibility(false);

    if (rawBounds.isMaximized) {
        mainWindow.maximize();
    }

    // 準備ができたら表示（チラつき防止）
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // ウィンドウの保存処理とデバウンスの実装
    let saveTimeout: NodeJS.Timeout | null = null;
    const saveBounds = () => {
        if (saveTimeout) clearTimeout(saveTimeout);

        saveTimeout = setTimeout(() => {
            if (mainWindow.isDestroyed()) return;

            const isMaximized = mainWindow.isMaximized();

            if (!isMaximized && !mainWindow.isMinimized()) {
                store.set("windowBounds", {
                    ...mainWindow.getBounds(),
                    isMaximized: false,
                });
            } else if (isMaximized) {
                store.set("windowBounds.isMaximized", true);
            }
        }, 500);
    };

    mainWindow.on("resize", saveBounds);
    mainWindow.on("move", saveBounds);

    // ウィンドウを閉じる直前にも状態を判定して保存
    mainWindow.on('close', () => {
        store.set('windowState.isMaximized', mainWindow.isMaximized());
    });

    if (isDev) {
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-react/index.html"));
    }
}
