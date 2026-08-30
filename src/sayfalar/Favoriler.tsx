import { Link } from "react-router-dom";
import { useTarifContext } from "../context/TarifContext";
import TarifKarti from "../components/TarifKarti";

function Favoriler() {
    const { favoriler } = useTarifContext();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Favorilerim</h1>

            {favoriler.length === 0 && (
                <div>
                    <p className="text-gray-500 mb-2">Henüz favori tarifin yok.</p>
                    <Link to="/tarifler" className="text-red-700 hover:underline">
                        Tariflere göz at
                    </Link>
                </div>
            )}

            {favoriler.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
                    {favoriler.map((tarif) => (
                        <TarifKarti key={tarif.id} tarif={tarif} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default Favoriler;