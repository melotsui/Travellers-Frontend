class Trip {
    trip_id: number;
    trip_name: string;
    trip_description?: string;
    trip_destination?: string;
    trip_datetime_from?: string;
    trip_datetime_to?: string;
    created_by: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  
    constructor(
      trip_id: number,
      trip_name: string,
      created_by: number,
      trip_description?: string,
      trip_destination?: string,
      trip_datetime_from?: string,
      trip_datetime_to?: string,
      created_at?: Date,
      updated_at?: Date,
      deleted_at?: Date,
    ) {
      this.trip_id = trip_id;
      this.trip_name = trip_name;
      this.trip_destination = trip_destination;
      this.trip_description = trip_description;
      this.trip_datetime_from = trip_datetime_from;
      this.trip_datetime_to = trip_datetime_to;
      this.created_by = created_by;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.deleted_at = deleted_at;
    }
  }