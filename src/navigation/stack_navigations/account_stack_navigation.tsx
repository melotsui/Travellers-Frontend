import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/account/account";
import ProfileScreen from "../../screens/account/profile";
import ChangePasswordScreen from "../../screens/account/change_password";
import SettingsScreen from "../../screens/account/settings";
import { RootStackParamList } from "../screen_navigation_props";
import PersonalInformationScreen from "../../screens/account/personal_information";

const AccountProps = createStackNavigator<RootStackParamList>();

export const AccountStackavigation = () => {
  return (
    <AccountProps.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="Account">
      <AccountProps.Screen name="Account" component={AccountScreen} />
      <AccountProps.Screen name="Profile" component={ProfileScreen} />
      <AccountProps.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <AccountProps.Screen name="PersonalInformation" component={PersonalInformationScreen} />
      <AccountProps.Screen name="Settings" component={SettingsScreen} />
    </AccountProps.Navigator>
  );
}