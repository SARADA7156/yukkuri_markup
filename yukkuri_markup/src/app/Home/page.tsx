export default function Home() {
    return (
        <>
            <button
                className={`
                    p-2 fixed bottom-8 right-8 transition-all cursor-pointer
                    font-bold shadow-lg bg-blue-500 text-white rounded-3xl
                    hover:scale-110
                `}
            >
                ファイルに書き出し
            </button>
        </>
    );
}