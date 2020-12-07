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
import { ViaCepResponse } from '../../../../services/postalCodeSearch';
import { Address } from '../../../../@types/address';
import { StyleSheet, ScrollView } from 'react-native';
import { AddressValidation, useAdressValidation } from '../validation/addressValidation';
import { useSelector } from '../../../../store/selector';

interface AddressEditProps {
  open: boolean;
  onExited(): void;
}

const styles = StyleSheet.create({
  modal: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
  },
  scroll: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
});

const AddressNew: React.FC<AddressEditProps> = ({ open, onExited }) => {
  const [editedAddress, addressDispatch] = useReducer(addressReducer, {} as Address);
  const [saving, setSaving] = useState(false);
  const [validation, setValidation, validate] = useAdressValidation();
  const message = useMessage();
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);

  useEffect(() => {
    addressDispatch(setAddress({} as Address));
  }, [open]);

  useEffect(() => {
    if (!restaurant) return;
    if (!restaurant.configs.use_postalcode) handleAddressChange('postal_code', '00000000');
  }, [restaurant]);

  function handleAddressChange(index: string, value: string): void {
    addressDispatch(addressChange(index, value));
  }

  function handleValidation() {
    validate(editedAddress)
      .then(() => {
        handleSubmit();
      })
      .catch(() => {
        //
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
        setSaving(false);
        onExited();
      })
      .catch(err => {
        setSaving(false);

        if (err.response) message.handleOpen(err.response.data.error);
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
      title="adicionar endereço"
      open={open}
      handleClose={handleModalClose}
      actions={<AddressFormActions saving={saving} handleSubmit={handleValidation} />}
      style={styles.modal}
    >
      {saving && <Loading />}
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AddressForm
          address={editedAddress}
          handleAddressChange={handleAddressChange}
          validation={validation}
          handleValidation={handleValidation}
          handleSetAddress={handleSetAddress}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddressNew;
