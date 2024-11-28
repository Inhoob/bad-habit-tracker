import { Habit } from "./habit";

export type StorageKey = {
  // 사용자 관련
  "user.theme": "light" | "dark";
  "user.language": "ko" | "en";
  "user.isFirstVisit": boolean;

  // 설정 관련
  "settings.notifications": boolean;
  "settings.soundEnabled": boolean;

  // 습관 관련
  "habits.list": Habit[];
  "habits.lastUpdated": number;
  "habits.current": Habit | null;

  // 통계 관련
  "stats.weeklyProgress": string; // JSON stringified object
  "stats.monthlyProgress": string; // JSON stringified object
};

// Storage 키의 유니온 타입
export type StorageKeyType = keyof StorageKey;

// Storage 값의 타입 수정
export type StorageValueType<K extends StorageKeyType> = StorageKey[K];
