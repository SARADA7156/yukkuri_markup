import type { Character } from "@/renderer/store/speacker/character";
import type { Emotion } from "@/renderer/store/speacker/emotions";
import type { Paragraph, ScriptData, YukkuriVoice } from "@/renderer/types/scriptData";

export function parseScriptToJson(rawText: string, characters: Character[], emotions: Emotion[]): ScriptData {
    const characterMap = new Map(characters.map(c => [c.tag, c.name]));
    const emotionMap = new Map(emotions.map(e => [e.id, e.name]));

    const lines = rawText.split("\n");
    const content: (YukkuriVoice | Paragraph)[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (trimmed === "") continue;

        if (line.charCodeAt(0) === 40 /* '(' */) {
            const closeParentIndex = line.indexOf(")");
            if (closeParentIndex !== -1) {
                const meta = line.slice(1, closeParentIndex);
                const dotIndex = meta.indexOf(".");

                if (dotIndex !== -1) {
                    const speackerTag = meta.slice(0, dotIndex);
                    const emotionId = meta.slice(dotIndex + 1);
                    const text = line.slice(closeParentIndex + 1).trimStart();

                    content.push({
                        type: "yukkuriVoice",
                        attrs: {
                            speaker: characterMap.get(speackerTag) ?? speackerTag,
                            emotion: emotionMap.get(emotionId) ?? emotionId,
                        },
                        content: [{ type: "text", text }],
                    });
                    continue;
                }
            }
        }
        content.push({
            type: 'paragraph',
            content: [{ type: 'text', text: line }],
        });
    }
    return { type: "doc", content };
}