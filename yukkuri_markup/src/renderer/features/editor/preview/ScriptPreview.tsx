import { useEditorStore } from "@/renderer/store/editor/useEditorStore";
import { calculateDuration, formatMs } from "./calculateDuration";

export default function ScriptPreview() {
    const { scriptData } = useEditorStore();

    return (
        <div className="px-2 w-1/2 grid grid-rows-[3%_97%] h-full rounded-lg">
            <h1>プレビュー</h1>

            <div className="pb-40 overflow-y-auto select-text">
                {scriptData.content.map((item, index) => (
                    <div key={`item-${index}`} className="my-1">
                        {item.type === "paragraph" &&
                            <>
                                {item.content.map((text, idx) => (
                                    <p key={idx}>{text.text}</p>
                                ))}
                            </>
                        }

                        {item.type === "yukkuriVoice" &&
                            <div className="flex">
                                <strong className="min-w-26">{item.attrs.speaker}({item.attrs.emotion}):</strong>
                                    {item.content.map((text, idx) => (
                                        <div className="flex items-center" key={`yukkuri_script-${idx}`}>
                                            <p>{text.text}</p>
                                            <p
                                                className="text-green-500 text-sm ms-1"
                                            >
                                                {formatMs(calculateDuration(text.text))}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}