
import { useEffect, useRef, useState } from "react";

export function useSmartInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);
  const [active, setActive] = useState(!document.hidden);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [active, delay]);
}