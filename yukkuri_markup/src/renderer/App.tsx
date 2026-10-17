import Theme from "./components/Theme";
import { CommandProvider } from "./contexts/CommandContext";
import Editor from "./features/editor/Editor";
import { EditorProvider } from "./features/editor/EditorProvider";
import StatusBar from "./features/editor/components/StatusBar";
import MenuBar from "./features/menuBar/MenuBar";

function App() {
    return (
        <main className="h-dvh w-dvw">
            <EditorProvider>
                <CommandProvider>
                    <div className="grid grid-rows-[4%_93%_3%] h-full">
                        {/* メニューバー */}
                        <MenuBar />

                        {/* エディター本体 */}
                        <Editor />

                        {/* エディターステータス */}
                        <StatusBar />

                        <Theme />
                    </div>
                </CommandProvider>
            </EditorProvider>
        </main>
    );
}

export default App
