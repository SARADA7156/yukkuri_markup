import Header from "@/components/Header/Header"
import { Route, Routes } from "react-router-dom"
import Help from "./Help/page"
import Home from "./Home/page"

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
    </>
  )
}

export default App
