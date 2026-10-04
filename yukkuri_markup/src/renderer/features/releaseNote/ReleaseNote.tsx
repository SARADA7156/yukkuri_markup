import Button from "@/renderer/components/Button/Button";
import MarkdownContent from "@/renderer/components/MarkdownContent";
import { cn } from "@/renderer/lib/utils";
import { useEffect, useState } from "react";

type ReleaseNote = {
    version: string;
    fileName: string;
    path: string;
}

export default function ReleaseNote() {
    const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");

    useEffect(() => {
        fetch("./docs/release-notes/release-notes.json")
            .then(response => response.json())
            .then((notes: ReleaseNote[]) => {
                setReleaseNotes(notes);
                if (notes.length > 0) {
                    setActiveTab(notes[0].version);
                }
            });
    }, []);

    // 選択中のノートを 1 つだけ取得
    const currentNote = releaseNotes.find((note) => note.version === activeTab);

    return (
        <div className="p-4 grid grid-cols-[20%_80%] h-full">
            <ul className="border-e border-e-(--border) h-full overflow-y-auto pe-4">
                {releaseNotes.map((note) => (
                    <li key={note.fileName}>
                        <Button
                            className={cn(
                                "w-full text-start rounded-none p-0 hover:text-blue-500",
                                activeTab === note.version && "text-blue-500"
                            )}
                            onClick={() => setActiveTab(note.version)}
                        >
                            {note.version}
                        </Button>
                    </li>
                ))}
            </ul>

            <div className="h-full overflow-y-auto px-2 pb-2 select-text">
                {currentNote && (
                    <MarkdownContent
                        title={`${currentNote.version}リリースノート`}
                        link={`./docs${currentNote.path}`}
                    />
                )}
            </div>
        </div>
    );
}