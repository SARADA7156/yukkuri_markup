import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MdAdd, MdArticle, MdDriveFolderUpload, MdHelp, MdSettings } from "react-icons/md"
import { Link } from "react-router-dom";

export default function Home() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: "<p>ここに台本を入力...</p>"
    });

    return (
        <div>
            <Container id="toolbar" className="flex bg-white" as="header">
                <div className="flex items-center">
                    <img src="/icon.png" alt="ゆっくりマークアップ" className="w-15" />
                    <h1 className="text-2xl font-bold">ゆっくりマークアップ</h1>
                </div>

                <Container className="flex items-center m-0 bg-[#eeeeee] ms-auto">
                    <Button className="text-3xl me-2 text-gray-600" title="ファイルをアップロード">
                        <MdDriveFolderUpload />
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

                    <button
                        className={`
                            p-2 transition-all cursor-pointer
                            font-bold shadow-lg bg-blue-500 text-white rounded-3xl border border-blue-500
                            hover:bg-white hover:text-blue-500
                        `}
                    >
                        ファイルに書き出し
                    </button>
                </Container>
            </Container>

            <div className="flex h-185">
                <Container className="bg-white me-2 w-14 flex flex-col items-center">
                    <Button className="p-1 cursor-pointer hover:bg-[#cfcfcf96] rounded-4xl mt-auto" disableAnimation>
                        <MdAdd className="text-3xl" title="カスタムキャラクターを追加" />
                    </Button>
                </Container>

                <Container className="flex bg-white w-full ms-2">
                    <EditorContent editor={editor} className="h-full w-1/2 p-1 border-e border-e-[#00000036]" />
                    <div></div>
                </Container>
            </div>
        </div>
    );
}