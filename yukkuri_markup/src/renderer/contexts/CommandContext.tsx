import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useCommandContext } from "../hooks/useCommandContext";
import type { CommandContext } from "../types/command";
import { APP_COMMANDS, type CommandKey } from "../constants/appCommands";

const CommandCtx = createContext<CommandContext | null>(null);

export function CommandProvider({ children }: { children: ReactNode }) {
    const ctx = useCommandContext();
    return <CommandCtx.Provider value={ctx}>{children}</CommandCtx.Provider>;
}

export function useCommand() {
    const ctx = useContext(CommandCtx);
    if (!ctx) throw new Error("CommandProvider の外では使えません");

    return useCallback(
        (key: CommandKey) => APP_COMMANDS[key].execute(ctx),
        [ctx]
    );
}