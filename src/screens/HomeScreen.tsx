import { Alert, Pressable, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { FAB, List } from "react-native-paper";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useEffect, useState } from "react";
import Spacer from "@/components/Spacer";

import * as Crypto from "expo-crypto";
import { useStorage } from "@/hooks/useStorage";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const { styles, theme } = useStyles(stylesheet);
  const [expanded, setExpanded] = useState(false);

  const [habits, setHabits] = useStorage("habits.list", []);
  const [currentHabit, setCurrentHabit] = useStorage("habits.current", null);
  console.log(habits);
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

  return (
    <View style={styles.container}>
      {habits && habits.length > 0 ? (
        <List.Accordion
          style={styles.habitSelector}
          title={currentHabit ? currentHabit?.name : "Select Habit"}
          expanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          {habits.map((habit) => (
            <List.Item
              key={habit?.id}
              title={habit?.name}
              onPress={() => {
                setCurrentHabit(habit);
                setExpanded(false);
              }}
              style={styles.habitSelector}
            />
          ))}
        </List.Accordion>
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
  habitSelector: {},
}));
