import { User } from "./user";

class TripPartner{
  trip_partner_id: number;
  trip_id: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  deleted_by?: number;
  user?: User;

  constructor(
      trip_partner_id: number = 0,
      trip_id: number = 0,
      user_id: number = 0,
      created_at?: Date,
      updated_at?: Date,
      deleted_at?: Date,
      deleted_by?: number,
      user?: User
  ) {
      this.trip_partner_id = trip_partner_id;
      this.trip_id = trip_id;
      this.user_id = user_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.deleted_at = deleted_at;
      this.deleted_by = deleted_by;
      this.user = user;
  }
}


export { TripPartner };