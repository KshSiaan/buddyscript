import { Minus, Plus, Trash2 } from "lucide-react";
import * as React from "react";

// ============================================================================

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
}

const IS_SERVER = typeof window === "undefined";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {},
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const {
    serializer: customSerializer,
    deserializer: customDeserializer,
    initializeWithValue = true,
  } = options;

  const serializer = React.useCallback(
    (value: T) => {
      return customSerializer ? customSerializer(value) : JSON.stringify(value);
    },
    [customSerializer],
  );

  const deserializer = React.useCallback(
    (value: string) => {
      if (customDeserializer) return customDeserializer(value);

      if (value === "undefined") {
        return undefined as T;
      }

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      try {
        return JSON.parse(value);
      } catch {
        return defaultValue;
      }
    },
    [customDeserializer, initialValue],
  );

  const readValue = React.useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (IS_SERVER) {
      return initialValueToUse;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch {
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (value) => {
      if (IS_SERVER) {
        return;
      }

      try {
        const newValue = value instanceof Function ? value(readValue()) : value;
        window.localStorage.setItem(key, serializer(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new StorageEvent("local-storage", { key }));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, readValue],
  );

  const removeValue = React.useCallback(() => {
    if (IS_SERVER) {
      return;
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    window.localStorage.removeItem(key);
    setStoredValue(defaultValue);
    window.dispatchEvent(new StorageEvent("local-storage", { key }));
  }, [key, initialValue]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    setStoredValue(readValue());
  }, [key]);

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && event.key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("local-storage" as any, handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("local-storage" as any, handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}

export type { UseLocalStorageOptions };

// ============================================================================
