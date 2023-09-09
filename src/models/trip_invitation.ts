import { Trip } from "./trip";
import { User } from "./user";

class TripInvitation {
    trip_invitation_id: number;
    trip_id: number;
    created_by: number;
    send_to: number | User;
    is_accepted?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    user?: User;
    trip?: Trip;

    constructor(
        trip_invitation_id: number = 0,
        trip_id: number = 0,
        created_by: number = 0,
        send_to: number = 0,
        is_accepted: boolean = false,
        created_at?: Date,
        updated_at?: Date,
        deleted_at?: Date,
        user?: User,
        trip?: Trip
    ) {
        this.trip_invitation_id = trip_invitation_id;
        this.trip_id = trip_id;
        this.created_by = created_by;
        this.send_to = send_to;
        this.is_accepted = is_accepted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.user = user;
        this.trip = trip;
    }
}

export { TripInvitation };
