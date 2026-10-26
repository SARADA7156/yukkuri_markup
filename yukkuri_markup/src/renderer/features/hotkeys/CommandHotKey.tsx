import type { Command, CommandContext } from "@/renderer/types/command";
import { useHotkeys } from "react-hotkeys-hook"

export function CommandHotKey({ command, ctx }: { command: Command; ctx: CommandContext }) {
    useHotkeys(
        command.shortcut!,
        (e) => {
            e.preventDefault()
            command.execute(ctx)
        },
        { enableOnFormTags: true, enableOnContentEditable: true },
        [ctx]
    );

    return null;
}