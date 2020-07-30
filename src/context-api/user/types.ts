export const CHANGE = 'CHANGE';

interface ChangeAction {
  type: typeof CHANGE;
  index: string;
  value: string;
}

export type UserActions = ChangeAction;
