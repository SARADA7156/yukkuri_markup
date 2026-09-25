import type { ScriptData } from "../parser";

interface ScriptPreviewProps {
    scriptData: ScriptData
}

export default function ScriptPreview({ scriptData }: ScriptPreviewProps) {
    return (
        <div>
            {scriptData.content.map((item, index) => (
                <div key={`item-${index}`}>
                {item.type === "paragraph" &&
                    <>
                    {item.content.map((text, idx) => (
                        <p key={idx}>{text.text}</p>
                    ))}
                    </>
                }

                {item.type === "yukkuriVoice" &&
                    <div className="flex">
                        <strong>[{item.attrs.speaker}:{item.attrs.emotion}]:</strong>
                        {item.content.map((text, idx) => (
                            <p key={idx}>{text.text}</p>
                        ))}
                    </div>
                }
                </div>
            ))}
        </div>
    );
}