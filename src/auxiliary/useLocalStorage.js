import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // pega do localStorage ou usa valor inicial
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao ler localStorage", error);
      return initialValue;
    }
  });

  // função para salvar no localStorage + estado
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Erro ao salvar localStorage", error);
    }
  };

  // escuta mudanças de storage (ex: outra aba ou logout global)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
