import { moneyFormat } from '../../../helpers/numberFormat';
import { User } from '../../../@types/user';

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

export const INITIAL_STATE: User | null = null;

export default function user(state = INITIAL_STATE, action: UserActions): User | null {
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
