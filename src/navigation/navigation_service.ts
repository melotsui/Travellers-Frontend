import { NavigationContainerRef, CommonActions } from '@react-navigation/native';
import { RootStackParamList } from './screen_navigation_props';

let navigationRef: NavigationContainerRef<RootStackParamList> | null;

export function setNavigationRef(ref: NavigationContainerRef<RootStackParamList>| null) {
  navigationRef = ref;
}

export function navigate(name: string, params?: object) {
  navigationRef?.dispatch(CommonActions.navigate(name, params));
}