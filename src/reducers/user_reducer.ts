import { Action } from "../models/action";
import User from "../models/user";

const initialState = new User();

const userReducer = (state = initialState, action: Action): User => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;