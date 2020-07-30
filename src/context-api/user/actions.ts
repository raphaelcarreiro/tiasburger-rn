import { UserActions } from './types';

export function userChange(index: string, value: string): UserActions {
  return {
    type: 'CHANGE',
    index,
    value,
  };
}
