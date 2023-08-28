import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from './apiConfig';
import { setupInterceptors } from './interceptors';

class ApiService {
  public api: AxiosInstance;
  private token: string | null;

  constructor() {
    this.api = axios.create({
      baseURL: API_ENDPOINT + "/api",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.token = null;
    setupInterceptors(this.api);
  }

  setToken(token: string): void {
    this.token = token;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

}

export default ApiService;