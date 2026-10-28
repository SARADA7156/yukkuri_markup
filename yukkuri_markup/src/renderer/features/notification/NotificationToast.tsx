import { MdClose } from "react-icons/md";
import { levelIcon, levels, useNotificationStore } from "./useNotificationStore";
import "./Notification.css"

export const NotificationToast = () => {
    const { popupNotifications, removePopupNotifications } = useNotificationStore();

    return (
        <div id="notifications-container" className="fixed bottom-0 right-0 flex flex-col items-center min-w-80 max-w-80 me-8">
            {popupNotifications.map((n) => {
                const Icon = levelIcon[n.level];
                return (
                    <div key={n.id} className={`notification level-${n.level} w-full h-24 p-3 my-2 text-start bg-(--content) rounded-md`}>
                        <div className="notification-header flex items-center border-b border-b-(--border)">
                            <Icon />
                            <p className="ms-2">{levels[n.level]}</p>

                            <button className="ms-auto" onClick={() => removePopupNotifications(n.id)}>
                                <MdClose className="cursor-pointer" />
                            </button>
                        </div>

                        <div className="notification-content truncate mt-1">
                            {n.message}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}