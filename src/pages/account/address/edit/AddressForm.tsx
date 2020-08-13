import React, { useRef, useEffect } from 'react';
import Input from '../../../../components/bases/input/Input';
import { AddressValidation } from './AddressEdit';
import { TextInput } from 'react-native';
import { Address } from '../../../../@types/address';

interface AccountFormEditProps {
  address: Address | null;
  handleAddressChange(index: string, value: string): void;
  validation: AddressValidation;
  handleValidation(): void;
}

const AddressForm: React.FC<AccountFormEditProps> = ({
  address,
  handleAddressChange,
  validation,
  handleValidation,
}) => {
  const inputRefs = {
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

  return (
    <>
      {address && (
        <>
          {address.postal_code !== '00000000' && (
            <Input
              label="CEP"
              placeholder="Digite o CEP"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              value={address.postal_code}
              onChange={event => handleAddressChange('cep', event.nativeEvent.text)}
              variant="standard"
              editable={false}
            />
          )}
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
            autoFocus
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
            value={address.address_complement}
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
  );
};

export default AddressForm;
