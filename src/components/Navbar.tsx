import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="bg-red-700 text-white px-6 py-6 flex gap-6 items-center">

            <div className="flex flex-col mr-4">
                <h1 className="font-bold text-lg leading-tight">Tarif Defteri</h1>
                <span className="text-xs text-red-400">wwebwweb</span>
            </div>

            <Link to="/" className="hover:underline">Ana Sayfa</Link>
            <Link to="/tarifler" className="hover:underline">Tarifler</Link>
            <Link to="/favoriler" className="hover:underline">Favoriler</Link>
            <Link to="/tarif-ekle" className="hover:underline">Tarif Ekle</Link>

        </nav>
    )
}

export default Navbar;