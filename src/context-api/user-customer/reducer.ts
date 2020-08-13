import { UserActionTypes, USER_CHANGE, IMAGE_DELETE, SET_USER, UserCustomer } from './types';

export const INITIAL_STATE: UserCustomer = {
  name: '',
  email: '',
  cpf: '',
  phone: '',
  isImageSelected: false,
  image: null,
};

export default function user(state = INITIAL_STATE, action: UserActionTypes): UserCustomer {
  switch (action.type) {
    case USER_CHANGE: {
      return {
        ...state,
        [action.index]: action.value,
      };
    }

    case SET_USER: {
      return action.user;
    }

    case IMAGE_DELETE: {
      return {
        ...state,
        image: null,
        isImageSelected: false,
      };
    }

    default: {
      return state;
    }
  }
}
