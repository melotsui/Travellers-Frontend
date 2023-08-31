import { MediaTypes } from "../constants/types";
import g_THEME from "../theme/theme";

export function getMediaIcons(type: MediaTypes): string {
    switch (type) {
        case MediaTypes.VIDEO:
            return 'play-circle';
        case MediaTypes.AUDIO:
            return 'mic';
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
        default:
            return '';
    }
}
