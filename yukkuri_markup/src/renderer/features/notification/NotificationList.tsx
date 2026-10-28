import { formatDate } from "@/renderer/lib/formatDate";
import { levelIcon, levels, useNotificationStore } from "./useNotificationStore";

export default function NotificationList() {
    const notification = useNotificationStore((state) => state.notifications);
    return (
        <ul>
            {notification.map((notice) => {
                const Icon = levelIcon[notice.level]
                return (
                    <li key={notice.id} className="grid grid-cols-[15%_85%] items-center">
                        <div className="flex items-center gap-1">
                            <Icon className="text-lg" />
                            <p>{levels[notice.level]}</p>
                        </div>

                        <p>{formatDate(notice.date.toDateString())}</p>
                    </li>
                )
            })}
        </ul>
    );
}