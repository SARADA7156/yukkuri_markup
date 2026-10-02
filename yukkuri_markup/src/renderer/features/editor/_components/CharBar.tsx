import type { Editor } from "@tiptap/react";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import Button from "@/renderer/components/Button/Button";

interface SideBarProps {
    editor: Editor;
}

export default function CharBar({ editor }: SideBarProps) {
    const { characters } = useSpeackerStore();

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

            <div className="flex flex-col overflow-y-auto h-full">
                {characters.map((character, index) => (
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
        </div>
    );
}