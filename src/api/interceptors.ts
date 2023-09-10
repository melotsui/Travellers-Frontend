import { AxiosInstance } from "axios";
import ApiService from "./api";
import store from "../store/store";
import { storeData } from "../utils/local_storage";

const refreshToken = async (api: AxiosInstance): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            await api.post('/refresh')
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

export const setupInterceptors = (apiService: ApiService) => {
    apiService.api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { config, response } = error;
            console.log(error);


            // Check if the error is due to network disconnection
            if (!response && !config._retry) {
                config._retry = true;
                console.log('Reconnecting...');

                // Reconnect logic
                try {
                    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds before retrying

                    console.log('Retrying request...');
                    return apiService.api.request(config); // Retry the failed request
                } catch (error) {
                    console.error('Reconnection attempt failed', error);
                    return Promise.reject(error); // Reject if the reconnection attempt fails
                }
            }

            // Check if the response status is 401 Unauthorized
            if (error.response && error.response.status === 401 && !config._retry) {
                config._retry = true;

                try {
                    console.log('Refreshing token...');
                    // Make a request to the token refresh endpoint
                    const response = await refreshToken(apiService.api);

                    const newAccessToken = response;

                    // Update the authorization header for subsequent requests
                    apiService.setToken(newAccessToken);
                    storeData('token', newAccessToken);

                    // Retry the original request
                    return apiService.api.request(config);
                } catch (error) {
                    console.error('Token refresh failed', error);
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    );
};