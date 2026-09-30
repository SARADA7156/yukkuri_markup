import { MdSettings, MdHelp } from "react-icons/md";
import { useState } from "react";
import Button from "./components/Button/Button";
import Modal from "./components/Modal";
import Theme from "./components/Theme";
import Editor from "./features/editor/Editor";
import Settings from "./features/settings/Settings";

type ModalType = "settings" | "help" | "updateNote" | null;

function App() {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
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
                >
                    <Settings />
                </Modal>

                <Theme />
            </div>
        </main>
    )
}

export default App
