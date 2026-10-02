import { ReactRenderer } from "@tiptap/react";
import tippy from 'tippy.js';
import { AutoComplete, type AutoCompleteProps, type AutoCompleteRef } from "./_components/AutoComplete";

export const suggestion = {
    char: "(",
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