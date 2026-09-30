import { useSpeackerStore } from "@/store/speacker/useSpeakerStore";
import SettingsContent from "../SettingsContent";
import Table from "@/components/Table/Table";
import { MdClose } from "react-icons/md";
import Button from "@/components/Button/Button";
import AddEmotion from "./AddEmotion";

export default function EmotionSettings() {
    const { emotions, removeEmotion } = useSpeackerStore();

    const handleRemove = (id: string) => {
        removeEmotion(id);
    }

    return (
        <SettingsContent title="感情フラグ">
            <div>
                <h2>登録されている感情フラグ:</h2>
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
                        label: "編集",
                        render: ((row) => (
                            <Button title="感情フラグを削除" onClick={() => handleRemove(row.id)}>
                                <MdClose />
                            </Button>
                        ))
                    }}
                />
            </div>

            <div>
                <h2>感情フラグを作成:</h2>
                <AddEmotion />
            </div>
        </SettingsContent>
    );
}