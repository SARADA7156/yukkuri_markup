import type { CommandContext } from "../types/command";
import { toTiptapContent } from "./toTiptapContent";

export async function loadScript(ctx: CommandContext) {
    const result = await ctx.api?.scriptLoad();

    if (!result || result.status === "canceled") return;

    if (result.status === "success") {
        console.log()
        const tiptapContent = toTiptapContent(result.data);
        ctx.editor?.commands.clearContent();
        ctx.editor?.commands.setContent(tiptapContent.content);
    }
}