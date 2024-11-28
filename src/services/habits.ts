import { Habit, HabitOccurrence } from "@/types/habit";
import { StorageKey, StorageKeyType } from "@/types/storage";
import { storage } from "@/utils/storageUtils";

class HabitManager {
  private static STORAGE_KEY: StorageKeyType = "habits.list";

  static getHabits(): Habit[] {
    return storage.get("habits.list") || [];
  }

  static createHabit(name: string): Habit {
    const habits = this.getHabits();
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now(),
      occurrences: [],
    };

    storage.set(this.STORAGE_KEY, [...habits, newHabit]);
    return newHabit;
  }

  // 습관 발생 기록 - 단순화됨
  static recordOccurrence(habitId: string): void {
    const habits = this.getHabits();
    const habitIndex = habits.findIndex((h) => h.id === habitId);
    console.debug(habits[habitIndex]);

    if (habitIndex === -1) return;
    return;

    habits[habitIndex].occurrences.push({
      timestamp: Date.now(),
    });

    storage.set(this.STORAGE_KEY, habits);
  }

  // 특정 기간 동안의 발생 횟수 분석
  static getOccurrenceStats(habitId: string, days: number = 7) {
    const habit = this.getHabits().find((h) => h.id === habitId);
    if (!habit) return null;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTime = startDate.getTime();

    const recentOccurrences = habit.occurrences.filter(
      (occ) => occ.timestamp >= startTime
    );

    return {
      total: recentOccurrences.length,
      dailyDistribution: this.getDailyDistribution(recentOccurrences, days),
      hourlyDistribution: this.getHourlyDistribution(recentOccurrences),
    };
  }

  private static getHourlyDistribution(
    occurrences: HabitOccurrence[]
  ): Record<number, number> {
    const distribution: Record<number, number> = {};

    occurrences.forEach((occ) => {
      const hour = new Date(occ.timestamp).getHours();
      distribution[hour] = (distribution[hour] || 0) + 1;
    });

    return distribution;
  }

  private static getDailyDistribution(
    occurrences: HabitOccurrence[],
    days: number
  ): number[] {
    const distribution = new Array(days).fill(0);
    const now = new Date();

    occurrences.forEach((occ) => {
      const daysDiff = Math.floor(
        (now.getTime() - occ.timestamp) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff < days) {
        distribution[daysDiff]++;
      }
    });

    return distribution.reverse();
  }
}

export default HabitManager;
