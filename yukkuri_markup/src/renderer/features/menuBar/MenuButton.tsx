import Button from "@/renderer/components/Button";

interface MenuButton {
    label: string;
    children: React.ReactNode;
}

export function MenuButton({ label, children }: MenuButton) {
    return (
        <Button className="text-sm rounded relative">
            <p>{label}</p>
            <div className="top-6 left-0 absolute bg-(--content) border border-(--border) rounded-md p-2">
                {children}
            </div>
        </Button>
    )
}