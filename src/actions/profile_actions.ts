import { User } from "../models/user";

export const updateProfile = (profileData: User) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: profileData,
    };
  };