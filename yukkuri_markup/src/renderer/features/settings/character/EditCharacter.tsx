import Button from "@/renderer/components/Button/Button";
import InputContainer from "@/renderer/components/InputContainer";
import { characterSchema, type Character } from "@/renderer/store/speacker/character";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HTMLInputTypeAttribute } from "react";
import { useForm, type RegisterOptions } from "react-hook-form";
import type { CharacterSettingsMode } from "./CharacterSettings";

interface EditCharacterProps {
    defaultValues?: Character;
    mode?: "create" | "edit";
    setSettingMode: (mode: CharacterSettingsMode) => void;
}

interface FormField {
    id: keyof Character;
    label: string;
    type: HTMLInputTypeAttribute;
    options?: RegisterOptions<Character>;
}

export default function EditCharacter({
    defaultValues = {
        id: "",
        name: "",
        tag: "",
        color: "#ffffff",
        pitch: 0,
        readingSpeed: 100,
        ymm4CharName: ""
    },
    mode = "create",
    setSettingMode,
}: EditCharacterProps) {
    const { characters, upsertCharacter } = useSpeackerStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Character>({
        resolver: zodResolver(characterSchema),
        values: defaultValues,
    });

    const onSubmit = (data: Character) => {
        if (mode === "create") {
            const isIdDuplicate = characters.some((char) => char.id === data.id);
            const isTagDuplicate = characters.some((char) => char.tag === data.tag);

            let hasError = false;

            if (isIdDuplicate) {
                setError("id", {
                    type: "manual",
                    message: `入力したidが重複しています 重複したid: ${data.id}`
                });
                hasError = true;
            }

            if (isTagDuplicate) {
                setError("tag", {
                    type: "manual",
                    message: `入力したキャラクタータグが重複しています 重複したtag: ${data.tag}`
                });
                hasError = true;
            }

            if (hasError) return;
        }

        upsertCharacter(data);
        setSettingMode("list");
    };

    const formFields: FormField[] = [
        { id: "id", label: "キャラクターid(アルファベット):", type: "text" },
        { id: "name", label: "キャラクター名:", type: "text" },
        { id: "tag", label: "キャラクタータグ(アルファベット, 1～4文字以内推奨):", type: "text" },
        { id: "color", label: "キャラクターカラー:", type: "color" },
        {
            id: "pitch",
            label: "音程/再生速度:",
            type: "number",
            options: { valueAsNumber: true },
        },
        {
            id: "readingSpeed",
            label: "読み上げ速度(50～200):",
            type: "number",
            options: { valueAsNumber: true },
        },
        { id: "ymm4CharName", label: "YMM4(YukkuriMovieMaker v4)で登録されているキャラクター名:", type: "text" },
    ];

    return (
        <div>
            <div className="flex items-center">
                <h2 className="text-lg font-bold">キャラクターを{mode === "create" ? "追加" : "編集"}する</h2>
                <Button
                    className="bg-(--content2) ms-auto mt-2 px-2 py-1 rounded"
                    onClick={() => setSettingMode("list")}
                >
                    戻る
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {formFields.map(({ id, label, type, options }) => {
                    const error = errors[id];
                    const isIdFieldInEditMode = id === "id" && mode === "edit";

                    return (
                        <InputContainer key={id} className="mb-4">
                            <label htmlFor={`character-${id}`} className="text-sm mb-1">
                                {label}
                            </label>
                            {error && <p className="text-sm text-red-500">{error.message}</p>}
                            <input
                                type={type}
                                id={`character-${id}`}
                                {...register(id, options)}
                                readOnly={isIdFieldInEditMode} // 編集時は ID を固定
                                className={`bg-(--content2) border border-(--border) rounded ${isIdFieldInEditMode ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            />
                        </InputContainer>
                    );
                })}

                <Button
                    className="mx-auto mt-2 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 border border-blue-500"
                    disabled={isSubmitting}
                    type="submit"
                >
                    {mode === "create" ? "追加" : "保存"}
                </Button>
            </form>
        </div>
    );
}