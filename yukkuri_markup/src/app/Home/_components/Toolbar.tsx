import { useTheme } from "@/app/hooks/useTheme";
import Button from "@/components/Button/Button";
import { MdSettings, MdHelp, MdDarkMode, MdLightMode, MdFileOpen } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Toolbar() {
    const { theme, toggleTheme } = useTheme();

    const ThemeIcon = theme === "dark" ? <MdDarkMode /> : <MdLightMode />
    return (
        <div id="toolbar" className="flex bg-(--background)">
            <Button className="text-lg me-2" onClick={() => toggleTheme()}>
                {ThemeIcon}
                <p className="text-base">{theme === "dark" ? "ダーク" : "ライト"}</p>
            </Button>

            <Button className="text-lg me-2" title="ファイルを開く">
                <MdFileOpen />
            </Button>

            <Button className="text-lg me-2" title="設定">
                <MdSettings />
            </Button>

            <Button className="text-lg me-2" title="ヘルプ">
                <Link to={"/help"}>
                    <MdHelp />
                </Link>
            </Button>

            {/* <Button
                className={`
                    p-2 transition-all cursor-pointer
                    font-bold shadow-lg bg-blue-500 text-white rounded-3xl border border-blue-500
                    hover:bg-white hover:text-blue-500
                `}
            >
                ファイルに書き出し
            </Button> */}
        </div>
    );
}