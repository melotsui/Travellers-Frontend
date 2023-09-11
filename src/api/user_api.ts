import { Asset } from 'react-native-image-picker';
import { VerificationType } from '../constants/types';
import { User } from '../models/user';
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

    verifyEmail = async (userId: number, passcode: string, email: string): Promise<string> => {
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

    verifyForgetPassword = async (userId: string, passcode: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_id": userId,
                    "type": VerificationType.PASSWORD,
                    "passcode": passcode
                };

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

    resetPassword = async (userId: number, passcode: string, password: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_id": userId,
                    "passcode": passcode,
                    "password": password
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

    changePassword = async (old_password: string, new_password: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "old_password": old_password,
                    "new_password": new_password,
                };

                await this.user.api.post('/users/changePassword', jsonData)
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


    updateProfile = async (
        username: string,
        name?: string,
        nationality?: string,
        gender?: string,
        age?: number
        ): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "username": username,
                    "name": name,
                    "nationality": nationality,
                    "gender": gender,
                    "age": age
                };

                await this.user.api.put('/users', jsonData)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data.user);
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

    uploadUserIcon = async ( icon: Asset ): Promise<User> => {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                formData.append('icon', {
                    uri: icon.uri,
                    type: icon.type,
                    name: icon.fileName,
                });

                await this.user.api.post('/users/uploadUserIcon', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then((response) => {
                        const result = response.data;
                        const user: User = result.data.user;
                        resolve(user);
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