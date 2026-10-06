import Button from "@/renderer/components/Button/Button";
import InputContainer from "@/renderer/components/InputContainer";
import { emotionSchema, type Emotion } from "@/renderer/store/speacker/emotions";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function AddEmotion() {
    const { emotions, addEmotions } = useSpeackerStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Emotion>({
        resolver: zodResolver(emotionSchema),
        defaultValues: {
            id: "",
            name: "",
            color: "#ffffff"
        }
    });

    const onSubmit = (data: Emotion) => {
        const isDuplicate = emotions.some((emotion) => emotion.id === data.id);

        if (isDuplicate) {
            setError("id", { type: "manual", message: "idが重複しています" });
            return;
        }

        addEmotions(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
                <label htmlFor="emotion-id" className="text-sm mb-1">感情id(一意):</label>
                {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
                <input
                    type="text"
                    id="emotion-id"
                    {...register("id")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <InputContainer>
                <label htmlFor="emotion-name" className="text-sm mb-1">感情名:</label>
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                <input
                    type="text"
                    id="emotion-name"
                    {...register("name")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>


            <InputContainer>
                <label htmlFor="emotion-color" className="text-sm mb-1">カラー:</label>
                {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
                <input
                    type="color"
                    id="emotion-color"
                    {...register("color")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <Button
                className="mx-auto mt-2 px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 border border-blue-500"
                disabled={isSubmitting}
            >
                追加
            </Button>
        </form>
    );
}