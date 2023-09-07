import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/account/account";
import ProfileScreen from "../../screens/account/profile";
import ChangePasswordScreen from "../../screens/account/change_password";
import SettingsScreen from "../../screens/account/settings";
import { RootStackParamList } from "../screen_navigation_props";
import TripDetailScreen from "../../screens/trip/trip_detail";
import TripEditScreen from "../../screens/trip/trip_edit";
import TripInviteScreen from "../../screens/trip/trip_invite";

const AddTripProps = createStackNavigator<RootStackParamList>();

export const AddTripStackavigation = () => {
  return (
    <AddTripProps.Navigator screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: 'white', opacity: 1},
      headerShown: false
    })} initialRouteName="TripEdit">
    <AddTripProps.Screen name="TripEdit" component={TripEditScreen} initialParams={{ trip_id: null}}/>
    <AddTripProps.Screen name="TripInvite" component={TripInviteScreen} />
    <AddTripProps.Screen name="TripDetail" component={TripDetailScreen} />
    </AddTripProps.Navigator>
  );
}