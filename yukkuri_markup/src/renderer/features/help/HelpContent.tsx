import ReactMarkdown from 'react-markdown';

export default function HelpContent({ text, title }: { text: string, title: string }) {
    return (
        <div className="flex flex-col p-2 mb-20">
            <div className="settings-content-header">
                <h1 className="mb-3 text-2xl border-b border-b-(--border)">{title}</h1>
            </div>

            <div className="settings-content flex flex-col">
                <ReactMarkdown
                    components={{
                        p: ({ children }) => (
                            <p className="whitespace-pre-wrap [word-break:auto-phrase]">{children}</p>
                        ),
                        h3: ({ children }) => (
                            <h3 className="whitespace-pre-wrap text-xl font-bold [word-break:auto-phrase] mt-5">{children}</h3>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc ms-4">{children}</ul>
                        )
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    )
}