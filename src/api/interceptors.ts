import { AxiosInstance } from "axios";
import apis from "./api_service";

export const setupInterceptors = (api: AxiosInstance) => {
    api.interceptors.response.use(
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
                    return api.request(config); // Retry the failed request
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
                    const response = await apis.auth.refreshToken();

                    const newAccessToken = response;

                    // Update the authorization header for subsequent requests
                    apis.setToken(newAccessToken);

                    // Retry the original request
                    return api.request(config);
                } catch (error) {
                    console.error('Token refresh failed', error);
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    );
};