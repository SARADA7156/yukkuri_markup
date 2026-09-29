import Button from "@/components/Button/Button";
import { MdSettings, MdHelp } from "react-icons/md";
import Editor from "@/features/editor/Editor";
import Settings from "@/features/settings/Settings";
import { useState } from "react";
import Modal from "@/components/Modal";

type ModalType = "settings" | "help" | "updateNote" | null;

function App() {
    const [activeModal, setActiveModal] = useState<ModalType>("settings");
    const closeModal = () => setActiveModal(null);

    return (
        <main className="h-dvh w-dvw">
            <div className="grid grid-rows-[4%_93%_3%] h-full">
                {/* ツールバー */}
                <div id="toolbar" className="flex bg-(--background) items-center m-1">
                    <Button className="text-lg me-2" title="設定" onClick={() => setActiveModal("settings")}>
                        <MdSettings />
                    </Button>

                    <Button className="text-lg me-2" title="ヘルプ">
                        <MdHelp />
                    </Button>
                </div>

                {/* エディター本体 */}
                <Editor />

                {/* 設定モーダル */}
                <Modal
                    isOpen={activeModal === "settings"}
                    onClose={closeModal}
                    title="設定"
                    className="min-w-1/2 max-w-1/2 min-h-1/2 max-h-1/2"
                >
                    <Settings />
                </Modal>
            </div>
        </main>
    )
}

export default App
