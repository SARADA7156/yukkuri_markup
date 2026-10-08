import { useEffect, useRef } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number,
) {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedFn = useRef((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }).current;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return debouncedFn;
}