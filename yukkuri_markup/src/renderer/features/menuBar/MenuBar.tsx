import Modal from "@/renderer/components/Modal";
import Settings from "../settings/Settings";
import Help from "../help/Help";
import ReleaseNote from "../releaseNote/ReleaseNote";
import { useModalState } from "@/renderer/store/modal/useModalState";
import { MenuButton } from "./MenuButton";

export default function MenuBar() {
    const activeModal = useModalState((s) => s.activeModal);
    const closeModal = useModalState((s) => s.closeModal);

    return (
        <>
            <div className="flex bg-(--background) items-center m-1 gap-2">
                <MenuButton label="ファイル">
                    <></>
                </MenuButton>
            </div>

            {/* 設定モーダル */}
            <Modal
                isOpen={activeModal === "settings"}
                onClose={closeModal}
                title="設定"
            >
                <Settings />
            </Modal>

            <Modal
                isOpen={activeModal === "help"}
                onClose={closeModal}
                title="ヘルプ"
            >
                <Help />
            </Modal>

            <Modal
                isOpen={activeModal === "releaseNotes"}
                onClose={closeModal}
                title="リリースノート"
            >
                <ReleaseNote />
            </Modal>
        </>
    );
}