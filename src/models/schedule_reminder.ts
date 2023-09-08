class ScheduleReminder {
    schedule_reminder_id: number;
    schedule_id: number;
    schedule_reminder_datetime: Date;
    created_at?: Date; 
    updated_at?: Date; 
  
    constructor(
      schedule_reminder_id: number,
      schedule_id: number,
      schedule_reminder_datetime: Date,
      created_at?: Date,
      updated_at?: Date
    ) {
      this.schedule_reminder_id = schedule_reminder_id;
      this.schedule_id = schedule_id;
      this.schedule_reminder_datetime = schedule_reminder_datetime;
  
      if (created_at) {
        this.created_at = created_at;
      }
      if (updated_at) {
        this.updated_at = updated_at;
      }
    }
  }
  
  export default ScheduleReminder;
  