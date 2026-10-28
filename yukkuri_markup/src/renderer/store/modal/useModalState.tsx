import { create } from "zustand";

export type ModalType = "settings" | "help" | "releaseNotes" | "notification" | null;

interface ModalState {
    activeModal: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

export const useModalState = create<ModalState>((set) => ({
    activeModal: null,
    openModal: (type) => set({
        activeModal: type
    }),
    closeModal: () => set({
        activeModal: null,
    }),
}))
