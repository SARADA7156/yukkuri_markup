import { cn } from "@/renderer/lib/utils";

type ContainerProps<T extends React.ElementType = 'div'> = {
    as?: T;
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<T>


export default function Container<T extends React.ElementType = 'div'>({
    as,
    className = "",
    children,
    ...props
}: ContainerProps<T>) {
    const Component = as || "div";

    return (
        <Component
            className={cn("m-4 p-2 rounded-lg shadow", className)}
            {...props}
        >
            {children}
        </Component>
    );
}