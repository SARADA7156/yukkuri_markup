import type { Character } from "./_components/characters/character";

type YukkuriVoice = {
    type: "yukkuriVoice",
    attrs: {
        speaker: string,
        emotion: string,
    },
    content: {
        type: string;
        text: string;
    }[];
}

type Paragraph = {
    type: "paragraph",
    content: {
        type: string;
        text: string;
    }[];
}

export type ScriptData = {
    type: "doc",
    content: (YukkuriVoice | Paragraph)[]
}

export function parseScriptToJson(rawText: string, characters: Character[]): ScriptData {
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
                        emotion,
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