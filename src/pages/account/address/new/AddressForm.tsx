import React, { useRef, useEffect, useState } from 'react';
import Input from '../../../../components/bases/input/Input';
import { AddressValidation } from './AddressNew';
import { TextInput } from 'react-native';
import { useSelector } from '../../../../store/selector';
import { postalCodeSearch, ViaCepResponse } from '../../../../services/postalCodeSearch';
import { Address } from '../../../../@types/address';

interface AccountFormEditProps {
  address: Address | null;
  handleAddressChange(index: string, value: string): void;
  validation: AddressValidation;
  handleValidation(): void;
  setValidation(validation: AddressValidation): void;
  handleSetAddress(address: ViaCepResponse): void;
}

const interval = 500;
let timer: NodeJS.Timeout;

const AddressForm: React.FC<AccountFormEditProps> = ({
  address,
  handleAddressChange,
  validation,
  handleValidation,
  setValidation,
  handleSetAddress,
}) => {
  const restaurant = useSelector(state => state.restaurant);
  const [cepValidation, setCepValidation] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = {
    cep: useRef<TextInput>(null),
    address: useRef<TextInput>(null),
    number: useRef<TextInput>(null),
    complement: useRef<TextInput>(null),
    district: useRef<TextInput>(null),
  };

  useEffect(() => {
    const [key] = Object.keys(validation) as Array<keyof typeof validation>;
    if (!key) return;

    inputRefs[key].current?.focus();
  }, [validation, inputRefs]);

  function handleCepChange(value: string) {
    handleAddressChange('postal_code', value);
    setCepValidation(false);
    setValidation({} as AddressValidation);

    const newPostalCode = value.replace(/\D/g, '');

    clearTimeout(timer);

    if (newPostalCode.length === 0) return false;

    if (newPostalCode.length < 8 || newPostalCode.length > 8) {
      setCepValidation(false);
      setValidation({ cep: 'CEP inválido' });
    }

    if (newPostalCode.length === 8)
      timer = setTimeout(() => {
        setLoading(true);
        postalCodeSearch(newPostalCode)
          .then(response => {
            if (response.data.erro) {
              setValidation({ cep: 'CEP inexistente' });
              setCepValidation(false);
            } else {
              handleSetAddress(response.data);
              setCepValidation(true);
              setValidation({} as AddressValidation);
              inputRefs.number.current?.focus();
            }
          })
          .catch(err => {
            setCepValidation(false);
            if (err.response) {
              console.log(err.response.data.erro);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }, interval);
  }

  return (
    <>
      {address && (
        <>
          {restaurant?.configs.use_postalcode && (
            <Input
              error={!!validation.cep}
              helperText={loading ? 'Consultando...' : validation.cep}
              label="CEP"
              placeholder="Digite o CEP"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              value={address.postal_code}
              onChange={event => handleCepChange(event.nativeEvent.text)}
              variant="standard"
              autoFocus
              editable={!loading}
            />
          )}
          {cepValidation && (
            <>
              <Input
                ref={inputRefs.address}
                error={!!validation.address}
                helperText={validation.address}
                label="Endereço"
                placeholder="Digite o endereço"
                returnKeyType="next"
                autoCapitalize="words"
                value={address.address}
                onChange={event => handleAddressChange('address', event.nativeEvent.text)}
                autoCompleteType="street-address"
                variant="standard"
                onSubmitEditing={() => inputRefs.number.current?.focus()}
                blurOnSubmit={false}
              />
              <Input
                ref={inputRefs.number}
                error={!!validation.number}
                helperText={validation.number}
                label="Número"
                placeholder="Digite o número"
                returnKeyType="next"
                autoCapitalize="none"
                value={address.number}
                onChange={event => handleAddressChange('number', event.nativeEvent.text)}
                variant="standard"
                blurOnSubmit={false}
                onSubmitEditing={() => inputRefs.complement.current?.focus()}
              />
              <Input
                ref={inputRefs.complement}
                label="Complemento"
                placeholder="Digite o complemento"
                returnKeyType="next"
                autoCapitalize="sentences"
                autoCorrect
                value={address.address_complement || ''}
                onChange={event => handleAddressChange('address_complement', event.nativeEvent.text)}
                variant="standard"
                blurOnSubmit={false}
                onSubmitEditing={() => inputRefs.district.current?.focus()}
              />
              <Input
                ref={inputRefs.district}
                error={!!validation.district}
                helperText={validation.district}
                label="Bairro"
                placeholder="Digite o bairro"
                returnKeyType="send"
                autoCapitalize="words"
                autoCorrect
                value={address.district}
                onChange={event => handleAddressChange('district', event.nativeEvent.text)}
                onSubmitEditing={handleValidation}
                variant="standard"
              />
              <Input label="Cidade" autoCorrect value={address.city} variant="standard" editable={false} />
              <Input label="Estado" value={address.region} variant="standard" editable={false} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddressForm;
