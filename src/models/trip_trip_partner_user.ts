import { Trip } from "./trip";
import { User } from "./user";

class TripTripPartnerUserModal {
    trip: Trip;
    trip_partner: User[];
    user: User;
  
    constructor(
      trip: Trip,
      trip_partners: User[],
      user: User) {
      this.trip = trip;
      this.trip_partner = trip_partners;
      this.user = user;
    }
  }

export { TripTripPartnerUserModal };