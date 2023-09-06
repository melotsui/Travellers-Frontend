
class MediaLocalUrl {
    media_local_url_id: number;
    media_id: number;
    user_id: number;
    media_local_url: string;
    updated_at?: string;
    created_at?: string;

    constructor(data: MediaLocalUrl
    ) {
        this.media_local_url_id = data.media_local_url_id;
        this.media_id = data.media_id;
        this.user_id = data.user_id;
        this.media_local_url = data.media_local_url;
        this.updated_at = data.updated_at;
        this.created_at = data.created_at;
    }
}

export { MediaLocalUrl };