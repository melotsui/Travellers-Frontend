import { ScheduleAccess } from "./schedule_access";

class ScheduleScheduleAccessModal {
    schedule: Schedule;
    schedule_accesses?: ScheduleAccess[];

    constructor(schedule: Schedule, schedule_accesses?: ScheduleAccess[]) {
        this.schedule = schedule;
        this.schedule_accesses = schedule_accesses;
    }
}

export { ScheduleScheduleAccessModal };