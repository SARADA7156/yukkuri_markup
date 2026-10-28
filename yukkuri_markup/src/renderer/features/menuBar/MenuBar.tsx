import Button from "@/renderer/components/Button";
import { useEffect, useRef, useState } from "react";
import MenuModals from "./MenuModals";
import Panel from "@/renderer/components/Panel";
import type { Command, MenuGroup } from "@/renderer/types/command";
import { useTiptapEditor } from "../editor/EditorProvider";
import { APP_COMMANDS } from "@/renderer/constants/appCommands";
import { useCommand } from "@/renderer/contexts/CommandContext";
import { useNotificationStore } from "../notification/useNotificationStore";

const menuData: MenuGroup[] = [
    {
        title: "ファイル",
        items: [
            APP_COMMANDS.FILE_OPEN,
            APP_COMMANDS.SAVE,
            APP_COMMANDS.SAVE_AS,
            APP_COMMANDS.SETTINGS,
            APP_COMMANDS.EXIT
        ],
    },
    // {
    //     title: "編集",
    //     items: [
    //         APP_COMMANDS.UNDO,
    //         APP_COMMANDS.REDO,
    //         APP_COMMANDS.CUT,
    //         APP_COMMANDS.COPY,
    //     ],
    // },
    {
        title: "ヘルプ",
        items: [
            APP_COMMANDS.HELP,
            APP_COMMANDS.RELEASE_NOTES
        ]
    },
    {
        title: "通知",
        items: [APP_COMMANDS.NOTICE]
    }
];

export default function MenuBar() {
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const [isActivated, setIsActivated] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const editor = useTiptapEditor();
    const { addNotification } = useNotificationStore();

    if (!editor) return null;

    const run = useCommand();

    const handleMenuClick = (index: number) => {
        if (isActivated && activeMenuIndex === index) {
            setIsActivated(false);
            setActiveMenuIndex(null);
        } else {
            setIsActivated(true);
            setActiveMenuIndex(index);
        }
    };

    const handleMouseEnter = (index: number) => {
        if (isActivated) {
            setActiveMenuIndex(index);
        }
    };

    const handleClick = (id: Command["id"]) => {
        setIsActivated(false);
        setActiveMenuIndex(null);
        run(id);
        addNotification("メニューがクリックされました。", "info")
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsActivated(false);
                setActiveMenuIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={menuRef} className="text-sm flex items-center gap-2 px-2">
                {menuData.map((menu, index) => {
                    const isOpen = activeMenuIndex === index;

                    return (
                        <div key={menu.title} className="relative">
                            {/* メニューのボタン */}
                            <Button
                                onClick={() => handleMenuClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                className="rounded"
                            >
                                {menu.title}
                            </Button>

                            {/* ドロップダウンメニュー */}
                            {isOpen && (
                                <Panel className="absolute left-0 top-full z-50 min-w-50 px-3 py-2 whitespace-nowrap animate-zoom-in">
                                    {menu.items.map((item) => (
                                        <Button
                                            key={item.id}
                                            onClick={() => handleClick(item.id)}
                                            className="cursor-pointer rounded w-full flex"
                                        >
                                            <p>{item.label}</p>

                                            {item.shortcut &&
                                                <p className="ms-auto text-(--foreground)/50">{item.shortcut}</p>
                                            }
                                        </Button>
                                    ))}
                                </Panel>
                            )}
                        </div>
                    );
                })}
            </div>

            <MenuModals />
        </>
    );
}