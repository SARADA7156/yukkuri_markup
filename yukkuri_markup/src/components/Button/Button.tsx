import { cn } from "@/lib/utils";
import "./button.css";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    disableAnimation?: boolean;
} & React.ComponentPropsWithoutRef<"button">

export default function Button({
    className = "",
    children,
    disableAnimation = false,
    ...props
}: ButtonProps) {
    const Component = "button";

    return (
        <Component
            className={cn(
                "flex items-center p-1 cursor-pointer hover:bg-[#cfcfcf96] rounded-4xl",
                className,
                !disableAnimation && "custom-animation"
            )}
            {...props}
        >
            {children}
        </Component>
    );
}