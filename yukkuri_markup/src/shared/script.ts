import { z } from "zod";

export const baseObjectSchema = z.object({
    id: z.string(),
    text: z.string(),
});

export const paragraphObjectSchema = baseObjectSchema.extend({
    type: z.literal("paragraph"),
});

export const yukkuriVoiceObjectSchema = baseObjectSchema.extend({
    type: z.literal("yukkuriVoice"),
    speaker: z.string(),
    emotion: z.string(),
    readingMs: z.number(),
});

export const scriptArraySchema = z.array(
    z.discriminatedUnion("type", [
        paragraphObjectSchema,
        yukkuriVoiceObjectSchema,
    ])
);

export const scriptObjectSchema = z.discriminatedUnion("type", [
    paragraphObjectSchema,
    yukkuriVoiceObjectSchema,
]);

export const scriptDataSchema = z.object({
    lineIds: z.array(z.string()),
    scripts: z.record(z.string(), scriptObjectSchema),
    totalReadingMs: z.number(),
});

export type BaseObject = z.infer<typeof baseObjectSchema>;
export type ParagraphObject = z.infer<typeof paragraphObjectSchema>;
export type YukkuriVoiceObject = z.infer<typeof yukkuriVoiceObjectSchema>;
export type ScriptObject = z.infer<typeof scriptObjectSchema>;
export type ScriptData = z.infer<typeof scriptDataSchema>;