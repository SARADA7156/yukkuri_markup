export type BaseObject = {
    id: string;
    text: string;
};

export type ParagraphObject = BaseObject & {
    type: "paragraph";
};

export type YukkuriVoiceObject = BaseObject & {
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
    readingTime: number;
};

export type ScriptObject = ParagraphObject | YukkuriVoiceObject;