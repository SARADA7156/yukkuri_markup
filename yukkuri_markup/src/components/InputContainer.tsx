import { cn } from "@/lib/utils";

interface InputContainerProps {
    className?: string;
    children: React.ReactNode;
}

export default function InputContainer({ className, children }: InputContainerProps) {
    return (
        <div className={cn("flex flex-col m-1", className)}>
            {children}
        </div>
    );
}