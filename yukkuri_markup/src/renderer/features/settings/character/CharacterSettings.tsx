import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import SettingsContent from "../SettingsContent";
import EditCharacter from "./EditCharacter";
import { MdAdd, MdClose, MdEdit, MdMoreHoriz } from "react-icons/md";
import Button from "@/renderer/components/Button";
import Table from "@/renderer/components/Table";
import { useState } from "react";
import { type Character } from "@/renderer/store/speacker/character";

export type CharacterSettingsMode = "create" | "edit" | "list";

export default function CharacterSettings() {
    const { characters, removeCharacter } = useSpeackerStore();
    const [mode, setMode] = useState<CharacterSettingsMode>("list");
    const [defaultValues, setDefaultValues] = useState<Character | undefined>();

    const handleEdit = (id: string) => {
        const value = characters.find(c => c.id === id);
        setDefaultValues(value);
        setMode("edit");
    }

    return (
        <SettingsContent title="登録キャラクター">
            {mode === "list" &&
                <div>
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold">登録されているキャラクター:</h2>
                        <Button
                            className="text-2xl ms-auto bg-(--content2)"
                            onClick={() => setMode("create")}
                            title="キャラクターを追加"
                        >
                            <MdAdd />
                        </Button>
                    </div>
                    <Table
                        data={characters}
                        columns={{
                            id: { label: "id" },
                            name: { label: "名前" },
                            tag: { label: "タグ" },
                            color: {
                                label: "キャラの色",
                                render: (value) => (
                                    <span style={{ backgroundColor: value }} className="h-4 w-full inline-block"></span>
                                )
                            },
                            pitch: { label: "音程" },
                            readingSpeed: { label: "読み上げ速度" },
                            ymm4CharName: { label: "YMM4内の名前" }
                        }}
                        actionColumn={{
                            render: ((row) => (
                                <Button className="relative group">
                                    <MdMoreHoriz />

                                    <div className="hidden top-0 left-6 absolute group-hover:flex flex-col items-center bg-(--background) p-1 rounded">
                                        <Button onClick={() => handleEdit(row.id)}>
                                            <MdEdit />
                                        </Button>
                                        <Button onClick={() => removeCharacter(row.id)}>
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
                <EditCharacter mode="create" setSettingMode={setMode} />
            }

            {mode === "edit" &&
                <EditCharacter mode="edit" setSettingMode={setMode} defaultValues={defaultValues} />
            }
        </SettingsContent>
    )
}