import { useState, useEffect } from "react";
import { Linking, Platform } from "react-native";
import { Share } from "react-native";


export async function shareFriend(message: string): Promise<void> {

    try {
        console.log('shareFriend');
        let url = 'http://travellers.com?share_id=1';
        const appId = 'com.travellers';
        // if (Platform.OS === 'ios') {
        //     url = `https://apps.apple.com/app/travellers/${appId}`
        // } else {
        //     url = `https://play.google.com/store/apps/details?id=${appId}`
        // }

        const result = await Share.share({
            message: 'http://travellers.com?share_id=1\n' + message,
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