import { z } from "zod";

export const characterSchema = z.object({
    id: z.string(),
    name: z.string(),
    tag: z.string(),
    ymm4CharName: z.string()
});

export type Character = z.infer<typeof characterSchema>;

export const DEFAULT_CHARACTERS: Character[] = [
    {
        id: "reimu",
        name: "霊夢",
        tag: "r",
        ymm4CharName: "霊夢"
    },
    {
        id: "marisa",
        name: "魔理沙",
        tag: "m",
        ymm4CharName: "魔理沙"
    }
];