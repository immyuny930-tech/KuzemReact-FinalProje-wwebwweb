import { useParams, Link } from "react-router-dom";
import useFetch from "../kancalar/useFetch";
import useLocalStorage from "../kancalar/useLocalStorage";
import TarifKarti from "../components/TarifKarti";
import type { Tarif } from "../tipler/Tarif";

function TarifDetay() {
  const { id } = useParams(); // URLdeki :id kısmını okur, orn /tarif/3 -> "3"
  const { veri, yukleniyor, hata, tekrarDene } = useFetch<Tarif[]>("/tarifler.json");
  const [kullaniciTarifleri] = useLocalStorage<Tarif[]>("kullaniciTarifleri", []);

  const tumTarifler = [...(veri ?? []), ...kullaniciTarifleri];
  const tarif = tumTarifler.find((t) => t.id === Number(id)); // id string geldigi icin Number()a ceviriyoruz

  // sirasiyla: yukleniyor mu -> hata var mi -> tarif bulunamadi mi -> icerik
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
    return <p>Tarif bulunamadı.</p>;
  }

  return (
    <div>
      <Link to="/tarifler" className="text-red-700 hover:underline">&larr; Geri</Link>
      <TarifKarti tarif={tarif} />
    </div>
  );
}

export default TarifDetay;