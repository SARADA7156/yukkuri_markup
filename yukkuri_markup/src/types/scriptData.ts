export type YukkuriVoice = {
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

export type Paragraph = {
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
