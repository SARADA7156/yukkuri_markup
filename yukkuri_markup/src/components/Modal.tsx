import { useEffect } from "react";
import { createPortal } from "react-dom";
import Container from "./Container";
import Button from "./Button/Button";
import { MdClose } from "react-icons/md";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    className?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, className, children }: ModalProps) {
    // escキー押下でモーダルを閉じる
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }

        if (isOpen) {
            document.addEventListener("keydown" , handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <Container
                className={cn("bg-(--background) border border-(--border) p-0 min-w-1/3 flex flex-col h-full", className)}
                onClick={(e) => e.stopPropagation()}
            >
                {/* モーダルヘッダー */}
                <div className="px-2 border-b border-b-(--border) flex items-center">
                    <h1 className="text-sm">{title}</h1>

                    <Button title="閉じる" className="ms-auto" onClick={onClose}>
                        <MdClose />
                    </Button>
                </div>

                {/* モーダルコンテンツ */}
                <div className="px-4 py-2 bg-(--content) rounded-b-lg flex-1 h-full">
                    {children}
                </div>
                
            </Container>
        </div>,
        document.body
    );
}