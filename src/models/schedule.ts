class Schedule {
    schedule_id: number;
    trip_id: number;
    schedule_name: string;
    schedule_type_id: number;
    schedule_datetime?: string;
    schedule_place?: string;
    schedule_remark?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  
    constructor(
      schedule_id: number,
      trip_id: number,
      schedule_name: string,
      schedule_type_id: number,
      created_at?: string,
      schedule_datetime?: string,
      schedule_place?: string,
      schedule_remark?: string,
      updated_at?: string,
      deleted_at?: string
    ) {
      this.schedule_id = schedule_id;
      this.trip_id = trip_id;
      this.schedule_name = schedule_name;
      this.schedule_type_id = schedule_type_id;
      this.schedule_datetime = schedule_datetime;
      this.schedule_place = schedule_place;
      this.schedule_remark = schedule_remark;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.deleted_at = deleted_at;
    }
  }
  