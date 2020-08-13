import { Customer } from './customer';

interface AreaRegion {
  id: number;
  name: string;
  tax: number;
  formattedTax: string;
}

export interface Address {
  id: number;
  address: string;
  number: string;
  address_complement?: string;
  postal_code: string;
  district: string;
  city: string;
  region: string;
  is_main: boolean;
  area_region: AreaRegion | null;
  distance_tax: number | null;
  formattedDistanceTax: string | number;
}

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
