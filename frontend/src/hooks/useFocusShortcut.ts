import {useRef, useEffect} from "react";

export default function useFocusShortcut(key: string): {ref: React.RefObject<HTMLInputElement | null>}{
    const ref = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
    const handler = (e: KeyboardEvent) => {
        if (( (e.ctrlKey || e.metaKey)) && e.key.toLowerCase() === key) {
        e.preventDefault();
        ref.current?.focus();
        }
    };

    globalThis.window.addEventListener("keydown", handler);
    return () => globalThis.window.removeEventListener("keydown", handler);
    }, [key]);

    return {ref}
} 