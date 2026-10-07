import { cn } from "../lib/utils";

interface PanelProps {
    className?: string;
    background?: "dark" | "darkGray" | "gray";
    children: React.ReactNode;
}

export default function Panel({ className = "", background = "darkGray", children }: PanelProps) {
    return (
        <div
            className={cn(
                "m-0.5 border border-(--border) rounded-lg",
                background === "dark" && "bg-(--background)",
                background === "darkGray" && "bg-(--content)",
                background === "gray" && "bg-(--content2)",
                className,
            )}
        >
            {children}
        </div>
    );
}