import { useParams, Link } from "react-router-dom";
import useFetch from "../kancalar/useFetch";
import type { Tarif } from "../tipler/Tarif";
import TarifKarti from "../components/TarifKarti";


function TarifDetay() {
    const { id } = useParams();
    const { veri, yukleniyor, hata, tekrarDene } = useFetch<Tarif[]>("/tarifler.json")

    const tarif = veri?.find((t) => t.id === Number(id));

    if (yukleniyor) return <p className="text-gray-500">Yükleniyor...</p>;

    if (hata) {
        return (
            <div className="text-red-600">
                <p>{hata}</p>
                <button onClick={tekrarDene} className="mt-2 px-3 py-1 bg-red-700 text-white rounded">
                    Tekrar Dene
                </button>
            </div>
        );
    }

    if (!tarif) {
        return <p>Tarif bulunamadi.</p>;
    }

    return (
        <div>
            <Link to="/Tarifler" className="text-red-700 hover:underline">Geri</Link>
            <TarifKarti tarif={tarif} />
        </div>
    );
}

export default TarifDetay;