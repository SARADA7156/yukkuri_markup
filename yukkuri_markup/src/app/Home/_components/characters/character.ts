import { z } from "zod";

export const characterSchema = z.object({
    id: z.string().min(1, { message: "1文字以上のidを入力してください。"}),
    name: z.string().min(1, { message: "1文字以上の名前を入力してください。"}),
    tag: z.string().min(1, { message: "1文字以上のタグを入力してください。"}),
    color: z
        .string()
        .regex(/^#?[0-9a-fA-F]{6}$/, {
            message: "有効な16進数カラーコード（例: #ffffff または #fff）を入力してください",
        })
        .transform((val) => (val.startsWith("#") ? val : `#${val}`)),
    ymm4CharName: z.string()
});

export type Character = z.infer<typeof characterSchema>;

export const DEFAULT_CHARACTERS: Character[] = [
    {
        id: "reimu",
        name: "霊夢",
        tag: "r",
        color: "#ff0000",
        ymm4CharName: "ゆっくり霊夢"
    },
    {
        id: "marisa",
        name: "魔理沙",
        tag: "m",
        color: "#ffff00",
        ymm4CharName: "ゆっくり魔理沙"
    }
];