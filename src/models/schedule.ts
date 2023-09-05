class Schedule {
  schedule_id: number;
  trip_id: number;
  schedule_name: string;
  schedule_type_id: number;
  schedule_datetime?: Date;
  schedule_place?: string;
  schedule_remark?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  schedule_type?: ScheduleType;

  constructor(
    schedule_id: number,
    trip_id: number,
    schedule_name: string,
    schedule_type_id: number,
    created_at?: string,
    schedule_datetime?: Date,
    schedule_place?: string,
    schedule_remark?: string,
    updated_at?: string,
    deleted_at?: string,
    schedule_type?: ScheduleType,
  ) {
    this.schedule_id = schedule_id;
    this.trip_id = trip_id;
    this.schedule_name = schedule_name;
    this.schedule_type_id = schedule_type_id;
    this.schedule_datetime = new Date(schedule_datetime?.toString() ?? '');
    this.schedule_place = schedule_place;
    this.schedule_remark = schedule_remark;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.schedule_type = schedule_type;
  }
}

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

class ScheduleModal {
  schedule: Schedule;
  schedule_accesses?: ScheduleAccess[];

  constructor(schedule: Schedule, schedule_accesses?: ScheduleAccess[]) {
    this.schedule = schedule;
    this.schedule_accesses = schedule_accesses;
  }
}