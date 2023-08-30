import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import TripSearchScreen from "../../screens/trip/trip";

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
  };

export type {HomeProps, HomeStackParamList};

const HomeStack = createStackNavigator<HomeStackParamList>();

export const TripStackNavigation = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TripSearch">
            <HomeStack.Screen name="TripSearch" component={TripSearchScreen} />
        </HomeStack.Navigator>
    );
}