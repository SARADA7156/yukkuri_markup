import { cn } from "@/renderer/lib/utils";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<"button">

export default function Button({
    className = "",
    children,
    ...props
}: ButtonProps) {
    const Component = "button";

    return (
        <Component
            className={cn(
                "flex items-center p-1 cursor-pointer hover:bg-(--hover) rounded-full",
                className,
            )}
            {...props}
        >
            {children && <>{children}</>}
        </Component>
    );
}