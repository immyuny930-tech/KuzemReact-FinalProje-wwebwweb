import type { Tarif } from "../tipler/Tarif";
import  { useTarifContext } from "../context/TarifContext";

interface TarifKartiProps {
  tarif: Tarif;
}

function TarifKarti({ tarif }: TarifKartiProps) {
  const { favoriEkle, favoriCikar, favoriMi } = useTarifContext();
  const favoride = favoriMi(tarif.id);

  return (
    <div className="bg-white border-2 border-red-700 rounded-lg p-4 w-full shadow-md">

      <h2 className="text-lg font-bold text-red-700 text-center mb-3">
        {tarif.yemekAdi}
      </h2>

      <div className="flex gap-4">
        <div className="flex-1 text-sm space-y-1">
          <p>Süre: {tarif.pisirmeSuresi} dk</p>
          <p>Zorluk: {tarif.zorluk}</p>
          <p>Vejetaryan: {tarif.vejetaryan ? "Evet" : "Hayır"}</p>

          <button
            onClick={() => (favoride ? favoriCikar(tarif.id) : favoriEkle(tarif))}
            className={`text-xs px-2 py-1 rounded mt-2 ${
              favoride
                ? "bg-gray-200 text-gray-700"
                : "bg-red-700 text-white hover:bg-red-800"
            }`}
          >
            {favoride ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          </button>

        </div>

        <div className="flex-1 text-sm">
          <h3 className="font-semibold mb-1">Malzemeler:</h3>

          <ul className="list-disc list-inside">
            {tarif.malzemeler.map((malzeme, index) => (
              <li key={index}>{malzeme}</li>
            ))}
          </ul>
          
        </div>

      </div>
    </div>
  );
}

export default TarifKarti;