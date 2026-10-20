import { useScriptStore } from "../store/script/useScriptStore";
import type { CommandContext } from "../types/command";

export async function saveScript(ctx: CommandContext, forceSaveAs?: boolean): Promise<void> {
    const { lineIds, scripts, totalReadingMs, filePath } = useScriptStore.getState();

    const result = await ctx.api?.scriptSave(
        { lineIds, scripts, totalReadingMs },
        { filePath, forceSaveAs }
    );

    if (!result || result.status === "canceled") return;

    if (result.status === "success") {
        const { fileName, filePath } = result.data;
        useScriptStore.getState().setFileInfo(fileName, filePath);
    }
}