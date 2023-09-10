import { Share } from "react-native";


export async function shareFriend(message: string, parameters: Map<string, string>): Promise<void> {

    try {
        let url = 'http://travellers.com?';
        let newParameter = '';
        parameters.forEach((value, key) => {newParameter += `${key}=${value}&`});
        newParameter = newParameter.substring(0, newParameter.length - 1);
        const appId = 'com.travellers';
        // if (Platform.OS === 'ios') {
        //     url = `https://apps.apple.com/app/travellers/${appId}`
        // } else {
        //     url = `https://play.google.com/store/apps/details?id=${appId}`
        // }

        const result = await Share.share({
            message: encodeURI(url + newParameter) + "\n",
            url: encodeURI(url + newParameter),
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