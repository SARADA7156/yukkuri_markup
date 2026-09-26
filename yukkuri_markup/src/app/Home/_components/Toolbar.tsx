import { useTheme } from "@/app/hooks/useTheme";
import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import { MdSettings, MdHelp, MdArticle, MdUpload, MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Toolbar() {
    const { theme, toggleTheme } = useTheme();

    const ThemeIcon = theme === "dark" ? <MdDarkMode /> : <MdLightMode />
    return (
        <Container id="toolbar" className="flex bg-(--content)" as="header">
            <div className="flex items-center">
                <img src="/icon.png" alt="ゆっくりマークアップ" className="w-15" />
                <h1 className="text-2xl font-bold">ゆっくりマークアップ</h1>
            </div>

            <Container className="flex items-center m-0 bg-(--background) ms-auto">
                
                <Button className="text-3xl me-2" onClick={() => toggleTheme()}>
                    {ThemeIcon}
                    <p className="text-lg">{theme === "dark" ? "ダーク" : "ライト"}</p>
                </Button>

                <Button className="text-3xl me-2" title="ファイルをアップロード">
                    <MdUpload />
                </Button>

                <Button className="text-3xl me-2" title="設定">
                    <MdSettings />
                </Button>

                <Button className="text-3xl me-2" title="ヘルプ">
                    <Link to={"/help"}>
                        <MdHelp />
                    </Link>
                </Button>

                <Button className="text-3xl me-2" title="ドキュメントを見る">
                    <MdArticle />
                </Button>

                <Button
                    className={`
                        p-2 transition-all cursor-pointer
                        font-bold shadow-lg bg-blue-500 text-white rounded-3xl border border-blue-500
                        hover:bg-white hover:text-blue-500
                    `}
                >
                    ファイルに書き出し
                </Button>
            </Container>
        </Container>
    );
}