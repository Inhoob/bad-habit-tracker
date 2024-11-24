import { View, Pressable, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import Typography from "@/components/Typography";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  expanded?: boolean;
  onSelect?: () => void;
  style?: ViewStyle;
}

const Accordion = ({ title, children, style }: AccordionProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  const isOpen = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(isOpen.value, [0, 1], [0, 300]);

    return {
      height,
      opacity: isOpen.value,
    };
  });

  const toggleAccordion = () => {
    console.debug("toggle!!", isOpen.value);
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
        {children}
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
