import { useState, useEffect, useCallback } from 'react';

function useFetch<T>(url: string) {
    const [veri, setVeri] = useState<T | null>(null);
    const [yukleniyor, setYukleniyor] = useState(true);
    const [hata, setHata] = useState<string | null>(null);

    const veriGetir = useCallback(() => {
        setYukleniyor(true);
        setHata(null);

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Sunucudan veri alinamadi");
                return res.json();
            })

            .then((json) => setVeri(json))
            .catch(() => setHata("Tarifler yuklenemedi. Lutfen tekrar deneyin."))
            .finally(() => setYukleniyor(false));
    }, [url]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        veriGetir();
    }, [veriGetir]);

    return { veri, yukleniyor, hata, tekrarDene: veriGetir };

 }

 export default useFetch;