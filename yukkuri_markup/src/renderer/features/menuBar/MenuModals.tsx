import Modal from "@/renderer/components/Modal";
import Help from "../help/Help";
import ReleaseNote from "../releaseNote/ReleaseNote";
import Settings from "../settings/Settings";
import { useModalState } from "@/renderer/store/modal/useModalState";

export default function MenuModals() {
    const activeModal = useModalState((s) => s.activeModal);
    const closeModal = useModalState((s) => s.closeModal);

    return (
        <>
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
    )
}