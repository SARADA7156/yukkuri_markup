export function calculateDuration(
    text: string,
    speedPercent: number = 100
) {
    if (speedPercent <= 0) return 0;

    const charCount = [...text].length;
    const baseMs = charCount * 180;

    const pauseMatches = text.match(/、|。|!|\?|！|？/g) || [];
    const pauseCount = pauseMatches.length;

    const symbolPauseMs = pauseCount * 300;

    const defaultEndPauseMs = 300;

    const totalBaseMs = baseMs + symbolPauseMs + defaultEndPauseMs;
    return Math.round(totalBaseMs / (speedPercent / 100));
}

export function formatMs(ms: number, format: "ss.s" | "mm:ss" = "ss.s") {
    if (ms <= 0) return "0s";

    const totalSeconds = ms / 1000;

    if (format === "ss.s") {
        return `${totalSeconds.toFixed(1)}s`;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const tenths = Math.floor((ms % 1000) / 100);

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${mm}:${ss}.${tenths}`;
}