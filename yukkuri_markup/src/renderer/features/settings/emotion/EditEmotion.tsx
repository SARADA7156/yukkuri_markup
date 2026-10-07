import Button from "@/renderer/components/Button/Button";
import InputContainer from "@/renderer/components/InputContainer";
import { emotionSchema, type Emotion } from "@/renderer/store/speacker/emotions";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type RegisterOptions } from "react-hook-form";
import type { EmotionSettingsMode } from "./EmotionSettings";
import type { HTMLInputTypeAttribute } from "react";

interface EditEmotionProps {
    defaultValues?: Emotion;
    mode?: "create" | "edit";
    setSettingMode: (mode: EmotionSettingsMode) => void;
}

interface FormField {
    id: keyof Emotion;
    label: string;
    type: HTMLInputTypeAttribute;
    options?: RegisterOptions<Emotion>;
}

export default function EditEmotion({
    defaultValues = {
        id: "",
        name: "",
        color: "#ffffff"
    },
    mode = "create",
    setSettingMode,
}: EditEmotionProps) {
    const { emotions, upsertEmotion } = useSpeackerStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Emotion>({
        resolver: zodResolver(emotionSchema),
        values: defaultValues,
    });

    const onSubmit = (data: Emotion) => {
        if (mode === "create") {
            const isDuplicate = emotions.some((emotion) => emotion.id === data.id);

            if (isDuplicate) {
                setError("id", { type: "manual", message: "idが重複しています" });
                return;
            }
        }

        upsertEmotion(data);
        setSettingMode("list");
    }

        const formFields: FormField[] = [
            { id: "id", label: "感情id(一意)", type: "text" },
            { id: "name", label: "感情名", type: "text" },
            { id: "color", label: "カラー", type: "color" }
        ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
                <h2 className="text-lg font-bold">感情フラグを{mode === "create" ? "追加" : "編集"}する</h2>
                <Button
                    className="bg-(--content2) ms-auto mt-2 px-2 py-1 rounded"
                    onClick={() => setSettingMode("list")}
                >
                    戻る
                </Button>
            </div>
            {formFields.map(({ id, label, type, options }) => {
                const error = errors[id];
                const isIdFieldInEditMode = id === "id" && mode === "edit";

                return (
                    <InputContainer key={id} className="mb-4">
                        <label htmlFor={`emotion-${id}`} className="text-sm mb-1">
                            {label}
                        </label>
                        {error && <p className="text-sm text-red-500">{error.message}</p>}
                        <input
                            type={type}
                            id={`emotion-${id}`}
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
            >
                {mode === "create" ? "追加" : "保存"}
            </Button>
        </form>
    );
}