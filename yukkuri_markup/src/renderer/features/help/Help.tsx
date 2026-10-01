import Button from "@/renderer/components/Button/Button";
import { cn } from "@/renderer/lib/utils";
import { useState } from "react";
import HelpContent from "./HelpContent";
import helpOfHelp from "./content/help-of-help.md?raw";
import helpInformation from "./content/information.md?raw";
import licenseText from "./content/license.md?raw";
import updatesText from "./content/updates.md?raw";
import editorDoc from "./content/editorDoc.md?raw";
import thirdPartyLicenses from "@/renderer/assets/THIRD-PARTY-LICENSES.txt?raw";

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
                {activeTab === "information" && <HelpContent text={helpInformation} title="概要" />}
                {activeTab === "editor" && <HelpContent text={editorDoc} title="ドキュメント" />}
                {activeTab === "updates" && <HelpContent text={updatesText} title="アップデートについて" />}
                {activeTab === "license" && <HelpContent text={licenseText} title="ライセンス" />}
                {activeTab === "thirdPartyLicenses" && <HelpContent text={thirdPartyLicenses} title="ライセンス" />}
                {activeTab === "helpOfhelp" && <HelpContent text={helpOfHelp} title="ヘルプのヘルプ" />}
            </div>
        </div>
    )
}