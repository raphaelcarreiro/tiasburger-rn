import React from 'react';
import { Address } from '../../../../store/modules/user/reducer';
import Input from '../../../../components/bases/input/Input';

interface AccountFormEditProps {
  address: Address | null;
}

const AccountFormEdit: React.FC<AccountFormEditProps> = ({ address }) => {
  return (
    <>
      {address && (
        <>
          <Input
            label="CEP"
            placeholder="Digite o CEP"
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            value={address.postal_code}
            variant="standard"
            editable={false}
          />
          <Input
            label="Endereço"
            placeholder="Digite o endereço"
            returnKeyType="next"
            autoCapitalize="words"
            value={address.address}
            autoCompleteType="street-address"
            variant="standard"
          />
          <Input
            label="Número"
            placeholder="Digite o número"
            returnKeyType="next"
            autoCapitalize="none"
            value={address.number}
            variant="standard"
          />
          <Input
            label="Complemento"
            placeholder="Digite o complemento"
            returnKeyType="next"
            autoCapitalize="sentences"
            autoCorrect
            value={address.address_complement}
            variant="standard"
          />
          <Input
            label="Bairro"
            placeholder="Digite o bairro"
            returnKeyType="send"
            autoCapitalize="words"
            autoCorrect
            value={address.district}
            variant="standard"
          />
          <Input label="Cidade" autoCorrect value={address.city} variant="standard" editable={false} />
          <Input label="Estado" value={address.region} variant="standard" editable={false} />
        </>
      )}
    </>
  );
};

export default AccountFormEdit;
