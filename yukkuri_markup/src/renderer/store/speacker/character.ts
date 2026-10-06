import { z } from "zod";

export const characterSchema = z.object({
    id: z
        .string()
        .min(1, { message: "1文字以上のidを入力してください。" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "idは 半角英数 のみで構成してください。" }),
    name: z.string().min(1, { message: "1文字以上の名前を入力してください。"}),
    tag: z
        .string()
        .min(1, { message: "1文字以上のタグを入力してください。"})
        .regex(/^[a-zA-Z0-9]+$/, { message: "idは 半角英数 のみで構成してください。" }),
    color: z
        .string()
        .regex(/^#?[0-9a-fA-F]{6}$/, {
            message: "有効な16進数カラーコード（例: #ffffff または #fff）を入力してください",
        }),
    pitch: z.number(),
    readingSpeed: z
        .number()
        .min(50, { message: "最小数値は50です" })
        .max(200, { message: "最大数値は200までです" }),
    ymm4CharName: z.string()
});

export type Character = z.infer<typeof characterSchema>;

export const DEFAULT_CHARACTERS: Character[] = [
    {
        id: "reimu",
        name: "霊夢",
        tag: "r",
        color: "#ff0000",
        pitch: 0,
        readingSpeed: 100,
        ymm4CharName: "ゆっくり霊夢"
    },
    {
        id: "marisa",
        name: "魔理沙",
        tag: "m",
        color: "#ffff00",
        pitch: 0,
        readingSpeed: 100,
        ymm4CharName: "ゆっくり魔理沙"
    }
];