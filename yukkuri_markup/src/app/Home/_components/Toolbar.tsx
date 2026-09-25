import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import { MdSettings, MdHelp, MdArticle, MdUpload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Toolbar() {
    return (
        <Container id="toolbar" className="flex bg-white" as="header">
            <div className="flex items-center">
                <img src="/icon.png" alt="ゆっくりマークアップ" className="w-15" />
                <h1 className="text-2xl font-bold">ゆっくりマークアップ</h1>
            </div>

            <Container className="flex items-center m-0 bg-[#eeeeee] ms-auto">
                <Button className="text-3xl me-2 text-gray-600" title="ファイルをアップロード">
                    <MdUpload />
                </Button>

                <Button className="text-3xl me-2 text-gray-600" title="設定">
                    <MdSettings />
                </Button>

                <Button className="text-3xl me-2 text-gray-600" title="ヘルプ">
                    <Link to={"/help"}>
                        <MdHelp />
                    </Link>
                </Button>

                <Button className="text-3xl me-2 text-gray-600" title="ドキュメントを見る">
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