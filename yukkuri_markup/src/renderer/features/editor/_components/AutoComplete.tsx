import { cn } from "@/renderer/lib/utils";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";

type Item = string;

export interface AutoCompleteRef {
    onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export type AutoCompleteProps = SuggestionProps<Item>

export const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const characters = useSpeackerStore((state) => state.characters);
    const emotions = useSpeackerStore((state) => state.emotions);

    const items = useMemo(() => {
        const candidates = characters.flatMap((char) =>
            emotions.map((emotion) => `${char.tag}.${emotion.id}`)
        );

        return candidates.filter((item) =>
            item.toLowerCase().startsWith((props.query || '').toLowerCase())
        );
    }, [characters, emotions, props.query]);

    const selectItem = (index: number) => {
        const item = items[index];
        if (item) {
            props.command({ id: item });
        }
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === 'ArrowUp') {
                setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
                return true;
            }
            if (event.key === 'ArrowDown') {
                setSelectedIndex((prev) => (prev + 1) % items.length);
                return true;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                event.preventDefault();
                selectItem(selectedIndex);
                return true;
            }
            return false;
        },
    }), [items, selectedIndex]);

    return (
        <div className="suggestion-menu flex flex-col border border-(--border)">
            {items.length ? (
                items.map((item: string, index: number) => (
                    <button
                        key={`${item}-${index}`}
                        className={cn("text-start px-1 font-bold", index === selectedIndex && "bg-blue-500/30 text-blue-400")}
                        onClick={() => selectItem(index)}
                    >
                        {item}
                    </button>
                ))
            ) : (
                <div className="no-result">候補がありません</div>
            )}
        </div>
    );
});