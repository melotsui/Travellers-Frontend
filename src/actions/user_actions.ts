import { User } from "../models/user";

export const updateUser = (userData: User) => {
  return {
    type: 'UPDATE_USER',
    payload: userData,
  };
};
