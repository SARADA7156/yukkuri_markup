import type { Character } from "@/renderer/store/speacker/character";
import type { Emotion } from "@/renderer/store/speacker/emotions";

// TODO: 変換リザルトの型を定義し、戻り値の構造を変更する
export function parseToJson(rawText: string, characters: Character[], emotions: Emotion[]) {
    const characterMap = new Map(characters.map(c => [c.tag, c.name]));
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

                return {
                    type: "yukkuriVoice",
                    speaker: characterMap.get(speackerTag) ?? speackerTag,
                    emotion: emotionMap.get(emotionId) ?? emotionId,
                    text
                };
            }
        }
    }
    return {
        type: 'paragraph',
        text: rawText,
    };

}