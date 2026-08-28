import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TarifProvider } from "./context/TarifContext";

import Navbar from "./components/Navbar";
import AnaSayfa from "./sayfalar/AnaSayfa"
import Tarifler from "./sayfalar/Tarifler"
import TarifDetay from "./sayfalar/TarifDetay"
import TarifEkle from "./sayfalar/TarifEkle"
import Favoriler from "./sayfalar/Favoriler"

function App() {
  return (
    <TarifProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<AnaSayfa />} />
          <Route path="/tarifler" element={<Tarifler />} />
          <Route path="/tarif/:id" element={<TarifDetay />} />
          <Route path="/tarif-ekle" element={<TarifEkle />} />
          <Route path="/favoriler" element={<Favoriler />} />
        </Routes>

      </BrowserRouter>
    </TarifProvider>
  )
}

export default App;