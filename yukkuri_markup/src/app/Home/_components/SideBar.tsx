import Button from "@/components/Button/Button";
import { MdAdd } from "react-icons/md";
import type { Character } from "../character";
import type { Editor } from "@tiptap/react";

interface SideBarProps {
    chars: Character[];
    editor: Editor;
    // setChars: () => void;
}

export default function SideBar({ chars, editor }: SideBarProps) {
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
        <div className="bg-(--content) p-2 w-14 border-e border-e-(--border) rounded-s-4xl">
            <Button className="p-1 cursor-pointer" title="カスタムキャラクターを追加">
                <MdAdd className="text-3xl" />
            </Button>

            <div className="flex flex-col items-center h-full overflow-y-auto">
                {chars.map((character, index) => (
                    <div key={`${character.id}-${index}`} className="w-full">
                        <Button
                            className={`font-bold w-full aspect-square my-1 border border-black/50`}
                            style={{ backgroundColor: `#${character.color}` }}
                            onClick={() => insertCharacterTag(character.tag)}
                            title={`${character.name}を挿入`}
                        >
                        </Button>
                        <p className="text-xs text-center">{character.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}