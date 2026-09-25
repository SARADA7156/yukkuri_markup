import Button from "@/components/Button/Button";
import Container from "@/components/Container";
import { MdAdd } from "react-icons/md";
import type { Character } from "../character";

interface SideBarProps {
    chars: Character[];
    // setChars: () => void;
}

export default function SideBar({chars}: SideBarProps) {
    return (
        <Container className="bg-white me-2 w-14 flex flex-col items-center overflow-y-auto">
            <Button className="p-1 cursor-pointer hover:bg-[#cfcfcf96] rounded-4xl mt-auto" disableAnimation>
                <MdAdd className="text-3xl" title="カスタムキャラクターを追加" />
            </Button>
        </Container>
    );
}