import { useMemo } from "react";
import { useTiptapEditor } from "../features/editor/EditorProvider";
import { useModalState } from "../store/modal/useModalState";
import type { CommandContext } from "../types/command";

export function useCommandContext(): CommandContext {
    const editor = useTiptapEditor();
    const { openModal } = useModalState();

    return useMemo(
        () => ({
            editor,
            openModal,
            api: window.electronAPI,
        }),
        [editor, openModal]
    );
}