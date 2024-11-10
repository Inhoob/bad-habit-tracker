import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    // Add your styles here
  },
}));
