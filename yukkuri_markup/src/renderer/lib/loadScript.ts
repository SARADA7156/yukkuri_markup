import { useNotificationStore } from "../features/notification/useNotificationStore";
import { useScriptStore } from "../store/script/useScriptStore";
import type { CommandContext } from "../types/command";
import { toTiptapContent } from "./toTiptapContent";

export async function loadScript(ctx: CommandContext) {
    const result = await ctx.api?.scriptLoad();
    const addNotification = useNotificationStore.getState().addNotification;

    if (!result || result.status === "canceled") return;

    if (result.status === "error") {
        addNotification(`${result.error.message} code: ${result.error.code}`, "error", "ScriptLoader");
        return;
    }

    const { scripts, lineIds, fileName, filePath } = result.data;
    const tiptapContent = toTiptapContent({ scripts, lineIds });
    ctx.editor?.commands.clearContent();
    ctx.editor?.commands.setContent(tiptapContent.content);

    useScriptStore.getState().setFileInfo(fileName, filePath);
}