import Panel from "@/renderer/components/Panel";
import { cn } from "@/renderer/lib/utils";
import { useSpeackerStore } from "@/renderer/store/speacker/useSpeakerStore";
import type { SuggestionKeyDownProps, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";

export type Item = string;

export interface AutoCompleteRef {
    onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export type AutoCompleteProps = SuggestionProps<Item>;

export type AutoCompleteItem = {
    value: string;
    label: string;
};

export const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const characters = useSpeackerStore((state) => state.characters);
    const emotions = useSpeackerStore((state) => state.emotions);

    // マスター配列(キャラと感情フラグの変更時のみ生成される)
    const allCandidates = useMemo<AutoCompleteItem[]>(() => {
        return characters.flatMap((char) =>
            emotions.map((emotion) => ({
                value: `${char.tag}.${emotion.id}`,
                label: `${char.name}(${emotion.name})`
            }))
        );
    }, [characters, emotions]);

    // タイピング時はマスター配列のフィルタリングのみを行う
    const items = useMemo(() => {
        const query = (props.query || '').toLowerCase();
        if (!query) return allCandidates;

        return allCandidates.filter((item) =>
            item.value.toLowerCase().includes(query) ||
            item.label.toLowerCase().includes(query)
        );
    }, [allCandidates, props.query]);

    const selectItem = (index: number) => {
        const item = items[index];
        if (item) {
            props.command(item.value);
        }
    };

    useEffect(() => setSelectedIndex(0), [items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            // 候補がない場合はキーイベントをエディタ側に流す
            if (items.length === 0) return false;

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
        <Panel className="suggestion-menu flex flex-col rounded-none">
            {items.length ? (
                items.map((item: AutoCompleteItem, index: number) => (
                    <button
                        key={item.value}
                        className={cn("px-1 flex items-center cursor-pointer", index === selectedIndex && "bg-blue-500/30")}
                        onClick={() => selectItem(index)}
                    >
                        <p className="text-start font-bold me-16">{item.value}</p>
                        <p className={cn("ms-auto opacity-50 text-sm", index === selectedIndex && "opacity-100")}>{item.label}</p>
                    </button>
                ))
            ) : (
                <div className="no-result">候補がありません</div>
            )}
        </Panel>
    );
});