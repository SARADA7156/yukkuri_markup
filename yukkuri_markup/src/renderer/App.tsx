import Theme from "./components/Theme";
import Editor from "./features/editor/Editor";
import StatusBar from "./features/editor/status/StatusBar";
import MenuBar from "./features/menuBar/MenuBar";

function App() {
    return (
        <main className="h-dvh w-dvw">
            <div className="grid grid-rows-[4%_93%_3%] h-full">
                {/* メニューバー */}
                <MenuBar />

                {/* エディター本体 */}
                <Editor />

                {/* エディターステータス */}
                <StatusBar />

                <Theme />
            </div>
        </main>
    );
}

export default App
