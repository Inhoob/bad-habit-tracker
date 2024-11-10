import { storage } from "@/utils/storage";
import { Button, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface HomeScreenProps {}

const HomeScreen = ({}: HomeScreenProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  const handlePressButton = () => {
    console.debug("button pressed");
    storage.set("user.isFirstVisit", false);
    console.debug(storage.get("user.isFirstVisit"));
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button onPress={handlePressButton} title="button" />
    </View>
  );
};

export default HomeScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    // Add your styles here
  },
}));
