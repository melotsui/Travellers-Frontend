import apis from '../api/api_service';
import { navigate, navigateBack, navigateBackTwoPages } from '../navigation/navigation_service';
import { getSchedulesStart, getSchedulesSuccess, getSchedulesFailure, addSchedulesFailure, addSchedulesStart, addSchedulesSuccess, getScheduleAccessesStart, getScheduleAccessesFailure, getScheduleAccessesSuccess, getScheduleStart, getScheduleFailure, getScheduleSuccess, deleteScheduleFailure, deleteScheduleStart, deleteScheduleSuccess, updateScheduleFailure, updateScheduleStart, updateScheduleSuccess, updateScheduleAccessesFailure, updateScheduleAccessesStart, updateScheduleAccessesSuccess, getScheduleTypesFailure, getScheduleTypesStart, getScheduleTypesSuccess } from '../slices/schedule_slice';
import { AppThunk } from '../store/store';

export const fetchSchedules = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getSchedulesStart());
        const response = await apis.schedule.getScheduleListById(trip_id);
        dispatch(getSchedulesSuccess(response));

    } catch (error) {
        dispatch(getSchedulesFailure(error as string));
    }
};

export const addSchedules = (
    trip_id: number,
    schedule_name: string,
    schedule_type_id?: number,
    schedule_datetime?: Date,
    schedule_place?: string,
    schedule_remark?: string
): AppThunk => async (dispatch) => {
    try {
        dispatch(addSchedulesStart());
        const response = await apis.schedule.createSchedule(trip_id, schedule_name, schedule_type_id, schedule_datetime, schedule_place, schedule_remark);
        dispatch(addSchedulesSuccess(response));
        dispatch(setSchedulesAccesses(response?.schedule_id!, null, true, false));

    } catch (error) {
        dispatch(addSchedulesFailure(error as string));
    }
};


export const fetchSchedule = (schedule_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getScheduleStart());
        const response = await apis.schedule.getScheduleById(schedule_id);
        dispatch(getScheduleSuccess(response));

    } catch (error) {
        dispatch(getScheduleFailure(error as string));
    }
};

export const deleteSchedule = (schedule_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(deleteScheduleStart());
        const response = await apis.schedule.deleteSchedule(schedule_id);
        dispatch(deleteScheduleSuccess(response));
        navigateBack();

    } catch (error) {
        dispatch(deleteScheduleFailure(error as string));
    }
};


export const fetchScheduleAccesses = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getScheduleAccessesStart());
        const response = await apis.schedule.getScheduleAccess(trip_id);
        dispatch(getScheduleAccessesSuccess(response.users));
    } catch (error) {
        dispatch(getScheduleAccessesFailure(error as string));
    }
};

export const setSchedulesAccesses = (
    schedule_id: number,
    schedule_accesses: number[] | null,
    isNew?: boolean,
    isEdit?: boolean
): AppThunk => async (dispatch) => {
    try {
        dispatch(updateScheduleAccessesStart());
        const response = await apis.schedule.setScheduleAccess(schedule_id, schedule_accesses);
        dispatch(updateScheduleAccessesSuccess(response));
        if (isNew) {
            navigate('ScheduleAccess', { schedule_id: schedule_id });
        } else if (isEdit) {
            navigateBack();
        } else {
            navigateBackTwoPages();
        }

    } catch (error) {
        dispatch(updateScheduleAccessesFailure(error as string));
    }
};

export const fetchScheduleTypes = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getScheduleTypesStart());
        const response = await apis.schedule.getScheduleTypeList();
        dispatch(getScheduleTypesSuccess(response));
    } catch (error) {
        dispatch(getScheduleTypesFailure(error as string));
    }
};


export const updateSchedule = (
    schedule_id: number,
    schedule_name: string,
    schedule_type_id?: number,
    schedule_datetime?: Date,
    schedule_place?: string,
    schedule_remark?: string
): AppThunk => async (dispatch) => {
    try {
        dispatch(updateScheduleStart());
        const response = await apis.schedule.updateSchedule(schedule_id, schedule_name, schedule_type_id, schedule_datetime, schedule_place, schedule_remark);
        console.log(response);
        dispatch(updateScheduleSuccess(response));
        navigateBack();

    } catch (error) {
        dispatch(updateScheduleFailure(error as string));
    }
};