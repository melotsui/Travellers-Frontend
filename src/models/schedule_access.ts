
class ScheduleAccess {
    schedule_access_id: number;
    schedule_id: number;
    user_id?: number;
    created_at?: string;
    updated_at?: string;

    constructor(
        schedule_access_id: number,
        schedule_id: number,
        user_id?: number,
        created_at?: string,
        updated_at?: string,
    ) {
        this.schedule_access_id = schedule_access_id;
        this.schedule_id = schedule_id;
        this.user_id = user_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export { ScheduleAccess };