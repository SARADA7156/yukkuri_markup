import { Route, Routes } from "react-router-dom"
import Help from "./Help/page"
import EditorHome from "./Home/page"

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<EditorHome />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </>
  )
}

export default App
