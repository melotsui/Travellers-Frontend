import { User } from '../models/user';
import { Response } from '../models/reponse';
import APIs from './api';
import { AppThunk } from '../store/store';

class AuthApi {
    private auth: APIs;

    constructor(auth: APIs) {
        this.auth = auth;
    }

    login = async (username: string, password: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "password": password
                };

                await this.auth.api.post('/login', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data['access_token']);
                        this.auth.setToken(result.data['access_token']);
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

    register = async (username: string, password: string): Promise<Response<string>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "password": password
                };

                await this.auth.api.post('/register', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data['access_token']);
                        this.auth.setToken(result.data['access_token']);
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

    getMyProfile = async (): Promise<User> => {
        return new Promise<User>(async (resolve, reject) => {
            try {
                await this.auth.api.post('/me')
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.user)
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

export default AuthApi;