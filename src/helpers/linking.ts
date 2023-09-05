import { Linking, NativeEventEmitter, NativeModules } from "react-native";
import queryString from "query-string";

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
const handleDeepLink = (url: string) => {
    console.log('Deep link:', url);
    const parsed = queryString.parseUrl(url);
    const shareId = parsed.query.share_id;
    console.log('Share ID:', shareId);
    // Process the deep link as needed
};

// Listen for incoming deep links
const removeDeepLinkListener = addDeepLinkListener((url) => {
    handleDeepLink(url);
});

export { getInitialURL, addDeepLinkListener, removeDeepLinkListener };