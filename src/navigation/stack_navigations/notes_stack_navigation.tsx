import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../../screens/notes/notes";
import NotesAccessScreen from "../../screens/notes/notes_access";
import { RootStackParamList } from "../screen_navigation_props";
import MediaScreen from "../../screens/media/media";
import TextAudioScreen from "../../screens/media/text_audio";

const NotesStack = createStackNavigator<RootStackParamList>();

export const NotesStackNavigation = () => {
  return (
    <NotesStack.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="Notes">
      <NotesStack.Screen name="Notes" component={NotesScreen} />
      <NotesStack.Screen name="Media" component={MediaScreen} />
      <NotesStack.Screen name="TextAudio" component={TextAudioScreen} />
      <NotesStack.Screen name="NotesAccess" component={NotesAccessScreen} />
    </NotesStack.Navigator>
  );
}