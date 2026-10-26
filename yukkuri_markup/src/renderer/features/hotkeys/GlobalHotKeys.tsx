import { APP_COMMANDS } from "@/renderer/constants/appCommands";
import { useCommandContext } from "@/renderer/hooks/useCommandContext";
import { CommandHotKey } from "./CommandHotKey";

export function GlobalHotKeys() {
    const ctx = useCommandContext();

    return (
        <>
            {Object.values(APP_COMMANDS)
                .filter((c) => c.shortcut)
                .map((c) => (
                    <CommandHotKey key={c.id} command={c} ctx={ctx} />
                ))
            }
        </>
    )
}