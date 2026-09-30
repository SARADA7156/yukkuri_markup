type ColumnConfig<T> = {
    [K in keyof T]: {
        label: string;
        show?: boolean;
        render?: (value: T[K], row: T) => React.ReactNode;
    };
};

interface ActionColumnConfig<T> {
    label?: string;
    render: (row: T, rowIndex: number) => React.ReactNode;
}

interface TableProps<T extends Record<string, any>> {
    data: T[];
    columns: ColumnConfig<T>;
    actionColumn?: ActionColumnConfig<T>;
}

export default function Table<T extends Record<string, any>>({
    data,
    columns,
    actionColumn
}: TableProps<T>) {
    const columnKeys = (Object.keys(columns) as (keyof T)[]).filter(
        (key) => columns[key].show !== false
    );

    return (
        <table className="border-collapse table-auto w-full">
            <thead>
                <tr className="border-b border-b-(--border)">
                    {columnKeys.map((key) => (
                        <th key={String(key)} className="text-start px-4 py-2">
                            {columns[key].label}
                        </th>
                    ))}
                    {actionColumn && (
                        <th className="text-start px-4 py-2">
                            {actionColumn.label ?? ''}
                        </th>
                    )}
                </tr>
            </thead>

            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-b-(--border) odd:bg-(--content2)">
                        {columnKeys.map((key) => {
                            const config = columns[key];
                            const value = row[key];

                            return (
                                <td key={String(key)} className="px-4 py-2">
                                    {config.render ? config.render(value, row) : String(value ?? '')}
                                </td>
                            );
                        })}
                        {actionColumn && (
                            <td className="px-4 py-2">
                                {actionColumn.render(row, rowIndex)}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}