import { useScriptStore } from "../store/script/useScriptStore";
import type { CommandContext } from "../types/command";

export async function saveAsScript(ctx: CommandContext): Promise<void> {
    const { lineIds, scripts, totalReadingMs } = useScriptStore.getState();

    try {
        const result = await ctx.api?.scriptSaveAs({ lineIds, scripts, totalReadingMs });

        if (!result) return;

        console.log(result);
    } catch(error) {
        console.error(error)
    }
}