import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import AccountScreen from "../../screens/account/account";
import ProfileScreen from "../../screens/account/profile";
import ChangePasswordScreen from "../../screens/account/change_password";
import SettingsScreen from "../../screens/account/settings";

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
  Profile: undefined;
  ChangePassword: undefined;
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
      <AccountProps.Screen name="Profile" component={ProfileScreen} />
      <AccountProps.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <AccountProps.Screen name="Settings" component={SettingsScreen} />
    </AccountProps.Navigator>
  );
}