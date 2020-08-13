import { Customer } from './customer';

export interface User {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  rule: string;
  activated: string;
  image: Image | null;
  loadedFromStorage: boolean;
  customer: Customer;
}
