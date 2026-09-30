import { H1 } from "./H1";

interface MainContainerProps {
    children: React.ReactNode
    title: string;
}

export default function MainContainer({ children, title }: MainContainerProps) {
    return (
        <div className="p-3 lg:w-4/6 lg:mx-auto">
            <H1 className="text-center">{title}</H1>
            <div>
                {children}
            </div>
        </div>
    );
}