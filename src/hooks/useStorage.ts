import { useState, useCallback, useEffect } from "react";
import { storage } from "@/utils/storageUtils";
import type { StorageKeyType, StorageValueType } from "@/types/storage";

export function useStorage<K extends StorageKeyType>(
  key: K,
  initialValue: StorageValueType<K>
) {
  // 초기 상태 설정
  const [storedValue, setStoredValue] = useState<StorageValueType<K>>(() => {
    try {
      const item = storage.get(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  // 값을 저장하는 함수
  const setValue = useCallback(
    (
      value:
        | StorageValueType<K>
        | ((val: StorageValueType<K>) => StorageValueType<K>)
    ) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, valueToStore);
      } catch (error) {
        console.warn(`Error setting storage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // 값을 삭제하는 함수
  const removeValue = useCallback(() => {
    try {
      storage.delete(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}
