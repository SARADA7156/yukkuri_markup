interface H1Props {
    children: React.ReactNode;
    className?: string;
    center?: boolean
}

export function H1({ children, className = "", center = false }: H1Props) {
    const isCenter = center ? "text-center" : ""

    return (
        <h1 className={`${isCenter} text-3xl font-bold ${className}`}>
            {children}
        </h1>
    );
}