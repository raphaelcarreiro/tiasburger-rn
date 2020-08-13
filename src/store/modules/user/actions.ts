import {
  UserActions,
  SET_USER,
  REMOVE_USER,
  USER_CHANGE,
  CUSTOMER_CHANGE,
  SELECT_IMAGE,
  DELETE_IMAGE,
  ADD_CUSTOMER_ADDRESS,
  DELETE_CUSTOMER_ADDRESS,
  UPDATE_CUSTOMER_ADDRESS,
  SET_MAIN_ADDRESS,
} from './types';
import { User, Address } from '../../../@types/user';

export function setUser(user: User): UserActions {
  return {
    type: SET_USER,
    user,
  };
}

export function removeUser(): UserActions {
  return {
    type: REMOVE_USER,
  };
}

export function userChange(index: string, value: string | number | boolean): UserActions {
  return {
    type: USER_CHANGE,
    index,
    value,
  };
}

export function customerChange(index: string, value: string | number | boolean): UserActions {
  return {
    type: CUSTOMER_CHANGE,
    index,
    value,
  };
}

export function selectImage(): UserActions {
  return {
    type: SELECT_IMAGE,
  };
}

export function deleteImage(): UserActions {
  return {
    type: DELETE_IMAGE,
  };
}

export function addCustomerAddress(address: Address): UserActions {
  return {
    type: ADD_CUSTOMER_ADDRESS,
    address,
  };
}

export function deleteCustomerAddress(addressId: number): UserActions {
  return {
    type: DELETE_CUSTOMER_ADDRESS,
    addressId,
  };
}

export function updateCustomerAddress(address: Address): UserActions {
  return {
    type: UPDATE_CUSTOMER_ADDRESS,
    address,
  };
}

export function setMainCustomerAddress(addressId: number): UserActions {
  return {
    type: SET_MAIN_ADDRESS,
    addressId,
  };
}
