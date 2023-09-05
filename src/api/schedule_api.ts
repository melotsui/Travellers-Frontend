import APIs from './api';

class ScheduleApi {
    private schedule: APIs;

    constructor(schedule: APIs) {
        this.schedule = schedule;
    }

    getScheduleListById = async (trip_id: number): Promise<Schedule[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedules/listSchedule/' + trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedules);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }    
    
    getScheduleById = async (schedule_id: number): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedules/' + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getScheduleAccess = async (schedule_id: number): Promise<ScheduleAccess[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedule_accesses/1')// + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_accesses);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateSchedule = async (
        schedule_id: number,
        schedule_name: string, 
        schedule_type_id?: number,
        schedule_datetime_from?: Date,
        schedule_datetime_to?: Date,
        schedule_place?: string,
        schedule_remark?: string
        ): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "schedule_name": schedule_name,
                    "schedule_type_id": schedule_type_id,
                    "schedule_datetime_from": schedule_datetime_from,
                    "schedule_datetime_to": schedule_datetime_to,
                    "schedule_place": schedule_place,
                    "schedule_remark": schedule_remark,
                }

                await this.schedule.api.put('/schedules/1', json)// + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_accesses);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getScheduleTypeList = async (): Promise<ScheduleType[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedule_types')
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_types);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default ScheduleApi;