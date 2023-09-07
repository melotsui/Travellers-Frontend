import apis from '../api/api_service';
import { navigate } from '../navigation/navigation_service';
import { getUsersStart, getUsersSuccess, getUsersFailure } from '../slices/user_slice';
import { AppThunk } from '../store/store';

export const fetchUsers = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getUsersStart());

        const response = await apis.auth.getMyProfile();
        dispatch(getUsersSuccess([response]));

        navigate('HomeBottomBarNavigation');

    } catch (error) {
        dispatch(getUsersFailure(error as string));
    }
};