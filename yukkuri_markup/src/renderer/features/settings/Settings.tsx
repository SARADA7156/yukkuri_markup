import { cn } from "@/renderer/lib/utils";
import { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import CharacterSettings from "./character/CharacterSettings";
import EmotionSettings from "./emotion/EmotionSettings";
import Button from "@/renderer/components/Button/Button";

type SettingsType = "general" | "character" | "emotion";

export default function Settings() {
    const [activeTab, setActiveTab] = useState<SettingsType>("general");

    return (
        <div className="p-4 grid grid-cols-[20%_80%] h-full">
            <ul className="border-e border-e-(--border) h-full overflow-y-auto pe-4">
                <li>
                    <Button
                        className={cn(
                            "w-full text-start rounded-none p-0 hover:text-blue-500",
                            activeTab === "general" && "text-blue-500"
                        )}
                        onClick={() => setActiveTab("general")}
                    >
                        一般
                    </Button>
                </li>
                <li>
                    <Button
                        className={cn(
                            "w-full text-start rounded-none p-0 hover:text-blue-500",
                            activeTab === "character" && "text-blue-500"
                        )}
                        onClick={() => setActiveTab("character")}
                    >
                        登録キャラクター
                    </Button>
                </li>
                <li>
                    <Button
                        className={cn(
                            "w-full text-start rounded-none p-0 hover:text-blue-500",
                            activeTab === "emotion" && "text-blue-500"
                        )}
                        onClick={() => setActiveTab("emotion")}
                    >
                        感情フラグ
                    </Button>
                </li>
            </ul>

            <div className="h-full overflow-y-auto">
                {activeTab === "general" && <GeneralSettings />}
                {activeTab === "character" && <CharacterSettings />}
                {activeTab === "emotion" && <EmotionSettings />}
            </div>
        </div>
    );
}