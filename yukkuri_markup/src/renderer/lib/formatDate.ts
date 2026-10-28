export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    return `${formattedDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}