import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";




export default function useRouteChange() {
    const [sessionStatus, setSessionStatus] = useState<"unknown" | "authenticated" | "unauthenticated">("unknown");
    const [expiration, setExpiration] = useState<Date | null>(null);
    const location = useLocation();
    useEffect(() => {
        const fetchSession = async () => {
            try{
                const res = await fetch("/api/session");
                const json = await res.json();

                if (res.ok && json.authenticated) {
                    setSessionStatus("authenticated");
                    setExpiration(json.expiresAt ? new Date(json.expiresAt) : null);
                } else if (res.ok && ! json.authenticated) {
                    setSessionStatus("unauthenticated");
                    setExpiration(null);
                } else {
                    setSessionStatus("unknown");
                    setExpiration(null);
                }
            
            } catch (_error) {
                setSessionStatus("unauthenticated");
                setExpiration(null);
            }
        };
        fetchSession();
    }, [location]);

    return { sessionStatus, expiration };

}