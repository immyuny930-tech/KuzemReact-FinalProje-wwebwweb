import { useEffect, useState } from "react";

function useLocalStorage<T>(anahtar: string, baslangicDegeri: T) {
    const [deger, setDeger] = useState<T>(() =>{
        const kayitli = localStorage.getItem(anahtar);

        return kayitli ? JSON.parse(kayitli) : baslangicDegeri;
    });

    useEffect(() => {
        localStorage.setItem(anahtar, JSON.stringify(deger));
    }, [anahtar, deger]);

    return [deger, setDeger] as const;
}

export default useLocalStorage;