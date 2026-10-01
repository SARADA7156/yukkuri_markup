import ReactMarkdown from 'react-markdown';

export default function HelpContent({ text, title }: { text: string, title: string }) {
    return (
        <div className="flex flex-col px-2 pb-2 mb-20 relative">
            <div className="settings-content-header sticky top-0 bg-(--content)">
                <h1 className="mb-3 text-2xl border-b border-b-(--border)">{title}</h1>
            </div>

            <div className="settings-content flex flex-col gap-y-4">
                <ReactMarkdown
                    components={{
                        p: ({ children }) => (
                            <p className="whitespace-pre-wrap [word-break:auto-phrase]">{children}</p>
                        ),
                        h3: ({ children }) => (
                            <h3 className="whitespace-pre-wrap text-xl font-bold [word-break:auto-phrase] mt-5">{children}</h3>
                        ),
                        h4: ({ children }) => (
                            <h4 className="whitespace-pre-wrap text-lg font-bold [word-break:auto-phrase] mt-4">{children}</h4>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc ms-4">{children}</ul>
                        ),
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    )
}