import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import NotesScreen from "../../screens/notes/notes";
import NotesMediaScreen from "../../screens/notes/notes_media";
import NotesTextAudioScreen from "../../screens/notes/notes_text_audio";
import NotesAccessScreen from "../../screens/notes/notes_access";

type ScreenNavigationProp<
  T extends keyof NotesStackParamList
> = NavigationProp<NotesStackParamList, T>;

type ScreenRouteProp<T extends keyof NotesStackParamList> = RouteProp<
  NotesStackParamList,
  T
>;

type NotesProps<T extends keyof NotesStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type NotesStackParamList = {
  Notes: undefined;
  NotesMedia: undefined;
  NotesTextAudio: undefined;
  NotesAccess: undefined;
};

export type { NotesProps, NotesStackParamList };

const NotesStack = createStackNavigator<NotesStackParamList>();

export const NotesStackNavigation = () => {
  return (
    <NotesStack.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="Notes">
      <NotesStack.Screen name="Notes" component={NotesScreen} />
      <NotesStack.Screen name="NotesMedia" component={NotesMediaScreen} />
      <NotesStack.Screen name="NotesTextAudio" component={NotesTextAudioScreen} />
      <NotesStack.Screen name="NotesAccess" component={NotesAccessScreen} />
    </NotesStack.Navigator>
  );
}