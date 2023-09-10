import { Linking, NativeEventEmitter, NativeModules } from "react-native";
import queryString from "query-string";
import { navigate, navigateAndReset } from "../navigation/navigation_service";
import { useSelector } from "react-redux";
import { userSelector } from "../slices/user_slice";
import { retrieveData, storeData } from "../utils/local_storage";

// Retrieve the initial URL when the app is opened
const getInitialURL = (): Promise<string | null> => {
    return new Promise((resolve) => {
        Linking.getInitialURL().then((url) => {
            resolve(url);
        });
    });
};

// Listen for incoming deep links
const addDeepLinkListener = (callback: (url: string) => void) => {
    const eventEmitter = new NativeEventEmitter(NativeModules.LinkingManager);
    const subscription = eventEmitter.addListener('url', (event: { url: string }) => {
        callback(event.url);
    });

    return () => {
        subscription.remove();
    };
};

// Retrieve the initial URL when the app is opened
getInitialURL().then((url) => {
    if (url) {
        handleDeepLink(url);
    }
});

// Usage example
const handleDeepLink = async (url: string) => {
    const decodedUrl = decodeURI(url);
    const parsed = queryString.parseUrl(decodedUrl);
    const trip_id = parsed.query.trip_id;
    const trip_name = parsed.query.trip_name;
    await storeData("trip", { trip_id: trip_id, trip_name: trip_name });
    const isLogin = await retrieveData("isLogin");
    if (isLogin) {
        navigateAndReset('HomeBottomBarNavigation');
    }
};

// Listen for incoming deep links
const removeDeepLinkListener = addDeepLinkListener((url) => {
    handleDeepLink(url);
});

export { getInitialURL, addDeepLinkListener };