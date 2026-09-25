import { cn } from "@/lib/utils";
import "./button.css";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    title?: string
} & React.ComponentPropsWithoutRef<"button">

export default function Button({
    className = "",
    title,
    children,
    ...props
}: ButtonProps) {
    const Component = "button";

    return (
        <Component
            className={cn(
                "flex items-center p-1 cursor-pointer hover:bg-black/10 rounded-full relative group",
                className,
            )}
            {...props}
        >
            {children && <div>{children}</div>}
            {title &&
                <span
                    className={`
                        invisible rounded text-sm font-bold text-white p-1 bg-slate-600 top-11 -left-3
                        group-hover:visible opacity-100 absolute z-10
                    `}>
                        {title}
                </span>
                }
        </Component>
    );
}