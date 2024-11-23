// 습관 정의 타입
export interface Habit {
  id: string;
  name: string;
  createdAt: number;
}

// 습관 목록 타입
export type HabitList = Habit[];

// 습관 기록 타입
export interface HabitRecord {
  habitId: string;
  timestamp: number; // Unix timestamp
}

// 날짜별 습관 기록을 저장하는 타입
export type HabitRecords = {
  [habitId: string]: HabitRecord[];
};
