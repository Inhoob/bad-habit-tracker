import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  MainTab: undefined;
  Detail: { id: string };
  Profile: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type AllNavigatorParams = BottomTabParamList & RootStackParamList;

export type useNavigationProp = NativeStackNavigationProp<AllNavigatorParams>;

export type useRouteProp<T extends keyof AllNavigatorParams> = RouteProp<
  AllNavigatorParams,
  T
>;
