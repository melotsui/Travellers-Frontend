import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { MediaMediaLocalUrl } from "../models/media_media_local_url";
import { Media } from "../models/media";

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
  Login: { share_id: string };
  Register: undefined;
  EmailVerification: undefined;
  ForgetPassword: undefined;
  ResetPassword: { user_id: string; passcode: string };
  HomeBottomBarNavigation: undefined;

  //account
  Account: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  PersonalInformation: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
  ContactUs: undefined;
  Share: undefined;

  //notes
  Notes: undefined;
  NotesAccess: undefined;

  //media
  Media: { schedule_id: number | null; note_id: number | null; media: MediaMediaLocalUrl | null };
  TextAudio: { schedule_id: number | null; note_id: number | null; media_id: number | null };

  //trip
  TripSearch: undefined;
  TripDetail: { trip_id: number };
  TripAdd: undefined;
  TripInvite: { trip_id: number };
  TripEdit: { trip_id: number | null };

  //Schedule
  Schedule: { schedule_id: number };
  ScheduleEdit: { schedule_id: number | null; trip_id: number };
  ScheduleAccess: { schedule_id: number };
  ScheduleMedia: { schedule_id: number };
  ScheduleReminder: { schedule_id: number, schedule_datetime: Date };

  //notification
  Notification: undefined;

  //stack
  TripStack: undefined;
  NotesStack: undefined;
  AddTripStack: undefined;
  AccountStack: undefined;
};

export type { RootProps, RootStackParamList };