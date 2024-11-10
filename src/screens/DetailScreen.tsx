import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/AppNavigator";

interface DetailScreenProps {
  route: RouteProp<RootStackParamList, "Detail">;
}

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
