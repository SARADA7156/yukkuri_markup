import { z } from "zod";

export const baseObjectSchema = z.object({
    id: z.string(),
    text: z.string(),
});

export const scriptDataSchema = z.object({
    lineIds: z.array(z.string()),
    scripts: z.record(z.string(), baseObjectSchema),
});

export type BaseObject = z.infer<typeof baseObjectSchema>;
export type ScriptData = z.infer<typeof scriptDataSchema>;

export type ParagraphObject = {
    id: string;
    text: string;
    type: "paragraph";
}

export type YukkuriVoiceObject = {
    id: string;
    text: string;
    type: "yukkuriVoice";
    speaker: string;
    emotion: string;
    readingMs: number;
}

export type ScriptObject = ParagraphObject | YukkuriVoiceObject;