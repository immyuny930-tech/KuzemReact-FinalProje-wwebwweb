import { Link } from "react-router-dom";
import useFetch from "../kancalar/useFetch";
import useLocalStorage from "../kancalar/useLocalStorage";
import TarifKarti from "../components/TarifKarti";
import type { Tarif } from "../tipler/Tarif";

function AnaSayfa() {
  const { veri, yukleniyor, hata, tekrarDene } = useFetch<Tarif[]>("/tarifler.json");
  const [kullaniciTarifleri] = useLocalStorage<Tarif[]>("kullaniciTarifleri", []);

  const tumTarifler = [...(veri ?? []), ...kullaniciTarifleri];
  const oneCikanlar = tumTarifler.slice(0, 2);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Yemek Tariflerime Hoşgeldiniz</h1>
      <p className="text-gray-600 mb-6">
        Sevdiğim tarifleri buradan keşfedebilir, favorilerine ekleyebilir, kendi tariflerini ekleyebilirsin.
      </p>

      <div className="flex gap-3 mb-8">
        <Link to="/tarifler" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">
          Tüm Tarifleri Gör
        </Link>
        <Link to="/tarif-ekle" className="px-4 py-2 border-2 border-red-700 text-red-700 rounded hover:bg-red-50">
          Tarif Ekle
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Öne Çıkan Tarifler</h2>

      {yukleniyor && <p className="text-gray-500">Yükleniyor...</p>}

      {hata && (
        <div className="text-red-600">
          <p>{hata}</p>
          <button onClick={tekrarDene} className="mt-2 px-3 py-1 bg-red-700 text-white rounded">
            Tekrar Dene
          </button>
        </div>
      )}

      {!yukleniyor && oneCikanlar.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {oneCikanlar.map((tarif) => (
            <Link key={tarif.id} to={`/tarif/${tarif.id}`}>
              <TarifKarti tarif={tarif} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnaSayfa;