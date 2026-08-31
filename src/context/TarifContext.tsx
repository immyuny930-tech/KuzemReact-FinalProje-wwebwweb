import { createContext, useContext, type ReactNode } from "react";
import type { Tarif } from "../tipler/Tarif";
import useLocalStorage from "../kancalar/useLocalStorage";

// favorileri tum uygulamada paylasmak icin global state (context)
interface TarifContextTipi {
    favoriler: Tarif[];
    favoriEkle: (tarif: Tarif) => void;
    favoriCikar: (id: number) =>void;
    favoriMi: (id: number) => boolean;
}

const TarifContext = createContext<TarifContextTipi | undefined>(undefined);

// uygulamayi bu component ile sarmalayinca icindeki her sayfa favorilere erisebilir
export function TarifProvider({ children }: { children: ReactNode }) {
    // favoriler hem global hem de kalici (localstorage uzerinden)
    const [favoriler, setFavoriler] = useLocalStorage<Tarif[]>("favoriler", []);

    const favoriEkle = (tarif: Tarif) => {
        setFavoriler([...favoriler, tarif]);
    };

    const favoriCikar = (id: number) => {
        setFavoriler(favoriler.filter((t) => t.id !== id)); // idsi eslesmeyenleri tut
    };

    const favoriMi = (id: number) => {
        return favoriler.some((t) => t.id === id);
    };

    return (
        <TarifContext.Provider value={{ favoriler, favoriEkle, favoriCikar, favoriMi }}>
            {children}
        </TarifContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export function useTarifContext() {
    const context = useContext(TarifContext);
    if (!context) {
        throw new Error("useTarifContext, TarifProvider icinde kullanilmali");
    }
    return context;
}