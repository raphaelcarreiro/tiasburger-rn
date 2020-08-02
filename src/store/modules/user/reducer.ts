import { moneyFormat } from '../../../helpers/numberFormat';
import { Image } from '../../types';
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

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string | null;
  addresses: Address[];
}

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

export interface UserState {
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

export const INITIAL_STATE: UserState | null = null;

export default function user(state = INITIAL_STATE, action: UserActions): UserState | null {
  switch (action.type) {
    case SET_USER: {
      const customer = action.user.customer;
      const addresses = customer && customer.addresses;

      return {
        ...action.user,
        customer: {
          ...customer,
          addresses:
            addresses &&
            addresses.map(address => {
              address.area_region = address.area_region && {
                ...address.area_region,
                formattedTax: moneyFormat(address.area_region.tax),
              };
              address.formattedDistanceTax = moneyFormat(address.distance_tax);
              return address;
            }),
        },
      };
    }
    case REMOVE_USER: {
      return INITIAL_STATE;
    }

    case USER_CHANGE: {
      return !state
        ? null
        : {
            ...state,
            [action.index]: action.value,
          };
    }

    case CUSTOMER_CHANGE: {
      if (!state) return null;

      return {
        ...state,
        customer: {
          ...state.customer,
          [action.index]: action.value,
        },
      };
    }

    case SELECT_IMAGE: {
      if (!state) return null;

      return {
        ...state,
        image: state.image && {
          ...state.image,
          selected: !state.image.selected,
        },
      };
    }

    case DELETE_IMAGE: {
      if (!state) return null;

      return {
        ...state,
        image: null,
      };
    }

    case ADD_CUSTOMER_ADDRESS: {
      if (!state) return null;

      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: [
            ...state.customer.addresses,
            {
              ...action.address,
              area_region: action.address.area_region && {
                ...action.address.area_region,
                formattedTax: moneyFormat(action.address.area_region.tax),
              },
              formattedDistanceTax: moneyFormat(action.address.distance_tax),
            },
          ],
        },
      };
    }

    case DELETE_CUSTOMER_ADDRESS: {
      if (!state) return null;

      const addresses = state.customer.addresses.filter(address => address.id !== action.addressId);

      return {
        ...state,
        customer: {
          ...state.customer,
          addresses,
        },
      };
    }

    case UPDATE_CUSTOMER_ADDRESS: {
      if (!state) return null;

      const addresses = state.customer.addresses.map(address => {
        if (address.id === action.address.id) {
          return {
            ...action.address,
            area_region: action.address.area_region && {
              ...action.address.area_region,
              formattedTax: moneyFormat(action.address.area_region.tax),
            },
            formattedDistanceTax: moneyFormat(action.address.distance_tax),
          };
        }

        return address;
      });

      return {
        ...state,
        customer: {
          ...state.customer,
          addresses,
        },
      };
    }
    case SET_MAIN_ADDRESS: {
      if (!state) return null;

      const addresses = state.customer.addresses.map(address => {
        address.is_main = address.id === action.addressId;
        return address;
      });

      return {
        ...state,
        customer: {
          ...state.customer,
          addresses,
        },
      };
    }

    default: {
      return state;
    }
  }
}
