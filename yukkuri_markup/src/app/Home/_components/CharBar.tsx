import Button from "@/components/Button/Button";
import { MdAdd } from "react-icons/md";
import type { Character } from "../character";
import type { Editor } from "@tiptap/react";

interface SideBarProps {
    chars: Character[];
    editor: Editor;
    // setChars: () => void;
}

export default function CharBar({ chars, editor }: SideBarProps) {
    const insertCharacterTag = (character: string) => {
        const { selection } = editor.state;
        const { $from } = selection;

        const currentBlock = $from.parent;
        const isEmptyLine = currentBlock.content.size === 0;
        const isAtStartOfLine = $from.parentOffset === 0;

        const tagContent = `[${character}:`;

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
        <div className="bg-(--content) px-2 border-e border-e-(--border) flex flex-col w-16 items-center">
            <div className="charbar-header">
                <p>挿入</p>
            </div>

            <Button className="cursor-pointer" title="カスタムキャラクターを追加">
                <MdAdd className="text-3xl" />
            </Button>

            <div className="flex flex-col overflow-y-auto ">
                {chars.map((character, index) => (
                    <div key={`${character.id}-${index}`} className="flex flex-col py-1">
                        <Button
                            className={`font-bold aspect-square border border-black/50`}
                            style={{ backgroundColor: `#${character.color}` }}
                            onClick={() => insertCharacterTag(character.tag)}
                        >
                        </Button>
                        <p className="text-sm text-center">{character.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}