import { Route, Routes, useLocation } from "react-router-dom";
// Routes:
import Header from "./components/Header";
import Menu from "./components/Menu";
import AllStuff from "./components/AllStuff";
import Basket from "./components/Basket";
import Livingroom from "./components/Livingroom";
import DarkMode from "./components/DarkMode";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import FAQs from "./components/FAQs";
import Types from "./components/FurnitureTypes";
import Footer from "./components/Footer";
import SelectedFurniture from "./components/SelectedFurniture";
import { SelectedFurnitureProvider } from "./components/SelectedFurnitureContext";

function App() {

  const location = useLocation()
  const footerVisible = location.pathname === "/"

  return (
    <div className={`app-cont min-h-screen m-0 flex flex-col ${footerVisible ? "justify-between" : ""}`}>

      <Header></Header>

      <main className="overflow-hidden">

      <SelectedFurnitureProvider>
        <Routes>
          <Route path="/" element={ <Menu /> } ></Route>
          <Route path="/all"  element={ <AllStuff /> }></Route>
          <Route path="/basket" element={ <Basket /> }></Route>
          <Route path="/livingroom" element={ <Livingroom /> }></Route>
          <Route path="/darkmode" element={ <DarkMode /> }></Route>
          <Route path="/newsletter" element={ <Newsletter /> }></Route>
          <Route path="/contact" element={ <Contact /> }></Route>
          <Route path="/faq" element={ <FAQs /> }></Route>
          <Route path="/types/:type" element={ <Types /> }></Route>
          <Route path="selected/:id" element={ <SelectedFurniture /> }></Route>
        </Routes>
      </SelectedFurnitureProvider>


      </main>

      { footerVisible && <Footer></Footer> }

    </div>
  )
}

export default App