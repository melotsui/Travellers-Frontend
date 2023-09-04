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
}

export default ScheduleApi;