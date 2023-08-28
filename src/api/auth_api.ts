import { User } from '../models/user';
import { Response } from '../models/reponse';
import APIs from './api';
import apis from './api_service';

class AuthApi {
    private auth: APIs;

    constructor(auth: APIs) {
        this.auth = auth;
    }

    login = async (username: string, password: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_name": username,
                    "password": password
                };

                await this.auth.api.post('/login', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data['access_token']);
                        apis.setToken(result.data['access_token']);
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
                    "user_name": username,
                    "password": password
                };

                await this.auth.api.post('/register', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data['access_token']);
                        apis.setToken(result.data['access_token']);
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
                        resolve(result.data)
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

    refreshToken = async (): Promise<string> => {
        return new Promise<string>(async (resolve, reject) => {
            try {
                await this.auth.api.post('/refresh')
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data['access_token'])
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