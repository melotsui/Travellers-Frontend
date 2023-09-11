import { Asset } from 'react-native-image-picker';
import apis from '../api/api_service';
import { navigate, navigateAndReset, navigateBack } from '../navigation/navigation_service';
import { getUserStart, getUserSuccess, getUserFailure, updateUserFailure, updateUserStart, updateUserSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailure, updateUserEmailFailure, updateUserEmailStart, updateUserEmailSuccess } from '../slices/user_slice';
import { AppThunk } from '../store/store';

export const fetchUser = (nav?: string): AppThunk => async (dispatch) => {
    try {
        dispatch(getUserStart());
        const response = await apis.auth.getMyProfile();
        dispatch(getUserSuccess(response));

        if(nav) navigate(nav);

    } catch (error) {
        dispatch(getUserFailure(error as string));
    }
};

export const updateUser = (
    username: string,
    name?: string,
    nationality?: string,
    gender?: string,
    age?: number,
    icon?: Asset
): AppThunk => async (dispatch) => {
    try {
        dispatch(updateUserStart());
        let response;
        response = await apis.user.updateProfile(username, name, nationality, gender, age);
        if (icon) {
            response = await apis.user.uploadUserIcon(icon);
        }
        dispatch(updateUserSuccess(response));

        navigateBack();

    } catch (error) {
        dispatch(updateUserFailure(error as string));
    }
};

export const updateUserEmail = (
    email: string,
    code: string,
): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(updateUserEmailStart());
        const { user } = getState();
        await apis.user.verifyEmail(user.user?.user_id!, code, email);
        dispatch(updateUserEmailSuccess(email));
        navigateAndReset('HomeBottomBarNavigation');
    } catch (error) {
        dispatch(updateUserEmailFailure(error as string));
    }
};

export const logout = (): AppThunk => async (dispatch) => {
    try {
        dispatch(logoutUserStart());
        await apis.auth.logout();
        dispatch(logoutUserSuccess());
        navigateAndReset('Login');
    } catch (error) {
        console.log(error);
        dispatch(logoutUserFailure(error as string));
    }
}