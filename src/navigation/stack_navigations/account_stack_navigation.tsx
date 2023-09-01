import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import NotesScreen from "../../screens/notes/notes";
import NotesMediaScreen from "../../screens/notes/notes_media";
import NotesTextAudioScreen from "../../screens/notes/notes_text_audio";
import NotesAccessScreen from "../../screens/notes/notes_access";
import AccountScreen from "../../screens/account/account";

type ScreenNavigationProp<
  T extends keyof AccountStackParamList
> = NavigationProp<AccountStackParamList, T>;

type ScreenRouteProp<T extends keyof AccountStackParamList> = RouteProp<
  AccountStackParamList,
  T
>;

type AccountProps<T extends keyof AccountStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type AccountStackParamList = {
  Account: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
  ContactUs: undefined;
  Share: undefined;
};

export type { AccountProps, AccountStackParamList };

const AccountProps = createStackNavigator<AccountStackParamList>();

export const AccountStackavigation = () => {
  return (
    <AccountProps.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="Account">
      <AccountProps.Screen name="Account" component={AccountScreen} />
    </AccountProps.Navigator>
  );
}