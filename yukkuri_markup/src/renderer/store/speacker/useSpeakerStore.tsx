import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_CHARACTERS, type Character } from "./character";
import { DEFAULT_EMOTIONS, type Emotion } from "./emotions";

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

    /**
     * 登録されているキャラクターを削除するメソッド
     * @param id 削除するキャラクターid
     */
    removeCharacter: (id: string) => void;

    /**
     * 登録されている感情フラグを削除するメソッド
     * @param id 削除する感情フラグid
     */
    removeEmotion: (id: string) => void;
}

export const useSpeackerStore = create<SpeakerStore>()(
    persist(
        (set) => {
            const filterById = <T extends { id: string }>(list: T[], id: string) =>
                list.filter((item) => item.id !== id);

            return {
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

                removeCharacter: (id) =>
                    set((state) => ({
                        characters: filterById(state.characters, id),
                    })),

                removeEmotion: (id) =>
                    set((state) => ({
                        emotions: filterById(state.emotions, id),
                    })),
            };
        },
        {
            name: 'speaker-storage',
        }
    )
);