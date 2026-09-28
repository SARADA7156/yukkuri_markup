import Button from "@/components/Button/Button";
import type { Editor } from "@tiptap/react";
import { MdAdd, MdViewList } from "react-icons/md";
import type { Emotion } from "../../../../store/speacker/emotions";
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateEmotion from "./CreateEmotion";

interface EmotionsBar {
    emotions: Emotion[];
    setEmotions: React.Dispatch<React.SetStateAction<Emotion[]>>;
    editor: Editor;
}

export default function EmotionBar({ emotions, setEmotions, editor }: EmotionsBar) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const insertEmotionTag = (emotion: string) => {
        const tagContent = `${emotion}) `;

            editor
                .chain()
                .focus()
                .insertContent(`${tagContent}`)
                .run();
    }

    return (
        <div className="bg-(--background) px-2 flex flex-col w-16 items-center m-0.5 border border-(--border) rounded-lg">
            <div className="charbar-header">
                <p className="text-sm">感情</p>
            </div>

            <Button
                className="cursor-pointer"
                title="カスタム感情を追加"
                onClick={() => setIsModalOpen(true)}
            >
                <MdAdd className="text-3xl" />
            </Button>

            <Button
                className="cursor-pointer"
                title="感情一覧表"
            >
                <MdViewList className="text-3xl" />
            </Button>

            <div className="flex flex-col overflow-y-auto h-full">
                {emotions.map((emotion, index) => (
                    <div key={`${emotion.id}-${index}`} className="flex flex-col py-1">
                        <Button
                            className={`font-bold aspect-square border border-black/50`}
                            style={{ backgroundColor: `${emotion.color}` }}
                            onClick={() => insertEmotionTag(emotion.id)}
                        >
                        </Button>
                        <p className="text-sm text-center">{emotion.name}</p>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="カスタム感情を追加"
            >
                <CreateEmotion emotions={emotions} setEmotions={setEmotions} setIsModalOpen={setIsModalOpen} />
            </Modal>
        </div>
    );
}