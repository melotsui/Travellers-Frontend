import { MediaTypes } from "../constants/types";
import { parseMediaType } from "../helpers/media";

class Media {
  media_id: number;
  schedule_id?: number;
  note_id?: number;
  media_type?: MediaTypes;
  media_url: string;
  media_preview_url?: string;
  location?: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: number;
  deleted_by?: number;

  constructor(data: Media) {
    this.media_id = data.media_id;
    this.schedule_id = data.schedule_id;
    this.note_id = data.note_id;
    this.media_type = parseMediaType((data.media_type ?? '').toString()) as MediaTypes;
    this.media_url = data.media_url;
    this.media_preview_url = data.media_preview_url;
    this.location = data.location;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
    this.created_by = data.created_by;
    this.deleted_by = data.deleted_by;
  }
}


class MediaModal {
  media: Media;
  media_local_url?: string | null;

  constructor(data: Media, localUrl: string | null) {
    this.media = new Media(data);
    this.media_local_url = localUrl;
  }

  // public getMediaId(): number {
  //   return this.media.media_id;
  // }

  // public getScheduleId(): number {
  //   return this.media.schedule_id;
  // }

  // public getNoteId(): number | null {
  //   return this.media.note_id;
  // }

  // public getMediaType(): string {
  //   return this.media.media_type;
  // }

  // public getMediaUrl(): string | null {
  //   return this.media.media_url;
  // }

  // public getMediaPreviewUrl(): string | null {
  //   return this.media.media_preview_url;
  // }

  // public getLocation(): string | null {
  //   return this.media.location;
  // }

  // public getCreatedAt(): string {
  //   return this.media.created_at;
  // }

  // public getUpdatedAt(): string {
  //   return this.media.updated_at;
  // }

  // public getDeletedAt(): string | null {
  //   return this.media.deleted_at;
  // }

  // public getCreatedBy(): number {
  //   return this.media.created_by;
  // }

  // public getDeletedBy(): number | null {
  //   return this.media.deleted_by;
  // }

  // public getLocalUrl(): string | null {
  //   return this.media_local_url;
  // }
}

export { Media, MediaModal };