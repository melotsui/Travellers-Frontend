import APIs from './api';

class UserApi {
    private user: APIs;

    constructor(user: APIs) {
        this.user = user;
    }

    sendVerifyEmail = async (user : string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_id": user
                };

                await this.user.api.post('/users/sendVerify', jsonData)
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

    verifyEmail = async (userId: string, passcode: string): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const jsonData = {
                    "user_id": userId,
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
}

export default UserApi;