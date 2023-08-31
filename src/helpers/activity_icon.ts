import { ActivityTypes } from "../constants/types";

function getActivityIcon(type: ActivityTypes): string {
    switch (type) {
        case ActivityTypes.FOOD:
            return 'restaurant-menu';
        case ActivityTypes.SIGHTSEEING:
            return '🏛';
        case ActivityTypes.SHOPPING:
            return '🛍';
        case ActivityTypes.SPORT:
            return '⚽️';
        case ActivityTypes.CULTURE:
            return '🎭';
        case ActivityTypes.NIGHTLIFT:
            return '🍸';
        case ActivityTypes.OTHER:
            return '🎉';
        default:
            return '🤷‍♂️';
    }
  }

export default getActivityIcon;