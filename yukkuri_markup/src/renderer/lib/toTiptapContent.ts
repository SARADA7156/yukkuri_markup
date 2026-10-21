import type { ScriptData } from "@/shared/script";
import type { JSONContent } from "@tiptap/core";

type TiptapNode = {
    type: "doc";
    content: JSONContent
}

export function toTiptapContent(scriptData: ScriptData): TiptapNode {
    const tiptapJson: TiptapNode = {
        type: "doc",
        content: []
    }

    scriptData.lineIds.forEach(id => {
        const scriptItem = scriptData.scripts[id]
        if (!scriptItem) return;

        const node = {
            attrs: { lineId: id },
            type: "paragraph",
            content: scriptItem.text ? [
                {
                    type: "text",
                    text: scriptItem.text,
                }
            ] : []
        }

        tiptapJson.content.push(node)
    });

    return tiptapJson;
}