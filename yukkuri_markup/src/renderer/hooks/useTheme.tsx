import { useEffect, useState } from "react";

export const DEFAULT_THEMES = ["light", "dark"] as const;

export type Theme = typeof DEFAULT_THEMES[number];

export const themeLabels: Record<Theme, string> = {
    light: "ライト",
    dark: "ダーク"
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark" || savedTheme === "light") {
                return savedTheme;
            }

        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }
        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const changeTheme = (theme: Theme) => {
        setTheme(theme);
    };

    return { theme, changeTheme }
}