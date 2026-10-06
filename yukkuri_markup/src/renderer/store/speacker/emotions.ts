import { z } from "zod";

export const emotionSchema = z.object({
    id: z
        .string()
        .min(1, { message: "idは1文字以上入力してください。" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "idは 半角英数 のみで構成してください。" }),
    name: z.string().min(1, { message: "名前は1文字以上入力してください。" }),
    color: z
        .string()
        .regex(/^#?[0-9a-fA-F]{6}$/, {
            message: "有効な16進数カラーコード（例: #ffffff または #fff）を入力してください",
        })
});

export type Emotion = z.infer<typeof emotionSchema>;

export const DEFAULT_EMOTIONS: Emotion[] = [
    {
        id: "default",
        name: "通常",
        color: "#ffffff"
    },
    {
        id: "joy",
        name: "喜",
        color: "#ffff00"
    },
    {
        id: "anger",
        name: "怒",
        color: "#ff0000"
    },
    {
        id: "sorrow",
        name: "哀",
        color: "#0000ff"
    },
    {
        id: "happiness",
        name: "楽",
        color: "#ff5cbb"
    }
];