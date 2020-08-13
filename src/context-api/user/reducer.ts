import { UserActions, CHANGE, UserRegister } from './types';

export const INITIAL_STATE: UserRegister = {
  name: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function userReducer(state = INITIAL_STATE, action: UserActions): UserRegister {
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
