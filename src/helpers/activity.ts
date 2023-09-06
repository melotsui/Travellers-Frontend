import { ActivityTypes } from "../constants/types";

function getActivityIcon(type: ActivityTypes): string {
    switch (type) {
        case ActivityTypes.SIGHTSEEING:
        return 'location-city';
        case ActivityTypes.SHOPPING:
            return 'shopping-bag';
        case ActivityTypes.DINING:
            return 'restaurant';
        case ActivityTypes.RECREATION:
            return 'sports-esports';
        case ActivityTypes.CULTUREHISTORICAL:
            return 'history-edu';
        case ActivityTypes.NIGHTLIFT:
            return 'nightlife';
        case ActivityTypes.NATUREADVENTURE:
            return 'forest';
        case ActivityTypes.WELLNESSSPA:
            return 'spa';
        case ActivityTypes.SPORTSACTIVITIES:
            return 'directions-run';
        case ActivityTypes.WORKSHOP:
            return 'school';
        case ActivityTypes.OTHER:
            return 'tune';
    }
}

function parseActivityType(type: string): ActivityTypes {
    switch (type) {
        case 'Sightseeing':
            return ActivityTypes.SIGHTSEEING;
        case 'Shopping':
            return ActivityTypes.SHOPPING;
        case 'Dining':
            return ActivityTypes.DINING;
        case 'Recreation':
            return ActivityTypes.RECREATION;
        case 'Cultural & Historical':
            return ActivityTypes.CULTUREHISTORICAL;
        case 'Nightlife':
            return ActivityTypes.NIGHTLIFT;
        case 'Nature & Adventure':
            return ActivityTypes.NATUREADVENTURE;
        case 'Wellness & Spa':
            return ActivityTypes.WELLNESSSPA;
        case 'Sports Activities':
            return ActivityTypes.SPORTSACTIVITIES;
        case 'Workshop':
            return ActivityTypes.WORKSHOP;
        case 'other':
            return ActivityTypes.OTHER;
        default:
            return ActivityTypes.OTHER;
    }
}

export { getActivityIcon, parseActivityType };