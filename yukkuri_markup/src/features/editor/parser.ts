import type { Paragraph, ScriptData, YukkuriVoice } from "@/types/scriptData";
import type { Character } from "../../store/speacker/character";
import type { Emotion } from "../../store/speacker/emotions";

export function parseScriptToJson(rawText: string, characters: Character[], emotions: Emotion[]): ScriptData {
    const lines = rawText.split("\n");

    const content = lines
        .filter((line) => line.trim() !== "")
        .map((line): YukkuriVoice | Paragraph => {
            const match = line.match(/^\(([a-zA-Z0-9_-]+).([a-zA-Z0-9_-]+)\)\s*(.*)$/);

            if (match) {
                const [, speaker, emotion, text] = match;
                return {
                    type: "yukkuriVoice",
                    attrs: {
                        speaker: characters.find(char => char.tag === speaker)?.name ?? speaker,
                        emotion: emotions.find(emo => emo.id === emotion)?.name ?? emotion,
                    },
                    content: [
                        {
                            type: "text",
                            text: text,
                        },
                    ],
                };
            }

            return {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: line,
                    },
                ],
            };
        });

    return {
        type: "doc",
        content,
    };
}