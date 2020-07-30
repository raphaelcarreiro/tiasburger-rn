import { UserActions, CHANGE } from './types';

export interface UserState {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export const INITIAL_STATE: UserState = {
  name: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function userReducer(state = INITIAL_STATE, action: UserActions): UserState {
  switch (action.type) {
    case CHANGE: {
      return {
        ...state,
        [action.index]: action.value,
      };
    }
    default: {
      return state;
    }
  }
}
