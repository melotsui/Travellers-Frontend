import apis from '../api/api_service';
import { navigateBack } from '../navigation/navigation_service';
import { getSchedulesStart, getSchedulesSuccess, getSchedulesFailure, addSchedulesFailure, addSchedulesStart, addSchedulesSuccess, addScheduleAccessesStart, addScheduleAccessesSuccess, addScheduleAccessesFailure, getScheduleAccessesStart, getScheduleAccessesFailure, getScheduleAccessesSuccess, getScheduleStart, getScheduleFailure, getScheduleSuccess, deleteScheduleFailure, deleteScheduleStart, deleteScheduleSuccess, updateScheduleFailure, updateScheduleStart, updateScheduleSuccess } from '../slices/schedule_slice';
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
        dispatch(addSchedulesAccesses(response?.schedule_id!, null));

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
        dispatch(getScheduleAccessesSuccess(response));
    } catch (error) {
        dispatch(getScheduleAccessesFailure(error as string));
    }
};

export const addSchedulesAccesses = (
    schedule_id: number,
    schedule_accesses: number[] | null
): AppThunk => async (dispatch) => {
    try {
        console.log("response");
        dispatch(addScheduleAccessesStart());
        const response = await apis.schedule.setScheduleAccess(schedule_id, schedule_accesses);
        dispatch(addScheduleAccessesSuccess(response));
        navigateBack();

    } catch (error) {
        dispatch(addScheduleAccessesFailure(error as string));
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