import { useScriptStore } from "../store/script/useScriptStore";
import type { CommandContext } from "../types/command";
import { toTiptapContent } from "./toTiptapContent";

export async function loadScript(ctx: CommandContext) {
    const result = await ctx.api?.scriptLoad();

    if (!result || result.status === "canceled") return;

    if (result.status === "success") {
        const { scripts, lineIds, fileName, filePath } = result.data;
        const tiptapContent = toTiptapContent({ scripts, lineIds });
        ctx.editor?.commands.clearContent();
        ctx.editor?.commands.setContent(tiptapContent.content);

        useScriptStore.getState().setFileInfo(fileName, filePath);
    }
}