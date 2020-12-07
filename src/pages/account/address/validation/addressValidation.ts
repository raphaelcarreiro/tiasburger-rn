import { SetStateAction, useState } from 'react';
import { Address } from '../../../../@types/address';
import * as yup from 'yup';
import { useSelector } from '../../../../store/selector';

export interface AddressValidation {
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  region?: string;
}

type UseAddressValidation = [
  AddressValidation,
  React.Dispatch<SetStateAction<AddressValidation>>,
  (address: Address) => Promise<void>,
];

export function useAdressValidation(): UseAddressValidation {
  const [validation, setValidation] = useState<AddressValidation>({});
  const restaurant = useSelector(state => state.restaurant);

  async function handleValidation(address: Address) {
    const schema = yup.object().shape({
      region: yup.string().required('O estado é obrigatório'),
      city: yup.string().required('A cidade é obrigatória'),
      complement: yup.string().nullable(),
      district: yup.string().test('check_config', 'Bairro é obrigatório', value => {
        if (restaurant?.configs.tax_mode !== 'district') {
          return !!value;
        } else return true;
      }),
      number: yup.string().required('O número é obrigatório'),
      address: yup.string().required('O endereço é obrigatório'),
    });

    try {
      await schema.validate(address);
    } catch (err) {
      setValidation({
        [err.path]: err.message,
      });
      throw new Error(err.message);
    }
  }
  return [validation, setValidation, handleValidation];
}
