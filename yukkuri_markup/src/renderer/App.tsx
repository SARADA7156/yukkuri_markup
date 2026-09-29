import Button from "@/components/Button/Button";
import { MdSettings, MdHelp } from "react-icons/md";
import Editor from "@/features/editor/Editor";

function App() {
    return (
        <main className="h-dvh w-dvw">
            <div className="grid grid-rows-[3%_94%_3%] h-full">
                {/* ツールバー */}
                <div id="toolbar" className="flex bg-(--background)">
                    <Button className="text-lg me-2" title="設定">
                        <MdSettings />
                    </Button>

                    <Button className="text-lg me-2" title="ヘルプ">
                            <MdHelp />
                    </Button>
                </div>

                {/* エディター本体 */}
                <Editor />
            </div>
        </main>
    )
}

export default App
