import { Media } from "./media";
import { MediaLocalUrl } from "./media_local_url";


class MediaMediaLocalUrl {
    media?: Media | null;
    media_local_url?: MediaLocalUrl | null;

    constructor(
        data?: Media | null,
        localUrl?: MediaLocalUrl | null) {
        this.media = data ? new Media(data) : null;
        this.media_local_url = localUrl ? new MediaLocalUrl(localUrl) : null;
    }
}

export { MediaMediaLocalUrl };