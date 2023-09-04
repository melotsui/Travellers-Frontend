import ApiService from './api';
import AuthApi from './auth_api';
import ScheduleApi from './schedule_api';
import TripApi from './trip_api';
import UserApi from './user_api';

class APIs {
    private readonly apiService: ApiService;
    public readonly auth: AuthApi;
    public readonly user: UserApi;
    public readonly trip: TripApi;
    public readonly schedule: ScheduleApi;

    constructor() {
        this.apiService = new ApiService();
        this.auth = new AuthApi(this.apiService);
        this.user = new UserApi(this.apiService);
        this.trip = new TripApi(this.apiService);
        this.schedule = new ScheduleApi(this.apiService);
        
    }

    setToken(token: string): void {
        this.apiService.setToken(token);
    }
}

const apis = new APIs();
export default apis;