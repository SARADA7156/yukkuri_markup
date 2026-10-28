import { useNotificationStore } from "./useNotificationStore";
import NotificationItem from "./NotificationItem";

export default function NotificationList() {
    const notification = useNotificationStore((state) => state.notifications);
    return (
        <ul>
            {notification.map((notice) => (
                <NotificationItem notice={notice} key={notice.id} />
            ))}
        </ul>
    );
}