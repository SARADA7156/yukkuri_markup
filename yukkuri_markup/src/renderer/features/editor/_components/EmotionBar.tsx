import type { Editor } from "@tiptap/react";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import Button from "@/renderer/components/Button/Button";

interface EmotionsBar {
    editor: Editor;
}

export default function EmotionBar({ editor }: EmotionsBar) {
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
        </div>
    );
}