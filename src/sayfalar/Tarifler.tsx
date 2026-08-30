import useFetch from "../kancalar/useFetch";
import TarifKarti from "../components/TarifKarti";
import type { Tarif } from "../tipler/Tarif"


function Tarifler() {
  const { veri, yukleniyor, hata, tekrarDene } = useFetch<Tarif[]>("/tarifler.json");


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

      {veri && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {veri.map((tarif) => (
            <TarifKarti key={tarif.id} tarif={tarif} />
          ))}
        </div>
      )}

      
    </div>
  );
}

export default Tarifler;