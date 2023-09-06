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

export { Media };