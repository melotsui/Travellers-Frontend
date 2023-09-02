import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import TripSearchScreen from "../../screens/trip/trip";
import TripDetailScreen from "../../screens/trip/trip_detail";
import CustomHeader from "../../components/molecules/header";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import g_THEME from "../../theme/theme";
import ScheduleScreen from "../../screens/trip/schedule";
import TripEditScreen from "../../screens/trip/trip_edit";
import ScheduleEditScreen from "../../screens/trip/schedule_edit";
import NotesScreen from "../../screens/notes/notes";
import NotesAccessScreen from "../../screens/notes/notes_access";
import NotesMediaScreen from "../../screens/notes/notes_media";
import NotesTextAudioScreen from "../../screens/notes/notes_text_audio";

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

  Notes: undefined;
  NotesMedia: undefined;
  NotesTextAudio: undefined;
  NotesAccess: undefined;
};

export type { HomeProps, HomeStackParamList };

const HomeStack = createStackNavigator<HomeStackParamList>();

export const TripStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1 },
      headerShown: false
    })} initialRouteName="TripSearch">
      <HomeStack.Screen name="TripSearch" component={TripSearchScreen} />
      <HomeStack.Screen name="TripDetail" component={TripDetailScreen} />
      <HomeStack.Screen name="TripEdit" component={TripEditScreen} />
      <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
      <HomeStack.Screen name="ScheduleEdit" component={ScheduleEditScreen} />

      <HomeStack.Screen name="Notes" component={NotesScreen} />
      <HomeStack.Screen name="NotesMedia" component={NotesMediaScreen} />
      <HomeStack.Screen name="NotesTextAudio" component={NotesTextAudioScreen} />
      <HomeStack.Screen name="NotesAccess" component={NotesAccessScreen} />
    </HomeStack.Navigator>
  );
}