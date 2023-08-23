import { User } from '../models/user';
import { AxiosInstance, AxiosResponse } from 'axios';
import APIs from './api';

class AuthApi {
    private auth: APIs;

    constructor(auth: APIs) {
      this.auth = auth;
    }

    login = async (username: string, password: string): Promise<Response> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_name": username,
                    "password": password
                };

                const response = await this.auth.api.post('/login', jsonData);
                resolve(response.data);
            } catch (error) {
                reject(new Error('Failed to log in'));
            }
        });
    }
}

export default AuthApi;