import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-[#ffffff] p-2">
            <Link to={"/"} className="flex items-center">
                <img src="/icon.png" alt="ゆっくりマークアップ" className="w-15" />
                <h1 className="text-2xl font-bold">ゆっくりマークアップ</h1>
            </Link>
            
        </header>
    );
}