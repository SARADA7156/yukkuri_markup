import { Route, Routes } from "react-router-dom"
import Help from "./Help/page"
import EditorHome from "./Home/page"

function App() {
  return (
    <>
      <main className="mx-20">
        <Routes>
          <Route path="/" element={<EditorHome />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </>
  )
}

export default App
