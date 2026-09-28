import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { characterSchema, type Character } from "./character";
import InputContainer from "@/components/InputContainer";
import Button from "@/components/Button/Button";

interface CreateCharacterProps {
    characters: Character[];
    setChars: (character: Character[]) => void;
    setIsModalOpen: (value: boolean) => void;
}

export default function CreateCharacter({ characters, setChars, setIsModalOpen }: CreateCharacterProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Character>({
        resolver: zodResolver(characterSchema),
        defaultValues: {
            id: "",
            name: "",
            tag: "",
            color: "#ffffff",
            ymm4CharName: ""
        }
    });

    const onSubmit = async (data: Character) => {
        const isIdDuplicate = characters.some((char) => char.id === data.id);
        const isTagDuplicate = characters.some((char) => char.tag === data.tag);

        if (isIdDuplicate) {
            setError("id", { 
            type: "manual", 
            message: `入力したidが重複しています 重複したid: ${data.id}` 
            });
        }

        if (isTagDuplicate) {
            setError("tag", { 
            type: "manual", 
            message: `入力したキャラクタータグが重複しています 重複したtag: ${data.tag}` 
            });
        }

  // エラーが1つでも発生した場合は処理を中断
    if (isIdDuplicate || isTagDuplicate) {
        return;
    }

        setChars([...characters, data]);
        setIsModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer className="mb-4">
                <label htmlFor="character-id" className="text-sm mb-1">キャラクターid(アルファベット):</label>
                {errors.id && <p className="text-sm text-red-500">{errors.id.message}</p>}
                <input
                    type="text"
                    id="character-id"
                    {...register("id")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <InputContainer className="mb-4">
                <label htmlFor="character-name" className="text-sm mb-1">キャラクター名:</label>
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                <input
                    type="text"
                    id="character-name"
                    {...register("name")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <InputContainer className="mb-4">
                <label htmlFor="character-tag" className="text-sm mb-1">キャラクタータグ(アルファベット, 1～4文字以内推奨):</label>
                {errors.tag && <p className="text-sm text-red-500">{errors.tag.message}</p>}
                <input
                    type="text"
                    id="character-tag"
                    {...register("tag")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <InputContainer className="mb-4">
                <label htmlFor="character-color" className="text-sm mb-1">キャラクターカラー:</label>
                {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
                <input
                    type="color"
                    id="character-color"
                    {...register("color")}
                    className="bg-(--content2) border border-(--border) rounded"
                />
            </InputContainer>

            <InputContainer className="mb-4">
                <label htmlFor="character-ymm4-name" className="text-sm mb-1">YMM4(YukkuriMovieMaker v4)で登録されているキャラクター名:</label>
                {errors.ymm4CharName && <p className="text-sm text-red-500">{errors.ymm4CharName.message}</p>}
                <input
                    type="text"
                    id="character-ymm4-name"
                    {...register("ymm4CharName")}
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