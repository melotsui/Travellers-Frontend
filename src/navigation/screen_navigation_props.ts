import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

type ScreenNavigationProp<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

type RootProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type RootStackParamList = {
  //auth
  Login: undefined;
  Register: undefined;
  EmailVerification: undefined;
  ForgetPassword: undefined;
  ResetPassword: { user_id: string; passcode: string };
  HomeBottomBarNavigation: undefined;
  
  //account
  Account: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
  ContactUs: undefined;
  Share: undefined;

  //notes
  Notes: undefined;
  NotesMedia: undefined;
  NotesTextAudio: undefined;
  NotesAccess: undefined;

  //trip
  TripSearch: undefined;
  TripDetail: { trip_id: number };
  TripEdit: undefined;
  Schedule: { schedule_id: number };
  ScheduleEdit: undefined;

};

export type { RootProps, RootStackParamList};