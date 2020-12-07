import React, { useRef, useEffect, useState } from 'react';
import Input from '../../../../components/bases/input/Input';
import { TextInput } from 'react-native';
import { useSelector } from '../../../../store/selector';
import { postalCodeSearch, ViaCepResponse } from '../../../../services/postalCodeSearch';
import { Address } from '../../../../@types/address';
import { AddressValidation } from '../validation/addressValidation';

interface AccountFormEditProps {
  address: Address;
  handleAddressChange(index: string, value: string): void;
  validation: AddressValidation;
  handleValidation(): void;
  handleSetAddress(address: ViaCepResponse): void;
}

const interval = 500;
let timer: NodeJS.Timeout;

const AddressForm: React.FC<AccountFormEditProps> = ({
  address,
  handleAddressChange,
  validation,
  handleSetAddress,
  handleValidation,
}) => {
  const restaurant = useSelector(state => state.restaurant);
  const [loading, setLoading] = useState(false);
  const [postalCodeValidation, setPostalCodeValidation] = useState({
    error: false,
    message: '',
    hasData: false,
  });

  const inputRefs = {
    cep: useRef<TextInput>(null),
    address: useRef<TextInput>(null),
    number: useRef<TextInput>(null),
    complement: useRef<TextInput>(null),
    district: useRef<TextInput>(null),
    region: useRef<TextInput>(null),
    city: useRef<TextInput>(null),
  };

  useEffect(() => {
    if (!restaurant) return;
    setPostalCodeValidation({
      error: false,
      message: '',
      hasData: !restaurant.configs.use_postalcode,
    });
  }, [restaurant]);

  useEffect(() => {
    const [key] = Object.keys(validation) as Array<keyof typeof validation>;
    if (!key) return;

    inputRefs[key].current?.focus();
  }, [validation]); //eslint-disable-line

  function handleCepChange(value: string) {
    handleAddressChange('postal_code', value);
    setPostalCodeValidation({ error: false, message: '', hasData: false });

    const newPostalCode = value.replace(/\D/g, '');

    clearTimeout(timer);

    if (newPostalCode.length === 0) return false;

    if (newPostalCode.length < 8 || newPostalCode.length > 8) {
      setPostalCodeValidation({
        error: true,
        message: 'CEP inválido',
        hasData: false,
      });
    }

    if (newPostalCode.length === 8)
      timer = setTimeout(() => {
        setLoading(true);
        postalCodeSearch(newPostalCode)
          .then(response => {
            if (response.data.erro) {
              setPostalCodeValidation({
                error: true,
                message: 'CEP inexistente',
                hasData: false,
              });
              return;
            }
            handleSetAddress(response.data);
            setPostalCodeValidation({ error: false, message: '', hasData: true });
            inputRefs.number.current?.focus();
          })
          .catch(err => {
            setPostalCodeValidation({
              error: true,
              message: err.message,
              hasData: false,
            });
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
      {!postalCodeValidation.error && postalCodeValidation.hasData && (
        <>
          <Input
            ref={inputRefs.address}
            error={!!validation.address}
            helperText={validation.address}
            label="Endereço"
            placeholder="Digite o endereço"
            returnKeyType="next"
            autoCapitalize="words"
            value={address.address || ''}
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
            value={address.number || ''}
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
            returnKeyType={restaurant?.configs.use_postalcode ? 'send' : 'next'}
            autoCapitalize="words"
            autoCorrect
            value={address.district || ''}
            onChange={event => handleAddressChange('district', event.nativeEvent.text)}
            onSubmitEditing={
              restaurant?.configs.use_postalcode ? handleValidation : () => inputRefs.city.current?.focus()
            }
            variant="standard"
          />
          <Input
            ref={inputRefs.city}
            error={!!validation.city}
            helperText={validation.city}
            label="Cidade"
            placeholder="Digite a cidade"
            returnKeyType={restaurant?.configs.use_postalcode ? 'none' : 'next'}
            autoCapitalize="sentences"
            autoCorrect
            value={address.city || ''}
            variant="standard"
            editable={!restaurant?.configs.use_postalcode}
            onChange={event => handleAddressChange('city', event.nativeEvent.text)}
            onSubmitEditing={() => inputRefs.region.current?.focus()}
          />
          <Input
            ref={inputRefs.region}
            error={!!validation.region}
            helperText={validation.region}
            label="Estado"
            placeholder="Digite o estado"
            returnKeyType={restaurant?.configs.use_postalcode ? 'none' : 'send'}
            autoCapitalize="characters"
            autoCorrect={false}
            value={address.region || ''}
            variant="standard"
            editable={!restaurant?.configs.use_postalcode}
            onChange={event => handleAddressChange('region', event.nativeEvent.text)}
            onSubmitEditing={handleValidation}
          />
        </>
      )}
    </>
  );
};

export default AddressForm;
