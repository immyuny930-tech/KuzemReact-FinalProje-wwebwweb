import { createContext, useContext, type ReactNode } from "react";
import type { Tarif } from "../tipler/Tarif";
import useLocalStorage from "../kancalar/useLocalStorage";

interface TarifContextTipi {
    favoriler: Tarif[];
    favoriEkle: (tarif: Tarif) => void;
    favoriCikar: (id: number) =>void;
    favoriMi: (id: number) => boolean;
}

const TarifContext = createContext<TarifContextTipi | undefined>(undefined);

export function TarifProvider({ children }: { children: ReactNode }) {

    const [favoriler, setFavoriler] = useLocalStorage<Tarif[]>("favoriler", []);

    const favoriEkle = (tarif: Tarif) => {
        setFavoriler([...favoriler, tarif]);
    };

    const favoriCikar = (id: number) => {
        setFavoriler(favoriler.filter((t) => t.id !== id));
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