import { ReactRenderer } from "@tiptap/react";
import tippy from 'tippy.js';
import { AutoComplete, type AutoCompleteProps, type AutoCompleteRef, type Item } from "./_components/AutoComplete";
import type { SuggestionOptions } from "@tiptap/suggestion";

export const suggestion: Omit<SuggestionOptions<Item>, "editor"> = {
    char: "(",

    allow: ({ state, range }) => {
        const $from = state.doc.resolve(range.from);
        const textBefore = $from.parent.textBetween(0, $from.parentOffset, null, ' ');

        const textBeforeTrigger = textBefore.slice(0, -1);

        const isAtStartOfLine = textBeforeTrigger.trim() === '';

        return isAtStartOfLine;
    },

    command: ({ editor, range, props }) => {
        // 自動的に閉じタグを入れる
        const textToInsert = `(${props}) `;

        editor
            .chain()
            .focus()
            .insertContentAt(range, textToInsert)
            .run();
    },

    items: () => [],
    render: () => {
        let component: ReactRenderer<AutoCompleteRef, AutoCompleteProps>;
        let popup: any;

        return {
            onStart: (props: any) => {
                component = new ReactRenderer(AutoComplete, {
                    props,
                    editor: props.editor,
                });

                popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                });
            },
            onUpdate(props: any) {
                component.updateProps(props);
                popup[0].setProps({ getReferenceClientRect: props.clientRect });
            },
            onKeyDown(props: any) {
                if (props.event.key === 'Escape') {
                    popup[0].hide();
                    return true;
                }
                return component.ref?.onKeyDown(props) ?? false;
            },
            onExit() {
                popup[0].destroy();
                component.destroy();
            },
        };
    },
};