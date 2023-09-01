import { MediaTypes } from "../constants/types";
import g_THEME from "../theme/theme";

export function getMediaIcons(type: MediaTypes): string {
    switch (type) {
        case MediaTypes.VIDEO:
            return 'play-circle';
        case MediaTypes.AUDIO:
            return 'mic';
        case MediaTypes.OTHER:
            return 'add-circle-outline';
        default:
            return '';
    }
}

export function getMediaIconColors(type: MediaTypes): string {
    switch (type) {
        case MediaTypes.VIDEO:
            return g_THEME.colors.grey;
        case MediaTypes.AUDIO:
            return 'red';
        case MediaTypes.OTHER:
            return g_THEME.colors.grey;
        default:
            return 'transparent';
    }
}

export function getMediaBackgroundColors(type: MediaTypes): string {
    switch (type) {
        case MediaTypes.AUDIO:
            return g_THEME.colors.grey;
        default:
            return g_THEME.colors.lightGrey;
    }
}
