import SettingsContent from "../SettingsContent";
import { MdAdd, MdClose, MdEdit, MdMoreHoriz } from "react-icons/md";
import EditEmotion from "./EditEmotion";
import Button from "@/renderer/components/Button/Button";
import Table from "@/renderer/components/Table/Table";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { Emotion } from "@/renderer/store/speacker/emotions";
import { useState } from "react";

export type EmotionSettingsMode = "create" | "edit" | "list";

export default function EmotionSettings() {
    const { emotions, removeEmotion } = useSpeackerStore();
    const [mode, setMode] = useState<EmotionSettingsMode>("list");
    const [defaultValues, setDefaultValues] = useState<Emotion | undefined>();

    const handleEdit = (id: string) => {
        const value = emotions.find(e => e.id === id);
        setDefaultValues(value);
        setMode("edit");
    }

    return (
        <SettingsContent title="感情フラグ">
            {mode === "list" &&
                <div>
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold">登録されている感情フラグ:</h2>
                        <Button
                            className="text-2xl ms-auto bg-(--content2)"
                            onClick={() => setMode("create")}
                            title="感情フラグを追加"
                        >
                            <MdAdd />
                        </Button>
                    </div>
                    <Table
                        data={emotions}
                        columns={{
                            id: { label: "id" },
                            name: { label: "フラグ名" },
                            color: {
                                label: "色",
                                render: (value) => (
                                    <span style={{ backgroundColor: value }} className="h-4 w-full inline-block"></span>
                                )
                            }
                        }}
                        actionColumn={{
                            render: ((row) => (
                                <Button className="relative group">
                                    <MdMoreHoriz />

                                    <div className="hidden top-0 left-6 absolute group-hover:flex flex-col items-center bg-(--background) p-1 rounded">
                                        <Button onClick={() => handleEdit(row.id)}>
                                            <MdEdit />
                                        </Button>
                                        <Button onClick={() => removeEmotion(row.id)}>
                                            <MdClose />
                                        </Button>
                                    </div>
                                </Button>
                            ))
                        }}
                    />
                </div>
            }

            {mode === "create" &&
                <EditEmotion setSettingMode={setMode} mode="create" />
            }

            {mode === "edit" &&
                <EditEmotion setSettingMode={setMode} mode="edit" defaultValues={defaultValues} />
            }
        </SettingsContent>
    );
}