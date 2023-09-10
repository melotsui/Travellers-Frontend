import { Asset } from 'react-native-image-picker';
import apis from '../api/api_service';
import { navigate, navigateAndReset } from '../navigation/navigation_service';
import { getUserStart, getUserSuccess, getUserFailure, updateUserFailure, updateUserStart, updateUserSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailure } from '../slices/user_slice';
import { AppThunk } from '../store/store';

export const fetchUser = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getUserStart());
        const response = await apis.auth.getMyProfile();
        dispatch(getUserSuccess(response));

        navigate('HomeBottomBarNavigation');

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

        navigate('HomeBottomBarNavigation');

    } catch (error) {
        dispatch(updateUserFailure(error as string));
    }
};

export const logout = (): AppThunk => async (dispatch) => {
    try {
        dispatch(logoutUserStart());
        await apis.auth.logout();
        dispatch(logoutUserSuccess());
        navigateAndReset('Login');
    } catch (error) {
        dispatch(logoutUserFailure(error as string));
    }
}