import { User } from '../models/user';
import { AxiosInstance, AxiosResponse } from 'axios';
import APIs from './api';
import apis from './api_service';

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

                await this.auth.api.post('/login', jsonData)
                    .then((response) => {
                        resolve(response.data);
                        apis.setToken(response.data['data']['access_token']);
                    })
                    .catch((error) => {
                        reject(error.response.data['message']);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    register = async (username: string, password: string): Promise<Response> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_name": username,
                    "password": password
                };

                await this.auth.api.post('/register', jsonData)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error.response.data['message'])
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getMyProfile = async (): Promise<Response> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.auth.api.post('/me')
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error.response.data['message'])
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default AuthApi;