import { formatDate } from "@/renderer/lib/formatDate";
import { levelIcon, levels, type NotificationItem } from "./useNotificationStore";
import { memo, useState } from "react";
import Button from "@/renderer/components/Button";
import { MdArrowDropDown } from "react-icons/md";
import { cn } from "@/renderer/lib/utils";

export default memo(function NotificationItem({ notice }: { notice: NotificationItem }) {
    const [isOpen, setIsOpen] = useState(false);

    const Icon = levelIcon[notice.level]
    return (
        <li className="flex flex-col border-b border-b-(--border)">
            <Button className="flex items-center rounded-none w-full" onClick={() => setIsOpen(prev => !prev)}>
                <MdArrowDropDown className={cn("text-2xl transition-all", isOpen && "rotate-180")} />

                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-1">
                        <Icon className="text-lg" style={{ color: `var(--${notice.level})` }} />
                        <p>{levels[notice.level]}</p>
                    </div>

                    <p>{formatDate(notice.date)}</p>
                    <p>Service: {notice.source}</p>
                    <p className="text-(--foreground)/50">id: {notice.id}</p>
                </div>
            </Button>

            {isOpen &&
                <div className="p-2">
                    <p>{notice.message}</p>
                </div>
            }
        </li>
    );
})