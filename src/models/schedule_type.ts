class ScheduleType { 
  schedule_type_id: number;
  user_id?: number;
  schedule_type: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  constructor(
    schedule_type_id: number,
    schedule_type: string,
    user_id?: number,
    created_at?: string,
    updated_at?: string,
    deleted_at?: string
  ) {
    this.schedule_type_id = schedule_type_id;
    this.user_id = user_id;
    this.schedule_type = schedule_type;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}