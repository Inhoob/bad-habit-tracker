import { storage } from "./storageUtils";
import type { Habit, HabitList, HabitRecord } from "@/types/habit";
import * as Crypto from "expo-crypto";

// 날짜 포맷 유틸리티
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// 습관 목록 관리
export const getHabits = (): HabitList => {
  return storage.get("habits.list") || [];
};

export const addHabit = (name: string, color: string): Habit => {
  const habits = getHabits();
  const newHabit: Habit = {
    id: Crypto.randomUUID(),
    name,
    createdAt: Date.now(),
  };

  storage.set("habits.list", [...habits, newHabit]);
  return newHabit;
};

// 습관 기록 관리
export const getHabitRecords = (date: Date): HabitRecord[] => {
  const records = storage.get("habits.records") || {};
  const dateKey = formatDate(date);
  return records[dateKey] || [];
};

export const addHabitRecord = (habitId: string): void => {
  const records = storage.get("habits.records") || {};
  const today = new Date();
  const dateKey = formatDate(today);

  const newRecord: HabitRecord = {
    habitId,
    timestamp: Date.now(),
  };

  records[dateKey] = [...(records[dateKey] || []), newRecord];
  storage.set("habits.records", records);
};

// 통계 관련 유틸리티
export const getHabitCountForDate = (date: Date, habitId?: string): number => {
  const records = getHabitRecords(date);
  if (habitId) {
    return records.filter((record) => record.habitId === habitId).length;
  }
  return records.length;
};

export const getHabitTimeDistribution = (
  habitId: string,
  days: number = 7
): Record<number, number> => {
  const distribution: Record<number, number> = {};
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  while (startDate <= endDate) {
    const records = getHabitRecords(startDate);
    records
      .filter((record) => record.habitId === habitId)
      .forEach((record) => {
        const hour = new Date(record.timestamp).getHours();
        distribution[hour] = (distribution[hour] || 0) + 1;
      });
    startDate.setDate(startDate.getDate() + 1);
  }

  return distribution;
};
