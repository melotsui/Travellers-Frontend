import { VerificationType } from '../constants/types';
import { validateEmail } from '../utils/validation';
import APIs from './api';

class UserApi {
    private user: APIs;

    constructor(user: APIs) {
        this.user = user;
    }

    sendVerifyEmail = async (email: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    'email': email
                };

                await this.user.api.post('/users/sendEmailVerification', jsonData)
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

    verifyEmail = async (userId: string, passcode: string, email: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_id": userId,
                    "type": VerificationType.EMAIL,
                    "passcode": passcode,
                    "email": email,
                };

                console.log(jsonData);
                await this.user.api.post('/users/verifyPasscode', jsonData)
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

    forgetPassword = async (username: string | null): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            let email = null;
            if(validateEmail(username!)){
                email = username;
                username = null;
            }
            try {
                const jsonData = {
                    "username": username,
                    "email": email
                };

                await this.user.api.post('/users/forgotPassword', jsonData)
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

    resetPassword = async (username: string, password: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "password": password,
                };

                await this.user.api.post('/users/resetPassword', jsonData)
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

export default UserApi;