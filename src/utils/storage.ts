import { MMKV } from "react-native-mmkv";
import { StorageKey, StorageKeyType, StorageValueType } from "@/types/storage";

class Storage {
  private storage: MMKV;

  constructor() {
    this.storage = new MMKV({
      id: "app-storage",
      encryptionKey: "your-encryption-key",
    });
  }

  get<K extends StorageKeyType>(key: K): StorageValueType<K> | null {
    const value = this.storage.getString(key);
    if (value === undefined) return null;

    try {
      // 문자열로 저장된 JSON 데이터 처리
      if (
        key.includes("habits.") ||
        key.includes("stats.") ||
        value.startsWith("{") ||
        value.startsWith("[")
      ) {
        return JSON.parse(value);
      }

      // boolean 값 처리
      if (value === "true") return true as StorageValueType<K>;
      if (value === "false") return false as StorageValueType<K>;

      // number 값 처리
      if (!isNaN(Number(value))) return Number(value) as StorageValueType<K>;

      return value as StorageValueType<K>;
    } catch {
      return value as StorageValueType<K>;
    }
  }

  set<K extends StorageKeyType>(key: K, value: StorageValueType<K>): void {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    this.storage.set(key, stringValue);
  }

  delete(key: StorageKeyType): void {
    this.storage.delete(key);
  }

  clearAll(): void {
    this.storage.clearAll();
  }

  getAllKeys(): StorageKeyType[] {
    return this.storage.getAllKeys() as StorageKeyType[];
  }
}

export const storage = new Storage();
