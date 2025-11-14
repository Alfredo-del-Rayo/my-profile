import { useState, useCallback } from "react";

export default function useTunningKeys(initialKeys: Record<string, boolean>): 
{keys: Record<string, boolean>, filterKeys: string[], toggleKey: (key: string) => (void)} {
  const [keys, setKeys] = useState<Record<string, boolean>>(initialKeys);
  const [filterKeys, setFilterKeys] = useState<string[]>(
    Object.keys(initialKeys).filter((key) => (initialKeys[key]))
    );

  const toggleKey = useCallback((key: string) => {
    setKeys((prev) => {
      const updated = {
      ...prev,
      [key]: !prev[key],
    }

    setFilterKeys((prevFilters) => {
      if (updated[key]) {
        return prevFilters.includes(key)
        ? prevFilters
        : [...prevFilters, key];
    } else {
      return prevFilters.filter((k) => k !== key);
    }
    });

    return updated;
  });
    
  }, []);

  return { keys, filterKeys, toggleKey};
}