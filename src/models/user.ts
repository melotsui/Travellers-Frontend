class User {
  user_id: number;
  username: string;
  name?: string;
  email?: string;
  email_verified_at?: Date;
  password_changed_at?: Date;
  user_icon_url?: string;
  gender?: string;
  age?: number;
  nationality?: string;
  timezone?: string;
  last_login_at?: Date;
  provider?: string;
  provider_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_active?: boolean;

  constructor(
      user_id: number = 0,
      username: string = '',
      name?: string,
      created_at?: Date,
      email?: string,
      email_verified_at?: Date,
      password_changed_at?: Date,
      user_icon_url?: string,
      gender?: string,
      age?: number,
      nationality?: string,
      timezone?: string,
      last_login_at?: Date,
      provider?: string,
      provider_id?: string,
      updated_at?: Date,
      deleted_at?: Date,
      is_active?: boolean
  ) {
      this.user_id = user_id;
      this.username = username;
      this.name = name;
      this.email = email;
      this.email_verified_at = email_verified_at;
      this.password_changed_at = password_changed_at;
      this.user_icon_url = user_icon_url;
      this.gender = gender;
      this.age = age;
      this.nationality = nationality;
      this.timezone = timezone;
      this.last_login_at = last_login_at;
      this.provider = provider;
      this.provider_id = provider_id;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.deleted_at = deleted_at;
      this.is_active = is_active;
  }
}

export { User };