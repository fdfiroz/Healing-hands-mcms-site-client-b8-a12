import { Outlet } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import { Footer } from "./components/Footer/Footer"

function App() {

  return (
    <>
    <MainLayout>
        <Outlet></Outlet>
    <Footer/>
    </MainLayout>
    </>
  )
}

export default App
