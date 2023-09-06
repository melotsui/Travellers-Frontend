import { Trip, TripModal } from '../models/trip';
import { TripPartnerModal } from '../models/user';
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
    
    getTripPartners = async (trip_id: number): Promise<TripPartnerModal> => {
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

    sendTripInvitation = async (trip_id: number, send_to: number): Promise<Trip> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "trip_id": trip_id,
                    "send_to": send_to,
                };

                await this.trip.api.post('/trips/sendTripInvitation', json)
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

    respondTripInvitation = async (trip_id: number, reponse: boolean): Promise<Trip> => {
        return new Promise(async (resolve, reject) => {
            try {

                const json = {
                    "trip_id": trip_id,
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

    createTrip = async (
        trip_name: string,
        trip_datetime_from?: Date,
        trip_datetime_to?: Date,
        trip_destination?: string,
        trip_description?: string,
    ): Promise<TripModal> => {
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

                await this.trip.api.put('/trips', json)
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
}

export default TripApi;