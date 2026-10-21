import type { Character } from "@/renderer/store/speacker/character";
import type { Emotion } from "@/renderer/store/speacker/emotions";
import type { ScriptObject } from "@/shared/script";
import { calculateDuration } from "./calculateDuration";

type ParseResult = Pick<ScriptObject, "type" | "text"> & (
    | { type: "paragraph" }
    | { type: "yukkuriVoice"; speaker: string; emotion: string; readingMs: number; }
);

export function toScriptObject(
    rawText: string,
    characters: Character[],
    emotions: Emotion[]
): ParseResult {
    const characterMap = new Map(characters.map(c => [c.tag, c]));
    const emotionMap = new Map(emotions.map(e => [e.id, e.name]));

    if (rawText.charCodeAt(0) === 40 /* '(' */) {
        const closeParentIndex = rawText.indexOf(")");
        if (closeParentIndex !== -1) {
            const meta = rawText.slice(1, closeParentIndex);
            const dotIndex = meta.indexOf(".");

            if (dotIndex !== -1) {
                const speackerTag = meta.slice(0, dotIndex);
                const emotionId = meta.slice(dotIndex + 1);
                const text = rawText.slice(closeParentIndex + 1).trimStart();

                const character = characterMap.get(speackerTag);
                return {
                    type: "yukkuriVoice",
                    speaker: character?.name ?? speackerTag,
                    emotion: emotionMap.get(emotionId) ?? emotionId,
                    text,
                    readingMs: calculateDuration(text, character?.readingSpeed),
                };
            }
        }
    }
    return {
        type: 'paragraph',
        text: rawText,
    };

}