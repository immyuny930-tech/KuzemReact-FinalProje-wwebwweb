export interface Tarif {
  id: number;
  yemekAdi: string;
  pisirmeSuresi: number; 
  zorluk: "Kolay" | "Orta" | "Zor";
  vejetaryan: boolean;
  malzemeler: string[];
  resim?: string
}

// 