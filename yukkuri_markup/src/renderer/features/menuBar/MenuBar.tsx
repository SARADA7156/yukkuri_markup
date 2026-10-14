import Button from "@/renderer/components/Button";
import { useEffect, useRef, useState } from "react";
import MenuModals from "./MenuModals";
import Panel from "@/renderer/components/Panel";

type MenuItem = {
    title: string;
    items: string[];
};

const menuData: MenuItem[] = [
    {
        title: "ファイル",
        items: ["ファイルを開く", "保存", "設定", "終了"],
    },
    {
        title: "編集",
        items: ["元に戻す", "やり直し", "切り取り", "コピー", "貼り付け"],
    },
    {
        title: "ヘルプ",
        items: ["ヘルプを表示", "リリースノート"]
    }
];

export default function MenuBar() {
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const [isActivated, setIsActivated] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
                                    {menu.items.map((item, itemIndex) => (
                                        <Button
                                            key={itemIndex}
                                            onClick={() => {
                                                setIsActivated(false);
                                                setActiveMenuIndex(null);
                                            }}
                                            className="cursor-pointer rounded w-full"
                                        >
                                            {item}
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