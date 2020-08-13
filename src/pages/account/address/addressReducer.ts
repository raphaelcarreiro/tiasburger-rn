import { ViaCepResponse } from '../../../services/postalCodeSearch';
import { Address } from '../../../@types/address';

const addressInitialState: Address = {} as Address;

interface AddressChangeAction {
  type: 'ADDRESS_CHANGE';
  index: string;
  value: string;
}

interface SetAddressAction {
  type: 'SET_ADDRESS';
  address: Address;
}

interface SetAddressViaCepAction {
  type: 'SET_ADDRESS_VIACEP';
  address: ViaCepResponse;
}

export type AddressActionsType = AddressChangeAction | SetAddressAction | SetAddressViaCepAction;

export function addressChange(index: string, value: string): AddressActionsType {
  return {
    type: 'ADDRESS_CHANGE',
    index,
    value,
  };
}

export function setAddress(address: Address): AddressActionsType {
  return {
    type: 'SET_ADDRESS',
    address,
  };
}

export function setAddressViaCep(address: ViaCepResponse): AddressActionsType {
  return {
    type: 'SET_ADDRESS_VIACEP',
    address,
  };
}

export default function addressReducer(state = addressInitialState, action: AddressActionsType): Address {
  switch (action.type) {
    case 'ADDRESS_CHANGE': {
      return {
        ...state,
        [action.index]: action.value,
      };
    }

    case 'SET_ADDRESS': {
      return action.address;
    }

    case 'SET_ADDRESS_VIACEP': {
      return {
        ...state,
        address: action.address.logradouro,
        address_complement: action.address.complemento,
        city: action.address.localidade,
        region: action.address.uf,
      };
    }

    default: {
      return state;
    }
  }
}
