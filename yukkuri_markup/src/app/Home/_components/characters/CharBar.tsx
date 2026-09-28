import Button from "@/components/Button/Button";
import { MdAdd, MdViewList } from "react-icons/md";
import type { Character } from "../../../../store/speacker/character";
import type { Editor } from "@tiptap/react";
import Modal from "@/components/Modal";
import { useState } from "react";
import CreateCharacter from "./CreateCharacter";

interface SideBarProps {
    chars: Character[];
    setChars: React.Dispatch<React.SetStateAction<Character[]>>;
    editor: Editor;
}

export default function CharBar({ chars, setChars, editor }: SideBarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const insertCharacterTag = (character: string) => {
        const { selection } = editor.state;
        const { $from } = selection;

        const currentBlock = $from.parent;
        const isEmptyLine = currentBlock.content.size === 0;
        const isAtStartOfLine = $from.parentOffset === 0;

        const tagContent = `(${character}.`;

        if (isEmptyLine) {
            editor
                .chain()
                .focus()
                .insertContent(`${tagContent}`)
                .run();
        } else if (isAtStartOfLine) {
            editor
                .chain()
                .focus()
                .insertContent(`${tagContent}`)
                .run();
        } else {
            editor
                .chain()
                .focus()
                .insertContent(`\n${tagContent}`)
                .run();
        }
    }

    return (
        <div className="bg-(--background) px-2 flex flex-col w-16 items-center m-0.5 border border-(--border) rounded-lg">
            <div className="charbar-header">
                <p className="text-sm">キャラ</p>
            </div>

            <Button
                className="cursor-pointer"
                title="カスタムキャラクターを追加"
                onClick={() => setIsModalOpen(true)}
            >
                <MdAdd className="text-3xl" />
            </Button>

            <Button
                className="cursor-pointer"
                title="キャラクター表"
            >
                <MdViewList className="text-3xl" />
            </Button>

            <div className="flex flex-col overflow-y-auto h-full">
                {chars.map((character, index) => (
                    <div key={`${character.id}-${index}`} className="flex flex-col py-1">
                        <Button
                            className={`font-bold aspect-square border border-black/50`}
                            style={{ backgroundColor: `${character.color}` }}
                            onClick={() => insertCharacterTag(character.tag)}
                        >
                        </Button>
                        <p className="text-sm text-center">{character.name}</p>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="カスタムキャラクターを追加"
            >
                <CreateCharacter characters={chars} setChars={setChars} setIsModalOpen={setIsModalOpen} />
            </Modal>
        </div>
    );
}