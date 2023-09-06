import { TripInvitation } from "./trip_invitation";
import { TripPartner } from "./trip_partner";

class TripPartnerInvitation{
    trip_partners: TripPartner[];
    trip_invitations: TripInvitation[];
  
    constructor(
        trip_partners: TripPartner[],
        trip_invitations: TripInvitation[]
    ) {
        this.trip_partners = trip_partners;
        this.trip_invitations = trip_invitations;
    }
  
  }

export { TripPartnerInvitation };