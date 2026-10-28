import { create } from "zustand";
import { MdError, MdInfo, MdWarning } from "react-icons/md";
import type { IconType } from "react-icons";

export interface NotificationItem {
    id: string;
    date: Date;
    source: string;
    level: "info" | "warn" | "error";
    message: string;
}

export const levels: Record<NotificationItem["level"], string> = {
    info: "通知",
    warn: "警告",
    error: "エラー"
}

export const levelIcon: Record<NotificationItem["level"], IconType> = {
    info: MdInfo,
    warn: MdWarning,
    error: MdError
}

export interface NotificationState {
    /** 通知が格納される変数です */
    notifications: NotificationItem[];

    /** 現在ポップアップ表示されている通知のデータを格納する */
    popupNotifications: NotificationItem[];

    /**
     * 通知を追加します。
     * @param message 通知の本文
     * @param level 通知のレベル
     */
    addNotification: (
        message: NotificationItem["message"],
        level: NotificationItem["level"],
        source: string,
        popup?: boolean,
    ) => void;

    /**
     * 指定した id の通知を既読状態にするメソッド
     * @param id 既読状態にするid
     */
    readNotification: (id: string) => void;

    /**
     * 通知を削除します。
     * @param id 通知を削除するid
     */
    removeNotifications: (id: string) => void;

    /**
     * ポップアップ表示されている任意の通知を削除します。
     * @param id 削除する通知のid
     */
    removePopupNotifications: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => {
    // 共通の削除ロジック(ヘルパー関数)
    const removeFromList = (list: NotificationItem[], id: string) =>
        list.filter((n) => n.id !== id);

    return {
        notifications: [],

        popupNotifications: [],

        addNotification: (message, level = "info", source, popup = true) => {
            const date = new Date();
            const id = crypto.randomUUID();

            set((state) => {
                if (state.notifications.some((n) => n.id === id)) {
                    return state;
                }

                const notification = {
                    id,
                    date,
                    level,
                    source,
                    message,
                };

                if (!popup) {
                    return {
                        notifications: [
                            ...state.notifications,
                            notification
                        ],
                    };
                }

                return {
                    notifications: [
                        ...state.notifications,
                        notification
                    ],
                    popupNotifications: [
                        ...state.popupNotifications,
                        notification,
                    ],
                };
            });

            // ポップアップ表示されている通知を自動的に削除する
            setTimeout(() => {
                set((state) => ({
                    popupNotifications: removeFromList(state.popupNotifications, id),
                }));
            }, 5000);
        },

        readNotification: (id) => {
            set((state) => ({
                notifications: state.notifications.map(n => {
                    if (n.id === id) return { ...n, read: true };
                    return n;
                })
            }))
        },

        removeNotifications: (id) => set((state) => ({
            notifications: removeFromList(state.notifications, id),
        })),

        removePopupNotifications: (id) => {
            set((state) => ({
                // ポップアップを削除するボタンが押された場合のみ、既読フラグを付ける。
                notifications: state.notifications.map(n => {
                    if (n.id === id) return { ...n, read: true };

                    return n;
                }),

                popupNotifications: removeFromList(state.popupNotifications, id),
            }));
        },
    }
});