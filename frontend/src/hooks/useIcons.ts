import {fetchIconMap} from "@/services/iconService.ts"
import {useState, useEffect} from "react";
export default function UseIcons(){
    const [iconMap, setIconMap] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetchIconMap().then(setIconMap).catch(err => setError(err));
    }, []);

    return {iconMap, error}

}