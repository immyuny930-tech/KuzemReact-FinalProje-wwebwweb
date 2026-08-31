import { useEffect, useState } from "react";

// usestate gibi calisir ama degeri tarayicinin localstorageina da kaydeder
function useLocalStorage<T>(anahtar: string, baslangicDegeri: T) {
    const [deger, setDeger] = useState<T>(() =>{
        // ilk acilista localStorageda kayitili ver var mi diye bak
        const kayitli = localStorage.getItem(anahtar);

        return kayitli ? JSON.parse(kayitli) : baslangicDegeri;
    });

    // deger her degistiginde localStoragea otomatik kaydet
    useEffect(() => {
        localStorage.setItem(anahtar, JSON.stringify(deger));
    }, [anahtar, deger]);

    return [deger, setDeger] as const;
}

export default useLocalStorage;