import { commonColors } from "@/styles/theme";
import { ComponentProps, ReactNode } from "react";
import { Platform, Text, TextStyle, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type TypographyProps = {
  children?: ReactNode | string;
  color?: (typeof commonColors)[keyof typeof commonColors];
  size?: number;
  lineHeight?: number;
  weight?: TextStyle["fontWeight"]; //400: regular, 500: medium, 600: semi-bold bold:bold
} & Partial<ComponentProps<typeof Text>>;

const Typography = ({
  children,
  style,
  weight,
  size,
  color,
  lineHeight,
  ...props
}: TypographyProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return (
    <Text
      style={[styles.text({ weight, size, color, lineHeight }), style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;

const stylesheet = createStyleSheet((theme) => ({
  text: ({
    weight = "400",
    size = 16,
    color = theme.colors.text,
    lineHeight,
  }) => ({
    color: color,
    fontSize: size,
    fontWeight: weight,
    fontFamily: Platform.OS === "ios" ? "Apple SD Gothic Neo" : "sans-serif",
    lineHeight: lineHeight ? lineHeight : size * 1.5,
  }),
}));
