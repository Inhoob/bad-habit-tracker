import { useStorage } from "@/hooks/useStorage";
import { Habit } from "@/types/habit";
import HabitManager from "@/services/habits";

export function useHabitManager() {
  const [habits, setHabits] = useStorage("habits.list", []);

  const recordOccurrence = (habitId: string) => {
    const updatedHabits = [...habits];
    const habitIndex = updatedHabits.findIndex((h) => h.id === habitId);

    if (habitIndex === -1) return;

    updatedHabits[habitIndex] = {
      ...updatedHabits[habitIndex],
      occurrences: [
        ...updatedHabits[habitIndex].occurrences,
        { timestamp: Date.now() },
      ],
    };

    setHabits(updatedHabits);
  };

  return {
    habits,
    setHabits,
    recordOccurrence,
  };
}
