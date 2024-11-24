import { Alert, Pressable, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { FAB, List } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useEffect, useState } from "react";
import Spacer from "@/components/Spacer";

import * as Crypto from "expo-crypto";
import { useStorage } from "@/hooks/useStorage";
import Accordion from "@/components/atom/Accordion";
import Typography from "@/components/Typography";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const { styles, theme } = useStyles(stylesheet);
  const [expanded, setExpanded] = useState(false);

  const [habits, setHabits] = useStorage("habits.list", []);
  const [currentHabit, setCurrentHabit] = useStorage("habits.current", null);

  useEffect(() => {
    if (!currentHabit && habits?.length > 0) {
      setCurrentHabit(habits[0]);
    }
  }, [habits]);

  const handlePressAdd = () => {
    Alert.prompt(
      "Enter your own habit",
      "Please enter the habit you want to break",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("canceled");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (habit) => handlePressAddHabit(habit ?? ""),
        },
      ]
    );
  };

  const handlePressAddHabit = (habit: string) => {
    const newHabit = {
      id: Crypto.randomUUID(),
      name: habit,
      createdAt: Date.now(),
    };
    setHabits([...(habits ?? []), newHabit]);
    if (habits?.length === 0) {
      setCurrentHabit(newHabit);
    }
  };

  console.debug("currentHabit", currentHabit);

  return (
    <View style={styles.container}>
      {habits && habits.length > 0 ? (
        <View style={styles.headerContainer}>
          <Accordion
            title={currentHabit?.name || "Select Habit"}
            style={{ minWidth: "33%", maxWidth: "66%" }}
          >
            {habits.map((habit) => (
              <Pressable key={habit.id} onPress={() => setCurrentHabit(habit)}>
                <Typography>{habit.name}</Typography>
              </Pressable>
            ))}
          </Accordion>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Spacer h={30} />
          <Button
            icon="plus"
            mode="contained"
            onPress={handlePressAdd}
            buttonColor={theme.colors.primary}
          >
            No habits Found. Add your habit!
          </Button>
        </View>
      )}

      <FAB icon="plus" onPress={handlePressAdd} style={styles.fab} />
    </View>
  );
};

export default HomeScreen;

const stylesheet = createStyleSheet((theme, rt) => ({
  container: {
    flex: 1,
    borderWidth: 1,
    paddingTop: rt.insets.top,
    backgroundColor: theme.colors.background,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  headerContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingRight: 20,
  },
  habitSelector: {
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  habitSelectorTitle: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  habitItem: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  habitItemSelected: {
    backgroundColor: theme.colors.primaryLight + "20", // 20은 투명도
  },
  habitItemTitle: {
    fontSize: 14,
    color: theme.colors.text,
  },
}));
