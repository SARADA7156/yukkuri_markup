import { useSpeackerStore } from "@/store/speacker/useSpeakerStore";
import SettingsContent from "../SettingsContent";
import AddCharacter from "./AddCharacter";
import { MdClose } from "react-icons/md";
import Button from "@/renderer/components/Button/Button";
import Table from "@/renderer/components/Table/Table";

export default function CharacterSettings() {
    const { characters, removeCharacter } = useSpeackerStore();

    const handleRemove = (id: string) => {
        removeCharacter(id);
    }

    return (
        <SettingsContent title="登録キャラクター">
            <div>
                <h2>登録されているキャラクター:</h2>
                <Table
                    data={characters}
                    columns={{
                        id: { label: "id" },
                        name: { label: "名前" },
                        tag: { label: "エディターのタグ" },
                        color: {
                            label: "キャラの色",
                            render: (value) => (
                                <span style={{ backgroundColor: value }} className="h-4 w-full inline-block"></span>
                            )
                        },
                        ymm4CharName: { label: "YMM4内の名前"}
                    }}
                    actionColumn={{
                        label: "編集",
                        render: ((row) => (
                            <Button title="キャラクターを削除" onClick={() => handleRemove(row.id)}>
                                <MdClose />
                            </Button>
                        ))
                    }}
                />
            </div>

            <div>
                <h2>キャラクターを追加:</h2>
                <AddCharacter />
            </div>
        </SettingsContent>
    )
}