interface SettingsContentProps {
    title: string;
    children: React.ReactNode;
}

export default function SettingsContent({ title, children }: SettingsContentProps) {
    return (
        <div className="flex flex-col p-2">
            <div className="settings-content-header">
                <h1 className="mb-3 text-2xl border-b border-b-(--border)">{title}</h1>
            </div>

            <div className="settings-content">
                {children}
            </div>
        </div>
    );
}