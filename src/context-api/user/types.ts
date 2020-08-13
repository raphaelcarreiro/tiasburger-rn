export interface UserRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const CHANGE = 'CHANGE';

interface ChangeAction {
  type: typeof CHANGE;
  index: string;
  value: string;
}

export type UserActions = ChangeAction;
