export interface HabitOccurrence {
  timestamp: number;
}

export interface Habit {
  id: string;
  name: string;
  createdAt: number;
  occurrences: HabitOccurrence[];
  isArchived?: boolean;
}
