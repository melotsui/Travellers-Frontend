import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import TripSearchScreen from "../../screens/trip/trip";
import TripDetailScreen from "../../screens/trip/trip_detail";
import CustomHeader from "../../components/molecules/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import g_THEME from "../../theme/theme";
import ScheduleScreen from "../../screens/trip/schedule";
import TripEditScreen from "../../screens/trip/trip_edit";

type ScreenNavigationProp<
  T extends keyof HomeStackParamList
> = NavigationProp<HomeStackParamList, T>;

type ScreenRouteProp<T extends keyof HomeStackParamList> = RouteProp<
  HomeStackParamList,
  T
>;

type HomeProps<T extends keyof HomeStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type HomeStackParamList = {
  TripSearch: undefined;
  TripDetail: undefined;
  TripEdit: undefined;
  Schedule: undefined;
  ScheduleEdit: undefined;
};

export type { HomeProps, HomeStackParamList };

const HomeStack = createStackNavigator<HomeStackParamList>();

export const TripStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="TripSearch">
      <HomeStack.Screen name="TripSearch" component={TripSearchScreen} />
      <HomeStack.Screen name="TripDetail" component={TripDetailScreen} />
      <HomeStack.Screen name="TripEdit" component={TripEditScreen} />
      <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
    </HomeStack.Navigator>
  );
}