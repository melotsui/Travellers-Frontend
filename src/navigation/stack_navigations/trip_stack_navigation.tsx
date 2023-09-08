import { createStackNavigator } from "@react-navigation/stack";
import TripSearchScreen from "../../screens/trip/trip";
import TripDetailScreen from "../../screens/trip/trip_detail";
import TripEditScreen from "../../screens/trip/trip_edit";
import ScheduleEditScreen from "../../screens/schedule/schedule_edit";
import { RootStackParamList } from "../screen_navigation_props";
import ScheduleScreen from "../../screens/schedule/schedule";
import ScheduleMediaScreen from "../../screens/schedule/schedule_media";
import MediaScreen from "../../screens/media/media";
import TextAudioScreen from "../../screens/media/text_audio";
import TripInviteScreen from "../../screens/trip/trip_invite";
import ScheduleReminderScreen from "../../screens/schedule/schedule_reminders";

const HomeStack = createStackNavigator<RootStackParamList>();

export const TripStackNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1 },
      headerShown: false
    })} initialRouteName="TripSearch">
      <HomeStack.Screen name="TripSearch" component={TripSearchScreen} />
      <HomeStack.Screen name="TripInvite" component={TripInviteScreen} />
      <HomeStack.Screen name="TripDetail" component={TripDetailScreen} />
      <HomeStack.Screen name="TripEdit" component={TripEditScreen} />
      <HomeStack.Screen name="Schedule" component={ScheduleScreen} />
      <HomeStack.Screen name="ScheduleReminder" component={ScheduleReminderScreen} />
      <HomeStack.Screen name="ScheduleEdit" component={ScheduleEditScreen} />
      <HomeStack.Screen name="ScheduleMedia" component={ScheduleMediaScreen} />
      <HomeStack.Screen name="Media" component={MediaScreen} />
      <HomeStack.Screen name="TextAudio" component={TextAudioScreen} />
    </HomeStack.Navigator>
  );
}