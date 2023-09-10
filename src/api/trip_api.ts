import { Trip } from '../models/trip';
import { TripInvitation } from '../models/trip_invitation';
import { TripPartner } from '../models/trip_partner';
import { TripPartnerInvitation } from '../models/trip_partner_invitation';
import { TripTripPartnerUser } from '../models/trip_trip_partner_user';
import { formatDatetime } from '../utils/datetime_formatter';
import APIs from './api';

class TripApi {
    private trip: APIs;

    constructor(trip: APIs) {
        this.trip = trip;
    }

    getTripList = async (): Promise<Trip[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.trip.api.get('/trips')
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trips);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getTripById = async (trip_id: number): Promise<Trip> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.trip.api.get('/trips/' + trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }      

    
    leaveTrip = async (trip_id: number): Promise<TripPartner> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.trip.api.delete('/trips/leaveTrip/'+ trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip_partner);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    deleteTrip = async (trip_id: number): Promise<Trip> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.trip.api.delete('/trips/'+ trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    getTripPartners = async (trip_id: number): Promise<TripPartnerInvitation> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.trip.api.get('/trip_partners/' + trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    deleteTripPartner = async (trip_partner_id: number): Promise<TripPartner> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.trip.api.delete('/trips/removeTripPartner/' + trip_partner_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip_partner);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    sendTripInvitation = async (trip_id: number, send_to: string): Promise<TripInvitation> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "trip_id": trip_id,
                    "send_to": send_to,
                };

                await this.trip.api.post('/trips/sendTripInvitation', json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip_invitation);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    removeTripInvitation = async (trip_invitation_id: number): Promise<TripInvitation> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.trip.api.delete('/trips/removeTripInvitation/' + trip_invitation_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip_invitation);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    respondTripInvitation = async (trip_invitation_id: number, reponse: boolean): Promise<TripInvitation> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "trip_invitation_id": trip_invitation_id,
                    "respond": reponse,
                };

                await this.trip.api.post('/trips/respondTripInvitation', json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    addTripPartner = async (trip_id: number): Promise<TripPartner> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.trip.api.post('/trip_partners/' + trip_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip_partner);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    createTrip = async (
        trip_name: string,
        trip_datetime_from?: Date,
        trip_datetime_to?: Date,
        trip_destination?: string,
        trip_description?: string,
    ): Promise<TripTripPartnerUser> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "trip_name": trip_name,
                    "trip_datetime_from": formatDatetime(trip_datetime_from),
                    "trip_datetime_to": formatDatetime(trip_datetime_to),
                    "trip_destination": trip_destination,
                    "trip_description": trip_description,
                };

                await this.trip.api.post('/trips', json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    updateTrip = async (
        trip_id: number,
        trip_name: string,
        trip_datetime_from?: Date,
        trip_datetime_to?: Date,
        trip_destination?: string,
        trip_description?: string,
    ): Promise<Trip> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "trip_id": trip_id,
                    "trip_name": trip_name,
                    "trip_datetime_from": formatDatetime(trip_datetime_from),
                    "trip_datetime_to": formatDatetime(trip_datetime_to),
                    "trip_destination": trip_destination,
                    "trip_description": trip_description,
                };

                await this.trip.api.put('/trips/' + trip_id, json)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.trip);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default TripApi;