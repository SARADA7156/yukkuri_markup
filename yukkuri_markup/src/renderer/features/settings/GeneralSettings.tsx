import { DEFAULT_THEMES, themeLabels, useTheme, type Theme } from "@/renderer/hooks/useTheme";
import SettingsContent from "./SettingsContent";

export default function GeneralSettings() {
    const { theme, changeTheme } = useTheme();

    const isTheme = (value: string): value is Theme => {
        return DEFAULT_THEMES.includes(value as Theme);
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = e.target.value;

        if (!isTheme(selectedTheme)) return;

        changeTheme(selectedTheme);
    }

    return (
        <SettingsContent title="一般">
            <ul>
                <li className="flex flex-col hover:bg-(--hover)/40 p-1 py-2 rounded">
                    <label htmlFor="select-theme">UIのテーマ:</label>
                    <select
                        name="ui-theme"
                        id="select-theme"
                        className="bg-(--content2) rounded w-1/3"
                        defaultValue={theme}
                        onChange={handleThemeChange}
                    >
                        {DEFAULT_THEMES.map((theme, index) => (
                            <option value={theme} key={`theme-${theme}-${index}`}>
                                {themeLabels[theme]}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </SettingsContent>
    );
}