import ApiService from './api';
import AuthApi from './auth_api';

class APIs {
    private readonly apiService: ApiService;
    public readonly auth: AuthApi;

    constructor() {
        this.apiService = new ApiService();
        this.auth = new AuthApi(this.apiService);
    }

    setToken(token: string): void {
        this.apiService.setToken(token);
    }
}

const apis = new APIs();
export default apis;