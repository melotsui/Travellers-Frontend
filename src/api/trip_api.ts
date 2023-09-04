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
}

export default TripApi;