import { NotificationType } from "../constants/types";

class Notification {
  notification_id: number;
  user_id: number;
  notification_type: NotificationType;
  parameters: { [key: string]: any };
  is_responded: boolean | null;
  created_by: number;
  created_at: Date;
  updated_at: Date | null;
  is_read: boolean | null;
  deleted_at: Date | null;
  notification_title: string;
  notification_body: string;

  constructor(
    notification_id: number,
    user_id: number,
    notification_type: NotificationType,
    parameters: string,
    is_responded: number,
    created_by: number,
    created_at: string,
    updated_at: string | null,
    is_read: number | null,
    deleted_at: string | null,
    notification_title: string,
    notification_body: string
  ) {
    this.notification_id = notification_id;
    this.user_id = user_id;
    this.notification_type = notification_type;
    this.parameters = JSON.parse(parameters); // parse the stringified JSON
    this.is_responded = is_responded !== null ? Boolean(is_responded) : null;
    this.created_by = created_by;
    this.created_at = new Date(created_at);
    this.updated_at = updated_at ? new Date(updated_at) : null;
    this.is_read = is_read !== null ? Boolean(is_read) : null;
    this.deleted_at = deleted_at ? new Date(deleted_at) : null;
    this.notification_title = notification_title;
    this.notification_body = notification_body;
  }
}

export default Notification;
