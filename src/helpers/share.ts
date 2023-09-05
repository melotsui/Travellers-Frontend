import { useState, useEffect } from "react";
import { Linking, Platform } from "react-native";
import { Share } from "react-native";


export async function shareFriend(message: string): Promise<void> {
    const [url, setUrl] = useState<string | null>(null);
    const [processing, setProcessing] = useState(true);

    const useInitialURL = () => {

        useEffect(() => {
            const getUrlAsync = async () => {
                // Get the deep link used to open the app
                const initialUrl = await Linking.getInitialURL();

                // The setTimeout is just for testing purpose
                setTimeout(() => {
                    setUrl(initialUrl);
                    setProcessing(false);
                }, 1000);
            };

            getUrlAsync();

            console.log('url', url);
        }, []);
    };
    await useInitialURL();

    try {
        let url = '';
        const appId = 'com.travellers';
        if (Platform.OS === 'ios') {
            url = `https://apps.apple.com/app/travellers/${appId}`
        } else {
            url = `https://play.google.com/store/apps/details?id=${appId}`
        }

        const result = await Share.share({
            message: message,
            url: url,
            title: 'Travellers',
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('Shared with activity type:', result.activityType);
            } else {
                console.log('Shared');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Share cancelled');
        }
    } catch (error) {
        console.error('Error sharing:', error);
    }
};