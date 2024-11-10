import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface SettingsScreenProps {}

const SettingsScreen = ({}: SettingsScreenProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    // Add your styles here
  },
}));
