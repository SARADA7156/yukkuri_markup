import Table from "@/renderer/components/Table";
import SettingsContent from "./SettingsContent";
import { APP_COMMANDS } from "@/renderer/constants/appCommands";

export default function KeyboardShortcut() {
    const registered = Object.values(APP_COMMANDS)
        .filter((c) => c.shortcut)
        .map((c) => ({
            id: c.id,
            label: c.label,
            keys: c.shortcut,
        }))

    return (
        <SettingsContent title="キーボードショートカット">
            <div>
                <Table
                    data={registered}
                    columns={{
                        id: { label: "id" },
                        label: { label: "コマンド" },
                        keys: { label: "キーバインド" }
                    }}
                />
            </div>
        </SettingsContent>
    );
}