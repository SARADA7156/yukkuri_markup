import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import { MdAdd } from "react-icons/md"
import Toolbar from "./_components/Toolbar";
import { type ScriptData } from "./parser";
import ScriptEditor from "./_components/ScriptEditor";
import ScriptPreview from "./_components/ScriptPreview";
import { useState } from "react";

export default function Home() {
    const [scriptData, setScriptData] = useState<ScriptData>({
        type: "doc",
        content: []
    });

    const onChangeJson = (data: ScriptData) => {
        setScriptData(data);
    }

    return (
        <div className="mt-4">
            <Toolbar />

            <div className="flex h-185">
                <Container className="bg-white me-2 w-14 flex flex-col items-center">
                    <Button className="p-1 cursor-pointer hover:bg-[#cfcfcf96] rounded-4xl mt-auto" disableAnimation>
                        <MdAdd className="text-3xl" title="カスタムキャラクターを追加" />
                    </Button>
                </Container>

                <Container className="flex bg-white w-full ms-2">
                    <ScriptEditor onChangeJson={onChangeJson} />
                    <ScriptPreview scriptData={scriptData} />
                </Container>
            </div>
        </div>
    );
}