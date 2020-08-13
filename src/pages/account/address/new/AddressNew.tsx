import React, { useReducer, useState, useEffect } from 'react';
import Modal from '../../../../components/modal/Modal';
import AddressForm from './AddressForm';
import AddressFormActions from './AddressFormActions';
import addressReducer, { addressChange, setAddressViaCep, setAddress } from '../addressReducer';
import api from '../../../../services/api';
import { useMessage } from '../../../../hooks/message';
import { useDispatch } from 'react-redux';
import { addCustomerAddress } from '../../../../store/modules/user/actions';
import Loading from '../../../../components/loading/Loading';
import * as yup from 'yup';
import { useSelector } from '../../../../store/selector';
import { ViaCepResponse } from '../../../../services/postalCodeSearch';
import { ScrollView } from 'react-native-gesture-handler';
import { Address } from '../../../../@types/address';

interface AddressEditProps {
  open: boolean;
  onExited(): void;
}

export interface AddressValidation {
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
}

const AddressNew: React.FC<AddressEditProps> = ({ open, onExited }) => {
  const [editedAddress, addressDispatch] = useReducer(addressReducer, {} as Address);
  const [saving, setSaving] = useState(false);
  const [validation, setValidation] = useState<AddressValidation>({} as AddressValidation);
  const restaurant = useSelector(state => state.restaurant);
  const message = useMessage();
  const dispatch = useDispatch();

  useEffect(() => {
    addressDispatch(setAddress({} as Address));
  }, [open]);

  function handleAddressChange(index: string, value: string): void {
    addressDispatch(addressChange(index, value));
  }

  function handleValidation() {
    const schema = yup.object().shape({
      complement: yup.string().nullable(),
      district: yup.string().test('check_config', 'Bairro é obrigatório', value => {
        if (restaurant?.configs.tax_mode !== 'district') {
          return !!value;
        } else return true;
      }),
      number: yup.string().required('O número é obrigatório'),
      address: yup.string().required('O endereço é obrigatório'),
    });

    schema
      .validate(editedAddress)
      .then(() => {
        handleSubmit();
        setValidation({} as AddressValidation);
      })
      .catch(err => {
        setValidation({
          [err.path]: err.message,
        });
      });
  }

  function handleSubmit(): void {
    setSaving(true);

    const data = {
      ...editedAddress,
      area_region_id: null,
    };

    api
      .post(`/customerAddresses`, data)
      .then(response => {
        dispatch(addCustomerAddress(response.data));
        onExited();
      })
      .catch(err => {
        if (err.response) message.handleOpen(err.response.data.error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleSetAddress(address: ViaCepResponse): void {
    addressDispatch(setAddressViaCep(address));
  }

  function handleModalClose() {
    setValidation({} as AddressValidation);
    onExited();
  }

  return (
    <Modal
      title="Adicionar endereço"
      open={open}
      handleClose={handleModalClose}
      actions={<AddressFormActions saving={saving} handleSubmit={handleValidation} />}
    >
      {saving && <Loading />}
      <ScrollView>
        <AddressForm
          address={editedAddress}
          handleAddressChange={handleAddressChange}
          validation={validation}
          handleValidation={handleValidation}
          setValidation={setValidation}
          handleSetAddress={handleSetAddress}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddressNew;
