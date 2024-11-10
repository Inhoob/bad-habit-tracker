import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface DetailScreenProps {}

const DetailScreen = ({}: DetailScreenProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: { flex: 1, borderWidth: 1 },
}));
