import { View, Pressable, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import Typography from "@/components/Typography";
import { useEffect } from "react";

interface AccordionProps<T> {
  title: React.ReactNode;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onSelect?: (item: T) => void;
  style?: ViewStyle;
  contentHeight?: number;
}

const Accordion = <T extends any>({
  title,
  data,
  renderItem,
  onSelect,
  style,
  contentHeight = 300,
}: AccordionProps<T>): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  const isOpen = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(isOpen.value, [0, 1], [0, contentHeight]);

    return {
      height,
      opacity: isOpen.value,
    };
  });

  const toggleAccordion = () => {
    isOpen.value = withTiming(isOpen.value === 0 ? 1 : 0, {
      duration: 300,
    });
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={toggleAccordion} style={styles.header}>
        <Typography weight="bold" size={16}>
          {title}
        </Typography>
      </Pressable>

      <Animated.ScrollView style={[styles.content, animatedStyle]}>
        {data.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              onSelect?.(item);
              toggleAccordion();
            }}
          >
            {renderItem(item, index)}
          </Pressable>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Accordion;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
  },
  content: {
    overflow: "hidden",
    height: 20,
  },
}));
