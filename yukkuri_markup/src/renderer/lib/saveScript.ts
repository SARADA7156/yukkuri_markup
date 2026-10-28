import { useNotificationStore } from "../features/notification/useNotificationStore";
import { useScriptStore } from "../store/script/useScriptStore";
import type { CommandContext } from "../types/command";

export async function saveScript(ctx: CommandContext, forceSaveAs?: boolean): Promise<void> {
    const { lineIds, scripts, filePath } = useScriptStore.getState();
    const addNotification = useNotificationStore.getState().addNotification;

    const result = await ctx.api?.scriptSave(
        { lineIds, scripts },
        { filePath, forceSaveAs }
    );

    if (!result || result.status === "canceled") return;

    if (result.status === "success") {
        const { fileName, filePath } = result.data;
        useScriptStore.getState().setFileInfo(fileName, filePath);
    } else if (result.status === "error") {
        addNotification(
            `${result.error.message} code: ${result.error.code}`,
            "error",
            "scriptSaver"
        );
    }
}