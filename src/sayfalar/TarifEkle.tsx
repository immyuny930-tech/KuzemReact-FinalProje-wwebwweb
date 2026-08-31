import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../kancalar/useLocalStorage";
import type { Tarif } from "../tipler/Tarif";

function TarifEkle() {
  const [kullaniciTarifleri, setKullaniciTarifleri] = useLocalStorage<Tarif[]>(
    "kullaniciTarifleri",
    []
  );
  const navigate = useNavigate();

  const [yemekAdi, setYemekAdi] = useState("");
  const [pisirmeSuresi, setPisirmeSuresi] = useState("");
  const [zorluk, setZorluk] = useState<"Kolay" | "Orta" | "Zor">("Kolay");
  const [vejetaryan, setVejetaryan] = useState(false);
  const [malzemeler, setMalzemeler] = useState("");
  const [hata, setHata] = useState("");

  const gonder = (e: React.FormEvent) => {
    e.preventDefault(); // formun sayfa yenilenmesini engeller

    if (yemekAdi.trim() === "") {
      setHata("Yemek adı boş olamaz.");
      return;
    }
    if (Number(pisirmeSuresi) <= 0 || isNaN(Number(pisirmeSuresi))) {
      setHata("Pişirme süresi geçerli bir sayı olmalı.");
      return;
    }
    const malzemeListesi = malzemeler.split(",").map((m) => m.trim()).filter((m) => m !== "");
    if (malzemeListesi.length === 0) {
      setHata("En az bir malzeme girmelisin.");
      return;
    }

    setHata("");

    const yeniTarif: Tarif = {
      id: Date.now(),
      yemekAdi: yemekAdi.trim(),
      pisirmeSuresi: Number(pisirmeSuresi),
      zorluk,
      vejetaryan,
      malzemeler: malzemeListesi,
    };

    setKullaniciTarifleri([...kullaniciTarifleri, yeniTarif]);
    navigate("/tarifler");
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Yeni Tarif Ekle</h1>

      {hata && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{hata}</p>}

      <form onSubmit={gonder} className="space-y-4">
        <input
          value={yemekAdi}
          onChange={(e) => setYemekAdi(e.target.value)}
          placeholder="Yemek Adı"
          className="border rounded px-3 py-2 w-full"
        />

        <input
          value={pisirmeSuresi}
          onChange={(e) => setPisirmeSuresi(e.target.value)}
          placeholder="Pişirme Süresi (dakika)"
          className="border rounded px-3 py-2 w-full"
        />

        <select
          value={zorluk}
          onChange={(e) => setZorluk(e.target.value as "Kolay" | "Orta" | "Zor")}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="Kolay">Kolay</option>
          <option value="Orta">Orta</option>
          <option value="Zor">Zor</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={vejetaryan} onChange={(e) => setVejetaryan(e.target.checked)} />
          Vejetaryan
        </label>

        <input
          value={malzemeler}
          onChange={(e) => setMalzemeler(e.target.value)}
          placeholder="Malzemeler (virgülle ayır): Un, Su, Tuz"
          className="border rounded px-3 py-2 w-full"
        />

        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">
          Tarifi Ekle
        </button>
        
      </form>
    </div>
  );
}

export default TarifEkle;