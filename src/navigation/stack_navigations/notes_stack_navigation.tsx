import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "../../screens/notes/notes";
import NotesMediaScreen from "../../screens/notes/notes_media";
import NotesTextAudioScreen from "../../screens/notes/notes_text_audio";
import NotesAccessScreen from "../../screens/notes/notes_access";
import { RootStackParamList } from "../screen_navigation_props";

const NotesStack = createStackNavigator<RootStackParamList>();

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