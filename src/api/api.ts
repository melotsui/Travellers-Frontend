import axios, { AxiosInstance } from 'axios';

class ApiService  {
  public api: AxiosInstance;
  private token: string | null;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://3.27.2.187/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.token = null;
  }

  setToken(token: string): void {
    this.token = token;
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default ApiService ;