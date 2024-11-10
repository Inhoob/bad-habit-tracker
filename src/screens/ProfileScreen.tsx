import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ProfileScreenProps {}

const ProfileScreen = ({}: ProfileScreenProps): JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    // Add your styles here
  },
}));
