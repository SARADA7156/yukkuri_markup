import { DEFAULT_CHARACTERS, type Character } from "@/store/speacker/character";
import { DEFAULT_EMOTIONS, type Emotion } from "@/store/speacker/emotions";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SpeakerStore {
    /**
     * 現在登録されているキャラクターを格納される変数
     */
    characters: Character[];

    /**
     * 新たにカスタムキャラクターを追加するメソッド
     * @param value 追加したいカスタムキャラクターのデータ
     */
    addCharacter: (value: Character) => void;

    /**
     * キャラクターの感情データが格納される変数
     */
    emotions: Emotion[];

    /**
     * 新たにカスタム感情を追加するメソッド
     * @param value 追加したいカスタム感情のデータ
     */
    addEmotions: (value: Emotion) => void;
}

export const useSpeackerStore = create<SpeakerStore>()(
    persist(
        (set) => ({
            characters: DEFAULT_CHARACTERS,
            emotions: DEFAULT_EMOTIONS,

            addCharacter: (value) =>
                set((state) => ({
                    characters: [...state.characters, value],
                })),

            addEmotions: (value) =>
                set((state) => ({
                    emotions: [...state.emotions, value],
                })),
        }),
        {
            name: 'speaker-storage',
        }
    )
);