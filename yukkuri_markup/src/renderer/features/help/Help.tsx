import Button from "@/renderer/components/Button/Button";
import { cn } from "@/renderer/lib/utils";
import { useState } from "react";
import MarkdownContent from "../../components/MarkdownContent";

const helps = ["information", "editor", "updates", "license", "thirdPartyLicenses", "helpOfhelp"] as const;
type HelpType = typeof helps[number];

const labels: Record<HelpType, string> = {
    information: "概要",
    editor: "エディター",
    updates: "アップデートについて",
    license: "ライセンス",
    thirdPartyLicenses: "サードパーティーライセンス",
    helpOfhelp: "ヘルプのヘルプ"
}

export default function Help() {
    const [activeTab, setActiveTab] = useState<HelpType>("information");

    return (
        <div className="p-4 grid grid-cols-[20%_80%] h-full">
            <ul className="border-e border-e-(--border) h-full overflow-y-auto pe-4">
                {helps.map((help) => (
                    <li key={`help-tab-${help}`}>
                        <Button
                            className={cn(
                                "w-full text-start rounded-none p-0 hover:text-blue-500",
                                activeTab === help && "text-blue-500"
                            )}
                            onClick={() => setActiveTab(help)}
                        >
                            {labels[help]}
                        </Button>
                    </li>
                ))}
            </ul>

            <div className="h-full overflow-y-auto px-2 pb-2 select-text">
                {activeTab === "information" && <MarkdownContent link="./docs/help-docs/information.md" title="概要" />}
                {activeTab === "editor" && <MarkdownContent link="./docs/help-docs/editorDoc.md" title="ドキュメント" />}
                {activeTab === "updates" && <MarkdownContent link="./docs/help-docs/updates.md" title="アップデートについて" />}
                {activeTab === "license" && <MarkdownContent link="./docs/help-docs/license.md" title="ライセンス" />}
                {activeTab === "thirdPartyLicenses" && <MarkdownContent link="./THIRD-PARTY-LICENSES.txt" title="サードパーティーライセンス" />}
                {activeTab === "helpOfhelp" && <MarkdownContent link="./docs/help-docs/help-of-help.md" title="ヘルプのヘルプ" />}
            </div>
        </div>
    )
}