export interface UserCustomer {
  id?: number;
  name: string;
  email: string;
  cpf: string | null;
  phone: string;
  isImageSelected: boolean;
  image: null | {
    id: number;
    imageUrl: string;
  };
}

export const USER_CHANGE = 'USER_CHANGE';
export const IMAGE_DELETE = 'IMAGE_DELETE';
export const SET_USER = 'SET_USER';

interface UserChangeAction {
  type: typeof USER_CHANGE;
  index: string;
  value: string | boolean | number | null;
}

interface UserImageDeleteAction {
  type: typeof IMAGE_DELETE;
}

interface SetUserAction {
  type: typeof SET_USER;
  user: UserCustomer;
}

export type UserActionTypes = UserChangeAction | UserImageDeleteAction | SetUserAction;
