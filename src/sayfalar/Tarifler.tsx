import useFetch from "../kancalar/useFetch";
import TarifKarti from "../components/TarifKarti";
import type { Tarif } from "../tipler/Tarif"
import { Link } from "react-router-dom";
import useLocalStorage from "../kancalar/useLocalStorage";


function Tarifler() {
  const { veri, yukleniyor, hata, tekrarDene } = useFetch<Tarif[]>("/tarifler.json");
  const [kullaniciTarifleri] = useLocalStorage<Tarif[]>("kullaniciTarifleri", []);

  // APIden gelen ve kullanicinin kendi ekledigi tarifleri tek listede birlestir
  const tumTarifler = [...(veri ?? []), ...kullaniciTarifleri];


  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Tarifler</h1>

      {yukleniyor && <p className="text-gray-500">Yukleniyor...</p>}

      {hata && (
        <div className="text-red-600 mb-4">
          <p>{hata}</p>
          <button onClick={tekrarDene} className="mt-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-">Tekrar Dene</button>
        </div>
      )}

      {!yukleniyor && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {tumTarifler.map((tarif) => (
            <Link key={tarif.id} to={`/tarif/${tarif.id}`}>
              <TarifKarti tarif={tarif} />
            </Link>
          ))}
        </div>
      )}

      
    </div>
  );
}

export default Tarifler;