import Button from "@/components/Button/Button";
import type { Editor } from "@tiptap/react";
import { MdAdd, MdClose, MdViewList } from "react-icons/md";
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateEmotion from "./CreateEmotion";
import { useSpeackerStore } from "@/store/speacker/useSpeakerStore";

interface EmotionsBar {
    editor: Editor;
}

export default function EmotionBar({ editor }: EmotionsBar) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(true);
    const { emotions } = useSpeackerStore();

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
                onClick={() => setIsListModalOpen(true)}
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
                <CreateEmotion setIsModalOpen={setIsModalOpen} />
            </Modal>

            <Modal
                isOpen={isListModalOpen}
                onClose={() => setIsListModalOpen(false)}
                title="感情タグリスト"
            >
                <table className="border-collapse table-auto w-full">
                    <thead>
                        <tr className="border-b border-b-(--border)">
                            <th className="text-start px-4 py-2">id</th>
                            <th className="text-start px-4 py-2">name</th>
                            <th className="text-start px-4 py-2">color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emotions.map((emotion, idx) => (
                            <tr key={`${emotion.id}-${idx}`} className="border-b border-b-(--border) odd:bg-(--content2)">
                                <td className="px-4 py-2">{emotion.id}</td>
                                <td className="px-4 py-2">{emotion.name}</td>
                                <td className="px-4 py-2">{emotion.color}</td>
                                <td className="px-4 py-2">
                                    <Button title="削除" className="ms-auto">
                                        <MdClose />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal>
        </div>
    );
}