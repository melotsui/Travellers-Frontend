import { Action } from "../models/action";
import { User } from "../models/user";

const initialState = {
    id: 0,
    name: '',
    email: '',
    icon: '',
    gender: '',
    age: 0,
    nationality: '',
  } as User;

  const profileReducer = (state = initialState, action: Action) => {
    console.log('profileReducer', action);
    switch (action.type) {
      case 'UPDATE_PROFILE':
        return {
          ...state,
          profile: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;