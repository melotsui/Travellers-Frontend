import { ScheduleAccess } from '../models/schedule_access';
import ScheduleReminder from '../models/schedule_reminder';
import { User } from '../models/user';
import { formatDatetime } from '../utils/datetime_formatter';
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

    deleteSchedule = async (schedule_id: number): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.schedule.api.delete('/schedules/' + schedule_id)
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

    getScheduleAccess = async (schedule_id: number): Promise<User[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedule_accesses/' + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        console.log('getScheduleAccess ', result.data);
                        resolve(result.data.users);
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

    setScheduleAccess = async (schedule_id: number, schedule_accesses: number[] | null): Promise<ScheduleAccess[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                let scheduleAccess = [];
                if (schedule_accesses != null) {
                    scheduleAccess = schedule_accesses.map((schedule_access) => {
                        return { "user_id": schedule_access }
                    })
                } else {
                    scheduleAccess = [{ "user_id": null }];
                }

                const json = {
                    "schedule_id": schedule_id,
                    "schedule_accesses": scheduleAccess
                }

                await this.schedule.api.post('/schedule_accesses', json)
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

    createSchedule = async (
        trip_id: number,
        schedule_name: string,
        schedule_type_id?: number,
        schedule_datetime?: Date,
        schedule_place?: string,
        schedule_remark?: string
    ): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "schedule": {
                        "trip_id": trip_id,
                        "schedule_name": schedule_name,
                        "schedule_type_id": schedule_type_id,
                        "schedule_datetime": schedule_datetime!.toISOString(),
                        "schedule_place": schedule_place,
                        "schedule_remark": schedule_remark,
                    }
                }

                await this.schedule.api.post('/schedules', json)
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

    updateSchedule = async (
        schedule_id: number,
        schedule_name: string,
        schedule_type_id?: number,
        schedule_datetime?: Date,
        schedule_place?: string,
        schedule_remark?: string
    ): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "schedule_name": schedule_name,
                    "schedule_type_id": schedule_type_id,
                    "schedule_datetime": schedule_datetime!.toISOString(),
                    "schedule_place": schedule_place,
                    "schedule_remark": schedule_remark,
                }

                await this.schedule.api.put('/schedules/' + schedule_id, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule);
                    })
                    .catch((error) => {
                        console.log('updateSchedule ', error);
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                console.log('updateSchedule ', error);
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

    getScheduleReminders = async (schedule_id: number): Promise<ScheduleReminder> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.get('/schedule_reminders/' + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_reminders[0]);
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

    addScheduleReminders = async (schedule_id: number, schedule_datetime: string): Promise<ScheduleReminder> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "schedule_id": schedule_id,
                    "schedule_reminder_datetime": schedule_datetime,
                }

                await this.schedule.api.post('/schedule_reminders', json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_reminder);
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

    updateScheduleReminders = async (schedule_reminder_id: number, schedule_datetime: string): Promise<ScheduleReminder> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "schedule_reminder_datetime": schedule_datetime,
                };

                await this.schedule.api.put('/schedule_reminders/' + schedule_reminder_id, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_reminder);
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

    deleteScheduleReminders = async (schedule_reminder_id: number): Promise<ScheduleReminder> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.schedule.api.delete('/schedule_reminders/' + schedule_reminder_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.schedule_reminders);
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