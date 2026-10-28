export function formatDate(isoDate: Date): string {
    const formattedDate = isoDate.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const formattedTime = isoDate.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
}