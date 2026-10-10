import type { Editor } from "@tiptap/react";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import Button from "@/renderer/components/Button";
import Panel from "@/renderer/components/Panel";

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
        <Panel className="px-2 flex flex-col w-16 items-center" background="dark">
            <div className="emotionbar-header">
                <p className="text-sm">感情</p>
            </div>

            <div className="flex flex-col overflow-y-auto h-full w-full">
                {emotions.map((emotion, index) => (
                    <div key={`${emotion.id}-${index}`} className="flex flex-col py-1 w-full">
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
        </Panel>
    );
}