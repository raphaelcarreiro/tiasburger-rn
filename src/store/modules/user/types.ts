import { User, Address } from '../../../@types/user';

export const SET_USER = '@user/SET_USER';
export const REMOVE_USER = '@user/REMOVE_USER';
export const CUSTOMER_CHANGE = '@user/CUSTOMER_CHANGE';
export const USER_CHANGE = '@user/USER_CHANGE';
export const SELECT_IMAGE = '@user/SELECT_IMAGE';
export const DELETE_IMAGE = '@user/DELETE_IMAGE';
export const ADD_CUSTOMER_ADDRESS = '@user/ADD_CUSTOMER_ADDRESS';
export const DELETE_CUSTOMER_ADDRESS = '@user/DELETE_CUSTOMER_ADDRESS';
export const UPDATE_CUSTOMER_ADDRESS = '@user/UPDATE_CUSTOMER_ADDRESS';
export const SET_MAIN_ADDRESS = '@user/SET_MAIN_ADDRESS';

interface SetUserAction {
  type: typeof SET_USER;
  user: User;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

interface UserChangeAction {
  type: typeof USER_CHANGE;
  index: string;
  value: string | number | boolean;
}

interface CustomerChangeAction {
  type: typeof CUSTOMER_CHANGE;
  index: string;
  value: string | boolean | number;
}

interface SelectImageAction {
  type: typeof SELECT_IMAGE;
}

interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
}

interface AddCustomerAddressAction {
  type: typeof ADD_CUSTOMER_ADDRESS;
  address: Address;
}

interface DeleteCustomerAddressAction {
  type: typeof DELETE_CUSTOMER_ADDRESS;
  addressId: number;
}

interface UpdateCustomerAddressAction {
  type: typeof UPDATE_CUSTOMER_ADDRESS;
  address: Address;
}

interface SetMainAddressAction {
  type: typeof SET_MAIN_ADDRESS;
  addressId: number;
}

export type UserActions =
  | SetMainAddressAction
  | UpdateCustomerAddressAction
  | DeleteCustomerAddressAction
  | AddCustomerAddressAction
  | DeleteImageAction
  | SelectImageAction
  | CustomerChangeAction
  | UserChangeAction
  | RemoveUserAction
  | SetUserAction;
