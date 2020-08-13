import { UserActionTypes, USER_CHANGE, IMAGE_DELETE, SET_USER, UserCustomer } from './types';

export function userChange(index: string, value: string | boolean | number | null): UserActionTypes {
  return {
    type: USER_CHANGE,
    index,
    value,
  };
}

export function imageDelete(): UserActionTypes {
  return {
    type: IMAGE_DELETE,
  };
}

export function setUser(user: UserCustomer): UserActionTypes {
  return {
    type: SET_USER,
    user,
  };
}
